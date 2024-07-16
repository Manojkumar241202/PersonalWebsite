import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, BrowserRouter } from 'react-router-dom';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle, faBlog, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Portfolio from './pages/Portfolio';
import Error404 from './pages/Error';
import MenuBar from './menu/MenuBar';
const App = () => {
  return (
    <BrowserRouter>
    <MenuBar></MenuBar>

    <Routes>
      <Route path="/"></Route>
      <Route path="/home" element= {<Home></Home>}></Route>
      <Route path="/about" element= {<About></About>}></Route>
      <Route path="/portfolio" element= {<Portfolio/>}></Route>
      <Route path="/contact" element= {<Contact/>}></Route>
      <Route path="/blog" element= {<Blog/>}></Route>
      <Route path="*" element= {<Error404/>}></Route>


    </Routes>
    
    </BrowserRouter>
    
  );
}

export default App;
