import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>
          Choose from a variety of menu everyday. Make healthy choices with our
          delectable array of dishes crafted with the finest ingredients and
          homely vibes.
        </p>
        <button>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
