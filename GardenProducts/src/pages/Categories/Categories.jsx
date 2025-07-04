import CategoriesContainer from '../../components/Categories/CategoriesContainer/CategoriesContainer'
import CategoriesCard from '../../components/Categories/CategoriesCard/CategoriesCard'

const Categories = () => {
  return (
      <CategoriesContainer showButton={false}>
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
        <CategoriesCard
          imageSrc="/Pictures/Categories/Pots and planters.png"
          title="Pots and planters"
        />
      </CategoriesContainer>  
  )
}

export default Categories;

