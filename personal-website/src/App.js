import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle, faBlog, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Home from './Home';
import About from './About';
import Blog from './Blog';
import Contact from './Contact';
import IconComponent from './menu/IconComponent';
const App = () => {
  return (
    <div className="icon-container">
      <IconComponent iconClass="fas fa-home" label="HOME" >
      </IconComponent>
      <IconComponent iconClass="fas fa-user" label="ABOUT" >
      </IconComponent>
      <IconComponent iconClass="fas fa-briefcase" label="PORTFOLIO"></IconComponent>
      <IconComponent iconClass="fas fa-envelope" label="Contact" >

      </IconComponent>
      <IconComponent iconClass="fas fa-pencil" label="BLOG" >
      </IconComponent>
      </div>
  );
}

export default App;
