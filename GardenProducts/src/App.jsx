import { Route, Routes } from "react-router";
import Categories from "./pages/Categories/Categories";
import Home from "./pages/Home/Home";
import "./App.css";

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/categories" element={<Categories />}/>       
      </Routes>
  );
};

export default App;
