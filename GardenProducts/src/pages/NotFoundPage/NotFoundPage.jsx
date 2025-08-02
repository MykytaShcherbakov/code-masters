import React from "react";
import four from "../../Layout/Images/Icons/4.svg";
import cactus from "../../Layout/Images/Icons/cactus.svg";
import style from "./NotFoundPage.module.css";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className={style.wrapper + " not-found-page"}>
      <div className={style.container + " not-found-page__container"}>
        <div className={style.contentBlock}>
          <div className={style.imgBlock}>
            <img src={four} alt="404 Error" className={style.image} />
            <img src={cactus} alt="404 Error" className={style.imageCactus} />
            <img src={four} alt="404 Error" className={style.image} />
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