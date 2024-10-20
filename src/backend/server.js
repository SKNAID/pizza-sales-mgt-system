const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sanu@123',
    database: 'pizzeria'
});

db.connect((err) => {
    if (err) {
        console.log('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Calculate total price and handle orders
app.post('/place-order', (req, res) => {
    const { pizzas } = req.body; // Array of pizzas

    let totalPrice = 0;

    const query = 'SELECT price FROM pizzas WHERE pizza_type_id = ? AND size = ?';

    const promises = pizzas.map(pizza => {
        return new Promise((resolve, reject) => {
            db.query(query, [pizza.pizza_type_id, pizza.size], (err, results) => {
                if (err) return reject(err);
                if (results.length > 0) {
                    const pizzaPrice = results[0].price;
                    totalPrice += pizzaPrice * pizza.quantity;
                }
                resolve();
            });
        });
    });

    Promise.all(promises)
        .then(() => {
            res.json({ totalPrice });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Failed to process the order' });
        });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
