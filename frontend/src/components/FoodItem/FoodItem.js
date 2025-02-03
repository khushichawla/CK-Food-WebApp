import React, { useContext, useState } from 'react'
import './FoodItem.css'
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({id, name, price, description, image}) => {
  const [itemCount, setItemCount] = useState(0);
  // const [cartItems, addToCart, removeFromCart] = useContext(StoreContext)

  return (
    <div className='food-item'>
      <div className='food-item-image-container'>
        <img className='food-item-image' src={image} alt=""/>
        {!itemCount 
          ? <FiPlus className='add' onClick={() => setItemCount(prev => prev + 1)}/>
          : <div className='food-item-counter'>
            <CiCircleMinus onClick={() => setItemCount(prev => prev - 1)}/>
            <p>{itemCount}</p>
            <CiCirclePlus  onClick={() => setItemCount(prev => prev + 1)}/>
          </div>

        }
      </div>
      <div className='food-item-info'>
        <div className='food-item-name-rating'>
          <p>{name}</p>
          {/* <Stars/> */}
        </div>
        <p className='food-item-desc'>{description}</p>
        <p className='food-item-price'>${price}</p>
      </div>
    </div>
  )
}

export default FoodItem
