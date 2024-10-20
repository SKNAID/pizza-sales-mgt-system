import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2'; // Only import Pie chart
import axios from 'axios'; // Import axios
import 'chart.js/auto'; // This imports all the chart types automatically
import './styles.css'; // Import your CSS file
import videoSrc from './bgv4.mp4'; // Adjust the path if needed
import BackgroundVideo from './BGVJS';

const apiUrl = 'http://localhost:3000'; // Change this to match your backend port if needed

const Percentage = () => {
  // New states for percentage sales and total pizzas sold
  const [percentageSalesByCategory, setPercentageSalesByCategory] = useState([]);
  const [percentageSalesBySize, setPercentageSalesBySize] = useState([]);
  const [totalPizzasSoldByCategory, setTotalPizzasSoldByCategory] = useState([]);

  // Fetch data from API using axios
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching new data
        const [categorySalesResponse, sizeSalesResponse, totalSoldCategoryResponse] = await Promise.all([
          axios.get(`${apiUrl}/percentage-sales-by-category`),
          axios.get(`${apiUrl}/percentage-sales-by-size`),
          axios.get(`${apiUrl}/total-pizzas-sold-by-category`),
        ]);

        setPercentageSalesByCategory(categorySalesResponse.data);
        setPercentageSalesBySize(sizeSalesResponse.data);
        setTotalPizzasSoldByCategory(totalSoldCategoryResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Prepare chart data for percentage sales by category
  const percentageSalesByCategoryData = {
    labels: percentageSalesByCategory.map(item => item.category),
    datasets: [
      {
        label: 'Percentage Sales by Category',
        data: percentageSalesByCategory.map(item => item.percentage_sales),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
      },
    ],
  };

  // Prepare chart data for percentage sales by size
  const percentageSalesBySizeData = {
    labels: percentageSalesBySize.map(item => item.size),
    datasets: [
      {
        label: 'Percentage Sales by Size',
        data: percentageSalesBySize.map(item => item.percentage_sales),
        backgroundColor: [
          'rgba(255, 159, 64, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
      },
    ],
  };

  // Prepare chart data for total pizzas sold by category
  const totalPizzasSoldByCategoryData = {
    labels: totalPizzasSoldByCategory.map(item => item.category),
    datasets: [
      {
        label: 'Total Pizzas Sold by Category',
        data: totalPizzasSoldByCategory.map(item => item.quantity_sold),
        backgroundColor: [
          'rgba(255, 206, 86, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
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
      <h1 style={{color:'white'}}>Pizza Sales Dashboard</h1>
      
      <div className="charts-container">
        <div className="chart-container">
          <h5>Percentage Sales by Category</h5>
          <Pie data={percentageSalesByCategoryData} options={chartOptions} />
        </div>

        <div className="chart-container">
          <h5>Percentage Sales by Size</h5>
          <Pie data={percentageSalesBySizeData} options={chartOptions}/>
        </div>

        <div className="chart-container">
          <h5>Total Pizzas Sold by Category</h5>
          <Pie data={totalPizzasSoldByCategoryData} options={chartOptions}/>
        </div>
      </div>
    </div>
    </BackgroundVideo>
  );
};

export default Percentage;
