import React, { useState } from 'react';
import axios from 'axios';
import videoSrc from './BGV.mp4';
import BackgroundVideo from './BGVJS';
import './styles.css';

const CounterAdmin = () => {
    const [pizzas, setPizzas] = useState([]);
    const [pizzaTypeId, setPizzaTypeId] = useState('');
    const [size, setSize] = useState('');
    const [quantity, setQuantity] = useState('');
    const [totalBill, setTotalBill] = useState(null);

    const addPizzaToOrder = () => {
        if (pizzaTypeId && size && quantity) {
            const newPizza = {
                pizza_type_id: pizzaTypeId,
                size,
                quantity: parseInt(quantity)
            };
            setPizzas([...pizzas, newPizza]);
            // Clear the input fields
            setPizzaTypeId('');
            setSize('');
            setQuantity('');
        }
    };

    const placeOrder = () => {
        axios.post('http://localhost:5000/place-order', { pizzas })
            .then(response => {
                setTotalBill(response.data.totalPrice);
            })
            .catch(error => {
                console.error('Error placing the order:', error);
            });
    };

    return (
        <BackgroundVideo videoSrc={videoSrc}>
        <div className="order-container">
    <div className="pizza-order-box">
        <h2 style={{color:'white'}}>Pizza Order</h2>
        <div>
            <label>Pizza Type ID:</label>
            <input
                type="text"
                value={pizzaTypeId}
                onChange={(e) => setPizzaTypeId(e.target.value)}
            />
        </div>
        <div>
            <label>Size:</label>
            <select value={size} onChange={(e) => setSize(e.target.value)}>
                <option value="">Select Size</option>
                <option value="S">Small</option>
                <option value="M">Medium</option>
                <option value="L">Large</option>
                <option value="XL">Extra Large</option>
                <option value="XXL">Double Extra Large</option>
            </select>
        </div>
        <div>
            <label>Quantity:</label>
            <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
            />
        </div>
        <button onClick={addPizzaToOrder}>Add Pizza</button>
    </div>

    <div className="current-order-box">
        <h2 style={{color:'white'}}>Current Order:</h2>
        <ul>
            {pizzas.map((pizza, index) => (
                <li key={index}>
                    {pizza.pizza_type_id} ({pizza.size}) - {pizza.quantity}x
                </li>
            ))}
        </ul>
        <button onClick={placeOrder}>Place Order</button>

        {totalBill !== null && (
            <div className="total-bill">
                <h3>Total Bill: ${totalBill}</h3>
            </div>
        )}
    </div>
</div>

        </BackgroundVideo>
    );
};

export default CounterAdmin;
