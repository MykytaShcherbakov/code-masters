// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import styles from "../../Layout/Header/Header.module.css";
// import ModalNavMenu from "../../Layout/ModalNavMenu/ModalNavMenu";
// import NavMenu from "../../Layout/NavMenu/NavMenu";


// import LogoIcon from "../Images/Icons/logo.png";
// import IconHeart from "../Images/Icons/heartHeder.svg";
// import BagIcon from "../Images/Icons/bag.svg";
// import ModeDayIcon from "../Images/Icons/modeDay.svg";
// import ModeNightIcon from "../Images/Icons/modeNight.svg";
// import BurgerDayIcon from "../Images/Icons/burgerDay.svg";
// import BurgerNightIcon from "../Images/Icons/burgerNight.svg";
// import DailyProductModal from "../../components/DailyProductModal/DailyProductModal";
// import DiscountInfoModal from "../../components/DailyProductModal/DiscountInfoModal";

// function Header() {
//   const [navMenuActive, setNavMenuActive] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [showInfoModal, setShowInfoModal] = useState(false);
//   const [hasUsedDiscountToday, setHasUsedDiscountToday] = useState(false);

//   useEffect(() => {
//     const stored = localStorage.getItem("usedDiscountDate");
//     const today = new Date().toDateString();
//     if (stored === today) {
//       setHasUsedDiscountToday(true);
//     }
//   }, []);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth > 480) {
//         setNavMenuActive(false);
//       }
//     };
//     window.addEventListener("resize", handleResize);
//     handleResize();
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handleToggleMenu = () => setNavMenuActive(!navMenuActive);

//   const handleDiscountClick = () => {
//     const today = new Date().toDateString();
//     const alreadyUsed = localStorage.getItem("usedDiscountDate") === today;

//     if (alreadyUsed) {
//       setShowInfoModal(true);
//     } else {
//       setIsModalOpen(true);
//     }
//   };

//   return (
//     <>
//       <header

//         className={`${styles.header} ${isDarkMode ? styles.night_mode : ""}`}

//       >
//         <div className={styles.container}>
//           <div className={styles.headerGrid}>
//             <div className={styles.logoBlock}>
//               <img src={LogoIcon} alt="Логотип сайта" className={styles.logo} />
//               <button
//                 className={styles.themeToggle}
//                 aria-label={
//                   isDarkMode

//                     ? "Переключиться на светлый режим"
//                     : "Переключиться на темный режим"

//                 }
//                 onClick={() => setIsDarkMode(!isDarkMode)}
//               >
//                 <img
//                   src={isDarkMode ? ModeDayIcon : ModeNightIcon}
//                   alt={
//                     isDarkMode

//                       ? "Иконка светлого режима"
//                       : "Иконка темного режима"

//                   }
//                   className={styles.themeIcon}
//                 />
//               </button>
//             </div>
//             <div className={styles.centerBlock}>
//               <button
//                 className={styles.discountButton}
//                 onClick={handleDiscountClick}
//               >
//                 1 day discount!
//               </button>

//               <NavMenu />
//             </div>

//             {isModalOpen && (
//               <DailyProductModal
//                 onClose={() => setIsModalOpen(false)}
//                 onDiscountUsed={() => {
//                   const today = new Date().toDateString();
//                   localStorage.setItem("usedDiscountDate", today);
//                   setHasUsedDiscountToday(true);
//                   setIsModalOpen(false);
//                 }}
//               />
//             )}

//             {showInfoModal && (
//               <DiscountInfoModal onClose={() => setShowInfoModal(false)} />
//             )}

//             <div className={styles.rightBlock}>
//               <div className={styles.cartIcons}>
//                 <div className={styles.iconLink}>

//                   <Link to={'product/likedproducts'}>
//                     <img
//                       src={IconHeart}
//                       alt="Избранное"
//                       className={styles.icon}
//                     />
//                   </Link>

//                   <span className={styles.badgeCount}>1</span>
//                 </div>
//                 <Link to={"/cart"}>
//                   <img src={BagIcon} alt="Корзина" className={styles.icon} />
//                 </Link>
//                 {/* <img src={BagIcon} alt="Корзина" className={styles.icon} /> */}
//               </div>
//               <button
//                 className={styles.burger}
//                 onClick={handleToggleMenu}
//                 aria-label="Открыть/закрыть навигационное меню"
//               >
//                 <img
//                   src={isDarkMode ? BurgerNightIcon : BurgerDayIcon}
//                   alt={
//                     isDarkMode

//                       ? "Бургер-меню (ночной режим)"
//                       : "Бургер-меню (дневной режим)"

//                   }
//                   className={styles.burgerIcon}
//                   style={{
//                     fill: isDarkMode

