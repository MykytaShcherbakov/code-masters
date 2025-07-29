import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./NavMenu.module.css";

const NavMenu = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link to="/" className={styles.navLink}>Main Page</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/categories" className={styles.navLink}>Categories</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/products" className={styles.navLink}>All products</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/discounted-items" className={styles.navLink}>All sales</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavMenu;
