import React from "react";
import { Link } from "react-router-dom";
import ModalNavMenu from "../ModalNavMenu/ModalNavMenu";
import styles from "./Header.module.css";
import LogoIcon from "../Images/Icons/logo.png"; // Добавлен импорт для logo.png
import { ReactComponent as IconHeart } from "../Images/Icons/heartHeder.svg";
import { ReactComponent as IconBag } from "../Images/Icons/bagHeder.svg"; 
import { ReactComponent as IconHeartNight } from "../Images/Icons/heartNight.svg";
import { ReactComponent as IconBagNight } from "../Images/Icons/bagNight.svg";
import { ReactComponent as ModeNight } from "../Images/Icons/modeNight.svg";
import { ReactComponent as ModeDay } from "../Images/Icons/modeDay.svg"; 
import { ReactComponent as BurgerDay } from "../Images/Icons/burgerDay.svg";
import { ReactComponent as BurgerNight } from "../Images/Icons/burgerNight.svg";


const Header = ({ onToggleTheme, nightMode }) => {
  const [navMenuActive, setNavMenuActive] = React.useState(false);

  const handleToggleMenu = () => setNavMenuActive(!navMenuActive);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerContent}>
          <div className={styles.logoBlock}>
            <img src={LogoIcon} alt="Logo" className={styles.logo} />
            {nightMode ? (
              <ModeNight onClick={onToggleTheme} className={styles.iconMode} />
            ) : (
              <ModeDay onClick={onToggleTheme} className={styles.iconMode} />
            )}
          </div>
          {/* Центральная кнопка скидки */}
          <button className={styles.discountButton}>1 day discount!</button>
          {/* Основное навигационное меню */}
          <nav className={styles.navMenu}>
            <Link to="/" className={styles.navLink}>Main Page</Link>
            <Link to="/categories" className={styles.navLink}>Categories</Link>
            <Link to="/products" className={styles.navLink}>All products</Link>
            <Link to="/sales" className={styles.navLink}>All sales</Link>
          </nav>
          <div className={styles.cartIcons}>
            <Link to="/favorites" className={styles.iconLink}>
              {nightMode ? <IconHeartNight className={styles.icon} /> : <IconHeart className={styles.icon} />}
            </Link>
            <Link to="/cart" className={styles.iconLink}>
              {nightMode ? <IconBagNight className={styles.icon} /> : <IconBag className={styles.icon} />}
            </Link>
            <button onClick={handleToggleMenu} className={styles.burger}>
              {nightMode ? <BurgerNight /> : <BurgerDay />}
            </button>
          </div>
        </div>
        <ModalNavMenu navMenuActive={navMenuActive} setNavMenuActive={setNavMenuActive} />
      </div>
    </header>
  );
};

export default Header;