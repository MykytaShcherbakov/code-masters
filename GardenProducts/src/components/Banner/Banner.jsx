import React from "react";
import bannerImage from "./banner.jpg";
import './Banner.css';

const Banner = () => {
  return (
    <div className="banner">
      <img src={bannerImage} alt="Garden Products Banner" className="bannerImage" />
      <div className="textOverlay">
        <h1>Amazing Discounts on Garden Products!</h1>
        <button className="checkOutButton">Check out</button>
      </div>
    </div>
  );
};

export default Banner;

