// IconWrapper.jsx
import React, { useState, useRef, useEffect } from 'react';
import './iconcomponent.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
const IconComponent = ({ iconClass, label }) => {
  const [paddingLeft, setPaddingLeft] = useState(0);
  const spanRef = useRef(null);

  // useEffect(() => {
  //   if (spanRef.current) {
  //     const labelWidth = spanRef.current.offsetWidth;
  //     setPaddingLeft(labelWidth + 25);
  //   }
  // }, [label]);

  const handleMouseOver = () => {
    setPaddingLeft(`${spanRef.current.offsetWidth/parseFloat(getComputedStyle(document.documentElement).fontSize)+ 1.5625}rem`);
  };

  const handleMouseOut = () => {
    setPaddingLeft(0);
  };

  return (
    <div 
      className="icon-wrapper icon-wrapper1" 
      style={{ paddingLeft }} 
      onMouseOver={handleMouseOver} 
      onMouseOut={handleMouseOut}
      data-label= {label}
    >
      <i className={iconClass}></i>
      {console.log(iconClass)}
      <span ref={spanRef} style={{ position: 'absolute', visibility: 'hidden', fontSize: '16px' }}>
        {label}
      </span>
      
    </div>
  );
};

export default IconComponent;
