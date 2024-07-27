import React, { useContext } from 'react';
import { ShopContext } from '../../context/shop-context';
import { PRODUCTS } from '../../products';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import './shop.css';

const Shop = () => {
  const { addToCart } = useContext(ShopContext);

  return (
    <div className="shop-page">
      <h1>Welcome to my eCommerce Store</h1>
      <div className="products">
        {PRODUCTS.map((product) => (
          <div key={product.id} className="product">
            <img src={product.productImage} alt={product.productName} />
            <h2>{product.productName}</h2>
            <p>Price: <FontAwesomeIcon icon={faIndianRupeeSign} />{product.price}</p>
            <button onClick={() => addToCart(product.id)} className="add-to-cart">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
