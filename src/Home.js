import React from 'react';
import Navbar from './components/Navbar';
import StatusBar from './components/StatusBar';
import HeroSection from './components/HeroSection';
import BuiltForSpeed from './components/BuiltForSpeed';
import HowItWorks from './components/HowItWorks';
import MoneyInSteps from './components/MoneyInSteps';
import Reviews from './components/ReviewsSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

function Home() {
  return (
    <>
      <Navbar />
      <StatusBar />
      <HeroSection />
      <BuiltForSpeed />
      <HowItWorks />
      <MoneyInSteps />
      <Reviews />
      <CTASection />
      <Footer />
    </>
  );
}

export default Home;