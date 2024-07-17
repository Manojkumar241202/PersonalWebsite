import React from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import './App.css';
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
      <Route path="/home" element= {<Home></Home>}></Route>
      <Route path="/about-me" element= {<About></About>}></Route>
      <Route path="/portfolio" element= {<Portfolio/>}></Route>
      <Route path="/contact" element= {<Contact/>}></Route>
      <Route path="/blog" element= {<Blog/>}></Route>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="*" element= {<Error404/>}></Route>


    </Routes>
    
    </BrowserRouter>
    
  );
}

export default App;
