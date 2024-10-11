import React, {useRef} from 'react';
import './menubar.css';
import IconComponent from "./IconComponent";
import { NavLink, useLocation } from 'react-router-dom';
function MenuBar() {
const location = useLocation();
  const menuCheckboxRef = useRef(null);

  const handleMenuClick = () => {
    if (menuCheckboxRef.current) {
      menuCheckboxRef.current.checked = false;
    }
  };
  const transitionStyle = {
    transition: "transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1.0), background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1.0), opacity 0.55s ease"
  };
  const isActiveRoute = (path) => location.pathname === path ? " active" : "";
  return (
    <div className="menu-bar">
      <div className='mobile-navigator'>
        <nav role="navigation">
          <div id="menuToggle">
            <input type="checkbox" ref={menuCheckboxRef} />
            <span style={transitionStyle}></span>
            <span style={transitionStyle}></span>
            <span style={transitionStyle}></span>
            <div class="menu-mobile-menu-container">
              <ul id="menu">
                <NavLink to="/home" style={{ textDecoration: 'none' }}><li class={`menu-item ${isActiveRoute('/home')}`} onClick={handleMenuClick}><i class="fa fa-home" aria-hidden="true"></i><span>Home</span></li></NavLink>
                <NavLink to="/about-me" style={{ textDecoration: 'none'}}><li class={`menu-item ${isActiveRoute('/about-me')}`} onClick={handleMenuClick}><i class="fa fa-user" aria-hidden="true"></i><span>About Me</span></li></NavLink>
                <NavLink to="/portfolio" style={{ textDecoration: 'none'}}><li class={`menu-item ${isActiveRoute('/portfolio')}`} onClick={handleMenuClick} ><i class="fa fa-briefcase" aria-hidden="true"></i><span>Works</span></li></NavLink>
                <NavLink to="/contact" style={{ textDecoration: 'none'}}><li class={`menu-item ${isActiveRoute('/contact')}`} onClick={handleMenuClick} ><i class="fa fa-envelope" aria-hidden="true"></i><span>Contact</span></li></NavLink>
                <NavLink to="/blogs" style={{ textDecoration: 'none' }}><li class={`menu-item ${isActiveRoute('/blogs')}`} onClick={handleMenuClick}><i class="fab fa-weixin" aria-hidden="true"></i><span>Blogs</span></li></NavLink>
              </ul>
            </div>            
          </div>
        </nav>
      </div>
      <div className="icon-container">
        <NavLink to="/home" style={{ textDecoration: 'none' }}>
          <IconComponent iconClass="fa fa-home" label="HOME" isActive={isActiveRoute('/home')}></IconComponent>
        </NavLink>
        <NavLink to="/about-me" style={{ textDecoration: 'none' }}>
          <IconComponent iconClass="fas fa-user" label="ABOUT" isActive={isActiveRoute('/about-me')}></IconComponent>
        </NavLink>
        <NavLink to="/portfolio" style={{ textDecoration: 'none' }}>
          <IconComponent iconClass="fas fa-briefcase" label="PORTFOLIO" isActive={isActiveRoute('/portfolio')} ></IconComponent>
        </NavLink>
        <NavLink to="/contact" style={{ textDecoration: 'none' }}>
          <IconComponent iconClass="fas fa-envelope" label="CONTACT" isActive={isActiveRoute('/contact')} ></IconComponent>
        </NavLink>
        <NavLink to="/blogs" style={{ textDecoration: 'none' }} >
          <IconComponent iconClass="fas fa-pencil"  label="BLOGS" isActive={isActiveRoute('/blogs')} ></IconComponent>
        </NavLink>
        </div>
      </div>
  )
   
  }

export default MenuBar;
