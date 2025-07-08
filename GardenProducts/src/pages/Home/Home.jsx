import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../../Layout/Banner/Banner";
import CategoriesContainer from "../../components/Categories/CategoriesContainer/CategoriesContainer";
import CategoriesCard from "../../components/Categories/CategoriesCard/CategoriesCard";
import DiscountForm from "../../components/DiscountForm/DiscountForm";
import Footer from "../../Layout/Footer/Footer";
import Sales from "../../components/Sales/Sales";


const Home = () => {
  const [randomCategories, setRandomCategories] = useState([]);

  const navigate = useNavigate();

  const handleCategorieClick = (id) => {
      navigate(`/categories/${id}`);
  };

  useEffect(() => {
    const fetchCategoriesHome = async () => {
      try {
        const response = await fetch("http://localhost:3333/categories/all");
        if (!response.ok) {
          throw new Error("Categories not Found !!!");
        }

        const data = await response.json();

        const randomItems = data.sort(() => 0.5 - Math.random());

        const selectedItems = randomItems.slice(0, 4);

        setRandomCategories(selectedItems);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchCategoriesHome();
  }, []);

  return (
    <>
      <Banner />
      <CategoriesContainer>
        {randomCategories.map((category) => (
          <CategoriesCard
            key={category.id}
            id={category.id}
            imageSrc={`http://localhost:3333${category.image}`}
            title={category.title}
            onClick={() => handleCategorieClick(category.id)}
          />
        ))}
      </CategoriesContainer>
      <DiscountForm />
      <Sales/>
      
    </>
  );
};

export default Home;
