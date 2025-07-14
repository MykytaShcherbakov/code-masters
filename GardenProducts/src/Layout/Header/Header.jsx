import React, { useState, useEffect } from "react";
/*import { Link } from "react-router-dom";*/
import styles from "../../Layout/Header/Header.module.css";
import ModalNavMenu from "../../Layout/ModalNavMenu/ModalNavMenu"; 
import NavMenu from "../../Layout/NavMenu/NavMenu"; 


import LogoIcon from "../Images/Icons/logo.png";
import IconHeart from "../Images/Icons/heartHeder.svg";
import BagIcon from "../Images/Icons/bag.svg";
import ModeDayIcon from "../Images/Icons/modeDay.svg";
import ModeNightIcon from "../Images/Icons/modeNight.svg";
import BurgerDayIcon from "../Images/Icons/burgerDay.svg";
import BurgerNightIcon from "../Images/Icons/burgerNight.svg";

function Header() {
  const [navMenuActive, setNavMenuActive] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 480) {
        setNavMenuActive(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggleMenu = () => setNavMenuActive(!navMenuActive);

  return (
    <>
      <header className={`${styles.header} ${isDarkMode ? styles.night_mode : ""}`}>
        <div className={styles.container}>
          <div className={styles.headerGrid}>
            <div className={styles.logoBlock}>
              <img src={LogoIcon} alt="Логотип сайта" className={styles.logo} />
              <button
                className={styles.themeToggle}
                aria-label={isDarkMode ? "Переключиться на светлый режим" : "Переключиться на темный режим"}
                onClick={() => setIsDarkMode(!isDarkMode)}
              >
                <img
                  src={isDarkMode ? ModeDayIcon : ModeNightIcon}
                  alt={isDarkMode ? "Иконка светлого режима" : "Иконка темного режима"}
                  className={styles.themeIcon}
                />
              </button>
            </div>
            <div className={styles.centerBlock}>
              <button className={styles.discountButton}>1 day discount!</button>
              <NavMenu />
            </div>
            <div className={styles.rightBlock}>
              <div className={styles.cartIcons}>
                <div className={styles.iconLink}>
                  <img src={IconHeart} alt="Избранное" className={styles.icon} />
                  <span className={styles.badgeCount}>1</span>
                </div>
                <img src={BagIcon} alt="Корзина" className={styles.icon} />
              </div>
              <button
                className={styles.burger}
                onClick={handleToggleMenu}
                aria-label="Открыть/закрыть навигационное меню"
              >
                <img
                  src={isDarkMode ? BurgerNightIcon : BurgerDayIcon}
                  alt={isDarkMode ? "Бургер-меню (ночной режим)" : "Бургер-меню (дневной режим)"}
                  className={styles.burgerIcon}
                  style={{ fill: isDarkMode ? "var(--night-icon-color)" : "var(--day-icon-color)" }}
                />
              </button>
            </div>
          </div>
        </div>
      </header>
      <ModalNavMenu
        navMenuActive={navMenuActive}
        setNavMenuActive={setNavMenuActive}
        nightMode={isDarkMode}
      />
    </>
  );
}

export default Header;