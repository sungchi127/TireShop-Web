import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/TireOrder.module.css';
import Link from 'next/link';

const TireOrderPage = () => {
  // 1. 讀取環境變數並轉換為布林值
  //    如果環境變數未設定，預設為 false (禁用)
  const isOrderFormEnabled = process.env.NEXT_PUBLIC_ORDER_FORM_ENABLED === 'true';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    tireBrandSeries: '',
    tireSpecs: '',
    quantity: 1,
    carMake: '',
    carModel: '',
    carYear: '',
    needsInstallation: 'no', // 'yes' or 'no'
    appointmentDate: '',
    appointmentTime: '', // Will store the start time string
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // For loading state
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or 'info'
  const [submitMessage, setSubmitMessage] = useState('');
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Available start times - you can customize these
  const availableTimes = [
    "08:30", "09:00", "09:30", "10:00", "10:30", "11:00",
    "13:30", "14:00", "14:30", "15:00", "15:30", "16:00",
    "16:30", "17:00", "17:30", "18:00",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? (checked ? 'yes' : 'no') : value // Adjusted for radio/checkbox if needed, here for text/select
    }));
  };
  
  // Special handler for radio buttons for needsInstallation
  const handleInstallationChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      needsInstallation: e.target.value,
      // Reset date and time if installation is not needed
      appointmentDate: e.target.value === 'no' ? '' : prevData.appointmentDate,
      appointmentTime: e.target.value === 'no' ? '' : prevData.appointmentTime,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 2. 檢查表單是否啟用
    if (!isOrderFormEnabled) {
      // 如果未啟用，顯示提示並阻止提交
      setSubmitStatus('info');
      setSubmitMessage('提醒您，線上訂購功能目前暫未開放。如需訂購，請撥打電話：04-25611337。感謝您的理解！');
      setIsSubmitting(false);
      return;
    }

    // --- (如果表單啟用，則執行原有的提交邏輯) ---
    if (!apiBaseUrl) {
       setSubmitStatus('error');
       setSubmitMessage('API 服務目前無法使用，請稍後再試。');
       setIsSubmitting(false);
       return;
    }
    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage('');

    // Basic validation for appointmentDate if installation is needed
    if (formData.needsInstallation === 'yes' && !formData.appointmentDate) {
        setSubmitStatus('error');
        setSubmitMessage('如果您需要安裝服務，請選擇期望的預約安裝日期。');
        setIsSubmitting(false);
        return;
    }
    if (formData.needsInstallation === 'yes' && !formData.appointmentTime) {
        setSubmitStatus('error');
        setSubmitMessage('如果您需要安裝服務，請選擇期望的預約安裝時段。');
        setIsSubmitting(false);
        return;
    }

    // Clean up appointmentDate if installation is not needed
    const payload = {
        ...formData,
        appointmentDate: formData.needsInstallation === 'yes' ? formData.appointmentDate : null,
        appointmentTime: formData.needsInstallation === 'yes' ? formData.appointmentTime : null,
    };
    
    // Ensure quantity is a number
    payload.quantity = Number(payload.quantity);

    try {
      const response = await fetch(`${apiBaseUrl}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage(result.message || '訂單請求已成功提交！我們將盡快與您聯繫。');
        // Reset form
        setFormData({
          name: '',
          phone: '',
          email: '',
          tireBrandSeries: '',
          tireSpecs: '',
          quantity: 1,
          carMake: '',
          carModel: '',
          carYear: '',
          needsInstallation: 'no',
          appointmentDate: '',
          appointmentTime: '',
          notes: ''
        });
      } else {
        setSubmitStatus('error');
        setSubmitMessage(result.message || '提交訂單時發生錯誤，請稍後再試或直接與我們聯繫。');
        if (result.errors) {
          console.error('Validation errors:', result.errors);
          // You could display these errors more specifically if desired
          setSubmitMessage(`提交失敗：${result.errors.join(', ')}`)
        }
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      setSubmitStatus('error');
      setSubmitMessage('提交訂單時發生網路錯誤，請檢查您的網路連線或稍後再試。');
    }
    setIsSubmitting(false);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>輪胎訂購 - 廣翊輪胎館 {isOrderFormEnabled ? '' : '(暫停服務)'}</title>
        <meta name="description" content={`輪胎訂購服務。${isOrderFormEnabled ? '立即填寫表單預訂。' : '請注意：線上訂購功能暫未開放，請透過電話聯繫。'}`} />
      </Head>

      <h1 className={styles.pageTitle}>輪胎訂購表單</h1>
      <p className={styles.pageSubtitle}>請填寫以下資訊，我們收到後會盡快與您聯繫確認訂單詳情與後續事宜。</p>

      {/* 4. 條件性顯示「功能未開放」的提示 */}
      {!isOrderFormEnabled && (
        <div className={styles.serviceNotice}>
          <p><strong>重要提示：</strong></p>
          <p>親愛的顧客您好，本網站的「線上輪胎訂購」功能目前暫未正式開放。</p>
          <p>若您需要訂購輪胎或有任何疑問，請直接撥打我們的服務專線：</p>
          <p className={styles.noticePhoneNumber}>04-25611337</p>
          <p>我們將有專人為您服務，感謝您的理解與支持！</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className={`${styles.orderForm} ${!isOrderFormEnabled ? styles.formDisabledVisuals : ''}`}>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>客戶基本資料</legend>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>姓名 <span className={styles.required}>*</span></label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={styles.input} required disabled={!isOrderFormEnabled} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.label}>聯絡電話 <span className={styles.required}>*</span></label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className={styles.input} required disabled={!isOrderFormEnabled} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>電子郵件</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={styles.input} disabled={!isOrderFormEnabled} />
          </div>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>輪胎訂購資訊</legend>
          <div className={styles.formGroup}>
            <label htmlFor="tireBrandSeries" className={styles.label}>輪胎品牌/系列</label>
            <input type="text" id="tireBrandSeries" name="tireBrandSeries" value={formData.tireBrandSeries} onChange={handleChange} className={styles.input} placeholder="例如：普利司通 Potenza S007A" disabled={!isOrderFormEnabled} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="tireSpecs" className={styles.label}>輪胎規格</label>
            <input type="text" id="tireSpecs" name="tireSpecs" value={formData.tireSpecs} onChange={handleChange} className={styles.input} placeholder="例如：225/45R18 (若不確定可留空)" disabled={!isOrderFormEnabled} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="quantity" className={styles.label}>數量 <span className={styles.required}>*</span></label>
            <input type="number" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} className={styles.input} min="1" required disabled={!isOrderFormEnabled} />
          </div>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>車輛資訊</legend>
          <div className={styles.formGroup}>
            <label htmlFor="carMake" className={styles.label}>車輛廠牌<span className={styles.required}>*</span></label>
            <input type="text" id="carMake" name="carMake" value={formData.carMake} onChange={handleChange} className={styles.input} placeholder="例如：Toyota" disabled={!isOrderFormEnabled} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="carModel" className={styles.label}>車輛型號<span className={styles.required}>*</span></label>
            <input type="text" id="carModel" name="carModel" value={formData.carModel} onChange={handleChange} className={styles.input} placeholder="例如：Corolla Altis" disabled={!isOrderFormEnabled} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="carYear" className={styles.label}>車輛年份</label>
            <input type="text" id="carYear" name="carYear" value={formData.carYear} onChange={handleChange} className={styles.input} placeholder="例如：2020" disabled={!isOrderFormEnabled} />
          </div>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>安裝服務</legend>
          <div className={styles.formGroup}>
            <p className={styles.label}>是否需要安裝服務？</p>
            <div className={styles.radioGroup}>
              <label className={styles.radioLabel}>
                <input type="radio" name="needsInstallation" value="yes" checked={formData.needsInstallation === 'yes'} onChange={handleInstallationChange} disabled={!isOrderFormEnabled} /> 是
              </label>
              <label className={styles.radioLabel}>
                <input type="radio" name="needsInstallation" value="no" checked={formData.needsInstallation === 'no'} onChange={handleInstallationChange} disabled={!isOrderFormEnabled} /> 否
              </label>
            </div>
          </div>
          {formData.needsInstallation === 'yes' && (
            <>
              <div className={styles.formGroup}>
                <label htmlFor="appointmentDate" className={styles.label}>期望預約安裝日期</label>
                <input type="date" id="appointmentDate" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} className={styles.input} disabled={!isOrderFormEnabled} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="appointmentTime" className={styles.label}>期望預約安裝開始時間</label>
                <select 
                  id="appointmentTime" 
                  name="appointmentTime" 
                  value={formData.appointmentTime} 
                  onChange={handleChange} 
                  className={styles.input} 
                  disabled={!isOrderFormEnabled}
                >
                  <option value="">請選擇開始時間</option>
                  {availableTimes.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </>
          )}
        </fieldset>
        
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>其他備註</legend>
          <div className={styles.formGroup}>
            <label htmlFor="notes" className={styles.label}>特殊需求或訊息</label>
            <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} className={styles.textarea} rows="4" placeholder="例如：是否有現貨？大概多久可以調到貨？" disabled={!isOrderFormEnabled}></textarea>
          </div>
        </fieldset>

        {submitStatus && submitStatus !== 'info' && (
            <div className={`${styles.submitMessage} ${submitStatus === 'success' ? styles.successMessage : styles.errorMessage}`}>
                {submitMessage}
            </div>
        )}

        <div className={styles.formActions}>
          <button type="submit" className={styles.submitButton} disabled={!isOrderFormEnabled || isSubmitting}>
            {isSubmitting ? '提交中...' : (isOrderFormEnabled ? '提交訂購請求' : '線上訂購 (暫未開放)')}
          </button>
        </div>
        <p className={styles.formFooterText}>
          {isOrderFormEnabled
            ? '提交後，我們會盡快透過電話與您確認訂單詳情，包括最終價格、庫存狀態與付款方式。'
            : '線上訂購暫停服務期間，'}
          您也可以直接 <Link href="/about" className={styles.contactLink}>聯絡我們</Link>。
        </p>
      </form>
    </div>
  );
};

export default TireOrderPage; 