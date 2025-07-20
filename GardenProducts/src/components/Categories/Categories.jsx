import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import './Categories.css';
import { useEffect, useState } from 'react';

const Categories = ({ showButton = true }) => {
  //   const categories = useLoaderData(); // получаем данные из загрузчика
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  console.log(categories);

  useEffect(() => {
    const getSales = async () => {

        const res = await fetch('http://localhost:3333/categories/all');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setCategories(data);
        console.log();

    };

    getSales();
  }, []);

  // const categories = useLoaderData() || []
  // console.log(categories);
  

  const handleAllCategoriesClick = () => {
    navigate('/categories');
  };

  const handleCardClick = (id) => {
    navigate(`/categories/${id}`);
  };

  if (!categories) {
    return <div>Loading or no categories found...</div>;
  }

  return (
    <div className="categories-container">
      <div className="categories-title">
        <h2 className="categories-name">Categories</h2>
        {showButton && (
          <div className="all-categories-btn">
            <div className="line"></div>
            <button onClick={handleAllCategoriesClick}>All Categories</button>
          </div>
        )}
      </div>

      <div className="category-list">
        {categories.map((category) => (
          <Link
            to={`categories/${category.id}`}
            className="category-link"
            key={category.id}
          >
            <div className="category-item" key={category.id}>
              <img
                src={`http://localhost:3333${category.image}`}
                alt={category.title}
                onClick={() => handleCardClick(category.id)}
              />
              <p>{category.title}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mobileButton">
        {showButton && (
          <div className="all-categories-btn">
            <div className="line"></div>
            <button onClick={handleAllCategoriesClick}>All Categories</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
