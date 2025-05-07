import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.heroContainer}>
      <Head>
        <title>廣翊輪胎行 - 專業輪胎與維修服務</title>
        <meta name="description" content="廣翊輪胎行提供專業的普利司通輪胎訂購、安裝及全面的汽車維修保養服務。" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.heroContent}>
        <h1 className={styles.heroTitle}>廣翊輪胎行</h1>
        <p className={styles.heroSubtitle}>
          您的專業輪胎夥伴，提供普利司通輪胎及全方位汽車保養維修服務
        </p>
        <div className={styles.heroActions}>
          <Link href="/find-tires" className={styles.heroButtonPrimary}>
            尋找合適輪胎
          </Link>
          <Link href="/repair-services" className={styles.heroButtonSecondary}>
            查看維修項目
          </Link>
        </div>
      </main>
      {/* 您可以在此處下方添加其他首頁區塊，例如： */}
      {/* <section className={styles.featuredServices}> ... </section> */}
    </div>
  );
} 