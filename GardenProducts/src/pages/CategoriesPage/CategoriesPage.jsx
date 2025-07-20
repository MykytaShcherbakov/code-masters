import { useLoaderData } from "react-router";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import "./CategoriesPage.scss";

const CategoriesPage = () => {
  const categories = useLoaderData() ?? [];

  return (
    <section className="categories__page-section">
      <h2 className={"categories__section-title"}>Categories</h2>
      <div className="categories__content">
        <div className="categories__list">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category}/>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoriesPage;