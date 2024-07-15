import React, { useState } from 'react';
import './menubar.css';
import IconComponent from "./IconComponent";

function MenuBar() {
  return (
    <div className="icon-container">
      <IconComponent iconClass="fas fa-home" label="Home" />
      <IconComponent iconClass="fas fa-info" label="About" />
      <IconComponent iconClass="fas fa-envelope" label="Contact" />
      <IconComponent iconClass="fas fa-user" label="User" />
      <IconComponent iconClass="fas fa-cog" label="Settings" />
    </div>
  )
   
  }

export default MenuBar;
