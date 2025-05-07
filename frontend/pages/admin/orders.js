import Head from 'next/head';
import { useState, useEffect } from 'react';
import styles from '../../styles/AdminOrders.module.css'; // Adjusted path
import Link from 'next/link';
import { useRouter } from 'next/router';

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(null); // Track which order is being updated
  const router = useRouter();

  const orderStatuses = ['pending', 'confirmed', 'processing', 'completed', 'cancelled'];
  const statusLabels = { // Optional: mapping for display names
    pending: '待處理',
    confirmed: '已確認',
    processing: '處理中',
    completed: '已完成',
    cancelled: '已取消'
  };

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3001/api/orders', {
        credentials: 'include',
      });
      
      // Check for unauthorized status first
      if (response.status === 401 || response.status === 403) {
         // Redirect to login page if not authorized
         router.push('/admin/login');
         // It might be good to return early or throw a specific error
         // to prevent further processing in this function if needed.
         return; 
      } 
      
      if (!response.ok) {
        // Handle other HTTP errors (like 500 Internal Server Error)
        const errorData = await response.json().catch(() => ({})); // Try to parse error message
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setOrders(data);
    } catch (e) {
      console.error("Failed to fetch orders:", e);
      // Avoid redirecting again if the error was already caught (like 401 above)
      // We only set error state here for non-auth errors
      if (!(e instanceof Error && e.message.includes('401')) && !(e instanceof Error && e.message.includes('403'))) {
         setError(e.message || "無法載入訂單資料，請稍後再試。");
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingStatus(orderId); // Indicate loading for this specific row
    setError(null);
    try {
      const response = await fetch(`http://localhost:3001/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
        credentials: 'include',
      });
      
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || '更新狀態失敗');
      }

      // Update the local state immediately for better UX
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      // Alternatively, re-fetch all orders: await fetchOrders();

    } catch (e) {
        console.error("Failed to update order status:", e);
        setError(`更新訂單 ${orderId} 狀態失敗: ${e.message}`);
        // Optional: Revert local state change if API call failed (more complex)
    }
    setUpdatingStatus(null); // Clear loading indicator for this row
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('zh-TW', options);
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('zh-TW', options);
  };

  if (loading) {
    return <div className={styles.container}><p className={styles.loadingText}>正在載入訂單...</p></div>;
  }

  // Display general error first
  if (error && !updatingStatus) { // Only show general error if not specific update error
    return <div className={styles.container}><p className={styles.errorText}>錯誤: {error}</p></div>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>訂單管理 - 廣翊輪胎行</title>
        <meta name="robots" content="noindex, nofollow" /> {/* Prevent search engines from indexing */}
      </Head>

      <h1 className={styles.pageTitle}>訂單管理</h1>
      {/* Display update error specifically if it occurred */}
      {error && updatingStatus && (
          <p className={styles.errorTextInline}>更新訂單 {updatingStatus} 狀態時發生錯誤: {error}</p>
      )}

      {orders.length === 0 ? (
        <p>目前沒有任何訂單。</p>
      ) : (
        <div className={styles.tableScrollContainer}>
          <table className={styles.ordersTable}>
            <thead>
              <tr>
                <th>訂單提交日期</th>
                <th>姓名</th>
                <th>電話</th>
                <th>Email</th>
                <th>訂購品項</th>
                <th>規格</th>
                <th>數量</th>
                <th>車輛</th>
                <th>需安裝</th>
                <th>預約安裝日期</th>
                <th>預約時段</th>
                <th>狀態</th>
                <th>備註</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{formatDateTime(order.createdAt)}</td>
                  <td>{order.name}</td>
                  <td>{order.phone}</td>
                  <td>{order.email || '-'}</td>
                  <td>{order.tireBrandSeries || '-'}</td>
                  <td>{order.tireSpecs || '-'}</td>
                  <td>{order.quantity}</td>
                  <td>{`${order.carMake || ''} ${order.carModel || ''} (${order.carYear || 'N/A'})`}</td>
                  <td>{order.needsInstallation === 'yes' ? '是' : '否'}</td>
                  <td>{order.needsInstallation === 'yes' && order.appointmentDate ? formatDate(order.appointmentDate) : '-'}</td>
                  <td>{order.needsInstallation === 'yes' && order.appointmentTime ? order.appointmentTime : '-'}</td>
                  <td className={`${styles.statusCell} ${styles[`status${order.status.charAt(0).toUpperCase() + order.status.slice(1)}`]}`}>
                    <select 
                      value={order.status} 
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className={styles.statusSelect}
                      disabled={updatingStatus === order._id} // Disable while this specific order is updating
                    >
                      {orderStatuses.map(status => (
                        <option key={status} value={status}>
                          {statusLabels[status] || status} {/* Use label if available */}
                        </option>
                      ))}
                    </select>
                    {updatingStatus === order._id && <span className={styles.loadingSpinner}></span>} {/* Show spinner */} 
                  </td>
                  <td className={styles.notesCell}>{order.notes || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className={styles.backLinkContainer}>
        <Link href="/" className={styles.backLink}>返回首頁</Link>
      </div>
    </div>
  );
};

export default AdminOrdersPage; 