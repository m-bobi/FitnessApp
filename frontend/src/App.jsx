import React, { useState, useEffect, lazy ,Suspense} from 'react';
import Home from './pages/Home/Home';
import './index.css'
import Aos from 'aos';
import "aos/dist/aos.css";
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Unauthorized from './components/Auth/Unauthorized';
import Class from './pages/Classes/Class'

function App() {


  const Products = lazy(() => import("./pages/Products/Products"));
  const Offers = lazy(() => import("./pages/Offers/Offers"));
  const Carts =lazy(() => import("./pages/Cart/Carts"));
  const SignIn = lazy(() => import("./components/SignIn/SignIn"));
  const SignUp = lazy(() => import("./components/SignUp/SignUp"));
  const Success = lazy(() => import("./components/Payments/Success"))
  const Cancelled = lazy(() => import("./components/Payments/Cancelled"));  const UserProfile = lazy(() => import("./pages/UserProfile/UserProfile"));
  const ProductDetails = lazy(() => import("./components/shared/ProductDetails/ProductDetails"));

  useEffect(() => {
    Aos.init({
      duration:1200,
      once: true
    })
  }, [])
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/UserCRUD" element={<User />} />
            <Route exact path="/orders" element={<Orders />} />
            <Route exact path="/products" element={<Products />} />
            <Route exact path="/trainers" element={<Trainers  />} />
            <Route exact path="/offers" element={<Offers />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            <Route exact path="/signin" element={<SignIn />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/cart" element={<Carts />} />
            <Route exact path="/success" element={<Success />} />
            <Route exact path="/cancelled" element={<Cancelled />} />
            <Route exact path="/userprofile" element={<UserProfile />} />
            <Route
              exact
              path="/productDetails/:id"
              element={<ProductDetails />}
            />

            <Route exact path="*" element={<Unauthorized />} />
          </Routes>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
