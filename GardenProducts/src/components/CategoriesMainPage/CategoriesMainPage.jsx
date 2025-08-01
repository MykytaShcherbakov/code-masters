import { Link, useLoaderData, useLocation } from "react-router-dom";
import SectionDivider from "../SectionDivider/SectionDivider";
import CategoryCard from "../CategoryCard/CategoryCard";
import Button from "../UI/Button/Button";
import "./CategoriesMainPage.scss";

const CategoriesMainPage = () => {
  const categories = useLoaderData() ?? [];
  const location = useLocation();
  const isOnCategoriesPage = location.pathname.startsWith("/categories");

  return (
    <section className="categories__section">
      <div className="categories__content">
        <SectionDivider
          sectionTitle={"Categories"}
          linkToPage={"/categories"}
          pageTitle={"All categories"}
        />

        <div className="categories__main-page__list">
          {categories.slice(0, 4).map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}

          {!isOnCategoriesPage && (
            <Link to={"/categories"} className="adaptive__link">
              <Button
                btnColor={"neutral"}
                btnSize={"S"}
                btnText={"All categories"}
              />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default CategoriesMainPage;
