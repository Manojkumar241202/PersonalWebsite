import React, { useState } from 'react';
import './menubar.css';
import IconComponent from "./IconComponent";
import { Link } from 'react-router-dom';
function MenuBar() {
  return (
    <div className="icon-container">
      <Link to="/home" style={{ textDecoration: 'none' }}>
        <IconComponent iconClass="fas fa-home" label="HOME" ></IconComponent>
      </Link>
      <Link to="/about" style={{ textDecoration: 'none' }}>
        <IconComponent iconClass="fas fa-user" label="ABOUT" ></IconComponent>
      </Link>
      <Link to="/portfolio" style={{ textDecoration: 'none' }}>
        <IconComponent iconClass="fas fa-briefcase" label="PORTFOLIO"></IconComponent>
      </Link>
      <Link to="/contact" style={{ textDecoration: 'none' }}>
        <IconComponent iconClass="fas fa-envelope" label="CONTACT" ></IconComponent>
      </Link>
      <Link to="/blog" style={{ textDecoration: 'none' }}>
        <IconComponent iconClass="fas fa-pencil" label="BLOG" ></IconComponent>
      </Link>
      </div>
  )
   
  }

export default MenuBar;
