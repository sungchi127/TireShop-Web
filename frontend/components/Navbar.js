import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && navRef.current && !navRef.current.contains(event.target)) {
        const hamburgerElement = navRef.current.querySelector(`.${styles.hamburger}`);
        if (hamburgerElement && !hamburgerElement.contains(event.target)) {
          setMenuOpen(false);
        }
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <nav className={styles.navbar} ref={navRef}>
      <div className={styles.logoContainer}>
        <Link href="/" className={styles.logoImageLink}>
          <Image 
            src="/images/bridgestone_logo.jpg"
            alt="Bridgestone Logo"
            width={120}
            height={40}
            className={styles.siteLogoImage}
            priority
          />
        </Link>
        <Link href="/" className={styles.siteTitleLink}>
          <span className={styles.siteTitle}>廣翊輪胎館</span>
        </Link>
      </div>
      <div className={styles.hamburger} onClick={toggleMenu}>
        <div className={menuOpen ? styles.line1Open : styles.line1}></div>
        <div className={menuOpen ? styles.line2Open : styles.line2}></div>
        <div className={menuOpen ? styles.line3Open : styles.line3}></div>
      </div>
      <ul className={`${styles.navLinks} ${menuOpen ? styles.navLinksOpen : ''}`}>
        <li><Link href="/find-tires" onClick={menuOpen ? toggleMenu : undefined}>尋找輪胎</Link></li>
        <li><Link href="/tire-order" onClick={menuOpen ? toggleMenu : undefined}>輪胎訂購</Link></li>
        <li><Link href="/tire-series" onClick={menuOpen ? toggleMenu : undefined}>輪胎系列</Link></li>
        {/* <li><Link href="/promotions" onClick={menuOpen ? toggleMenu : undefined}>最新促銷</Link></li> */}
        <li><Link href="/tire-knowledge" onClick={menuOpen ? toggleMenu : undefined}>輪胎知識</Link></li>
        <li><Link href="/repair-services" onClick={menuOpen ? toggleMenu : undefined}>維修價目表</Link></li>
        <li><Link href="/about" onClick={menuOpen ? toggleMenu : undefined}>關於我們</Link></li>
        {/* TODO: Add Cart and Login/Profile links later */}
        {/* Admin Link - consider conditional rendering for production */}
        {/* <li><Link href="/admin/orders" onClick={menuOpen ? toggleMenu : undefined} style={{ color: '#ffc107' }}>訂單管理(Admin)</Link></li> */}
      </ul>
      {/* TODO: Add a search bar later */}
    </nav>
  );
};

export default Navbar; 