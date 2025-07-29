import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { IoCloseOutline } from "react-icons/io5";
import { IoMdHeart } from "react-icons/io";
import Button from "../UI/Button/Button";
import { fetchProducts } from "../../Loader/fetchProducts";
import { addToCart } from "../../store/cartSlice";
import "./DailyProductModal.scss";

const DailyProductModal = ({ onClose, onDiscountUsed }) => {
  const [products, setProducts] = useState([]);
  const [favourite, setFavourite] = useState([]);
  const [productOfTheDay, setProductOfTheDay] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error loading products!", error);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const day = new Date().getDate();
      const index = day % products.length;
      const selected = { ...products[index] };
      selected.discont_price = selected.price * 0.5;
      setProductOfTheDay(selected);
    }
    
  }, [products]);

  const isFavourite =
    productOfTheDay && favourite.some((item) => item.id === productOfTheDay.id);

const toggleFavourite = () => {
  if (!productOfTheDay) return;
  setFavourite((prev) =>
    isFavourite
      ? prev.filter((item) => item.id !== productOfTheDay.id)
      : [...prev, productOfTheDay]
  );
};
 const handleAddToCart = () => {
  if (!productOfTheDay) return;
  dispatch(
    addToCart({
      id: productOfTheDay.id,
      title: productOfTheDay.title,
      image: productOfTheDay.image,
      price: productOfTheDay.price,
      discont_price: productOfTheDay.discont_price,
      count: 1,
    })
  );
  onDiscountUsed?.();
};

  if (!productOfTheDay) return null;

  return (
    <div className="day__modal-background">
      <div className="day__modal-window">
        <div className="day__modal-header">
          <h4 className="modal__header-title">
            50% discount on product of the day!
          </h4>
          <IoCloseOutline
            className="day__modal-close__icon"
            onClick={onClose}
          />
        </div>

        <div className="day__product-card">
          <div className="product__image">
            <img
              src={`http://localhost:3333${productOfTheDay.image}`}
              alt={productOfTheDay.title}
            />
            <span className="discount__badge">-50%</span>
            <IoMdHeart
              className={`icon ${isFavourite ? "icon__favourite" : ""}`}
              onClick={toggleFavourite}
            />
          </div>
          <div className="product__description">
            <h3 className="product__description-name">
              {productOfTheDay.title}
            </h3>
            <div className="product__pricing">
              <span className="product__price">
                ${productOfTheDay.discont_price.toFixed(2)}
              </span>
              <span className="original__price">
                ${productOfTheDay.price.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <Button
          btnColor="white"
          btnSize="L"
          btnText="Add to cart"
          handleOnClick={handleAddToCart}
        />
      </div>
    </div>
  );
};

export default DailyProductModal;
