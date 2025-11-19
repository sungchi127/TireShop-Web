import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from '../styles/Home.module.css';

export default function Home() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>廣翊輪胎館 - 專業輪胎與維修服務</title>
        <meta name="description" content="廣翊輪胎行提供專業的普利司通輪胎訂購、安裝及全面的汽車維修保養服務。" />
      </Head>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroOverlay}></div>
        <motion.div 
          className={styles.heroContent}
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1 className={styles.heroTitle} variants={fadeInUp}>
            廣翊輪胎館
          </motion.h1>
          <motion.p className={styles.heroSubtitle} variants={fadeInUp}>
            您的行車安全，我們的專業承諾
          </motion.p>
          <motion.div className={styles.heroActions} variants={fadeInUp}>
            <Link href="/find-tires" className={styles.btnPrimary}>
              尋找愛車輪胎
            </Link>
            <Link href="/repair-services" className={styles.btnSecondary}>
              預約維修保養
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className={styles.section}>
        <motion.div 
          className={styles.sectionContent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.h2 className={styles.sectionTitle} variants={fadeInUp}>專業服務項目</motion.h2>
          <div className={styles.servicesGrid}>
            <motion.div className={styles.serviceCard} variants={fadeInUp}>
              <div className={styles.serviceIcon}>🔧</div>
              <h3>輪胎更換</h3>
              <p>專業設備拆裝，確保輪胎與輪框完美貼合，行駛更平穩。</p>
            </motion.div>
            <motion.div className={styles.serviceCard} variants={fadeInUp}>
              <div className={styles.serviceIcon}>⚖️</div>
              <h3>四輪定位</h3>
              <p>精準雷射定位，解決吃胎、偏移問題，延長輪胎壽命。</p>
            </motion.div>
            <motion.div className={styles.serviceCard} variants={fadeInUp}>
              <div className={styles.serviceIcon}>🔋</div>
              <h3>電瓶更換</h3>
              <p>檢測與更換各大品牌汽車電瓶，確保愛車隨時電力充沛。</p>
            </motion.div>
            <motion.div className={styles.serviceCard} variants={fadeInUp}>
              <div className={styles.serviceIcon}>🛢️</div>
              <h3>快速保養</h3>
              <p>機油更換、濾網清潔，定期保養讓引擎維持最佳狀態。</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Promotions Section */}
      <section className={`${styles.section} ${styles.sectionDark}`}>
        <motion.div 
          className={styles.sectionContent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <h2 className={styles.sectionTitle}>本月精選優惠</h2>
          <div className={styles.promotionBanner}>
            <div className={styles.promoText}>
              <h3>普利司通輪胎 全系列特價中</h3>
              <p>換四條輪胎即贈送精美禮品，數量有限送完為止！</p>
              <Link href="/promotions" className={styles.btnPrimary}>
                查看更多優惠
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* About / Trust Section */}
      <section className={styles.section}>
        <motion.div 
          className={styles.sectionContent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.h2 className={styles.sectionTitle} variants={fadeInUp}>為什麼選擇廣翊？</motion.h2>
          <div className={styles.featuresGrid}>
            <motion.div className={styles.featureItem} variants={fadeInUp}>
              <h3>20年經驗</h3>
              <p>在地深耕多年，累積豐富維修經驗，值得您信賴。</p>
            </motion.div>
            <motion.div className={styles.featureItem} variants={fadeInUp}>
              <h3>透明價格</h3>
              <p>所有服務與零件價格公開透明，絕無隱形消費。</p>
            </motion.div>
            <motion.div className={styles.featureItem} variants={fadeInUp}>
              <h3>原廠品質</h3>
              <p>堅持使用原廠或高品質認證零件，保障行車安全。</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className={`${styles.section} ${styles.sectionDark}`}>
        <motion.div 
          className={styles.sectionContent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <h2 className={styles.sectionTitle}>聯絡我們</h2>
          <div className={styles.contactContainer}>
            <div className={styles.contactInfo}>
              <p><strong>地址：</strong> 台中市神岡區中山路1196-2號</p>
              <p><strong>電話：</strong> (04)26511337</p>
              <p><strong>營業時間：</strong> 週一至週六 08:30 - 19:00</p>
              <Link href="https://maps.google.com" target="_blank" className={styles.btnSecondary}>
                開啟 Google 地圖導航
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}