import React from 'react';
import './menubar.css';
import IconComponent from "./IconComponent";
import { NavLink, useLocation } from 'react-router-dom';
function MenuBar() {
const location = useLocation();
  
  const isActiveRoute = (path) => location.pathname === path ? " active" : "";
  return (
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
        <IconComponent iconClass="fas fa-pencil"  label="BLOG" isActive={isActiveRoute('/blog')} ></IconComponent>
      </NavLink>
      </div>
  )
   
  }

export default MenuBar;
