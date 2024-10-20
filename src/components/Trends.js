import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Line } from 'react-chartjs-2'; // Import Bar chart
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement, // Add BarElement for the Bar chart
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './styles.css';
import videoSrc from './bgv4.mp4'; // Adjust the path if needed
import BackgroundVideo from './BGVJS';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement, // Register BarElement
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Trends = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [averageOrderValue, setAverageOrderValue] = useState(0);
  const [totalPizzasSold, setTotalPizzasSold] = useState(0);
  const [avgPizzaPerOrder, setAvgPizzaPerOrder] = useState(0);
  const [dailyOrderTrends, setDailyOrderTrends] = useState([]);
  const [hourlyOrderTrends, setHourlyOrderTrends] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          axios.get('http://localhost:3000/total-revenue'),
          axios.get('http://localhost:3000/average-order-value'),
          axios.get('http://localhost:3000/total-pizzas-sold'),
          axios.get('http://localhost:3000/average-pizza-per-order'),
          axios.get('http://localhost:3000/daily-order-trends'),
          axios.get('http://localhost:3000/hourly-order-trends'),
        ]);

        setTotalRevenue(responses[0].data.total_revenue);
        setAverageOrderValue(responses[1].data.average_order_value);
        setTotalPizzasSold(responses[2].data.total_pizzas_sold);
        setAvgPizzaPerOrder(responses[3].data.average_pizzas_per_order);
        setDailyOrderTrends(responses[4].data);
        setHourlyOrderTrends(responses[5].data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const dailyLabels = dailyOrderTrends.map(item => item.DayOfWeek);
  const dailyData = dailyOrderTrends.map(item => item.total_orders);

  const hourlyLabels = hourlyOrderTrends.map(item => `${item.Hour}:00`);
  const hourlyData = hourlyOrderTrends.map(item => item.count);

  const dailyTrendData = {
    labels: dailyLabels,
    datasets: [
      {
        label: 'Total Orders by Day of Week',
        data: dailyData,
        backgroundColor: 'rgba(75, 192, 192, 0.5)', // Bar color
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const hourlyTrendData = {
    labels: hourlyLabels,
    datasets: [
      {
        label: 'Hourly Order Trends',
        data: hourlyData,
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
    ],
  };

  const ChartOptions = {
    responsive: true,
    scales: {
      x: {

        ticks: {
          color: 'white', // Color for the X-axis ticks
        },
      },
      y: {
        ticks: {
          color: 'white', // Color for the Y-axis ticks
        }
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'white', // Color for legend labels
        },
      },
    },
  };
  
  

  return (
    <BackgroundVideo videoSrc={videoSrc}>
    <div className="trends-container">
      <h2 style={{color:'white'}}>Trends Overview</h2>
      
      <div className="metrics">
        <div className="metric">Total Revenue: ${totalRevenue}</div>
        <div className="metric">Average Order Value: ${averageOrderValue}</div>
        <div className="metric">Total Pizzas Sold: {totalPizzasSold}</div>
        <div className="metric">Avg Pizza/Order: {avgPizzaPerOrder}</div>
      </div>

      <div className="trends-graphs">
        <div className="daily-trends">
          <h3>Order Trends by Day (Histogram)</h3>
          <Bar
            data={dailyTrendData}
            options={{
              responsive: true,
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Day of Week',
                    color: 'white'
                  },
                  ticks: {
                    color: 'white', // Color for the X-axis ticks
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: 'Total Orders',
                    color: 'white'
                  },
                  ticks: {
                    color: 'white', // Color for the X-axis ticks
                  },
                },
              },
              plugins: {
                legend: {
                  labels: {
                    color: 'white', // Color for legend labels
                  },
                },
              },
            }}
        />
        </div>

        <div className="hourly-trends">
          <h3>Hourly Order Trends</h3>
          <Line data={hourlyTrendData} options={ChartOptions}/>
        </div>
      </div>
    </div>
    </BackgroundVideo>
  );
};

export default Trends;
