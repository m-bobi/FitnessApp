import React, { useState, useEffect, lazy ,Suspense} from 'react';
import Home from './pages/Home/Home';
import './index.css'
import Aos from 'aos';
import "aos/dist/aos.css";
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Unauthorized from './components/Auth/Unauthorized';
function App() {


  const Class = lazy(() => import("./pages/Classes/Class"));
  const Carts =lazy(() => import("./pages/Cart/Carts"));
  const SignIn = lazy(() => import("./components/SignIn/SignIn"));
  const SignUp = lazy(() => import("./components/SignUp/SignUp"));
  const Success = lazy(() => import("./components/Payments/Success"))
  const Cancelled = lazy(() => import("./components/Payments/Cancelled"));
  const UserProfile = lazy(() => import("./pages/UserProfile/UserProfile"));
  const ProductDetails = lazy(() => import("./components/shared/ProductDetails/ProductDetails"));
  const Products = lazy(()=> import("./pages/Products/Products"));

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
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path='/class' element={<Class/>} />
            <Route exact path="/signin" element={<SignIn />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/cart" element={<Carts />} />
            <Route exact path="/success" element={<Success />} />
            <Route exact path="/cancelled" element={<Cancelled />} />
            <Route exact path="/userprofile" element={<UserProfile />} />
            <Route exact path='/products' element={<Products/>} />
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
