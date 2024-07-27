import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';

const CartItem = ({ data }) => {
  const { cartItems, addToCart, removeFromCart, updateCartItemCount } = useContext(ShopContext);
  const { id, productName, price, productImage } = data;

  return (
    <div className="cart-item">
      <img src={productImage} alt={productName} />
      <div className="item-details">
        <h3>{productName}</h3>
        <p>Price: <FontAwesomeIcon icon={faIndianRupeeSign} />{price}</p>
        <div className="item-quantity">
          <button onClick={() => removeFromCart(id)}>-</button>
          <input
            type="number"
            value={cartItems[id]}
            onChange={(e) => updateCartItemCount(id, parseInt(e.target.value))}
          />
          <button onClick={() => addToCart(id)}>+</button>
        </div>
        <p>Total: <FontAwesomeIcon icon={faIndianRupeeSign} />{price * cartItems[id]}</p>
      </div>
    </div>
  );
};

export default CartItem;
