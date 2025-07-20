import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import Home from "./Pages/Home/Home";
import { fetchCategories } from "./Loader/fetchCategories";
import { fetchProducts } from "./Loader/fetchProducts";
import { fetchProduct } from "./Loader/fetchProduct";
import DiscountedItems from "./components/DiscountedItems/DiscountedItems";
import CategoriesPage from "./pages/CategoriesPage/CategoriesPage";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import CategorieProducts from "./pages/CategorieProducts/CategorieProducts";
import { fetchCategoryWithProducts } from "./Loader/fetchCategoryWithProducts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: fetchCategories,
        errorElement: <ErrorPage />,
      },
      {
        path: "/discounted-items",
        element: <DiscountedItems />,
        loader: fetchProducts,
        errorElement: <ErrorPage />,
      },
      {
        path: "categories/all",
        element: <CategoriesPage />,
        loader: fetchCategories,
      },
      {
        path: "categories/:categoryId",
        element: <CategorieProducts />,
        loader: fetchCategoryWithProducts,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
        loader: fetchProduct,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
