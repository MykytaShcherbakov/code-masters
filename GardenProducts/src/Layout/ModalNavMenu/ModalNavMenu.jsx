// Импортируем React для создания компонента
import React from "react";
import styles from "./ModalNavMenu.module.css";
import LogoIcon from "../Images/Icons/logo.png";
import CloseDayIcon from "../Images/Icons/closeDay.svg"; // для дневного режима как изображения
import CloseNightIcon from "../Images/Icons/close.svg"; //иконки закрытия для ночного режима 

const ModalNavMenu = ({ navMenuActive, setNavMenuActive, nightMode }) => {
  // Обработчик закрытия модального окна
  const closeMenu = () => {
    setNavMenuActive(false); // Скрываем модальное окно
  };

  // Рендеринг компонента только если меню активно
  return navMenuActive ? (
    <div className={`${styles.modal} ${navMenuActive ? styles.active : ""}`}>
      <div className={styles.modalContent}>
        {/* Кнопка закрытия в правом верхнем углу с использованием изображения в зависимости от nightMode */}
        <button className={styles.closeButton} onClick={closeMenu}>
          <img
            src={nightMode ? CloseNightIcon : CloseDayIcon}
            alt={nightMode ? "Закрыть меню (ночной режим)" : "Закрыть меню (дневной режим)"}
            className={styles.closeImage}
          />
        </button>

        {/* Логотип в верхнем левом углу */}
        <div className={styles.logoBlock}>
          <img src={LogoIcon} alt="Логотип сайта" className={styles.logo} />
        </div>

        {/* Навигационное меню */}
        <nav className={styles.navMenu}>
          <ul className={styles.navList}>
            <li className={styles.navItem}><a href="/" className={styles.navLink}>Main Page</a></li>
            <li className={styles.navItem}><a href="/categories" className={styles.navLink}>Categories</a></li>
            <li className={styles.navItem}><a href="/products" className={styles.navLink}>All products</a></li>
            <li className={styles.navItem}><a href="/sales" className={styles.navLink}></a>All sales</li>
          </ul>
        </nav>

        {/* Кнопка скидки внизу */}
        <button className={styles.discountButton}>1 day discount!</button>
      </div>
    </div>
  ) : null; // Если меню не активно, ничего не рендерим
};

export default ModalNavMenu;
















