import React from 'react';
import Hero from '../../components/HomeComp/Hero';
import Features from '../../components/HomeComp/Features';
import Testimonials from '../../components/HomeComp/Testimonials';
import PricingPlans from '../../components/HomeComp/PricingPlans';
import Footer from '../../components/HomeComp/Footer';
import AboutGym from '../../components/HomeComp/AboutGym';
import Navbar from '../../components/shared/Navbar/Navbar';

const App = () => {
    return (
        <div>
        <Navbar/>
            <Hero />
            <Features />
            <AboutGym />
            <Testimonials />
            <PricingPlans />
            <Footer />
        </div>
    );
};

export default App;

