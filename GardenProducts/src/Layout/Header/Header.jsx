// Updated Header.jsx
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  HiOutlineShoppingBag,
  HiOutlineBars3,
  HiOutlineHeart,
} from "react-icons/hi2";
import styles from "./Header.module.css";
import ModalNavMenu from "../ModalNavMenu/ModalNavMenu";
import NavMenu from "../NavMenu/NavMenu";

import LogoIcon from "../../media/logo.png";
import ModeDayIcon from "../../media/modeDay.svg";
import ModeNightIcon from "../../media/modeNight.svg";

import DailyProductModal from "../../components/DailyProductModal/DailyProductModal";
import DiscountInfoModal from "../../components/DailyProductModal/DiscountInfoModal";
import { ThemeContext } from "../../context/theme/ThemeContext";

const useFavoritesCount = () => {
  const [count, setCount] = useState(0);

  const updateCount = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setCount(favorites.length);
  };

  useEffect(() => {
    updateCount();
    addEventListener("storage", updateCount);
    const interval = setInterval(updateCount, 200);

    return () => {
      removeEventListener("storage", updateCount);
      clearInterval(interval);
    };
  }, []);

  return count;
};

function Header() {
  const [navMenuActive, setNavMenuActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [hasUsedDiscountToday, setHasUsedDiscountToday] = useState(false);

  const { theme, switchTheme } = useContext(ThemeContext);

  const favoritesCount = useFavoritesCount();
  const cartItems = useSelector((state) => state.cart?.items || []);
  const cartCount = cartItems.reduce((sum, item) => sum + (item.count || 0), 0);

  useEffect(() => {
    const stored = localStorage.getItem("usedDiscountDate");
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
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggleMenu = () => setNavMenuActive(!navMenuActive);

  const handleDiscountClick = () => {
    const today = new Date().toDateString();
    const alreadyUsed = localStorage.getItem("usedDiscountDate") === today;

    if (alreadyUsed) {
      setShowInfoModal(true);
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <header
        className={
          theme === "dark"
            ? `${styles.header} ${styles.night_mode}`
            : styles.header
        }
      >
        <div className={styles.container}>
          <div className={styles.headerGrid}>
            <div className={styles.logoBlock}>
              <Link to="/">
                <img
                  src={LogoIcon}
                  alt="Логотип сайта"
                  className={styles.logo}
                />
              </Link>
              <button className={styles.themeToggle} onClick={switchTheme}>
                <img
                  src={theme === "dark" ? ModeNightIcon : ModeDayIcon}
                  alt={
                    theme === "dark"
                      ? "Иконка светлого режима"
                      : "Иконка темного режима"
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
                  localStorage.setItem("usedDiscountDate", today);
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
                <div className={styles.iconContainer}>
                  <Link
                    to={"product/likedproducts"}
                    className={styles.iconLink}
                  >
                    <HiOutlineHeart
                      className={`${styles.iconHeart} icon-heart`}
                    />
                  </Link>
                  {favoritesCount > 0 && (
                    <span className={styles.badgeCountHeart}>
                      {favoritesCount}
                    </span>
                  )}
                </div>
                <div className={styles.iconContainer}>
                  <Link to={"/cart"} className={styles.iconLink}>
                    <HiOutlineShoppingBag
                      className={`${styles.iconBag} icon-bag`}
                    />
                  </Link>
                  {cartCount > 0 && (
                    <span className={styles.badgeCountBag}>{cartCount}</span>
                  )}
                </div>
              </div>

              <button
                className={styles.burger}
                onClick={handleToggleMenu}
                aria-label="Открыть/закрыть навигационное меню"
              >
                <HiOutlineBars3
                  className={`${styles.burgerIcon} icon-burger`}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      <ModalNavMenu
        navMenuActive={navMenuActive}
        setNavMenuActive={setNavMenuActive}
        onDiscountClick={handleDiscountClick}
        hasUsedDiscountToday={hasUsedDiscountToday}
      />
    </>
  );
}

export default Header;
