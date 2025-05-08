import Head from 'next/head';
import styles from '../styles/RepairServices.module.css';

const servicesData = {
  leftColumn: [
    { name: '機油更換', price: '400' },
    { name: '變速箱油更換', price: '400' },
    { name: '煞車油更換', price: '600' },
    { name: '失壓續跑胎拆裝平衡工資', price: '600' },
    { name: '輪胎拆裝平衡(16吋以下)', price: '400' },
    { name: '輪胎拆裝平衡(17吋-19吋)', price: '400' },
    { name: '輪胎拆裝平衡(20吋以上)', price: '500' },
  ],
  rightColumn: [
    { name: '3D四輪定位', price: '500' }, // 注意：此價格根據圖片辨識，首位數字較模糊
    { name: '輪胎平衡', price: '400' },
    { name: '外出工資', price: '300' },
    { name: '香菇頭補胎', price: '400' },
    { name: '失壓續跑胎香菇頭補胎', price: '600' },
    { name: '補胎(內)', price: '200' },
    // { name: '項目七', price: '800' }, // 圖片中最後一項為空，價格800，暫不列出
  ]
};

const RepairServicesPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>維修價目表 - 廣翊輪胎館</title>
        <meta name="description" content="廣翊輪胎行維修服務項目與價格表" />
      </Head>

      <h1 className={styles.pageTitle}>維修價目表</h1>
      <p className={styles.pageSubtitle}>透明公開的價格，讓您安心選擇所需服務。</p>

      <p className={`${styles.notes} ${styles.notesMovedUp}`}> 
        * 以上價格僅供參考，實際費用可能因車型或特殊狀況而有所調整，詳情請洽現場服務人員。
      </p>

      <div className={styles.priceTable}>
        <div className={styles.column}>
          {servicesData.leftColumn.map((service, index) => (
            <div key={`left-${index}`} className={styles.serviceItem}>
              <span className={styles.serviceName}>{service.name}</span>
              <span className={styles.servicePrice}>{service.price}</span>
            </div>
          ))}
        </div>
        <div className={styles.column}>
          {servicesData.rightColumn.map((service, index) => (
            <div key={`right-${index}`} className={styles.serviceItem}>
              <span className={styles.serviceName}>{service.name}</span>
              <span className={styles.servicePrice}>{service.price}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RepairServicesPage; 