import React, { useState, useEffect, lazy ,Suspense} from 'react';
import Home from './pages/Home/Home';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {

  const Orders = lazy(() => import('./pages/Orders/Orders'))

  return (
      <div>
        <Suspense >
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/orders" element={<Orders />} />
            <Route exact path="/dashboard" element={<Dashboard/>}/>

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
        </Suspense>
      </div>
  );
}

export default App;
