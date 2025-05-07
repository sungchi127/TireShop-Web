import Layout from '../components/Layout';
import '../styles/globals.css';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const incrementVisit = async () => {
      try {
        if (typeof window !== 'undefined') {
          await fetch('http://localhost:3001/api/visits', { method: 'POST' });
        }
      } catch (error) {
        console.error('Error incrementing visit count in _app.js:', error);
      }
    };

    incrementVisit();
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp; 