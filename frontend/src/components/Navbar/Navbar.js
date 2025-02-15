import React, { useState, useContext } from "react";
import "./Navbar.css";
import { FaSearch } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({setShowLogin}) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount } = useContext(StoreContext);

  return (
    <div className="navbar">
      <div className="logo">CKFood.</div>
      <ul className="navbar-menu">
        <Link to='/'
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <a href='#explore-menu'
          onClick={() => setMenu("profile")}
          className={menu === "profile" ? "active" : ""}
        >
          Menu
        </a>
        <li
          onClick={() => setMenu("cart")}
          className={menu === "cart" ? "active" : ""}
        >
          Cart
        </li>
      </ul>
      <div className="navbar-right">
        <span className="icon">
          <FaSearch />
        </span>
        <div className="navbar-search-icon">
          {/* <span className="icon"> */}
            <Link to='/cart'><FaShoppingCart /></Link>
          {/* </span> */}
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        <button onClick={()=>setShowLogin(true)}>Sign In</button>
      </div>
    </div>
  );
};

export default Navbar;
