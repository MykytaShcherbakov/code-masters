import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoriesContainer from "../../components/Categories/CategoriesContainer/CategoriesContainer";
import CategoriesCard from "../../components/Categories/CategoriesCard/CategoriesCard";
import Footer from "../../Layout/Footer/Footer";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const handleCategorieClick = (id) => {
      navigate(`/categories/${id}`);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3333/categories/all");

        if (!response.ok) {
          throw new Error("Categories not Found !!!");
        }

        const data = await response.json();

        setCategories(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <CategoriesContainer showButton={false}>
        {categories.map((category) => (
          <CategoriesCard
          key={category.id}
          id={category.id}
          imageSrc={`http://localhost:3333${category.image}`}
          title={category.title}
          onClick={() => handleCategorieClick(category.id)}
          />
        ))}
      </CategoriesContainer>
      <Footer />
    </>
  );
};

export default Categories;
