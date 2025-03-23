import React, { useState, useContext } from "react";
import "./Navbar.css";
import { FaShoppingCart } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io"; // Logout icon
import { FaClipboardList } from "react-icons/fa"; // Orders icon
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken, resetCart } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      setToken("");
      resetCart();
      navigate("/login");
    }
  };

  return (
    <div className="navbar">
      <div onClick={() => navigate("/")} className="logo">
        CKFood.
      </div>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => {
            setMenu("profile");
            navigate("/#explore-menu");
          }}
          className={menu === "profile" ? "active" : ""}
        >
          Menu
        </a>
      </ul>
      <div className="navbar-right">
        <div className="navbar-search-icon">
          <Link to="/cart">
            <FaShoppingCart />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? (
          <div onClick={() => navigate("/login")}>
            <button>Sign In</button>
          </div>
        ) : (
          <div className="navbar-icons">
            <FaClipboardList
              onClick={() => navigate("/myorders")}
              style={{ cursor: "pointer", margin: "0 10px" }}
            />
            <IoIosLogOut
              onClick={logout}
              style={{ cursor: "pointer", margin: "0 10px" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
