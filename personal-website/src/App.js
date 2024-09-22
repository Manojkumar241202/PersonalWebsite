import React from 'react';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Portfolio from './pages/Portfolio/Portfolio';
import Error404 from './pages/Error';
import MenuBar from './menu/MenuBar';
import Blog from './pages/Blogs/Blog';
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
