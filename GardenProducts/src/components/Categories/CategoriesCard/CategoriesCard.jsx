import "./CategoriesCard.css";

const CategoriesCard = ({ imageSrc, title }) => {
  return (
    <>
       <div className="category-item">
        <img
          src={imageSrc}
          alt={title}
        />
        <p>{title}</p>
      </div>
    </>
  )
}

export default CategoriesCard;
