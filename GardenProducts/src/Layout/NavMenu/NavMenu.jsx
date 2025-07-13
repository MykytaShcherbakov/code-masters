import styles from "./NavMenu.module.css"; // Импорт стилей
import { Link } from "react-router-dom";
const NavMenu = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <a href="/" className={styles.navLink}>
            Main Page
          </a>
        </li>
        <li className={styles.navItem}>
          <a href="/categories" className={styles.navLink}>
            Categories
          </a>
        </li>
        <li className={styles.navItem}>
          <a href="/products" className={styles.navLink}>
            All products
          </a>
        </li>
        <li className={styles.navItem}>
          <Link to="/discounted-items" className={styles.navLink}>
            All sales
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavMenu;