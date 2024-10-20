import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2'; // Only import Pie chart
import axios from 'axios'; // Import axios
import 'chart.js/auto'; // This imports all the chart types automatically
import './styles.css'; // Import your CSS file
import videoSrc from './bgv4.mp4'; // Adjust the path if needed
import BackgroundVideo from './BGVJS';

const apiUrl = 'http://localhost:3000'; // Change this to match your backend port if needed

const BestAndWorstSellers = () => {
  // New states for top 5 best and bottom 5 worst sellers
  const [top5BestSellers, setTop5BestSellers] = useState([]);
  const [bottom5WorstSellers, setBottom5WorstSellers] = useState([]);

  // Fetch data from API using axios
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching top 5 best sellers and bottom 5 worst sellers
        const [bestSellersResponse, worstSellersResponse] = await Promise.all([
          axios.get(`${apiUrl}/top-5-best-sellers`),
          axios.get(`${apiUrl}/bottom-5-worst-sellers`),
        ]);

        setTop5BestSellers(bestSellersResponse.data);
        setBottom5WorstSellers(worstSellersResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Prepare chart data for top 5 best sellers
  const top5BestSellersData = {
    labels: top5BestSellers.map(item => item.name),
    datasets: [
      {
        label: 'Top 5 Best Sellers',
        data: top5BestSellers.map(item => item.total_pizzas_sold),
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
      },
    ],
  };

  // Prepare chart data for bottom 5 worst sellers
  const bottom5WorstSellersData = {
    labels: bottom5WorstSellers.map(item => item.name),
    datasets: [
      {
        label: 'Bottom 5 Worst Sellers',
        data: bottom5WorstSellers.map(item => item.total_pizzas_sold),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(54, 162, 235, 0.6)',
        ],
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: 'left', // 'top', 'left', 'bottom' are also valid options
        labels: {
          font: {
            size: 14, // Adjust the size
            family: 'Arial', // Set your preferred font family
          },
          color: 'white', // Adjust the color of the labels
          padding: 20, // Adjust padding between labels
        },
      },
      tooltip: {
        bodyFont: {
          size: 16, // Tooltip text font size
        },
        titleFont: {
          size: 18, // Tooltip title font size
        },
      },
    },
  };

  return (
    <BackgroundVideo videoSrc={videoSrc}>
      <div>
        <h1 style={{ color: 'white' }}>Pizza Sales Dashboard</h1>

        <div className="charts-container">
          <div className="chart-container-bw">
            <h5>Top 5 Best Sellers</h5>
            <Pie data={top5BestSellersData} options={chartOptions}/>
          </div>

          <div className="chart-container-bw">
            <h5>Bottom 5 Worst Sellers</h5>
            <Pie data={bottom5WorstSellersData} options={chartOptions}/>
          </div>
        </div>
      </div>
    </BackgroundVideo>
  );
};

export default BestAndWorstSellers;
