import Navbar from './Navbar';
import styles from '../styles/Layout.module.css'; // 我們稍後會建立這個 CSS Module

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className={styles.mainContent}>{children}</main>
      <footer className={styles.footer}>
        <p>廣翊輪胎行 &copy; 2025</p>
      </footer>
    </>
  );
};

export default Layout; 