//                       ? "var(--night-icon-color)"
//                       : "var(--day-icon-color)",

//                   }}
//                 />
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>
//       <ModalNavMenu
//         navMenuActive={navMenuActive}
//         setNavMenuActive={setNavMenuActive}
//         nightMode={isDarkMode}
//       />
//     </>
//   );
// }

// export default Header;



import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../Layout/Header/Header.module.css';
import ModalNavMenu from '../../Layout/ModalNavMenu/ModalNavMenu';
import NavMenu from '../../Layout/NavMenu/NavMenu';

import LogoIcon from '../Images/Icons/logo.png';
import IconHeart from '../Images/Icons/heartHeder.svg';
import BagIcon from '../Images/Icons/bag.svg';
import ModeDayIcon from '../Images/Icons/modeDay.svg';
import ModeNightIcon from '../Images/Icons/modeNight.svg';
import BurgerDayIcon from '../Images/Icons/burgerDay.svg';
import BurgerNightIcon from '../Images/Icons/burgerNight.svg';
import DailyProductModal from '../../components/DailyProductModal/DailyProductModal';
import DiscountInfoModal from '../../components/DailyProductModal/DiscountInfoModal';
import { ThemeContext } from '../../сontext/theme/ThemeContext';


function Header() {
  const [navMenuActive, setNavMenuActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [hasUsedDiscountToday, setHasUsedDiscountToday] = useState(false);

  const { theme, switchTheme } = useContext(ThemeContext); 
console.log(theme);

  useEffect(() => {
    const stored = localStorage.getItem('usedDiscountDate');
    const today = new Date().toDateString();
    if (stored === today) {
      setHasUsedDiscountToday(true);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 480) {
        setNavMenuActive(false);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggleMenu = () => setNavMenuActive(!navMenuActive);

  const handleDiscountClick = () => {
    const today = new Date().toDateString();
    const alreadyUsed = localStorage.getItem('usedDiscountDate') === today;

    if (alreadyUsed) {
      setShowInfoModal(true);
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <header
        className={`${styles.header} ${
          theme === 'dark' ? styles.night_mode : ''
        }`}
      >
        <div className={styles.container}>
          <div className={styles.headerGrid}>
            <div className={styles.logoBlock}>
              <img src={LogoIcon} alt="Логотип сайта" className={styles.logo} />
              <button
                className={styles.themeToggle}
                
                onClick={switchTheme} 
              >
                <img
                  src={theme === 'dark' ? ModeDayIcon : ModeNightIcon}
                  alt={
                    theme === 'dark'
                      ? 'Иконка светлого режима'
                      : 'Иконка темного режима'
                  }
                  className={styles.themeIcon}
                />
              </button>
            </div>
            <div className={styles.centerBlock}>
              <button
                className={styles.discountButton}
                onClick={handleDiscountClick}
              >
                1 day discount!
              </button>

              <NavMenu />
            </div>

            {isModalOpen && (
              <DailyProductModal
                onClose={() => setIsModalOpen(false)}
                onDiscountUsed={() => {
                  const today = new Date().toDateString();
                  localStorage.setItem('usedDiscountDate', today);
                  setHasUsedDiscountToday(true);
                  setIsModalOpen(false);
                }}
              />
            )}

            {showInfoModal && (
              <DiscountInfoModal onClose={() => setShowInfoModal(false)} />
            )}

            <div className={styles.rightBlock}>
              <div className={styles.cartIcons}>
                <div className={styles.iconLink}>
                  <Link to={'product/likedproducts'}>
                    <img
                      src={IconHeart}
                      alt="Избранное"
                      className={styles.icon}
                    />
                  </Link>
                  <span className={styles.badgeCount}>1</span>
                </div>
                <Link to={'/cart'}>
                  <img src={BagIcon} alt="Корзина" className={styles.icon} />
                </Link>
              </div>
              <button
                className={styles.burger}
                onClick={handleToggleMenu}
                aria-label="Открыть/закрыть навигационное меню"
              >
                <img
                  src={theme === 'dark' ? BurgerNightIcon : BurgerDayIcon}
                  alt={
                    theme === 'dark'
                      ? 'Бургер-меню (ночной режим)'
                      : 'Бургер-меню (дневной режим)'
                  }
                  className={styles.burgerIcon}
                  style={{
                    fill:
                      theme === 'dark'
                        ? 'var(--night-icon-color)'
                        : 'var(--day-icon-color)',
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </header>
      <ModalNavMenu
        navMenuActive={navMenuActive}
        setNavMenuActive={setNavMenuActive}
        nightMode={theme === 'dark'}
      />
    </>
  );
}

export default Header;
