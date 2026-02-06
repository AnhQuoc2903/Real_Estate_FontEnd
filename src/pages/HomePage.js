import React from 'react';
// Chúng ta sẽ tạo các component này ngay sau đây
import HeroSection from '../components/HeroSection';
import Services from '../components/Services';
import ServicesSection from '../components/ServicesSection';
import AboutSection from '../components/AboutSection';
import PartnerSection from '../components/PartnerSection';
import AboutInfoSection from '../components/AboutInfoSection';
import TestimonialsSection from '../components/TestimonialsSection';
import NewsSection from '../components/NewsSection';

const HomePage = () => {
    return (
        <div>
            <HeroSection />
            <ServicesSection />
            <AboutSection />
            <PartnerSection />
            <AboutInfoSection />
            <TestimonialsSection />
            <NewsSection />
            <Services />
        
        </div>
    );
};

export default HomePage;