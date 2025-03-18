import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  // console.log(food_list);
  
  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list
          .filter(item => item.display) // Only include items where display is true
          .map((item, index) => {
            // console.log("Rendering item:", item);
            if (category === "All" || category === item.category) {
              return (
                <FoodItem
                  key={index}
                  id={item._id}
                  name={item.name}
                  // description={item.description}
                  price={item.price}
                  image={item.image}
                />
              );
            }
            return null; // Ensure to return null when the condition is not met
          })}
      </div>
    </div>
  );
};

export default FoodDisplay;