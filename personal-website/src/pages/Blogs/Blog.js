import React, { useEffect, useState, useRef } from 'react';
import "./Blog.css";
import SectionTitle from '../../utils/TitleSection';
import Preloader from '../../utils/preloader/Preloader';

const Blog = () => {
  const cardsPerPage = 6;
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const paginationRef = useRef(null);
  const pageRef= useRef([]);
  const PAGE_BUTTONS = 2;
  const cardsRef = useRef([]); // This will store references to all the card elements

  // Initialize total pages based on the number of cards
  useEffect(() => {
      // Clear any existing pagination before adding new ones
  
    const totalCards = cardsRef.current.length;
    setTotalPages(Math.ceil(totalCards / cardsPerPage));
    handlePageClick(1);
  }, [totalPages]);

  const handlePageClick = (page) => {
    setCurrentPage(page);

    // Show only the cards for the current page
    cardsRef.current.forEach((card, index) => {
      const current_page= Math.floor((index/cardsPerPage))+1;
    //   console.log("current_page and page: "+ current_page+" , "+page);
      if (current_page===page) {
        card.style.display = "block";
        // console.log("card block: "+ index);
      } else {
        card.style.display = "none";
      }
    });

    // Manage pagination buttons display
    document.querySelectorAll('.page-number').forEach((btn, index) => {
      if (index + 1 === page) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  };

  const handleNextClick = () => {
    let nextPage = currentPage + 1 > totalPages ? 1 : currentPage + 1;
    let visiblePageButtonRange= [];
    visiblePageButtonRange.push(nextPage===totalPages ? nextPage-1 : nextPage);
    visiblePageButtonRange.push(Math.min(nextPage+PAGE_BUTTONS-1, totalPages));

    pageRef.current.forEach((page, index)=>{
        let current_page = index+1;
        if (visiblePageButtonRange[0]<=current_page && current_page<=visiblePageButtonRange[1]){
            page.style.display= "block";
        }
        else{
            page.style.display="none"
        }
    });
    handlePageClick(nextPage);
  };

  const handlePrevClick = () => {
    let prevPage = currentPage - 1 < 1 ? totalPages : currentPage - 1;
    let visiblePageButtonRange= [];
    let prevButton= prevPage-1;
    if(prevPage===1){
        visiblePageButtonRange.push(prevPage);
        visiblePageButtonRange.push(Math.min(totalPages,prevPage+1));
    }
    else{
        visiblePageButtonRange.push(prevButton);
        visiblePageButtonRange.push(Math.min(prevButton+1,totalPages));
    }
    pageRef.current.forEach((page, index)=>{
        let current_page = index+1;
        if (visiblePageButtonRange[0]<=current_page && current_page<=visiblePageButtonRange[1]){
            page.style.display= "block";
        }
        else{
            page.style.display="none"
        }
    });

    handlePageClick(prevPage);
  };



  return (
    <div className="blog">
      <Preloader/>
      <SectionTitle background_text="POSTS" grey_text="MY " yellow_text=" BLOGS" />
      <div id="cards-container" className='cards-container'>
          <div
            key={0}
            onClick={() =>{
              window.open("https://medium.com/@manojkumar853453/understanding-time-and-space-complexity-in-c-5af66496e3ef", "_blank");
            }}
            className="card"
            // style={{ display: "none" }}
            ref={(el) => cardsRef.current[0] = el} // Attach a ref to each card
          >
            <div className="thumbnail time_and_space_complexity">
              <img
                src="/assets/blog/time_and_space_complexity.png"
                alt="Time and Space Complexity"
              />
            </div>
            <div className="card-context">
              <h3>Understanding Time and Space Complexity in C++</h3>
              <p>When writing C++ programs, two important aspects to consider are time complexity and space complexity. They help us analyze the performance and efficiency of our algorithms.</p>
            </div>
          </div>
      </div>

      <div className="pagination" ref={paginationRef}>

<button className="prev-page" onClick= {handlePrevClick}>Prev</button>
{[...Array(totalPages)].map((_, i) => (
  <span
    className="page-number"
    key={i}
    onClick={() => handlePageClick(i + 1)}
    ref= {(el) => pageRef.current[i]=el}
    style={i >= PAGE_BUTTONS ? { display: "none" } :  { display: "block" }}
  >
    {i + 1}
  </span>
))}
<button className="next-page" onClick={handleNextClick}>Next</button>
</div>
    </div>
  );
};

export default Blog;
