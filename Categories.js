import React from "react";
import { useNavigate } from "react-router-dom";
import "./Categories.css";

const categories = [
  { id: 1, name: "Sofas", image: "/images/Sofa.jpg" },
  { id: 2, name: "Chairs", image: "/images/chair.jpg" },
  { id: 3, name: "Tables", image: "/images/dining-table.jpg" },
  { id: 4, name: "Beds", image: "/images/bed.jpg" },
  { id: 5, name: "Lamp", image: "/images/Lamp.jpg" },
];

const Categories = () => {
  const navigate = useNavigate();

  const handleClick = (categoryName) => {
    // Convert to lowercase and remove spaces for URL
    const formattedName = categoryName.toLowerCase().replace(/\s+/g, "-");
    navigate(`/categories/${formattedName}`);
  };

  return (
    <div className="categories-container">
      <h2 className="categories-title">Explore Furniture Categories</h2>
      <div className="categories-grid">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="category-card"
            onClick={() => handleClick(cat.name)}
          >
            <img src={cat.image} alt={cat.name} className="category-image" />
            <div className="category-overlay">
              <h3>{cat.name}</h3>
              <p>Discover our range of {cat.name.toLowerCase()}.</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
