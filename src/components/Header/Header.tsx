import styles from './Header.module.css';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          <Image 
            src="/images/logo.png"
            alt="SARE Logo"
            width={150}
            height={50}
            priority
            className={styles.responsiveLogo}
          />
        </div>
        <div className={styles.buttonContainer}>
          <Link href="/login">
            <button className={styles.loginButton}>
              Login
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;