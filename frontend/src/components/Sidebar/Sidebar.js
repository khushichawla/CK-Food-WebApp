import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { IoListSharp } from "react-icons/io5";
import { LuPackageOpen } from "react-icons/lu";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to='/add' className="sidebar-option">
          <div>+</div>
          <p>Add Items</p>
        </NavLink>

        <NavLink to='/list' className="sidebar-option">
          <div><IoListSharp /></div>
          <p>List Items</p>
        </NavLink>

        <NavLink to='/orders' className="sidebar-option">
          <div><LuPackageOpen /></div>
          <p>Orders</p>
        </NavLink>

        <NavLink to='/summary' className="sidebar-option">
          <div><LuPackageOpen /></div>
          <p>Summary</p>
        </NavLink>

      </div>
    </div>
  );
};

export default Sidebar;
