import { BrowserRouter, Route, Routes } from "react-router-dom";
import Categories from "./pages/Categories/Categories.jsx";
import Home from "./pages/Home/Home.jsx";
import CategoriePage from "./pages/CategoriePage/CategoriePage.jsx";
import Layout from "./Layout/Layout.jsx";
// import ProductCard from "./components/ProductCard/ProductCard.jsx";
// import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/categories" element={<Layout><Categories /></Layout>} />
        <Route path="/categories/:id" element={<Layout><CategoriePage /></Layout>} />
        {/* <Route path="/product/:id" element={<Layout><ProductCard /></Layout>} /> */}
      </Routes>
    </BrowserRouter>

    // <ProductCard/>
  );
};

export default App;