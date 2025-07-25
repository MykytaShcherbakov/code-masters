import { createBrowserRouter, Outlet } from 'react-router-dom';
import Layout from '../Layout/Layout';
import ErrorPage from '../Pages/ErrorPage/ErrorPage';
import Home from '../Pages/Home/Home';
import DiscountedItems from '../components/DiscountedItems/DiscountedItems';
import CategoriesPage from '../pages/CategoriesPage/CategoriesPage';
import ProductDetails from '../components/ProductDetails/ProductDetails';
import CategorieProducts from '../pages/CategorieProducts/CategorieProducts';
import LikedProducts from '../components/LikedProducts/LikedProducts';
import Cart from '../pages/Cart/Cart';
import AllProducts from '../components/AllProducts/AllProducts';

import { fetchCategories } from '../Loader/fetchCategories';
import { fetchProducts } from '../Loader/fetchProducts';
import { fetchProduct } from '../Loader/fetchProduct';
import { fetchCategoryWithProducts } from '../Loader/fetchCategoryWithProducts';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    handle: { breadcrumb: () => 'Main Page' },
    children: [
      {
        index: true,
        element: <Home />,
        loader: fetchCategories,
      },
      {
        path: 'discounted-items',
        element: <DiscountedItems />,
        loader: fetchProducts,
        errorElement: <ErrorPage />,
        handle: { breadcrumb: () => 'All Sales' },
      },
      {
        path: 'products',
        element: <AllProducts />,
        loader: fetchProducts,
        errorElement: <ErrorPage />,
        handle: { breadcrumb: () => 'All Products' },
      },
      {
        path: 'product/likedproducts',
        element: <LikedProducts />,
        loader: fetchProducts,
        errorElement: <ErrorPage />,
        handle: { breadcrumb: () => 'Liked Products' },
      },
      {
        path: 'categories',
        element: <Outlet />,
        handle: { breadcrumb: () => 'Categories' },
        children: [
          {
            index: true,
            element: <CategoriesPage />,
            loader: fetchCategories,
            errorElement: <ErrorPage />,
          },
          {
            path: ':categoryId',
            element: <CategorieProducts />,
            loader: fetchCategoryWithProducts,
            errorElement: <ErrorPage />,
            handle: {
              breadcrumb: (params, data) =>
                data?.category?.title || params.categoryId,
            },
            children: [
              {
                path: 'product/:id',
                element: <ProductDetails />,
                loader: fetchProduct,
                errorElement: <ErrorPage />,
                handle: {
                  breadcrumb: (params, data) =>
                    data?.title || `Продукт: ${params.id}`,
                },
              },
            ],
          },
        ],
      },
      {
        path: 'cart',
        element: <Cart />,
        loader: fetchProducts,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);
