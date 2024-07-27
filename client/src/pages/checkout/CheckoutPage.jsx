import React, { useContext, useState } from "react";
import { ShopContext } from "../../context/shop-context";
import { PRODUCTS } from "../../products";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import "./CheckoutPage.css";

const stripePromise = loadStripe("pk_test_51PZqC2RseoUOCN1jiSJoUCUw2huoEHsryV7MsYMCyuD2qdO1XJf8u3ypquyCUGjyHATupDoMRiyEHnyJ3fmFJmlK00ZZUB1v15");

const CheckoutForm = () => {
  const {  getTotalCartAmount, checkout } = useContext(ShopContext);
  const stripe = useStripe();
  const elements = useElements();
  const [billingDetails, setBillingDetails] = useState({
    name: '',
    email: '',
    address: '',
  });
  const [isProcessing, setProcessing] = useState(false);
  const totalAmount = getTotalCartAmount();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBillingDetails({ ...billingDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const cardElement = elements.getElement(CardElement);

    const { error } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: billingDetails,
    });

    if (error) {
      console.error(error);
      setProcessing(false);
      return;
    }

    setProcessing(false);
    checkout();
    alert('Payment successful!');
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <h2>Billing Details</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={billingDetails.name}
        onChange={handleInputChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={billingDetails.email}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={billingDetails.address}
        onChange={handleInputChange}
        required
      />
      <CardElement />
      <button type="submit" disabled={!stripe || isProcessing}>
        {isProcessing ? "Processing..." : `Pay ${totalAmount}`}
      </button>
    </form>
  );
};

const CheckoutPage = () => {
  const { cartItems } = useContext(ShopContext);

  return (
    <Elements stripe={stripePromise}>
      <div className="checkout-page">
        <h1>Checkout Page</h1>
        <div className="cart-items">
          {Object.keys(cartItems).map((productId) => {
            const quantity = cartItems[productId];
            const product = PRODUCTS.find((p) => p.id === parseInt(productId));
            if (quantity > 0 && product) {
              return (
                <div key={productId} className="cart-item">
                  <img src={product.productImage} alt={product.productName} />
                  <div>
                    <h3>{product.productName}</h3>
                    <p>Quantity: {quantity}</p>
                    <p>Price per item: <FontAwesomeIcon icon={faIndianRupeeSign} />{product.price}</p>
                    <p>Total for this item: <FontAwesomeIcon icon={faIndianRupeeSign} />{product.price * quantity}</p>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
        <CheckoutForm />
      </div>
    </Elements>
  );
};

export default CheckoutPage;
