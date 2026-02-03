import React from 'react';
import { Button } from '../ui/Button';

/**
 * Contact CTA Section
 * Contact form CTA with background
 */
export const ContactSection: React.FC = () => {
  return (
    <section 
      className="relative py-20 md:py-32"
      style={{
        backgroundImage: 'url(/images/contact-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />
      
      <div className="relative z-10 container-fluid text-center">
        <h2 className="font-['Lora'] text-2xl md:text-4xl text-[#282C2F] mb-8 max-w-md mx-auto leading-snug">
          Contact us if you have any questions
        </h2>
        
        <Button>Contact</Button>
      </div>
    </section>
  );
};

export default ContactSection;
