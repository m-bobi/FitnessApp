import React, { useState, useEffect, lazy ,Suspense} from 'react';
import Home from './pages/Home/Home';
import './index.css'
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {

  const User = lazy(() => import("./pages/Users/Users"));
  const Orders = lazy(() => import('./pages/Orders/Orders'))
  const Trainers = lazy(() => import('./pages/Trainers/Trainers'))
  const Products = lazy(() => import("./pages/Products/Products"));
  const Offers = lazy(() => import("./pages/Offers/Offers"));
  const SignIn = lazy(() => import("./components/SignIn/SignIn"));
  const SignUp = lazy(() => import("./components/SignUp/SignUp"));
  // const EditTrainers = lazy(() => import('./components/TrainersCrud/EditTrainer'))
  return (
    <div>
      <Suspense>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/UserCRUD" element={<User />} />
            <Route exact path="/orders" element={<Orders />} />
            <Route exact path="/products" element={<Products/>} />
            <Route exact path="/trainers" element={<Trainers />} />
            <Route exact path="/offers" element={<Offers />} />
            {/* <Route exact path="/editTrainer/:id" element={<EditTrainers />} /> */}
            <Route exact path="/dashboard" element={<Dashboard  />}  />
            <Route exact path="/signIn" element={<SignIn  />}  />
            <Route exact path="/signUp" element={<SignUp  />}  />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
