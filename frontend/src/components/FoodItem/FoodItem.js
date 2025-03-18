import React, { useContext } from 'react'
import './FoodItem.css'
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, price, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
  
//   console.log("Cart Items:", cartItems);
//   console.log("Accessing Item ID:", id);
  
  const isItemInCart = cartItems && cartItems[id];

  return (
      <div className="food-item">
          <div className="food-item-image-container">
              <img className="food-item-image" src={`${url}/images/${image}`} alt={name} />
              {!isItemInCart ? (
                  <FiPlus className="add" onClick={() => addToCart(id)} />
              ) : (
                  <div className="food-item-counter">
                      <CiCircleMinus onClick={() => removeFromCart(id)} />
                      <p>{cartItems[id]}</p>
                      <CiCirclePlus onClick={() => addToCart(id)} />
                  </div>
              )}
          </div>
          <div className="food-item-info">
              <div className="food-item-name-rating">
                  <p>{name}</p>
              </div>
              <p className="food-item-price">${price}</p>
          </div>
      </div>
  );
};

export default FoodItem
