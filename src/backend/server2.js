const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

// Create MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sanu@123',
  database: 'Past data',
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Total Revenue
app.get('/total-revenue', (req, res) => {
  const query = `
    SELECT ROUND(SUM(o.quantity * p.price), 2) AS total_revenue 
    FROM order_details AS o 
    JOIN pizzas AS p ON o.pizza_id = p.pizza_id
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching total revenue:', err);
      res.status(500).send('Error fetching total revenue');
    } else {
      res.json({ total_revenue: results[0].total_revenue });
    }
  });
});

// Average Order Value
app.get('/average-order-value', (req, res) => {
  const query = `
    SELECT ROUND(SUM(quantity * price) / COUNT(DISTINCT order_id), 2) AS average_order_value
    FROM order_details AS o
    JOIN pizzas AS p ON o.pizza_id = p.pizza_id
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching average order value:', err);
      res.status(500).send('Error fetching average order value');
    } else {
      res.json({ average_order_value: results[0].average_order_value });
    }
  });
});

// Total Pizzas Sold
app.get('/total-pizzas-sold', (req, res) => {
  const query = `
    SELECT SUM(quantity) AS total_pizzas_sold
    FROM order_details;
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching total pizzas sold:', err);
      res.status(500).send('Error fetching total pizzas sold');
    } else {
      res.json({ total_pizzas_sold: results[0].total_pizzas_sold });
    }
  });
});

// Average Pizzas Per Order
app.get('/average-pizza-per-order', (req, res) => {
  const query = `
    SELECT SUM(quantity)/COUNT(DISTINCT order_id) AS average_pizzas_per_order
    FROM order_details;
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching average pizzas per order:', err);
      res.status(500).send('Error fetching average pizzas per order');
    } else {
      res.json({ average_pizzas_per_order: results[0].average_pizzas_per_order });
    }
  });
});

// Daily Trends for Total Orders
app.get('/daily-order-trends', (req, res) => {
    const query = `
      SELECT 
        DAYNAME(date) AS DayOfWeek,
        COUNT(DISTINCT order_id) AS total_orders
      FROM orders
      GROUP BY DayOfWeek
      ORDER BY total_orders DESC;
    `;
  
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching daily trends:', err);
        res.status(500).send('Error fetching daily trends');
      } else {
        // If you need the abbreviated day names, you can add it in the client-side code
        res.json(results.map(row => ({
          DayOfWeek: row.DayOfWeek,
          AbbreviatedDayOfWeek: row.DayOfWeek.slice(0, 3), // Abbreviate on client-side
          total_orders: row.total_orders,
        })));
      }
    });
  });
  

// Hourly Trends for Total Orders
app.get('/hourly-order-trends', (req, res) => {
  const query = `
    SELECT 
      HOUR(time) AS Hour,
      COUNT(DISTINCT order_id) AS count
    FROM orders
    GROUP BY Hour
    ORDER BY Hour;
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching hourly trends:', err);
      res.status(500).send('Error fetching hourly trends');
    } else {
      res.json(results);
    }
  });
});

// Percentage Sales by Pizza Category
app.get('/percentage-sales-by-category', (req, res) => {
  const query = `
    SELECT 
      pt.category,
      SUM(od.quantity * p.price) AS revenue,
      ROUND(SUM(od.quantity * p.price) * 100 / (
        SELECT SUM(od2.quantity * p2.price)
        FROM pizzas AS p2
        JOIN order_details AS od2 ON od2.pizza_id = p2.pizza_id
      ), 2) AS percentage_sales
    FROM pizzas AS p
    JOIN pizza_types AS pt ON p.pizza_type_id = pt.pizza_type_id
    JOIN order_details AS od ON od.pizza_id = p.pizza_id
    GROUP BY pt.category
    ORDER BY percentage_sales DESC;
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching percentage sales by category:', err);
      res.status(500).send('Error fetching percentage sales by category');
    } else {
      res.json(results);
    }
  });
});

// Percentage Sales by Pizza Size
app.get('/percentage-sales-by-size', (req, res) => {
  const query = `
    SELECT 
      p.size,
      SUM(od.quantity * p.price) AS revenue,
      ROUND(SUM(od.quantity * p.price) * 100 / (
        SELECT SUM(od2.quantity * p2.price)
        FROM pizzas AS p2
        JOIN order_details AS od2 ON od2.pizza_id = p2.pizza_id
      ), 2) AS percentage_sales
    FROM pizzas AS p
    JOIN order_details AS od ON od.pizza_id = p.pizza_id
    GROUP BY p.size
    ORDER BY percentage_sales DESC;
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching percentage sales by size:', err);
      res.status(500).send('Error fetching percentage sales by size');
    } else {
      res.json(results);
    }
  });
});

// Total Pizzas Sold by Pizza Category
app.get('/total-pizzas-sold-by-category', (req, res) => {
  const query = `
    SELECT 
      pt.category,
      SUM(od.quantity) AS quantity_sold
    FROM pizzas AS p
    JOIN pizza_types AS pt ON p.pizza_type_id = pt.pizza_type_id
    JOIN order_details AS od ON od.pizza_id = p.pizza_id
    GROUP BY pt.category
    ORDER BY SUM(od.quantity) DESC;
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching total pizzas sold by category:', err);
      res.status(500).send('Error fetching total pizzas sold by category');
    } else {
      res.json(results);
    }
  });
});

// Top 5 Best Sellers by Total Pizzas Sold
app.get('/top-5-best-sellers', (req, res) => {
  const query = `
    SELECT 
      pt.name, 
      SUM(od.quantity) AS total_pizzas_sold
    FROM pizzas AS p
    JOIN pizza_types AS pt ON p.pizza_type_id = pt.pizza_type_id
    JOIN order_details AS od ON od.pizza_id = p.pizza_id
    GROUP BY pt.name
    ORDER BY total_pizzas_sold DESC
    LIMIT 5;
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching top 5 best sellers:', err);
      res.status(500).send('Error fetching top 5 best sellers');
    } else {
      res.json(results);
    }
  });
});

// Bottom 5 Worst Sellers by Total Pizzas Sold
app.get('/bottom-5-worst-sellers', (req, res) => {
  const query = `
    SELECT 
      pt.name, 
      SUM(od.quantity) AS total_pizzas_sold
    FROM pizzas AS p
    JOIN pizza_types AS pt ON p.pizza_type_id = pt.pizza_type_id
    JOIN order_details AS od ON od.pizza_id = p.pizza_id
    GROUP BY pt.name
    ORDER BY total_pizzas_sold ASC
    LIMIT 5;
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching bottom 5 worst sellers:', err);
      res.status(500).send('Error fetching bottom 5 worst sellers');
    } else {
      res.json(results);
    }
  });
});
// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
