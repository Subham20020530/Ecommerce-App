import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
import Shop  from "./pages/shop/shop";
import ContactPage from "./pages/contact/contact";
import Cart  from "./pages/cart/cart";
import { ShopContextProvider } from "./context/shop-context";
import CheckoutPage from './pages/checkout/CheckoutPage';
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <ShopContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
          <Footer/>
        </Router>
      </ShopContextProvider>
    </div>
  );
}

export default App;
