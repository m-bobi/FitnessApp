import React, { useState, useEffect } from 'react';
import Home from './pages/Home/Home';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';

function App() {


  return (
    <>
      {" "}
      <div>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </div>
      <main>
        <div className="h-[40000px]"></div>
      </main>
    </>
  );
}

export default App;
