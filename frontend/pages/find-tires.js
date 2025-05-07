import Head from 'next/head';
import styles from '../styles/FindTires.module.css'; // Corrected path

const FindTiresPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>尋找輪胎 - 廣翊輪胎館</title>
        <meta name="description" content="依車輛、輪胎規格或品牌搜尋普利司通輪胎" />
      </Head>

      <section className={styles.hero}>
        <h1>尋找最適合您的普利司通輪胎</h1>
        <p>您可以透過多種方式搜尋，找到完美符合您需求的輪胎。</p>
      </section>

      <section className={styles.searchOptions}>
        <div className={styles.searchOption}>
          <h2>依車輛搜尋</h2>
          {/* TODO: Add vehicle search form inputs here */}
          <p>輸入您的車輛年份、廠牌、車系、車款...</p>
          <button className={styles.searchButton} type="button">搜尋車輛</button>
        </div>

        <div className={styles.searchOption}>
          <h2>依輪胎規格搜尋</h2>
          {/* TODO: Add tire specification form inputs here */}
          <p>輸入胎面寬度、扁平比、輪圈直徑...</p>
          <button className={styles.searchButton} type="button">搜尋規格</button>
        </div>

        {/* Add other search options like by tire name/model if needed */}
      </section>

      {/* TODO: Display search results section */}
    </div>
  );
};

export default FindTiresPage; 