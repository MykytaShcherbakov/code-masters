import { Link } from "react-router-dom";
import "./CategoryCard.scss";
import { backendUrl } from "../../apiConfig";
function CategoryCard({ category }) {
    
  return (
    <div className="categories__item">
      <Link to={`/categories/${category.id}`} className="categories__item-link">
        <img
          className="categories__item-image"
          src={`${backendUrl}${category.image}`}
          alt={category.title}
        />
        <p className={"categories__item-title"}>
          {category.title}
        </p>
      </Link>
    </div>
  );
}

export default CategoryCard;