import React, { useEffect, useState } from 'react';
import './Slideshow.css';
import './CBPGridGallery.js';
import RatingGraphCustom from './RatingGraph/RatingGraphCustom.js';
import axios from 'axios';
const SlideshowGallery = ({current_index=0}) => {
  const [titles, setTitles] = useState({
    codechef: "loading",
    codeforces: "loading",
    leetcode: "loading",
    atcoder: "loading",
  });
  const [ratings, setRatings]= useState({
    codechef:{
      max:'loading',
      current: 'loading'
    },
    codeforces:{
      max:'loading',
      current: 'loading'
    },
    leetcode:{
      max:'loading',
      current: 'loading'
    },
    atcoder:{
      max:'loading',
      current: 'loading'
    }
  });
  useEffect(() => {
    // Ensure gallery is initialized after the component is mounted
    const initializeGallery = () => {
      const gridGalleryElement = document.getElementById('grid-gallery');
      if (window.CBPGridGallery && gridGalleryElement) {
        const gallery = new window.CBPGridGallery(gridGalleryElement);
        gallery._openSlideshow(current_index);  // Open the slideshow on the first item if desired
      }
    };

    initializeGallery();
  }, [current_index]);

  useEffect(() => {
    const fetchRatings = async () => {
      let response = {};
      try {
        if (sessionStorage.getItem(`ratings`)){
          response= JSON.parse(sessionStorage.getItem(`ratings`));
        }
        else{
          response = await axios.get('/api/ratings');
          response= response.data;
          sessionStorage.setItem(`ratings`,JSON.stringify(response));
        }
        let platforms = { 
          codechef: "codechef.com",
          codeforces: "codeforces.com",
          atcoder: "atcoder.jp",
          leetcode: "leetcode.com"
        };
        let all_ratings = {};
        for (let platform in platforms) {
            let site = platforms[platform]; // Get the corresponding site name
            let data = response.resources[site]; // Access the data using the site name

            if (!all_ratings[platform]) {
                all_ratings[platform] = {}; // Initialize the nested object if it doesn't exist
            }

            all_ratings[platform]["max"] = data.max;
            let length = data.data.length;
            all_ratings[platform]["current"] = data.data[length - 1].new_rating; // Get the latest rating
        }
        setRatings(all_ratings);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchTitles = async () => {
      let response = {};
      try {
        if (sessionStorage.getItem(`titles`)){
          response= JSON.parse(sessionStorage.getItem(`titles`));
        }
        else{
          response = await axios.get('/api/titles');
          response= response.data;
          sessionStorage.setItem(`titles`,JSON.stringify(response));
        }
        setTitles(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchRatings();
    fetchTitles();
  }, []);
  const handleClick = (e) => {
    e.preventDefault(); 

    const icon = e.currentTarget.querySelector('.redirect_icon');
    icon.classList.add('shake');
    const url = e.currentTarget.getAttribute('href')
    // Remove the shake class after the animation ends
    setTimeout(() => {
      window.open(url, "_blank"); // Open in a new tab
      icon.classList.remove('shake'); // Remove shake class (optional)
    }, 200); // Match this duration with the animation duration in CSS
  };

  return (
    <div className="portfolio portfolio-row">
      <div id="grid-gallery" className="grid-gallery">
        <section className="slideshow">
          <ul>
            <li>
              <figure>
                <figcaption>
                  <div className='slide_title'>
                    <img
                      className='title_logo'
                      decoding="async"
                      src="/assets/portfolio/codeforces_com.png"
                      alt="codeforces"
                    />
                    <h3 className="m-0 title_name">CODEFORCES PROFILE</h3>
                    <a href="https://codeforces.com/profile/Manojkumar2412" target="_blank" rel="noopener noreferrer" onClick={handleClick}>
                      <i className="fas fa-external-link-alt redirect_icon"></i>
                    </a>
                  </div>
                  <ol className="more-info">
                    <li><i className="fas fa-user"></i> <strong>Username: </strong> Manojkumar2412</li>
                    <li><i className="fas fa-trophy"></i> <strong>Max rating: </strong> {ratings.codeforces.max}</li>
                    <li><i className="fas fa-chart-line"></i> <strong>Current rating: </strong>{ratings.codeforces.current}</li>
                    <li><i className="fas fa-star"></i> <strong>Title: </strong> {titles.codeforces}</li>
                  </ol>
                </figcaption>
                {/* <img
                  decoding="async"
                  src="/assets/portfolio/codeforces_logo.png"
                  alt="codeforces"
                /> */}
                <div className='rating_graph'>
                  <RatingGraphCustom platform='codeforces' />
                </div>
              </figure>
            </li>
            <li>
              <figure>
                <figcaption>
                <div className='slide_title'>
                    <img
                      className='title_logo'
                      decoding="async"
                      src="/assets/portfolio/codechef_com.png"
                      alt="codechef"
                    />
                    <h3 className="m-0 title_name">CODECHEF PROFILE</h3>
                    <a href="https://www.codechef.com/users/manojkumar2412" target="_blank" rel="noopener noreferrer" onClick={handleClick}>
                      <i className="fas fa-external-link-alt redirect_icon"></i>
                    </a>
                  </div>
                  <ol className="more-info">
                    <li><i className="fas fa-user"></i> <strong>Username: </strong> manojkumar2412</li>
                    <li><i className="fas fa-trophy"></i> <strong>Max rating: </strong> {ratings.codechef.max} </li>
                    <li><i className="fas fa-chart-line"></i> <strong>Current rating: </strong> {ratings.codechef.current}</li>
                    <li><i className="fas fa-star"></i> <strong>Title: </strong> {titles.codechef}</li>
                  </ol>
                </figcaption>
                {/* <img
                  decoding="async"
                  src="/assets/portfolio/codechef_logo.png"
                  alt="codechef"
                /> */}
                <div className='rating_graph'>
                  <RatingGraphCustom platform='codechef' />
                </div>
              </figure>
            </li>
            <li>
              <figure>
                <figcaption>
                <div className='slide_title'>
                    <img
                      className='title_logo'
                      decoding="async"
                      src="/assets/portfolio/leetcode_com.png"
                      alt="leetcode"
                    />
                    <h3 className="m-0 title_name">LEETCODE PROFILE</h3>
                    <a href="https://leetcode.com/u/manojkumar2412/" target="_blank" rel="noopener noreferrer" onClick={handleClick}>
                      <i className="fas fa-external-link-alt redirect_icon"></i>
                    </a>
                  </div>
                  <ol className="more-info">
                    <li><i className="fas fa-user"></i> <strong>Username: </strong> manojkumar2412</li>
                    <li><i className="fas fa-trophy"></i> <strong>Max rating: </strong>{ratings.leetcode.max}</li>
                    <li><i className="fas fa-chart-line"></i> <strong>Current rating: </strong> {ratings.leetcode.current}</li>
                    <li><i className="fas fa-star"></i> <strong>Title: </strong> {titles.leetcode}</li>
                  </ol>
                </figcaption>
                {/* <img
                  decoding="async"
                  src="/assets/portfolio/leetcode_logo.png"
                  alt="Project"
                /> */}
                <div className='rating_graph'>
                  <RatingGraphCustom platform='leetcode' />
                </div>
              </figure>
            </li>
            <li>
              <figure>
                <figcaption>
                <div className='slide_title'>
                    <img
                      className='title_logo'
                      decoding="async"
                      src="/assets/portfolio/atcoder_jp.png"
                      alt="atcoder"
                    />
                    <h3 className="m-0 title_name">ATCODER PROFILE</h3>
                    <a href="https://atcoder.jp/users/manojkumar2412" target="_blank" rel="noopener noreferrer" onClick={handleClick}>
                      <i className="fas fa-external-link-alt redirect_icon"></i>
                    </a>
                  </div>
                  <ol className="more-info">
                    <li><i className="fas fa-user"></i> <strong>Username: </strong> manojkumar2412</li>
                    <li><i className="fas fa-trophy"></i> <strong>Max rating: </strong> {ratings.atcoder.max}</li>
                    <li><i className="fas fa-chart-line"></i> <strong>Current rating: </strong> {ratings.atcoder.current}</li>
                    <li><i className="fas fa-star"></i> <strong>Title: </strong> {titles.atcoder}</li>
                  </ol>
                </figcaption>
                {/* <img
                  decoding="async"
                  src="/assets/portfolio/atcoder_logo.png"
                  alt="Project"
                /> */}
                <div className='rating_graph'>
                  <RatingGraphCustom platform='atcoder' />
                </div>
              </figure>
            </li>
            <li>
              <figure className="project-figure">
              <figcaption>
                    <div className='slide_title'>
                      <h3 className="m-0 title_name">AGROCULTURE PROJECT</h3>
                      <a href="https://github.com/Manojkumar241202/Agroculture" target="_blank" rel="noopener noreferrer" onClick={handleClick}>
                        <i className="fas fa-external-link-alt redirect_icon"></i>
                      </a>
                    </div>
                    
                    <ol className="more-info project-details">
                        <li><i className="fas fa-leaf"></i> <strong>Focus: </strong> Eliminating Intermediaries in Agriculture</li>
                        <li><i className="fas fa-calendar-alt"></i> <strong>Timeline: </strong> AUG 2022 - NOV 2022</li>
                        <li><i className="fas fa-bullseye"></i> <strong>Goal: </strong>Direct Trading of Vegetables and Fruits</li>
                        <li><i className="fas fa-code"></i> <strong>Tech: </strong> React, Node.js</li>
                    </ol>
                </figcaption>
                <img
                  decoding="async"
                  src="/assets/portfolio/github_logo.png"
                  alt="Agroculture"
                />
              </figure>
            </li>
            <li>
            <figure className="project-figure">
              <figcaption>
                    <div className='slide_title'>
                      <h3 className="m-0 title_name">GPT-CLONE PROJECT</h3>
                      <a href="https://github.com/Manojkumar241202/GPT-clone" target="_blank" rel="noopener noreferrer" onClick={handleClick}>
                        <i className="fas fa-external-link-alt redirect_icon"></i>
                      </a>
                    </div>
                    
                    <ol className="more-info project-details">
                        <li><i className="fas fa-leaf"></i> <strong>Focus: </strong> AI-Powered Chatbot with PDF Information Retrieval</li>
                        <li><i className="fas fa-calendar-alt"></i> <strong>Timeline: </strong>SEP 2023 - OCT 2023</li>
                        <li><i className="fas fa-bullseye"></i> <strong>Goal: </strong> Enable users to interactively retrieve information from uploaded PDFs</li>
                        <li><i className="fas fa-code"></i> <strong>Tech: </strong> Langchain, Python, OpenAI, RAG, Chroma (Vector DB)</li>
                    </ol>
                </figcaption>
                <img
                  decoding="async"
                  src="/assets/portfolio/chatbot_logo.png"
                  alt="voting_management"
                />
              </figure>
            </li>
          </ul>
          <nav>
            <span className="icon nav-prev">
              <i style={{ fontSize: "3rem" }}
                className='fa fa-chevron-left fa-2x'
              />
            </span>
            <span className="icon nav-next">
              <i style={{ fontSize: "3rem" }}
                className='fa fa-chevron-right fa-2x'
              />
            </span>
            <span className="nav-close">
              <i style={{ fontSize: "3rem" }}
                className='fa fa-times fa-2x'
              />
            </span>
          </nav>
        </section>
      </div>
    </div>
  );
};

export default SlideshowGallery;
