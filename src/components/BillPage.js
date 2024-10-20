import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation and useNavigate
import videoSrc from './BGV.mp4'; 
import BackgroundVideo from './BGVJS';
import './styles.css';

const BillPage = () => {
  const location = useLocation(); // Get passed state (order details)
  const { totalPrice, orders } = location.state; // Destructure the passed state
  const navigate = useNavigate(); // Hook to navigate back to CounterAdmin

  const handlePaidClick = () => {
    // Redirect back to CounterAdmin page
    navigate('/counter');
  };

  return (
    <BackgroundVideo videoSrc={videoSrc}>
      <div className="bill-page-container">
        <div className="bill-page">
          <h2 style={{color:'white'}}>Bill Summary</h2>
          <p style={{color:'white'}}>Total Amount: ${totalPrice}</p>
          <h3 style={{color:'white'}}>Order Details</h3>
          <ul className='payment' style={{color:'red'}}>
            {orders.map((order, index) => (
            <li key={index}>
            Pizza ID: {order.pizzaId}, Size: {order.size}, Quantity: {order.quantity}
            </li>
            ))}
          </ul>
          <button onClick={handlePaidClick}>Paid</button>
      </div>
    </div>    
  </BackgroundVideo>
  );
};

export default BillPage;
