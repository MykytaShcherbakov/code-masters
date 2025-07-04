import React from "react";
import bannerImage from "./banner.jpg";
import styles from "./Banner.module.css";

const Banner = () => {
  return (
    <div className={styles.banner}>
      <img src={bannerImage} alt="Garden Products Banner" className={styles.bannerImage} />
      <div className={styles.textOverlay}>
        <h1>Amazing Discounts on Garden Products!</h1>
        <button className={styles.checkOutButton}>Check out</button>
      </div>
    </div>
  );
};

export default Banner;