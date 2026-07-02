import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import StatusBar from './components/StatusBar';
import HeroSection from './components/HeroSection';
import BuiltForSpeed from './components/BuiltForSpeed';
import HowItWorks from './components/HowItWorks';
import MoneyInSteps from './components/MoneyInSteps';
import Testimonials from './components/TestimonailsSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <StatusBar />
      <HeroSection />
      <BuiltForSpeed />
      <HowItWorks />
      <MoneyInSteps />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  );
}

export default App;