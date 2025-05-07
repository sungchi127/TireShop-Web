import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/AdminLogin.module.css';

const AdminLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });

      const result = await response.json();

      if (response.ok) {
        // Login successful, redirect to the orders page
        router.push('/admin/orders'); 
      } else {
        setError(result.message || '登入失敗，請檢查您的用戶名和密碼。');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('登入時發生錯誤，請稍後再試。');
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>管理員登入 - 廣翊輪胎行</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className={styles.loginBox}>
        <h1 className={styles.title}>管理員登入</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="username" className={styles.label}>用戶名:</label>
            <input 
              type="text" 
              id="username" 
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} 
              className={styles.input}
              required 
              disabled={isLoading}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>密碼:</label>
            <input 
              type="password" 
              id="password" 
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              className={styles.input}
              required 
              disabled={isLoading}
            />
          </div>
          {error && <p className={styles.errorMessage}>{error}</p>}
          <button type="submit" className={styles.submitButton} disabled={isLoading}>
            {isLoading ? '登入中...' : '登入'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage; 