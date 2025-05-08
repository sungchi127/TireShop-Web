import Head from 'next/head';
import Navbar from './Navbar';
import styles from '../styles/Layout.module.css'; // 我們稍後會建立這個 CSS Module
import { useState, useEffect } from 'react'; // Import useState and useEffect

const Layout = ({ children }) => {
  // 修改 visitorCounts 狀態以儲存多個計數
  const [visitorCounts, setVisitorCounts] = useState({
    total: null,
    today: null,
    month: null
  });
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    // Function to fetch visit count
    const fetchVisitCount = async () => {
      if (!apiBaseUrl) {
        setVisitorCounts({ total: 'N/A', today: 'N/A', month: 'N/A' });
        return;
      }
      try {
        // Ensure this only runs on the client side
        if (typeof window !== 'undefined') {
          // We assume your backend is running on port 3001
          const response = await fetch(`${apiBaseUrl}/api/visits/count`);
          if (response.ok) {
            const data = await response.json();
            // 更新狀態以匹配 API 回應的結構
            setVisitorCounts({
              total: data.totalCount,
              today: data.todayCount,
              month: data.thisMonthCount
            });
          } else {
            console.error('Failed to fetch visit count in Layout.js:', response.status);
            setVisitorCounts({ total: 'N/A', today: 'N/A', month: 'N/A' });
          }
        }
      } catch (error) {
        console.error('Error fetching visit count in Layout.js:', error);
        setVisitorCounts({ total: 'N/A', today: 'N/A', month: 'N/A' });
      }
    };

    fetchVisitCount(); // Fetch count when component mounts

    // Optional: Set up an interval to refresh the count periodically if desired
    // const intervalId = setInterval(fetchVisitCount, 60000); // e.g., every 60 seconds
    // return () => clearInterval(intervalId); // Cleanup interval on component unmount

  }, [apiBaseUrl]); // 將 apiBaseUrl 加入依賴項陣列

  return (
    <>
      <Head>
        <title>廣翊輪胎館</title>
        <meta name="description" content="廣翊輪胎館提供專業的普利司通輪胎訂購、安裝及全面的汽車維修保養服務。" />
        <link rel="icon" href="/images/bridgestone_logo.jpg" />
      </Head>
      <Navbar />
      <main className={styles.mainContent}>{children}</main>
      <footer className={styles.footer}>
        <p>
          廣翊輪胎館 &copy; 2025 -
          本日訪客: {visitorCounts.today !== null ? visitorCounts.today : 'Loading...'} | 
          本月訪客: {visitorCounts.month !== null ? visitorCounts.month : 'Loading...'} | 
          訪客總數: {visitorCounts.total !== null ? visitorCounts.total : 'Loading...'}
        </p>
      </footer>
    </>
  );
};

export default Layout; 