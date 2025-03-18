import React, { useContext, useState } from 'react';
import './LoginPage.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { url, setToken, setUserRole } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Sign Up");
  const [data, setData] = useState({
    name: "",
    phone: "",
    password: ""
  });
  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validatePhoneNumber = (phone) => {
    const phonePattern = /^\d{8}$/; // RegEx for exactly 8 digits
    return phonePattern.test(phone); // Returns true if valid
  };

  const onLogin = async (event) => {
    event.preventDefault();

    if (!validatePhoneNumber(data.phone)) {
      alert("Please enter a valid number.");
      return; // Exit the function if validation fails
    }

    const newUrl = currState === "Login" ? `${url}/api/user/login` : `${url}/api/user/register`;

    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        setToken(response.data.token);
        setUserRole(response.data.role);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userRole", response.data.role);

        navigate(response.data.role === "Admin" ? "/add" : "/");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-popup-container'>
        <div className='login-popup-title'>
          <h2>{currState}</h2>
        </div>
        <div className='login-popup-inputs'>
          {currState === "Login" ? null : (
            <input
              name='name'
              onChange={onChangeHandler}
              value={data.name}
              type='text'
              placeholder='Your name'
              required
            />
          )}
          <input
            name='phone'
            onChange={onChangeHandler}
            value={data.phone}
            type='tel' // Use 'tel' for phone input
            placeholder='Your phone number'
            required
          />
          <input
            name='password'
            onChange={onChangeHandler}
            value={data.password}
            type='password'
            placeholder='Your Password'
            required
          />
        </div>
        <button type='submit'>
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>
        {currState === 'Login' ? (
          <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
        ) : (
          <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
        )}
      </form>
    </div>
  );
};

export default LoginPage;