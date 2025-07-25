import React from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import './Layout.css';
import DiscountedItems from '../components/DiscountedItems/DiscountedItems';
import DiscountForm from '../components/SaleForm/SaleForm.jsx';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import Breadcrumbs from './Breadcrumbs/Breadcrumbs';


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
      <Header />
      <main>
        <Breadcrumbs />

        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
