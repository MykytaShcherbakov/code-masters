import bannerImage from '../../media/banner.jpg';import './Banner.css';
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="banner">
      <img src={bannerImage} alt="Garden Products Banner" className="bannerImage" />
      <div className="textOverlay">
        <h1>Amazing Discounts on Garden Products!</h1>
        <Link to="/products"><button className="checkOutButton">Check out</button></Link>
      </div>
    </div>
  );
};

export default Banner;