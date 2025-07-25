import React from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import './Layout.css';
import DiscountedItems from '../components/DiscountedItems/DiscountedItems';
import DiscountForm from '../components/SaleForm/SaleForm.jsx';
import Footer from './Footer/Footer';

import Banner from '../components/Banner/Banner';
import Categories from '../components/CategoriesMainPage/CategoriesMainPage.jsx';
import Header from './Header/Header';
// import ProductDetails from "../components/ProductDetails/ProductDetails.jsx"
import ProductsFromCategory from "../components/ProductsFromCategory/ProductsFromCategory"
import LikedProducts from '../components/LikedProducts/LikedProducts';


function Layout() {
  const navigation = useNavigation();

  if (navigation.state !== 'idle') {
    return (
      <div className="loading-overlay">
        <h1>LOADING...</h1>
      </div>
    );
  }

  return (
    <div className="layout-container">


  {/* <LikedProducts/> */}
     {/* <ProductsFromCategory/> */}

      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
