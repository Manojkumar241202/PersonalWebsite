import React, { useRef, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale, Filler } from 'chart.js';
import 'chartjs-adapter-date-fns';
import axios from 'axios';

// Register all required components, including Filler
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale, Filler);
const platform_url ={
  CODEFORCES: 'codeforces.com',
  CODECHEF: 'codechef.com',
  LEETCODE: 'leetcode.com',
  ATCODER: 'atcoder.jp'
}
const RatingGraphCustom = ({ platform = 'codeforces'}) => {
  const [ratingData,setRatingData] = useState([]);
  const chartRef = useRef(null);  // Create a reference for the chart
  // Fetch data only when the component is mounted
  useEffect(() => {
    const fetchRatingGraph = async () => {
      let ratings = {}
      try {
        if (sessionStorage.getItem(`ratings`)){
          ratings= JSON.parse(sessionStorage.getItem(`ratings`));
        }
        else{
          const response = await axios.get('/api/ratings');
          ratings= response.data;
          sessionStorage.setItem(`ratings`,JSON.stringify(response.data));
        }
        let platform_rating = ratings.resources[platform_url[platform.toUpperCase()]];
        setRatingData(platform_rating['data']);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchRatingGraph();
  }, [platform]);
  const footerColor = (context) => {
    const tooltipItems = context.tooltipItems;
    if (tooltipItems.length === 0){
      return;
    }
    const entry = ratingData[tooltipItems[0].dataIndex];
    const oldRating = entry.old_rating;
    const newRating = entry.new_rating;
    const change = newRating - (oldRating === null ? 0 : oldRating);
    const color = change >= 0 ? 'green' : 'red';
    // Build the custom tooltip text
    return color;
  };
  const footer = (context) => {
    if (!context ){
      return;
    }
    const entry = ratingData[context[0].dataIndex];
    const oldRating = entry.old_rating;
    const newRating = entry.new_rating;
    const change = newRating - (oldRating === null ? 0 : oldRating);
    console.log(ratingData[context[0].dataIndex]);
    const changeSign = change >= 0 ? '+' : '';
    // Build the custom tooltip text
    return [`${changeSign}${change} (Change)`];
  };

  const afterBody = (context) => {
    const entry = ratingData[context[0].dataIndex]["values"];
    const newRating = entry.new_rating;
    const date = ratingData[context[0].dataIndex]["date"];
    const rank = ratingData[context[0].dataIndex]["place"];
    // Format the date in "MMM d, yyyy" format
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    return [
      `${formattedDate}`,
      `Rank: ${rank}`,
      `Rating: ${newRating}`
    ];
  };

  const title = (context) => {
    const contestName = ratingData[context[0].dataIndex]["name"];
    const maxLineLength = 20;
    return contestName.length > maxLineLength 
      ? contestName.match(new RegExp('.{1,' + maxLineLength + '}', 'g')).join('\n')  // Insert line breaks
      : contestName;
  };

  // Function to determine gradient color based on the current rating
  const getGradientColor = (rating) => {
    if (rating < 1200) return 'grey';
    if (rating < 1400) return 'lightgreen';
    if (rating < 1600) return 'darkgreen';
    if (rating < 1800) return 'blue';
    if (rating < 2000) return 'purple';
    if (rating < 2200) return 'yellow';
    if (rating < 2400) return 'darkyellow';
    if (rating < 2600) return 'red';
    if (rating < 3000) return 'darkred';
    return 'brown';
  };

  const data = {
    labels: ratingData.map(entry => entry["date"]),  // X-axis labels (contest dates)
    datasets: [
      {
        label: `${platform.charAt(0).toUpperCase() + platform.slice(1)} Rating`,  // Dynamic label based on platform
        data: ratingData.map(entry => ({ x: entry.date, y: entry["values"]["new_rating"] })),  // Map contest ratings
        borderColor: '#4bc0c0',
        pointHoverRadius: 5,
        backgroundColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
        
          if (!chartArea) {
            return null;
          }
        
          // Check if ratingData is populated
          if (ratingData.length === 0) {
            return 'rgba(76, 161, 175, 0.1)'; // Fallback color if no data
          }
        
          // Get the last rating (current rating)
          const currentRating = ratingData[ratingData.length - 1]["values"]["new_rating"];
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, getGradientColor(currentRating));
          gradient.addColorStop(1, 'rgba(76, 161, 175, 0.1)');
        
          return gradient;
        },
        fill: true,  // Enable the area fill under the line
      }
    ],
  };

  const isSmallScreen = window.innerWidth <= 568;

  const options = {
    responsive: true,
    maintainAspectRatio: !isSmallScreen,
    interaction: {
      intersect: false,
      event: ["click", "onmousemove"],
      mode: 'nearest',
      axis: 'xy'
    },
    plugins: {
      tooltip: {
        enabled: true,
        footerColor: footerColor,
        // titleColor: "#ffb400",
        callbacks: {
          title: title,
          afterBody: afterBody,
          label: () => '',
          footer: footer,
          enabled: false, // Disable the default tooltip
        },
        // external: (context) => {
        //   const tooltipEl = context.tooltip?.el;
        //   if (tooltipEl && context.chart.canvas) {
        //     context.chart.canvas.addEventListener('mouseleave', () => {
        //       context.tooltip.setActiveElements([], { x: 0, y: 0 });
        //       context.chart.update();
        //     });
        //   }
        // },
      },
      legend: {
        display: false
      },
      title: {
        color: "#ffb400",
        display: true,
        text: `${platform.charAt(0).toUpperCase() + platform.slice(1)} Contest Ratings Over the Years`,
        // text: ` Rating Progess `,
        align: 'center',  
        padding: {
          left: 50,
          bottom: 20,           // Adjust as necessary for spacing between the title and the chart
        },
        font: {
          size: 13,             // Set the title font size
          weight: 'bold',       // Optional: set bold for title
        }
      },
      displayColors: true
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'year',  // Force the X-axis to display in terms of years
          tooltipFormat: 'MMM d, yyyy',  // Tooltip format for contest dates
        },
        title: {
          display: true,
          text: 'Year',
          color: '#333',  // Darker color for X-axis title
          font: {
            weight: 'bold',  // Optional bold font for the axis title
            size: 14,        // Font size for the axis title
          },
        },
        ticks: {
          color: '#616161',  // Make the Y-axis font color darker
          font: {
            weight: 'bold',  // Make the font bold (optional)
            size: 12,
          },
          autoSkip: true,  // Skip some labels if they overlap
          maxRotation: 0,  // Prevent rotation of labels
          major: {
            enabled: true, // Highlight major ticks (years)
          },
          stepSize: 1,  // Ensure a tick is placed for each year
          callback: function (value) {
            const date = new Date(value);
            return date.getFullYear();  // Show only years
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Ratings',
          color: '#333',  // Darker color for X-axis title
          font: {
            weight: 'bold',  // Optional bold font for the axis title
            size: 14,        // Font size for the axis title
          },
        },
        ticks: {
          color: '#616161',  // Make the Y-axis font color darker
          font: {
            weight: 'bold',  // Make the font bold (optional)
            size: 12,
          },
        },
        beginAtZero: false,
      },
    },
  };

  return (
    // style={{
    //   height: '500px',
    //   width: '1000px'
    // }}
    <div className= "chart-container">
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default RatingGraphCustom;
