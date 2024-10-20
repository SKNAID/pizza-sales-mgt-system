import React, { useState } from 'react';
import './styles.css';
import videoSrc from './BGV.mp4'; 
import BackgroundVideo from './BGVJS';

const KitchenAdmin = () => {
  const [stock, setStock] = useState({
    pizzaId: '',
    newStock: ''
  });

  const handleChange = (e) => {
    setStock({
      ...stock,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdateStock = (e) => {
    e.preventDefault();
    console.log('Stock updated:', stock);
    // API call to update stock
  };

  return (
    <BackgroundVideo videoSrc={videoSrc}>
    <div>
      <h2 style={{color:'white'}}>Kitchen Admin</h2>
      <form className='form_shit'>
        <input
          type="text"
          name="pizzaId"
          placeholder="Pizza ID"
          value={stock.pizzaId}
          onChange={handleChange}
        />
        <input
          type="text"
          name="newStock"
          placeholder="New Stock"
          value={stock.newStock}
          onChange={handleChange}
        />
        <button onClick={handleUpdateStock}>Update Stock</button>
      </form>
    </div>
    </BackgroundVideo>
  );
  

};

export default KitchenAdmin;
