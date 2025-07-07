import "./CategoriesContainer.css";
import AllCategoriesButton from "../Button/AllCategoriesButton";

const CategoriesContainer = ({ children, showButton = true }) => {
  return (
    <div className="categories-container">
      <div className="categories-title">
        <h2 className="categories-name">Categories</h2>
        {showButton && <AllCategoriesButton />}
      </div>     
      <div className="category-list">
        { children }
      </div>
      <div className="mobileButton">
        {showButton && <AllCategoriesButton />}
      </div>
    </div>
  );
};

export default CategoriesContainer;
