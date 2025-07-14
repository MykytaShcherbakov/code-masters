import styles from "./NavMenu.module.css"; 

const NavMenu = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.navItem}><a href="/" className={styles.navLink}>Main Page</a></li>
        <li className={styles.navItem}><a href="/categories" className={styles.navLink}>Categories</a></li>
        <li className={styles.navItem}><a href="/products" className={styles.navLink}>All products</a></li>
        <li className={styles.navItem}><a href="/sales" className={styles.navLink}>All sales</a></li>
      </ul>
    </nav>
  );
};

export default NavMenu;