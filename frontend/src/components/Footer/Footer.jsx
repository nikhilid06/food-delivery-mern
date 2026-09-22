import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => { 
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-container-left">
          <img src={assets.logo} alt="Logo" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
            aliquam odio omnis optio corporis minus officiis ea blanditiis,
            neque nulla eveniet deserunt reprehenderit consequatur natus nemo
            laudantium sunt. Saepe laborum doloribus alias eveniet aliquam!
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="Facebook" />
            <img src={assets.twitter_icon} alt="Twitter" />
            <img src={assets.linkedin_icon} alt="LinkedIn" />
          </div>
        </div>

        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div className="footer-container-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+1-212-456-7890</li>
            <li>contact@tomato.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2026 © Tomato.com - All Rights Reserved.
      </p>
    </div>
  )
}

export default Footer