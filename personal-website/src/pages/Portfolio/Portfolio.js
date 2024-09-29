import React, { useRef, useState, useEffect } from 'react';
import './Portfolio.css';
import SectionTitle from '../../utils/TitleSection';
import Preloader from '../../utils/preloader/Preloader';
import SlideshowGallery from './Slideshow/Slideshow';


const getHoverDirection = (event, item) => {

  const directions = ['top', 'right', 'bottom', 'left'];
  
  const w = item.offsetWidth;
  const h = item.offsetHeight;

  const x = (event.clientX - item.getBoundingClientRect().left - (w / 2)) * (w > h ? (h / w) : 1);
  const y = (event.clientY - item.getBoundingClientRect().top - (h / 2)) * (h > w ? (w / h) : 1);

  const d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;

  return directions[d];
};

const DirectionAwareHover = ({setSlideshowImage}) => {
  const itemRef1 = useRef(null);
  const itemRef2 = useRef(null);
  const itemRef3 = useRef(null);
  const itemRef4 = useRef(null);
  const itemRef5 = useRef(null);
  const itemRef6 = useRef(null);

  const handleMouseEnterLeave = (event, itemRef) => {
    const dir = getHoverDirection(event, itemRef.current);

    const item = itemRef.current;
    item.classList.remove('mouseenter', 'mouseleave', 'top', 'right', 'bottom', 'left');
    item.classList.add(event.type, dir);
  };

  const items = { 
    Item_1:"https://codeforces.com/profile/Manojkumar2412",
    Item_2:"https://www.codechef.com/users/manojkumar2412",
    Item_3: "https://leetcode.com/u/manojkumar2412/",
    Item_4: "https://atcoder.jp/users/manojkumar2412",
    Item_5: "https://github.com/Manojkumar241202/Agroculture",
    Item_6 : "https://github.com/Manojkumar241202/Voting_management_system" 
  };
  const handleClick = (item) => {
    console.log(items[item], item);
    const keysArray = Object.keys(items);
    const itemIndex= keysArray.indexOf(item);
    setSlideshowImage(itemIndex);
    // window.open(items[item], '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="layout">
      <div
        ref={itemRef1}
        className="hover item1"
        onMouseEnter={(e) => handleMouseEnterLeave(e, itemRef1)}
        onMouseLeave={(e) => handleMouseEnterLeave(e, itemRef1)}
      >
        <div className="content"></div>
        <div className="overlay" onClick= {()=> handleClick("Item_1")}>CODEFORCES</div>
      </div>
      <div
        ref={itemRef2}
        className="hover item2"
        onMouseEnter={(e) => handleMouseEnterLeave(e, itemRef2)}
        onMouseLeave={(e) => handleMouseEnterLeave(e, itemRef2)}
      >
        <div className="content"></div>
        <div className="overlay" onClick= {()=> handleClick("Item_2")}>CODECHEF</div>
      </div>
      <div
        ref={itemRef3}
        className="hover item3"
        onMouseEnter={(e) => handleMouseEnterLeave(e, itemRef3)}
        onMouseLeave={(e) => handleMouseEnterLeave(e, itemRef3)}
      >
        <div className="content"></div>
        <div className="overlay" onClick= {()=> handleClick("Item_3")}>LEETCODE</div>
      </div>
      <div
        ref={itemRef4}
        className="hover item4"
        onMouseEnter={(e) => handleMouseEnterLeave(e, itemRef4)}
        onMouseLeave={(e) => handleMouseEnterLeave(e, itemRef4)}
      >
        <div className="content"></div>
        <div className="overlay" onClick= {()=> handleClick("Item_4")}>ATCODER</div>
      </div>
      <div
        ref={itemRef5}
        className="hover item5"
        onMouseEnter={(e) => handleMouseEnterLeave(e, itemRef5)}
        onMouseLeave={(e) => handleMouseEnterLeave(e, itemRef5)}
      >
        <div className="content"></div>
        <div className="overlay" onClick= {()=> handleClick("Item_5")}>AGROCULTURE</div>
      </div>
      <div
        ref={itemRef6}
        className="hover item6"
        onMouseEnter={(e) => handleMouseEnterLeave(e, itemRef6)}
        onMouseLeave={(e) => handleMouseEnterLeave(e, itemRef6)}
      >
        <div className="content"></div>
        <div className="overlay" onClick={()=> handleClick("Item_6")}>GPT-CLONE</div>
      </div>
    </div>
  );
};

const Portfolio= ()=>{
  const [slideshowImage, setSlideshowImage] = useState(null); 
  // useEffect(() => {
    // Create an interval to check sessionStorage every second (1000 ms)
  //   const interval = setInterval(() => {
  //     const isSlideshowClosed = sessionStorage.getItem('slideshowClosed');
  //     if (isSlideshowClosed === 'true') {
  //       setSlideshowImage(null);
  //     }
  //   }, 500);
  //   return () => clearInterval(interval);
  // }, []);
  return (
    <div className='portfolio'>
      <Preloader/>
      <SectionTitle background_text="WORKS" grey_text="MY " yellow_text=" PORTFOLIO " />
      <DirectionAwareHover setSlideshowImage={setSlideshowImage}/>
      {
          slideshowImage != null && <SlideshowGallery current_index={slideshowImage} />
      }
    </div>
  )
}

export default Portfolio;
