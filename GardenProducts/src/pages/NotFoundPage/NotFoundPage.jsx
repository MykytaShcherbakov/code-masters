import React from "react";
import four from "../../Layout/Images/Icons/4.png";
import cactus from "../../Layout/Images/Icons/cactus.png";
import five from "../../Layout/Images/Icons/5.png";
import style from "./NotFoundPage.module.css";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.contentBlock}>
          <div className={style.imgBlock}>
            <img src={four} alt="404 Error" className={style.image} />
            <img src={cactus} alt="404 Error" className={style.imageCactus} />
            <img src={five} alt="404 Error" className={style.image} />
          </div>
          <div className={style.titleBlock}>
            <h1 className={style.title}>Page Not Found</h1>
            <p className={style.text}>
              We’re sorry, the page you requested could not be found.{" "}
              <span>Please go back to the homepage.</span>
            </p>
            <Link to="/">
              <button className={style.button}>Go Home</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}