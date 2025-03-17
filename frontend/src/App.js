import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import NavbarAdmin from './components/NavbarAdmin/NavbarAdmin';
import Sidebar from './components/Sidebar/Sidebar';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import MyOrders from './pages/MyOrders/MyOrders';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import Summary from './pages/Summary/Summary';
import LoginPage from './pages/LoginPage/LoginPage';
import Footer from './components/Footer/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StoreContext } from './context/StoreContext'; // Import StoreContext

const App = () => {
  const { token, userRole, setUserRole } = useContext(StoreContext); 
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const url = "http://localhost:4000";

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    if (storedToken) {
      setUserRole(role);
      setIsAuthenticated(true);
    }
  }, [setUserRole]);

  useEffect(() => {
    // This will run whenever token or userRole changes
    console.log("Authentication state changed:", { token, userRole });
    setIsAuthenticated(!!token); // Update authentication state based on token
  }, [token, userRole]);

  const renderRoutes = () => {
    if (isAuthenticated) {
      if (userRole === "Admin") {
        return (
          <>
            <ToastContainer />
            <NavbarAdmin />
            <hr />
            <div className='app-content'>
              <Sidebar />
              <Routes>
                <Route path="/add" element={<Add url={url} />} />
                <Route path="/list" element={<List url={url} />} />
                <Route path="/orders" element={<Orders url={url} />} />
                <Route path="/summary" element={<Summary url={url} />} />
                <Route path="*" element={<Navigate to="/add" />} />
              </Routes>
            </div>
          </>
        );
      } else {
        return (
          <>
            <div className="App">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/order" element={<PlaceOrder />} />
                <Route path="/myorders" element={<MyOrders />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </>
        );
      }
    } else {
      return (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      );
    }
  };

  return (
    <>
      {renderRoutes()}
      <Footer />
    </>
  );
};

export default App;