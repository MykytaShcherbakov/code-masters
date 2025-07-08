import React, { useState, useEffect } from "react"; // Импорт React и хуков для состояния и эффектов
import { Link } from "react-router-dom"; // Импорт компонента Link для навигации
import styles from "./Header.module.css"; // Импорт стилей из CSS-модуля
import ModalNavMenu from "../ModalNavMenu/ModalNavMenu"; // Импорт модального меню
import NavMenu from "../NavMenu/NavMenu"; // Импорт навигационного меню

// Импорт изображений иконок
import LogoIcon from "../Images/Icons/logo.png"; // Логотип сайта
import IconHeart from "../Images/Icons/heartHeder.svg"; // Иконка избранного
import IconBag from "../Images/Icons/bagHeder.svg"; // Иконка корзины
import ModeDayIcon from "../Images/Icons/modeDay.svg"; // Иконка дневного режима
import ModeNightIcon from "../Images/Icons/modeNight.svg"; // Иконка ночного режима
import BurgerDayIcon from "../Images/Icons/burgerDay.svg"; // Иконка бургер-меню для дневного режима (черная)
import BurgerNightIcon from "../Images/Icons/burgerNight.svg"; // Иконка бургер-меню для ночного режима (белая)

export default function Header() {
  // Состояние для управления видимостью мобильного меню
  const [navMenuActive, setNavMenuActive] = useState(false);

  // Состояние для переключения темы (светлая/темная)
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Эффект для отслеживания изменения размера окна
  useEffect(() => {
    // Функция обработки изменения размера окна
    const handleResize = () => {
      // Скрываем мобильное меню, если ширина больше 480px
      if (window.innerWidth > 480) {
        setNavMenuActive(false);
      }
    };

    // Добавляем слушатель события изменения размера
    window.addEventListener("resize", handleResize);

    // Вызываем функцию при монтировании
    handleResize();

    // Удаляем слушатель при размонтировании
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Эффект запускается только при монтировании и размонтировании

  // Функция для переключения состояния видимости мобильного меню
  const handleToggleMenu = () => setNavMenuActive(!navMenuActive);

  return (
    <>
      {/* Заголовок сайта */}
      <header className={`${styles.header} ${isDarkMode ? styles.night_mode : ""}`}>
        <div className={styles.container}>
          <div className={styles.headerGrid}>
            {/* Левый блок: логотип и переключатель темы */}
            <div className={styles.logoBlock}>
              <img src={LogoIcon} alt="Логотип сайта" className={styles.logo} />
              <button
                className={styles.themeToggle}
                aria-label={isDarkMode ? "Переключиться на светлый режим" : "Переключиться на темный режим"}
                onClick={() => setIsDarkMode(!isDarkMode)} // Переключение темы при клике
              >
                <img
                  src={isDarkMode ? ModeDayIcon : ModeNightIcon}
                  alt={isDarkMode ? "Иконка светлого режима" : "Иконка темного режима"}
                  className={styles.themeIcon}
                />
              </button>
            </div>

            {/* Центральный блок: отображается только на >480px */}
            <div className={styles.centerBlock}>
              <button className={styles.discountButton}>1 day discount!</button>
              <NavMenu />
            </div>

            {/* Правый блок: избранное, корзина и бургер-меню */}
            <div className={styles.rightBlock}>
              <div className={styles.cartIcons}>
                <div className={styles.iconLink}>
                  <img src={IconHeart} alt="Избранное" className={styles.icon} />
                  <span className={styles.badgeCount}>1</span>
                </div>
                <img src={IconBag} alt="Корзина" className={styles.icon} />
              </div>
              <button
                className={styles.burger}
                onClick={handleToggleMenu} // Переключение состояния меню при клике
                aria-label="Открыть/закрыть навигационное меню"
              >
                <img
                  src={isDarkMode ? BurgerNightIcon : BurgerDayIcon}
                  alt={isDarkMode ? "Бургер-меню (ночной режим)" : "Бургер-меню (дневной режим)"}
                  className={styles.burgerIcon}
                  style={{ fill: isDarkMode ? 'var(--night-icon-color)' : 'var(--day-icon-color)' }} // Динамический цвет
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Модальное меню для мобильной версии */}
      <ModalNavMenu
        navMenuActive={navMenuActive}
        setNavMenuActive={setNavMenuActive}
        nightMode={isDarkMode}
      />
    </>
  );
}