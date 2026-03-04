import React from 'react';
import Hero from '../components/wimbledon/Hero';
import ExitIntentPopup from '../components/wimbledon/ExitIntentPopup';
import PackageHighlights from '../components/wimbledon/PackageHighlights';
import HotelShowcase from '../components/wimbledon/HotelShowcase';
import Itinerary from '../components/wimbledon/Itinerary';
import PricingSection from '../components/wimbledon/PricingSection';
import CTASection from '../components/wimbledon/CTASection';
import Footer from '../components/wimbledon/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Hero />
      <PackageHighlights />
      <HotelShowcase />
      <Itinerary />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  );
}