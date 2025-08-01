import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import styles from "./ModalNavMenu.module.css";

const ModalNavMenu = ({ navMenuActive, setNavMenuActive }) => {
  const closeMenu = () => {
    setNavMenuActive(false);
  };

  if (!navMenuActive) return null;

  return (
    <div className={`${styles.modal} ${styles.active} modal-nav-menu`}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={closeMenu}>
          <IoClose className={styles.closeIcon} />
        </button>
        <div className={styles.textDiscountContainer}>
          <nav className={styles.navMenu}>
            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <Link to="/" className={styles.navLink} onClick={closeMenu}>
                  Main Page
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link to="/categories" className={styles.navLink} onClick={closeMenu}>
                  Categories
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link to="/products" className={styles.navLink} onClick={closeMenu}>
                  All products
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link to="/sales" className={styles.navLink} onClick={closeMenu}>
                  All sales
                </Link>
              </li>
            </ul>
          </nav>
          <button className={styles.discountButton} onClick={closeMenu}>
            1 day discount!
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalNavMenu;