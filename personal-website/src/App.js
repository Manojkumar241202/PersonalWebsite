import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Portfolio from './pages/Portfolio/Portfolio';
import Error404 from './pages/Error';
import MenuBar from './menu/MenuBar';
import Blog from './pages/Blogs/Blog';
import { useLocation } from 'react-router-dom';

const App = () => {
  const location = useLocation(); // Use useLocation now that App is within BrowserRouter

  useEffect(() => {
    // Set the document title based on the route
    switch (location.pathname) {
      case "/home":
        document.title = "Home - Manojkumar";
        break;
      case "/about-me":
        document.title = "About Me - Manojkumar";
        break;
      case "/portfolio":
        document.title = "Portfolio - Manojkumar";
        break;
      case "/contact":
        document.title = "Contact - Manojkumar";
        break;
      case "/blog":
        document.title = "Blog - Manojkumar";
        break;
      default:
        document.title = "404 Not found";
        break;
    }
  }, [location]);

  return (
    <>
      <MenuBar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about-me" element={<About />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
};

export default App;
