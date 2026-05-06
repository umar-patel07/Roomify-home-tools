import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "./ProductDetail.css";

function ProductDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const product = location.state;

  if (!product) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Product not found</h2>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      {/* Left Image Section */}
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>

      {/* Right Info Section */}
      <div className="product-info">
        <h1>{product.name}</h1>
        <p className="product-category">Category: {product.category}</p>
        <p className="product-price">₹ {product.price}</p>

        {/* Furniture Specifications */}
        <div className="product-specs">
          <h2>Specifications</h2>
          <ul>
            <li><strong>Material:</strong> {product.material || "Premium Wood"}</li>
            <li><strong>Dimensions:</strong> {product.dimensions || "6ft x 4ft x 3ft"}</li>
            <li><strong>Weight:</strong> {product.weight || "45kg"}</li>
            <li><strong>Color:</strong> {product.color || "Brown"}</li>
            <li><strong>Finish:</strong> {product.finish || "Polished Matte"}</li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="button-group">
          <button
            className="ar-tryon-btn"
            onClick={() => (window.location.href = "https://venny-hong.github.io/3D_Model/")}
          >
            🕶️ AR Try-On
          </button>
          <button className="add-to-cart-btn">🛒 Book This Product</button>
        </div>

        <button onClick={() => navigate(-1)} className="back-btn">
          ← Back
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
