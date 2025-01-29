import React, { useState } from "react";
import "./Navbar.css";
import { FaSearch } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  return (
    <div className="navbar">
      <div className="logo">CKFood.</div>
      <ul className="navbar-menu">
        <li
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </li>
        <li
          onClick={() => setMenu("profile")}
          className={menu === "profile" ? "active" : ""}
        >
          Profile
        </li>
        <li
          onClick={() => setMenu("cart")}
          className={menu === "cart" ? "active" : ""}
        >
          Cart
        </li>
        <li
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          Mobile-App
        </li>
      </ul>
      <div className="navbar-right">
        <FaSearch />
        <div className="navbar-search-icon">
          <FaShoppingCart />
          <div className="dot"></div>
        </div>
        <button>Sign In</button>
      </div>
    </div>
  );
};

export default Navbar;
