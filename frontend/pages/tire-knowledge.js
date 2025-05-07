import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/TireKnowledge.module.css';

const knowledgeArticles = [
  {
    id: 1,
    title: '輪胎多久該換一次？影響輪胎壽命的因素大解析',
    summary: '輪胎是汽車安全行駛的關鍵組件，了解輪胎更換時機與影響其壽命的因素至關重要。本文將深入探討輪胎的使用年限、磨耗指標以及日常保養建議。',
    link: 'https://www.bridgestone.com.tw/zh/tyre-clinic/tyre-talk/tire-lifeline'
  },
  {
    id: 2,
    title: '補胎後輪胎還能用多久？一篇搞懂補胎方式與注意事項',
    summary: '當輪胎不幸遭受穿刺損傷時，補胎成為許多車主的首選。然而，補胎後的輪胎究竟可以使用多久？本文將深入探討影響因素，確保行車安全。',
    link: 'https://www.bridgestone.com.tw/zh/tyre-clinic/tyre-talk/tire-repair'
  },
  {
    id: 3,
    title: '輪胎橡膠材質有哪些？全面解析常見材質及其特性',
    summary: '輪胎補胎是確保行車安全的重要維護措施。選擇合適的補胎技術，能夠確保汽車輪胎補胎後的密封性與耐久度，延長輪胎的使用壽命。',
    link: 'https://www.bridgestone.com.tw/zh/tyre-clinic/tyre-talk/tire-rubber-material'
  },
  {
    id: 4,
    title: '輪胎磨平後還能使用嗎？專家建議與安全考量',
    summary: '輪胎是汽車與地面接觸的唯一部分，輪胎狀況會直接影響行車安全。了解輪胎磨平的原因、危險性能降低行車風險。',
    link: 'https://www.bridgestone.com.tw/zh/tyre-clinic/tyre-talk/flat-tire'
  },
  {
    id: 5,
    title: '靜音輪胎是什麼?如何提升駕駛舒適度與降噪效果一篇了解',
    summary: '道路行駛時的輪胎噪音是車輛噪音的主要來源，因此，靜音輪胎應運而生。讓我們深入了解靜音輪胎的特性與應用。',
    link: 'https://www.bridgestone.com.tw/zh/tyre-clinic/tyre-talk/silent-tires'
  },
  {
    id: 6,
    title: '輪胎的原料有哪些？介紹輪胎製作主要材料，讓你快速了解製造過程',
    summary: '輪胎的原料是決定輪胎性能與耐用度的關鍵因素。透過了解輪胎的原料有助於我們更深入認識輪胎的製造技術與品質標準。',
    link: 'https://www.bridgestone.com.tw/zh/tyre-clinic/tyre-talk/tire-materials'
  },
];

const TireKnowledgePage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>輪胎知識 - 廣翊輪胎館</title>
        <meta name="description" content="學習關於輪胎安全、保養、選擇等實用知識，成為更聰明的用路人。" />
      </Head>

      <h1 className={styles.pageTitle}>輪胎知識庫</h1>
      <p className={styles.pageSubtitle}>了解您的輪胎，讓每一次出行都安心。</p>

      <div className={styles.articlesGrid}>
        {knowledgeArticles.map((article) => (
          <div key={article.id} className={styles.articleCard}>
            <div className={styles.articleContent}>
              <h2 className={styles.articleTitle}>{article.title}</h2>
              <p className={styles.articleSummary}>{article.summary}</p>
              {article.link.startsWith('http') ? (
                <a 
                  href={article.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.readMoreLink}
                >
                  了解更多
                </a>
              ) : (
                <Link href={article.link} className={styles.readMoreLink}>
                   了解更多 
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TireKnowledgePage; 