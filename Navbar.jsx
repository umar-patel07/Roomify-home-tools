import React, { useState, useContext } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../App"; // ✅ import context

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ✅ login state
  const navigate = useNavigate();

  // ✅ access cart from context
  const { cart } = useContext(CartContext);

  // ✅ calculate total items in cart
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleUserClick = () => {
    if (isLoggedIn) {
      alert("Already logged in ✅ (Here you can add profile menu)");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <Link to="/">
          <span>Room</span>ify
        </Link>
      </div>

      {/* Nav Links */}
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        {/* Categories Dropdown */}
        <li
          className="dropdown"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <Link to="/Categories">
            Categories <i className="fas fa-chevron-down"></i>
          </Link>
          {isDropdownOpen && (
            <ul className="dropdown-menu">
              <li>
                <Link to="/categories/sofas">
                  <i className="fas fa-couch"></i> Sofas
                </Link>
              </li>
              <li>
                <Link to="/categories/tables">
                  <i className="fas fa-table"></i> Tables
                </Link>
              </li>
              <li>
                <Link to="/categories/chairs">
                  <i className="fas fa-chair"></i> Chairs
                </Link>
              </li>
              <li>
                <Link to="/categories/beds">
                  <i className="fas fa-bed"></i> Beds
                </Link>
              </li>
              <li>
                <Link to="/categories/storage">
                  <i className="fas fa-archive"></i> Storage
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li>
          <Link to="/shop">Shop</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>

      {/* Search + Cart + User */}
      <div className="nav-actions">
        {/* Search */}
        <div className="search-box">
          <input type="text" placeholder="Search furniture..." />
          <i className="fas fa-search"></i>
        </div>

        {/* ✅ Cart (Dynamic Badge) */}
        <div className="cart-container">
          <Link to="/cart">
            <i className="fas fa-shopping-cart"></i>
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </Link>
        </div>

        {/* ✅ User Icon */}
        <div className="user-container" onClick={handleUserClick}>
          <i className="fas fa-user"></i>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
