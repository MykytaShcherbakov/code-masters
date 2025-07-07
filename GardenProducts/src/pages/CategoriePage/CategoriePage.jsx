import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CategoriePage = () => {
  const { id } = useParams();
  const [productsByCategorie, setProductsByCategorie] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchProductsByCategorie = async () => {
      try {
        const response = await fetch(`http://localhost:3333/categories/${id}`);

        if (!response.ok) {
          throw new Error("Category not Found !!!");
        }

        const result = await response.json();

        setCategory(result.category);
        setProductsByCategorie(result.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchProductsByCategorie();
  }, [id]);

  return (
    <div>
      <h1>{category.title}</h1>
      <br />
      <ul>
        {productsByCategorie.map((product) => (
          <li key={product.id}>
            <p>{product.title}</p>
            <p>$ {product.price}</p>
            <img src={`http://localhost:3333${product.image}`} 
            alt={product.title}
            width={150}           
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriePage;
