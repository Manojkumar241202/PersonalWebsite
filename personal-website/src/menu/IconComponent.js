// IconWrapper.jsx
import React, { useState, useRef } from 'react';
import './iconcomponent.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
const IconComponent = ({ iconClass, label, isActive }) => {
  const [paddingLeft, setPaddingLeft] = useState(0);
  const spanRef = useRef(null);

  // useEffect(() => {
  //   if (spanRef.current) {
  //     const labelWidth = spanRef.current.offsetWidth;
  //     setPaddingLeft(labelWidth + 25);
  //   }
  // }, [label]);

  const handleMouseOver = () => {
    //spanRef.current.offsetWidth -> gives pixel. so converting it to rem
    setPaddingLeft((spanRef.current.offsetWidth / window.innerWidth) * 100 + (25 / window.innerWidth) * 100 + 'vw');
  };

  const handleMouseOut = () => {
    setPaddingLeft(0);
  };

  return (
    
    <div 
      className={"icon-wrapper"}
      style={isActive ? { paddingLeft: paddingLeft, backgroundColor: '#ffb400', color: 'white' } : { paddingLeft: paddingLeft }}
      onMouseOver={handleMouseOver} 
      onMouseOut={handleMouseOut}
      data-label= {label}
    >
      <i className={iconClass}></i>
      <span ref={spanRef} style={{ position: 'absolute', visibility: 'hidden', fontSize: '1.08vw' }}>
        {label}
      </span>
      
    </div>
  );
};

export default IconComponent;
