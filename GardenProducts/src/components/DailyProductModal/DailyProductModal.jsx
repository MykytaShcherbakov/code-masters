import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { IoCloseOutline } from "react-icons/io5";
import { IoMdHeart } from "react-icons/io";
import Button from "../UI/Button/Button";
import { fetchProducts } from "../../Loader/fetchProducts";
import { addToCart } from '../../store/cartSlice';
import { backendUrl } from "../../apiConfig";
import "./DailyProductModal.scss";

const DailyProductModal = ({ onClose, onDiscountUsed }) => {
  const [products, setProducts] = useState([]);
  const [productOfTheDay, setProductOfTheDay] = useState(null);
  const [isFavourite, setIsFavourite] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Ошибка при загрузке продуктов:", error);
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

  useEffect(() => {
    if (productOfTheDay) {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setIsFavourite(favorites.includes(String(productOfTheDay.id)));
    }
  }, [productOfTheDay]);

  const toggleFavourite = () => {
    if (!productOfTheDay) return;

    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (isFavourite) {
      favorites = favorites.filter(id => id !== String(productOfTheDay.id));
      setIsFavourite(false);
    } else {
      favorites.push(String(productOfTheDay.id));
      setIsFavourite(true);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    window.dispatchEvent(new CustomEvent('favoritesChanged'));
  };

  const handleAddToCart = () => {
    if (!productOfTheDay) return;

    const discountedId = `${productOfTheDay.id}_daily_discount`;
    const existingDiscounted = cartItems.find(item => item.id === discountedId);

    if (existingDiscounted) {
      alert("You already have this daily deal in your cart!");
      return;
    }

    const cartItem = {
      id: productOfTheDay.id,
      count: 1,
      hasDiscount: true,
      discountPrice: productOfTheDay.discont_price,
      originalPrice: productOfTheDay.price,
      isDailyDeal: true  // ✅ ДОБАВЛЕНО: флаг товара дня
    };

    dispatch(addToCart(cartItem));
    onDiscountUsed();
  };

  if (!productOfTheDay) return null;

  const discountedId = `${productOfTheDay.id}_daily_discount`;
  const isAlreadyInCart = cartItems.some(item => item.id === discountedId);

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
              src={`${backendUrl}${productOfTheDay.image}`}
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
          btnText={isAlreadyInCart ? "Already in cart" : "Add to cart"}
          handleOnClick={handleAddToCart}
          disabled={isAlreadyInCart}
        />
      </div>
    </div>
  );
};

export default DailyProductModal;