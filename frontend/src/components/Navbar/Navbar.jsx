import React, { useState, useContext } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  // 1. token aur setToken destructure kiya
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (sectionId, menuName) => {
    setMenu(menuName);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    } else {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 2. Logout handler banaya
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div className='navbar'>
      <Link to='/' onClick={() => setMenu("home")}>
        <img src={assets.logo} alt='Logo' className='logo' />
      </Link>

      <ul className='navbar-menu'>
        <Link 
          to='/' 
          className={menu === "home" ? "active" : ""} 
          onClick={() => setMenu("home")}
        >
          home
        </Link>
        <a 
          href='#explore-menu' 
          className={menu === "menu" ? "active" : ""} 
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("explore-menu", "menu");
          }}
        >
          menu
        </a>
        <a 
          href='#app-download' 
          className={menu === "mobile-app" ? "active" : ""} 
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("app-download", "mobile-app");
          }}
        >
          mobile-app
        </a>
        <a 
          href='#footer' 
          className={menu === "contact-us" ? "active" : ""} 
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("footer", "contact-us");
          }}
        >
          contact us
        </a>
      </ul>

      <div className='navbar-right'>
        <img src={assets.search_icon} alt="Search" />
        <div className="navbar-search-icon">
          <Link to='/cart'>
            <img src={assets.basket_icon} alt="Basket" />
          </Link>
          <div className={getTotalCartAmount && getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {/* 3. Conditional rendering: Token na ho to Sign In, ho to Profile + Logout */}
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="Profile" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate('/myorders')}>
                <img src={assets.bag_icon} alt="Orders" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="Logout" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar;