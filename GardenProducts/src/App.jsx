import { Route, Routes } from "react-router-dom";
import Categories from "./pages/Categories/Categories.jsx";
import Home from "./pages/Home/Home.jsx";
import CategoriePage from "./pages/CategoriePage/CategoriePage.jsx";
import "./App.css";

const App = () => {

  return ( 
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/categories/:id" element={<CategoriePage />} />
    </Routes>
  );
};

export default App;
