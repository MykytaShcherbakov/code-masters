import { createBrowserRouter, RouterProvider, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
import ErrorPage from './Pages/ErrorPage/ErrorPage';
import Home from './Pages/Home/Home';
import { fetchCategories } from './Loader/fetchCategories';
import { fetchProducts } from './Loader/fetchProducts';
import { fetchProduct } from './Loader/fetchProduct';
import DiscountedItems from './components/DiscountedItems/DiscountedItems';
import Categories from './components/Categories/Categories';
import ProductDetails from './components/ProductDetails/ProductDetails';

import Cart from './pages/Cart/Cart';

import AllProducts from './components/AllProducts/AllProducts';
import LikedProducts from './components/LikedProducts/LikedProducts'





const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: fetchCategories,
        errorElement: <ErrorPage />,
      },
      {
        path: '/products',
        element: <AllProducts />,
        loader: fetchProducts,
        errorElement: <ErrorPage />,
      },
      {
        path: '/discounted-items',
        element: <DiscountedItems />,
        loader: fetchProducts,
        errorElement: <ErrorPage />,
      },
      {
        path: 'categories/:id',
        element: <Categories />,
        loader: fetchCategories,
        errorElement: <ErrorPage />,
      },
      {
        path: 'product/:id',
        element: <ProductDetails />,
        loader: fetchProduct,
        errorElement: <ErrorPage />,
      },
      {
        path: 'product/likedproducts',
        element: <LikedProducts/>,
        loader: fetchProducts,
        errorElement: <ErrorPage />,
      },
      {
        path: '/cart',
        element: <Cart />,
        loader: fetchProducts,
      },
    ],
  },
]);

const App = () => {
   return <RouterProvider router={router} />;
  // return <Cart />;

};

export default App;
