import React, { useState, useEffect, lazy } from 'react';
import Home from './pages/Home/Home';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';

function App() {

  const Orders = lazy(() => import('./pages/Orders/Orders'))
  
  return (
    <>
      {" "}
      <div>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/orders" element={<Orders />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
