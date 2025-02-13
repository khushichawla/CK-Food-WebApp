import React from 'react'
import "./Footer.css";

const Footer = () => {
  return (
    <div className='footer' id='footer'>
    <div className='footer-content'>
        <div className='footer-content-left'>
            <h2 className='company-logo'>CKFOOD.</h2>
            <p>CKFood is committed to quality, every dish is lovingly homemade using fresh ingredients. With a focus on flavor and nutrition, CKFood offers a variety of vibrant, wholesome options that cater to diverse tastes. Whether you're looking for a quick lunch or a hearty dinner, CKFood ensures that every bite is a celebration of health and flavor, bringing the joy of wholesome eating right to your doorstep.</p>
        </div>
        <div className='footer-content-center'>
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div className='footer-content-right'>
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+852 69377963</li>
                <li>emailvandanachawla@gmail.com</li>
            </ul>
        </div>
    </div>
    <hr/>
    <p className='footer-copyright'>Copryright 2025 @ CKFood.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer
