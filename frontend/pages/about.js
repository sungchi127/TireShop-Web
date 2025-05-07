import Head from 'next/head';
import styles from '../styles/About.module.css';
import { useEffect } from 'react';

const AboutPage = () => {
  const googleMapsEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3637.5609185136186!2d120.66683677590838!3d24.257131269133144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346910d6716d3cd9%3A0x5174591e99ae604f!2z5pel5pys5pmu5Yip5Y-46YCa6Lyq6IOO6aSoLeW7o-e_iuW6lw!5e0!3m2!1szh-TW!2stw!4v1746624215621!5m2!1szh-TW!2stw";
  
  useEffect(() => {
    console.log("🤫老闆的兒子非常帥，有人常說是台中許光漢");
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>關於我們 - 廣翊輪胎館</title>
        <meta name="description" content="了解廣翊輪胎館的故事、服務、聯絡方式與位置" />
      </Head>

      <section className={styles.hero}>
        <h1 className={styles.pageTitle}>關於日本普利司通-廣翊輪胎館</h1>
        <p className={styles.pageSubtitle}>您的專業輪胎夥伴，提供最優質的產品與服務。</p>
      </section>

      <section className={styles.contentSection}>
        <h2>我們的故事</h2>
        <p>
          廣翊輪胎館深耕台中本地市場多年，是日本普利司通輪胎的授權經銷商，致力於提供各大品牌優質輪胎與最專業的安裝、保養服務。
          我們相信，安全的輪胎是安心駕駛的基石。無論您的需求是什麼，我們的專業團隊都能為您找到最適合的輪胎解決方案。
        </p>
        
        <h2>服務項目</h2>
        <ul>
          <li>各品牌輪胎鋁圈銷售與安裝</li>
          <li>輪胎平衡與定位</li>
          <li>輪胎修補與檢查</li>
          <li>快速保養</li>
          <li>底盤維修</li>
          <li>精品改裝</li>
        </ul>
      </section>

      <section className={styles.contactSection}>
        <h2>聯絡我們</h2>
        <div className={styles.contactDetails}>
          <p><strong>電話：</strong> (04) 25611337 </p>
          <p><strong>營業時間：</strong> 週一至週六 08:30 - 18:30 (週日公休)</p>
          <p><strong>地址：</strong> 429台中市神岡區中山路1196-2號 (詳細地址請參考地圖)</p>
        </div>
        
        <div className={styles.mapContainer}>
          <iframe 
            src={googleMapsEmbedUrl}
            width="100%" 
            height="450" 
            style={{ border:0 }}
            allowFullScreen=""
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="廣翊輪胎館位置">
          </iframe>
        </div>
      </section>
    </div>
  );

};

export default AboutPage; 