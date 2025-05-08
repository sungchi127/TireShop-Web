import Layout from '../components/Layout';
import '../styles/globals.css';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const incrementVisit = async () => {
      if (!apiBaseUrl) return;
      try {
        if (typeof window !== 'undefined') {
          await fetch(`${apiBaseUrl}/api/visits`, { method: 'POST' });
        }
      } catch (error) {
        console.error('Error incrementing visit count in _app.js:', error);
      }
    };

    incrementVisit();
  }, [apiBaseUrl]);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp; 