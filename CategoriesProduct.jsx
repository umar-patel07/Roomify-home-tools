import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CategoriesProduct.css";
import { CartContext } from "../App";

const productsData = {
  sofas: [
    { id: 1, name: "Luxury Sofa", image: "/images/Sofa.jpg", price: 499 },
    { id: 2, name: "Modern Sofa", image: "/images/sofa2.jpg", price: 699 },
  ],
  chairs: [
    { id: 3, name: "Classic Chair", image: "/images/chair.jpg", price: 149 },
    { id: 4, name: "Office Chair", image: "/images/Chair2.jpg", price: 199 },
  ],
  tables: [
    { id: 5, name: "Dining Table", image: "/images/dining-table.jpg", price: 599 },
    { id: 6, name: "Coffee Table", image: "/images/dining-table2.jpg", price: 249 },
  ],
  beds: [
    { id: 7, name: "King Size Bed", image: "/images/Bed.jpg", price: 999 },
    { id: 8, name: "Queen Size Bed", image: "/images/luxury-bed.jpg", price: 799 },
  ],
  lamps: [
    { id: 9, name: "Floor Lamp", image: "/images/lamp.jpg", price: 129 },
    { id: 10, name: "Desk Lamp", image: "/images/Lamp2.jpg", price: 89 },
  ],
};

const CategoriesProduct = () => {
  const { categoryName } = useParams();
  const categoryProducts = productsData[categoryName] || [];
  const { addToCart, cart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    // Check if product already exists
    const existing = cart.find(p => p.id === product.id);
    if (existing) {
      addToCart(
        cart.map(p =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        )
      );
    } else {
      addToCart({ ...product, quantity: 1 });
    }
    navigate("/cart");
  };

  return (
    <div className="products-page">
      <h2 className="products-title">
        {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Collection
      </h2>

      {categoryProducts.length > 0 ? (
        <div className="products-grid">
          {categoryProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="price">${product.price.toFixed(2)}</p>
                <button className="buy-btn" onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-products">No products found for this category.</p>
      )}
    </div>
  );
};

export default CategoriesProduct;
