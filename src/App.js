import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CounterAdmin from './components/CounterAdmin';
import KitchenAdmin from './components/KitchenAdmin';
import BusinessHome from './components/BusinessHome';
import Home from './components/Home';
import BillPage from './components/BillPage';
import Trends from './components/Trends';
import Percentage from './components/percentage';
import BestAndWorstSellers from './components/bestworst';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/counter" element={<CounterAdmin />} />
          <Route path="/bill" element={<BillPage />} />
          <Route path="/kitchen" element={<KitchenAdmin />} />
          <Route path="/analyst" element={<BusinessHome />} />
          <Route path="/trends" element={<Trends />} />
          <Route path="/percentage-sales" element={<Percentage />} />
          <Route path="/best-worst-sales" element={<BestAndWorstSellers />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
