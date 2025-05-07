import Head from 'next/head';
import styles from '../styles/Promotions.module.css';

const promotionsData = [
  {
    id: 1,
    title: '春季換胎大優惠！指定系列享8折！',
    description: '活動期間凡購買 Potenza 或 Turanza 系列輪胎，即可享有全面8折優惠，再送精美小禮品一份！',
    image: '/images/promo1-placeholder.jpg',
    validity: '即日起至 2024年5月31日',
    promoCode: 'SPRING20'
  },
  {
    id: 2,
    title: 'SUV安心行，Dueler系列輪胎保固升級！',
    description: '購買 Dueler 系列任兩條輪胎，即享免費輪胎保固升級，讓您的旅程更安心。',
    image: '/images/promo2-placeholder.jpg',
    validity: '即日起至 2024年6月30日',
    promoCode: null
  },
  {
    id: 3,
    title: '節能Ecopia，愛地球抽大獎！',
    description: '購買 Ecopia 系列輪胎，登錄發票即可參加環保電動車抽獎活動！',
    image: '/images/promo3-placeholder.jpg',
    validity: '2024年4月15日至2024年7月15日',
    promoCode: 'ECOLOVE'
  },
];

const PromotionsPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>最新促銷 - 廣翊輪胎行</title>
        <meta name="description" content="查看廣翊輪胎行的最新輪胎促銷活動與優惠" />
      </Head>

      <h1 className={styles.pageTitle}>最新促銷活動</h1>
      <p className={styles.pageSubtitle}>別錯過我們的精彩優惠，為您的愛車選擇最佳輪胎！</p>

      <div className={styles.promotionsGrid}>
        {promotionsData.map((promo) => (
          <div key={promo.id} className={styles.promoCard}>
            <div className={styles.promoImagePlaceholder}>促銷圖片</div>
            <div className={styles.promoContent}>
              <h2 className={styles.promoTitle}>{promo.title}</h2>
              <p className={styles.promoDescription}>{promo.description}</p>
              <p className={styles.promoValidity}><strong>活動期間：</strong>{promo.validity}</p>
              {promo.promoCode && <p className={styles.promoCode}><strong>優惠代碼：</strong>{promo.promoCode}</p>}
              <button className={styles.detailsButton} type="button">查看詳情</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromotionsPage; 