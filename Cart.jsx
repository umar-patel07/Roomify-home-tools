// Cart.jsx
import React, { useEffect, useState } from 'react';
import './Cart.css';

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // Load products and cart from localStorage on mount
  useEffect(() => {
    fetch('/products.json')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
      });

    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (productId) => {
    const index = cart.findIndex(item => item.product_id === productId);
    if (index === -1) {
      setCart([...cart, { product_id: productId, quantity: 1 }]);
    } else {
      const newCart = [...cart];
      newCart[index].quantity += 1;
      setCart(newCart);
    }
  };

  const changeQuantity = (productId, type) => {
    const index = cart.findIndex(item => item.product_id === productId);
    if (index !== -1) {
      const newCart = [...cart];
      if (type === 'plus') {
        newCart[index].quantity += 1;
      } else {
        newCart[index].quantity -= 1;
        if (newCart[index].quantity <= 0) {
          newCart.splice(index, 1);
        }
      }
      setCart(newCart);
    }
  };

  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getProductById = (id) => {
    return products.find(product => product.id === parseInt(id));
  };

  return (
    <div className={`body ${showCart ? 'showCart' : ''}`}>
      <div className="container">
        <header>
          <div className="title">PRODUCT LIST</div>
          <div className="icon-cart" onClick={() => setShowCart(!showCart)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-9-4h10l2-7H3m2 7L3 4m0 0-.792-3H1" />
            </svg>
            <span>{getTotalQuantity()}</span>
          </div>
        </header>
        <div className="listProduct">
          {products.map(product => (
            <div className="item" key={product.id} data-id={product.id}>
              <img src={product.image} alt={product.name} />
              <h2>{product.name}</h2>
              <div className="price">${product.price}</div>
              <button onClick={() => addToCart(product.id)}>Add To Cart</button>
            </div>
          ))}
        </div>
      </div>

      <div className="cartTab">
        <h1>Shopping Cart</h1>
        <div className="listCart">
          {cart.map(item => {
            const product = getProductById(item.product_id);
            return (
              <div className="item" key={item.product_id} data-id={item.product_id}>
                <div className="image">
                  <img src={product?.image} alt={product?.name} />
                </div>
                <div className="name">{product?.name}</div>
                <div className="totalPrice">${product?.price * item.quantity}</div>
                <div className="quantity">
                  <span className="minus" onClick={() => changeQuantity(item.product_id, 'minus')}>&lt;</span>
                  <span>{item.quantity}</span>
                  <span className="plus" onClick={() => changeQuantity(item.product_id, 'plus')}>&gt;</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="btn">
          <button className="close" onClick={() => setShowCart(false)}>CLOSE</button>
          <button className="checkOut">Check Out</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
