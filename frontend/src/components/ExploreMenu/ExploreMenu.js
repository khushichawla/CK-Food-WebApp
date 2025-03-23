import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore our menu</h1>
      {/* <p classname='explore-menu-text'>Choose from a diverse menu featuring delectable home-made food. Our mission is to provide healthy, delicious and affordable meals at your doorstep.</p> */}
      {/* <p className='message'>(*Single click to select. Double click to deselect)</p> */}
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
              key={index}
              className="explore-menu-list-item"
            >
              {/* <img className={category===item.menu_name?"active":""} src={item.menu_image} alt=''/> */}
              <p className={category === item.menu_name ? "active" : ""}>
                {item.menu_name}
              </p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
