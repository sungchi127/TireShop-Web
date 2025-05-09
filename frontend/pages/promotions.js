import Head from 'next/head';
import Link from 'next/link'; // Import Link component
// import Image from 'next/image'; // Image component is no longer needed
import styles from '../styles/Promotions.module.css';

const promotionsData = [
  {
    id: 'PSR17005',
    name: '普利司通 225/60 R18 ALENZA H/L 33 100V 日本',
    tirePrice: 3850,
    tireSizeInch: 18,
    // installationCost: 400, // Removed, will be looked up
  },
  {
    id: 'PSRFB03',
    name: '普利司通 225/60 R18 ALENZA LX100 100H 台灣',
    tirePrice: 3810,
    tireSizeInch: 18,
    // image: '/images/promos/alenza_lx100_placeholder.png', // Removed
  },
  {
    id: 'PSRF829',
    name: '普利司通 225/60 R18 HL422+ 100H 台灣',
    tirePrice: 3530,
    tireSizeInch: 18,
    // image: '/images/promos/hl422plus_placeholder.png', // Removed
  },
  {
    id: 'PSR0FA48',
    name: '普利司通 235/60 R18 ALENZA 001 107W 台灣',
    tirePrice: 3760,
    tireSizeInch: 18,
    // image: '/images/promos/alenza_001_placeholder.png', // Removed
  },
  {
    id: 'PSRFB02',
    name: '普利司通 235/60 R18 ALENZA LX100 103H 台灣',
    tirePrice: 3810,
    tireSizeInch: 18,
    // image: '/images/promos/alenza_lx100_235_placeholder.png', // Removed
  },
  {
    id: 'PSRF914',
    name: '普利司通 235/60 R18 D33 103H 台灣',
    tirePrice: 3430,
    tireSizeInch: 18,
    // image: '/images/promos/d33_placeholder.png', // Removed
  },
  {
    id: 'PSR0FA40',
    name: '普利司通 215/55 R17 T005A 094W 台灣',
    tirePrice: 3550,
    tireSizeInch: 17,
  },
  {
    id: 'PSR0FA76',
    name: '普利司通 215/55 R17 TURANZA 6 094W 台灣',
    tirePrice: 3400,
    tireSizeInch: 17,
  },
  {
    id: 'PSR0F830',
    name: '普利司通 215/55 R17 EP150 098V 台灣',
    tirePrice: 3170,
    tireSizeInch: 17,
  },
  {
    id: 'PSR0F781',
    name: '普利司通 215/55 R17 ER33 094V 台灣',
    tirePrice: 3010,
    tireSizeInch: 17,
  },
  {
    id: 'PSR0FA26',
    name: '普利司通 215/60 R17 ALENZA 001 096H 台灣',
    tirePrice: 3090,
    tireSizeInch: 17,
  },
  {
    id: 'PSR0NJB6',
    name: '普利司通 215/60 R17 TURANZA 6 100H 印尼',
    tirePrice: 3420,
    tireSizeInch: 17,
  },
];

const installationCostsInfo = [
  { sizeRange: '14-16吋', cost: 300, minSize: 14, maxSize: 16 },
  { sizeRange: '17-18吋', cost: 400, minSize: 17, maxSize: 18 },
  { sizeRange: '19-20吋', cost: 500, minSize: 19, maxSize: 20 },
];

const SHIPPING_COST_PER_TIRE = 100;
const GOOGLE_FORM_URL = 'https://forms.gle/TMTbcoKFRg4FZmM58';

const PromotionsPage = () => {
  const getInstallationCost = (tireSizeInch) => {
    const foundCostInfo = installationCostsInfo.find(
      (info) => tireSizeInch >= info.minSize && tireSizeInch <= info.maxSize
    );
    return foundCostInfo ? foundCostInfo.cost : 0; // Default to 0 if not found, though should always be found for these items
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>輪胎促銷活動 - 廣翊輪胎館</title>
        <meta name="description" content="查看廣翊輪胎館最新的輪胎促銷活動與特別優惠" />
      </Head>

      <h1 className={styles.pageTitle}>輪胎限時促銷</h1>
      <p className={styles.pageSubtitle}>把握優惠，為您的愛車換上最合適的新鞋！</p>

      <div className={styles.installationInfoSection}>
        <h2 className={styles.subHeading}>服務選項說明</h2>
        <div className={styles.serviceOptionGlobalContainer}>
          <div className={styles.serviceOptionGlobal}>
            <h3 className={styles.serviceOptionTitle}>現場安裝</h3>
            <p>包含輪胎拆裝及平衡，工資如下：</p>
            <ul className={styles.installationListSmall}>
              {installationCostsInfo.map((item) => (
                <li key={item.sizeRange}>
                  {item.sizeRange}: <span className={styles.costHighlight}>{item.cost}元/條</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.serviceOptionGlobal}>
            <h3 className={styles.serviceOptionTitle}>寄送到府</h3>
            <p>
              運費：<span className={styles.costHighlight}>{SHIPPING_COST_PER_TIRE}元/條</span>
            </p>
            <p className={styles.infoNoteSmall}>(價格不含安裝)</p>
          </div>
        </div>
      </div>

      <div className={styles.promotionsGrid}>
        {promotionsData.map((promo) => {
          const installCost = getInstallationCost(promo.tireSizeInch);
          const installedPrice = promo.tirePrice + installCost;
          const shippedPrice = promo.tirePrice + SHIPPING_COST_PER_TIRE;

          return (
            <div key={promo.id} className={styles.promoCard}>
              {/* Image container removed */}
              {/* <div className={styles.promoImageContainer}> ... </div> */}
              <div className={styles.promoContent}>
                <h3 className={styles.promoName}>{promo.name}</h3>
                <p className={styles.promoTirePrice}>
                  輪胎優惠價： <span className={styles.priceValue}>{promo.tirePrice}元/條</span>
                </p>

                <div className={styles.serviceOptionsContainer}>
                  <div className={styles.serviceOptionCard}>
                    <h4 className={styles.serviceOptionCardTitle}>選擇一：現場安裝</h4>
                    <p className={styles.serviceDetail}>
                      安裝費 ({promo.tireSizeInch}吋)： <span className={styles.costHighlightSm}>{installCost}元/條</span>
                    </p>
                    <p className={styles.totalEstimate}>
                      完工總價 (1條)： <span className={styles.totalPriceValue}>{installedPrice}元</span>
                    </p>
                  </div>

                  <div className={styles.serviceOptionCard}>
                    <h4 className={styles.serviceOptionCardTitle}>選擇二：寄送到府</h4>
                    <p className={styles.serviceDetail}>
                      運費： <span className={styles.costHighlightSm}>{SHIPPING_COST_PER_TIRE}元/條</span>
                    </p>
                    <p className={styles.totalEstimate}>
                      寄送總價 (1條)： <span className={styles.totalPriceValue}>{shippedPrice}元</span>
                    </p>
                  </div>
                </div>
                
                <Link href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer" className={styles.orderButton}>
                  立即訂購 (前往表單)
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      <p className={styles.footerNote}>
        **所有優惠價格與內容以現場報價為準，本公司保留活動修改及終止之權利。**
      </p>
    </div>
  );
};

export default PromotionsPage; 