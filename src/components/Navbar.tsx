import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X, Phone } from 'lucide-react';
import { Logo } from './Logo';
import { BUSINESS_INFO } from '../data';

interface NavbarProps {
  onBookClick: () => void;
  activeSection: string;
}

const NAV_LINKS = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'gallery', label: 'Gallery', href: '#gallery' },
  { id: 'reviews', label: 'Reviews', href: '#reviews' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export function Navbar({ onBookClick, activeSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll and handle Escape key for mobile menu
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      // Focus close button on open
      setTimeout(() => closeButtonRef.current?.focus(), 100);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setMobileMenuOpen(false);
          menuButtonRef.current?.focus();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#050505]/95 backdrop-blur-md border-b border-[#D4A72C]/20 shadow-2xl py-3'
          : 'bg-[#050505]/80 backdrop-blur-sm border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          id="navbar-brand-link"
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A72C] rounded transition-opacity hover:opacity-90"
          aria-label="Ultimate Auto Detailing Home"
        >
          <Logo size="md" />
        </a>

        {/* Desktop Navigation */}
        <nav
          id="desktop-nav"
          className="hidden lg:flex items-center gap-7 xl:gap-8"
          aria-label="Primary Navigation"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                id={`nav-link-${link.id}`}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`relative text-xs xl:text-sm font-medium uppercase tracking-[0.14em] transition-colors duration-200 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A72C] ${
                  isActive ? 'text-[#D4A72C] font-semibold' : 'text-white hover:text-[#D4A72C]'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#D4A72C] to-[#F5C542]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href={`tel:${BUSINESS_INFO.phoneRaw}`}
            id="navbar-phone-link"
            className="flex items-center gap-2 text-xs xl:text-sm text-[#C7C7C7] hover:text-white transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A72C] rounded px-2 py-1"
            title={`Call Ultimate Auto Detailing: ${BUSINESS_INFO.phone}`}
          >
            <Phone className="w-3.5 h-3.5 text-[#D4A72C]" />
            <span className="font-semibold tracking-wider">{BUSINESS_INFO.phone}</span>
          </a>

          {/* Facebook Link with Icon */}
          <a
            href={BUSINESS_INFO.facebook}
            target="_blank"
            rel="noopener noreferrer"
            id="navbar-facebook-link"
            className="w-8 h-8 rounded-sm bg-[#111111] border border-[#D4A72C]/30 hover:border-[#F5C542] text-[#C7C7C7] hover:text-[#F5C542] flex items-center justify-center transition-all duration-200 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A72C]"
            title="Follow Ultimate Auto Detailing on Facebook"
            aria-label="Ultimate Auto Detailing on Facebook (opens in new tab)"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>

          <button
            id="navbar-book-now-button"
            type="button"
            onClick={onBookClick}
            className="relative px-5 py-2.5 bg-gradient-to-r from-[#F5C542] to-[#D4A72C] text-[#050505] font-bold text-xs uppercase tracking-[0.16em] rounded-none hover:from-[#FFFFFF] hover:to-[#F5C542] transition-all duration-300 shadow-[0_0_15px_rgba(212,167,44,0.3)] hover:shadow-[0_0_20px_rgba(245,197,66,0.6)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95 cursor-pointer"
          >
            Book Now
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            id="navbar-mobile-book-shortcut"
            type="button"
            onClick={onBookClick}
            className="px-3 py-1.5 bg-[#F5C542] text-[#050505] font-bold text-[11px] uppercase tracking-wider rounded-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Book
          </button>

          <button
            ref={menuButtonRef}
            id="mobile-menu-toggle-button"
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 text-white hover:text-[#D4A72C] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A72C]"
            aria-label="Open mobile navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Full-Screen Overlay Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 bg-[#050505] flex flex-col justify-between px-6 pt-6 pb-8 h-[100dvh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            {/* Top Bar inside mobile menu */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <Logo size="sm" />
              <button
                ref={closeButtonRef}
                id="mobile-menu-close-button"
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-white hover:text-[#D4A72C] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A72C]"
                aria-label="Close navigation menu"
              >
                <X className="w-7 h-7" />
              </button>
            </div>

            {/* Navigation Links list */}
            <nav className="flex flex-col gap-6 my-auto py-8">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    id={`mobile-nav-link-${link.id}`}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className={`text-2xl font-display font-semibold uppercase tracking-[0.15em] transition-colors py-2 flex items-center justify-between border-b border-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A72C] ${
                      isActive ? 'text-[#D4A72C]' : 'text-white hover:text-[#D4A72C]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#D4A72C]"></span>
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Mobile Bottom CTAs & Contact Info */}
            <div className="flex flex-col gap-4 pt-6 border-t border-white/10">
              <button
                id="mobile-menu-book-button"
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookClick();
                }}
                className="w-full py-4 bg-gradient-to-r from-[#F5C542] to-[#D4A72C] text-[#050505] font-bold text-sm uppercase tracking-[0.2em] text-center hover:from-white hover:to-[#F5C542] transition-colors shadow-lg cursor-pointer"
              >
                Book Your Detail
              </button>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#C7C7C7]">
                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="flex items-center gap-2 hover:text-[#D4A72C] transition-colors py-2"
                >
                  <Phone className="w-4 h-4 text-[#D4A72C]" />
                  <span>{BUSINESS_INFO.phone}</span>
                </a>

                <a
                  href={BUSINESS_INFO.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#C7C7C7] hover:text-[#F5C542] transition-colors py-2"
                  aria-label="Ultimate Auto Detailing on Facebook"
                >
                  <svg className="w-4 h-4 fill-current text-[#D4A72C]" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span>Follow on Facebook</span>
                </a>

                <span className="text-[#C7C7C7]/60">{BUSINESS_INFO.location}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
