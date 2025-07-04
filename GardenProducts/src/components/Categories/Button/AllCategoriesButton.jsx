import { useNavigate } from "react-router";
import "./AllCategoriesButton.css";

const AllCategoriesButton = () => {
  const navigate = useNavigate();

  const allCategoriesButton = () => {
    navigate("/categories");
  };
  
  return (
    <div className="all-categories-btn">
      <div className="line"></div>
      <button onClick={allCategoriesButton}>
        All Categories
      </button>
    </div>
  );
};

export default AllCategoriesButton;
