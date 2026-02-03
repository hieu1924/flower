import React from 'react';
import { Header, Footer } from '../components/layout';
import {
  HeroSection,
  FeaturesSection,
  HowItWorksSection,
  BestsellersSection,
  DiscountBanner,
  ReviewsSection,
  AboutSection,
  ContactSection,
  AppDownloadSection,
  InstagramSection,
} from '../components/features';

/**
 * Home Page
 * Main landing page for Flowers Store
 * Implements all sections from Figma design
 */
const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection />
        
        {/* Features Section */}
        <FeaturesSection />
        
        {/* How It Works Section */}
        <HowItWorksSection />
        
        {/* Bestsellers Section */}
        <BestsellersSection />
        
        {/* Discount Banner */}
        <DiscountBanner />
        
        {/* Reviews Section */}
        <ReviewsSection />
        
        {/* About Section */}
        <AboutSection />
        
        {/* Contact Section */}
        <ContactSection />
        
        {/* App Download Section */}
        <AppDownloadSection />
        
        {/* Instagram Section */}
        <InstagramSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
