import React, { useEffect, useState, useRef } from 'react';
import "./Blog.css";
import SectionTitle from '../../utils/TitleSection';

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
    console.log("totalcards: "+ totalCards);

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
    visiblePageButtonRange.push(nextPage==totalPages ? nextPage-1 : nextPage);
    visiblePageButtonRange.push(Math.min(nextPage+PAGE_BUTTONS-1, totalPages));

    pageRef.current.forEach((page, index)=>{
        let current_page = index+1;
        console.log("page_interval: " + visiblePageButtonRange[0]+ " "+ current_page+ " "+ visiblePageButtonRange[1]);
        if (visiblePageButtonRange[0]<=current_page && current_page<=visiblePageButtonRange[1]){
            page.style.display= "block";
            console.log("visible-page: "+ current_page);
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
    if(prevPage==1){
        visiblePageButtonRange.push(prevPage);
        visiblePageButtonRange.push(Math.min(totalPages,prevPage+1));
    }
    else{
        visiblePageButtonRange.push(prevButton);
        visiblePageButtonRange.push(Math.min(prevButton+1,totalPages));
    }
    pageRef.current.forEach((page, index)=>{
        let current_page = index+1;
        console.log("page_interval: " + visiblePageButtonRange[0]+ " "+ current_page+ " "+ visiblePageButtonRange[1]);
        if (visiblePageButtonRange[0]<=current_page && current_page<=visiblePageButtonRange[1]){
            page.style.display= "block";
            console.log("visible-page: "+ current_page);
        }
        else{
            page.style.display="none"
        }
    });

    handlePageClick(prevPage);
  };



  return (
    <div className="blog">
      <SectionTitle background_text="POSTS" grey_text="MY " yellow_text=" BLOGS" />
      <div id="cards-container" className='cards-container'>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="card"
            // style={{ display: "none" }}
            ref={(el) => cardsRef.current[i] = el} // Attach a ref to each card
          >
            <div className="thumbnail">
              <img
                src="https://tunis-wp.ibthemespro.com/wp-content/uploads/2023/09/blog-post-5.jpg"
                alt="Web Accessibility"
              />
            </div>
            <div className="card-context">
              <h3>Everything You Need to Know About Web Accessibility</h3>
              <p>Aliquam hendrerit sollicitudin purus, quis rutrum mi accumsan nec. Quisque bibendum orci ac nibh facilisis, at malesuada orci congue.</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination" ref={paginationRef}>

<a className="prev-page" onClick= {handlePrevClick}>Prev</a>
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
<a className="next-page" onClick={handleNextClick}>Next</a>
</div>
    </div>
  );
};

export default Blog;
