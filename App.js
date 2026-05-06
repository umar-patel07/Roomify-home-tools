import React, { useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import IntroVideo from "./Component/IntroVideo";
import Navbar from "./Component/Navbar";
import HeroSection from "./Component/HeroSection";
import FeaturedProducts from "./Component/FeaturedProduct";
import Footer from "./Component/Footer";

import CategoriesPage from "./Component/Categories";
import CategoriesProduct from "./Component/CategoriesProduct";
import CartPage from "./Component/CartPage";
import ProductDetail from "./Component/ProductDetail";
import Login from "./Component/Login";

export const CartContext = createContext();

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, diff) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + diff) }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity }}
    >
      <Router>
        {showIntro ? (
          <IntroVideo onFinish={() => setShowIntro(false)} />
        ) : (
          <>
            <Navbar />
            <Routes>
              {/* ✅ Home Page */}
              <Route
                path="/"
                element={
                  <>
                    <HeroSection />
                    <FeaturedProducts />
                  </>
                }
              />

              {/* ✅ After login, redirect to same Home */}
              <Route
                path="/home"
                element={
                  <>
                    <HeroSection />
                    <FeaturedProducts />
                  </>
                }
              />

              {/* ✅ Categories Page */}
              <Route path="/categories" element={<CategoriesPage />} />

              {/* ✅ Single Category Products Page */}
              <Route
                path="/categories/:categoryName"
                element={<CategoriesProduct />}
              />

              {/* ✅ Product Detail Page (Dynamic) */}
              <Route path="/product/:productId" element={<ProductDetail />} />

              {/* ✅ Cart Page */}
              <Route path="/cart" element={<CartPage />} />

              {/* ✅ Login Page */}
              <Route path="/login" element={<Login />} />
            </Routes>
            <Footer />
          </>
        )}
      </Router>
    </CartContext.Provider>
  );
}

export default App;
