import React from "react";
import { Link } from "react-router-dom";
import { About, Hero, Navbar, Badges } from '../components';

function LandingPage() {
    return (
        <div className='relative z-0 bg-primary'>
            <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
                <Navbar />
                <Hero />
            </div>
            <About />
            <Badges />
        </div>
    );
}

export default LandingPage;