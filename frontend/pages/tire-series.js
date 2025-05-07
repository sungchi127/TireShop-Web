import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/TireSeries.module.css';

const tireSeriesData = [
  { 
    name: 'Potenza', 
    description: '極致駕馭的性能胎款，專為追求操控樂趣的您設計。', 
    slogan: '極致駕馭', 
    image: '/images/potenza.jpeg', 
    link: 'https://www.bridgestone.com.tw/zh/tire-brand/potenza' 
  },
  { 
    name: 'Turanza', 
    description: '提供奢華舒適的駕乘體驗，適合長途旅行與日常通勤。', 
    slogan: '奢華舒適', 
    image: '/images/turanza.jpeg', 
    link: 'https://www.bridgestone.com.tw/zh/tire-brand/turanza' 
  },
  { 
    name: 'Alenza', 
    description: '專為都會頂級SUV打造，兼顧操控性與舒適性。', 
    slogan: '都會頂級SUV', 
    image: '/images/alenza.jpeg', 
    link: 'https://www.bridgestone.com.tw/zh/tire-brand/alenza' 
  },
  { 
    name: 'Ecopia', 
    description: '節能環保的王者，有效降低油耗並提升續航里程。', 
    slogan: '節能王者', 
    image: '/images/ecopia.jpeg', 
    link: 'https://www.bridgestone.com.tw/zh/tire-brand/ecopia' 
  },
  { 
    name: 'Dueler', 
    description: '專為SUV設計，提供卓越的越野性能與耐用性。', 
    slogan: 'SUV專用', 
    image: '/images/dueler.jpeg', 
    link: 'https://www.bridgestone.com.tw/zh/tire-brand/dueler' 
  },
  // { name: 'Playz', description: '讓駕駛更輕鬆，減輕行車時的疲勞感，提供安心舒適的駕駛體驗。', slogan: '輕鬆駕駛 不累', image: '/images/playz.jpeg' },
  // {
  //   name: 'DriveGuard',
  //   description: '普利司通失壓續跑技術輪胎，專為能夠承受爆胎並讓您繼續行駛而設計。其強化支撐的胎邊能在時速80公里下，確保您長達80公里的行動力。',
  //   slogan: '失壓續跑 安心隨行',
  //   image: '/images/driveguard.jpeg'
  // },
];

const TireSeriesPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>輪胎系列 - 廣翊輪胎館</title>
        <meta name="description" content="探索普利司通各系列輪胎：Potenza, Turanza, Alenza, Ecopia, Dueler, Playz, DriveGuard" />
      </Head>

      <h1 className={styles.pageTitle}>探索我們的輪胎系列</h1>
      <p className={styles.pageSubtitle}>每一款普利司通輪胎系列，都為滿足您的特定駕駛需求而生。</p>

      <div className={styles.seriesGrid}>
        {tireSeriesData.map((series) => (
          <div key={series.name} className={styles.seriesCard}>
            <div className={styles.seriesImageContainer}>
              <Image 
                src={series.image} 
                alt={`${series.name} 輪胎圖片`} 
                width={350}
                height={200}
                className={styles.seriesImage}
                layout="responsive"
              />
            </div>
            <h2 className={styles.seriesName}>{series.name}</h2>
            <p className={styles.seriesSlogan}>{series.slogan}</p>
            <p className={styles.seriesDescription}>{series.description}</p>
            {series.link ? (
              <a 
                href={series.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.viewButton}
              >
                查看 {series.name} 系列
              </a>
            ) : (
              <button className={styles.viewButton} type="button">查看 {series.name} 系列</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TireSeriesPage; 