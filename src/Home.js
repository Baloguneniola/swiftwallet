import React from 'react';
import Navbar from './components/Navbar';
import StatusBar from './components/StatusBar';
import HeroSection from './components/HeroSection';
import BuiltForSpeed from './components/BuiltForSpeed';
import HowItWorks from './components/HowItWorks';
import MoneyInSteps from './components/MoneyInSteps';
import Testimonials from './components/TestimonialsSection';
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
      <Testimonials />
      <CTASection />
      <Footer />
    </>
  );
}

export default Home;