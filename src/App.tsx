import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrandStatement } from './components/BrandStatement';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { WhyUsSection } from './components/WhyUsSection';
import { ShowcaseSection } from './components/ShowcaseSection';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { BookingContactSection } from './components/BookingContactSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | null>(null);

  // Track active section for navigation highlighting
  useEffect(() => {
    const sectionIds = ['home', 'about', 'services', 'gallery', 'reviews', 'contact'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookClick = () => {
    scrollToSection('contact');
  };

  const handleViewServicesClick = () => {
    scrollToSection('services');
  };

  const handleSelectService = (serviceId: string) => {
    setPreselectedServiceId(serviceId);
    scrollToSection('contact');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#FFFFFF] flex flex-col selection:bg-[#D4A72C] selection:text-[#050505]">
      {/* Accessible Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#F5C542] focus:text-[#050505] focus:font-bold focus:shadow-lg"
      >
        Skip to main content
      </a>

      {/* Sticky Luxury Navbar */}
      <Navbar onBookClick={handleBookClick} activeSection={activeSection} />

      {/* Main Content Area */}
      <main id="main-content" className="flex-grow">
        {/* 1. Hero Section */}
        <Hero
          onBookClick={handleBookClick}
          onViewServicesClick={handleViewServicesClick}
        />

        {/* 2. Luxury Branding Section */}
        <BrandStatement />

        {/* 3. About Section */}
        <AboutSection />

        {/* 4. Services Section */}
        <ServicesSection onSelectService={handleSelectService} />

        {/* 5. Why Ultimate Auto Detailing */}
        <WhyUsSection />

        {/* 6. Detailing Showcase (Transformation Standards) */}
        <ShowcaseSection onBookClick={handleBookClick} />

        {/* 7. Gallery Section with Lightbox */}
        <GallerySection />

        {/* 8. Reviews Section with Slider */}
        <ReviewsSection />

        {/* 9. Booking / Estimate Section */}
        <BookingContactSection preselectedServiceId={preselectedServiceId} />

        {/* 10. Final CTA */}
        <FinalCTA onBookClick={handleBookClick} />
      </main>

      {/* Luxury Footer */}
      <Footer />
    </div>
  );
}
