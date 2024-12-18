import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className="footer" id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <img className='logo' src={assets.logo1} alt="" />
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.  reprehenderit!</p>
          <div className="footer-socal-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>company</h2>
          <li>Home</li>
          <li>About us</li>
          <li>Delivory</li>
          <li>privity policy</li>
        </div>
        <div className="footer-content-right">
          <h2>Get in Touch</h2>
          <ul>
            <li>+91 9955609298</li>
            <li>souravkumarsingh529@gmail.com</li>
          </ul>

        </div>
      </div>
<hr/>
<div className=" footer-copyright">
<p>Copyright, Act 1957</p>
</div>
    </div>
  )
}

export default Footer