import React from 'react';
import Navbar from './components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        {/* <Home/> */}
        <Route path="/" element={<Home/>}/>
        {/* <Route path="/cart" element={<Cart/>}/>
        <Route path="/order" element={<PlaceOrder/>}/>
        <Route path="/profile" element={<Profile/>}/> */}
      </Routes>
    </div>
  );
}

export default App;
