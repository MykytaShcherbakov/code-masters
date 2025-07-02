
import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./NavMenu.module.css";
import { useSelector } from "react-redux"; // Для night mode

const NavMenu = () => {
  const { nightMode } = useSelector((state) => state.theme);
  const location = useLocation();

  return (
    <nav className={`${styles.nav} ${nightMode ? styles.night_mode : ""}`}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link to="/" className={`${styles.navLink} ${location.pathname === "/" ? styles.navLinkActive : ""}`}>Main Page</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/categories" className={`${styles.navLink} ${location.pathname === "/categories" ? styles.navLinkActive : ""}`}>Categories</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/products" className={`${styles.navLink} ${location.pathname === "/products" ? styles.navLinkActive : ""}`}>All products</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/sales" className={`${styles.navLink} ${location.pathname === "/sales" ? styles.navLinkActive : ""}`}>All sales</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavMenu;
