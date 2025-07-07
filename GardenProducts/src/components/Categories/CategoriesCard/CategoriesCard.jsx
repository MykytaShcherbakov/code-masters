import "./CategoriesCard.css";

const CategoriesCard = ({ imageSrc, title, id, onClick }) => {
  return (
    <>
       <div className="category-item"  key={id}>
        <img
          src={imageSrc}
          alt={title}
          onClick={onClick}
        />
        <p>{title}</p>
      </div>
    </>
  )
}

export default CategoriesCard;
