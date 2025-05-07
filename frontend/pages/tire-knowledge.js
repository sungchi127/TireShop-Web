import Head from 'next/head';
import styles from '../styles/PagePlaceholder.module.css';

const TireKnowledgePage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>輪胎知識 - 廣翊輪胎行</title>
        <meta name="description" content="了解更多關於輪胎的知識與保養技巧" />
      </Head>

      <h1 className={styles.title}>輪胎知識</h1>
      <p className={styles.comingSoon}>輪胎相關知識與技巧即將推出，敬請期待！</p>
      {/* TODO: Add content like articles on tire safety, maintenance, reading tire codes, etc. */}
    </div>
  );
};

export default TireKnowledgePage; 