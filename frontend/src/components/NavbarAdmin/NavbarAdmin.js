import React, { useContext } from "react";
import "./NavbarAdmin.css";
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const NavbarAdmin = () => {
  const { setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token"); // Clear token
    localStorage.removeItem("userRole"); // Clear user role
    setToken(""); // Reset token in context
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <div className="navbar">
      <div className="logo">CKFood.</div>
      <div className="profile">
        <button onClick={logout}>Logout</button> {/* Logout button */}
      </div>
    </div>
  );
};

export default NavbarAdmin;