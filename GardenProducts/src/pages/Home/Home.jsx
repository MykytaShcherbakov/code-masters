import CategoriesCard from "../../components/Categories/CategoriesCard/CategoriesCard";
import CategoriesContainer from "../../components/Categories/CategoriesContainer/CategoriesContainer";
import DiscountForm from "../../components/DiscountForm/DiscountForm";

const Home = () => {
  return (
    <>
      <CategoriesContainer>
        <CategoriesCard
          imageSrc="/Pictures/Categories/Fertilizer.png"
          title="Fertilizer"
        />
        <CategoriesCard
          imageSrc="/Pictures/Categories/Protective products and septic tanks.png"
          title="Protective products and septic tanks"
        />
        <CategoriesCard
          imageSrc="/Pictures/Categories/Planting material.png"
          title="Planting material"
        />
        <CategoriesCard
          imageSrc="/Pictures/Categories/Tools and equipment.png"
          title="Tools and equipment"
        />
      </CategoriesContainer>

      <DiscountForm />
    </>
  );
};

export default Home;
