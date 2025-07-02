
import React from "react";
import { Link } from "react-router-dom";
import styles from "./ModalNavMenu.module.css";
import { useSelector } from "react-redux"; // Для night mode

const ModalNavMenu = ({ navMenuActive, setNavMenuActive }) => {
  const { nightMode } = useSelector((state) => state.theme);
  const handleClose = () => setNavMenuActive(false);

  const handleDiscountClick = () => {
    // Логика для кнопки скидки (например, переход на /sales)
    window.location.href = "/sales";
    handleClose();
  };

  return (
    <div className={`${styles.modal} ${navMenuActive ? styles.active : ""} ${nightMode ? styles.night_mode : ""}`}>
      <div className={styles.overlay} onClick={handleClose}></div>
      <div className={styles.modalContent}>
        <button className={styles.discountButton} onClick={handleDiscountClick}>
          1 day discount!
        </button>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link to="/" className={styles.navLink} onClick={handleClose}>Main Page</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/categories" className={styles.navLink} onClick={handleClose}>Categories</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/products" className={styles.navLink} onClick={handleClose}>All products</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/sales" className={styles.navLink} onClick={handleClose}>All sales</Link>
          </li>
        </ul>
        <button className={styles.closeButton} onClick={handleClose}>
          X
        </button>
      </div>
    </div>
  );
};

export default ModalNavMenu;
