import { Phone, Mail, MapPin } from 'lucide-react';
import { Logo } from './Logo';
import { BUSINESS_INFO } from '../data';

export function Footer() {
  const currentYear = 2026;

  return (
    <footer
      id="main-footer"
      className="bg-[#050505] text-[#C7C7C7] border-t border-[#D4A72C]/20 pt-16 pb-12"
      aria-label="Footer Navigation and Information"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/5 items-start">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <Logo size="md" />
            <p className="text-xs sm:text-sm text-[#C7C7C7]/80 font-light leading-relaxed max-w-sm">
              Luxury automotive detailing and protection studio based in Los Angeles, California. Dedicated to elevating your vehicle's aesthetic through precision craftsmanship.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#D4A72C]">
              <MapPin className="w-3.5 h-3.5" />
              <span>{BUSINESS_INFO.location}</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white block">
              Navigation
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#home" className="hover:text-[#D4A72C] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#D4A72C] transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#D4A72C] transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#D4A72C] transition-colors">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#D4A72C] transition-colors">
                  Reviews
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#D4A72C] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social Links */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white block">
              Direct Contact
            </span>

            <div className="space-y-2.5 text-xs">
              <div>
                <span className="text-[10px] text-[#C7C7C7]/60 uppercase tracking-widest block">Phone</span>
                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="text-white hover:text-[#D4A72C] font-semibold transition-colors inline-block mt-0.5"
                >
                  {BUSINESS_INFO.phone}
                </a>
              </div>

              <div>
                <span className="text-[10px] text-[#C7C7C7]/60 uppercase tracking-widest block">Email</span>
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="text-white hover:text-[#D4A72C] transition-colors inline-block mt-0.5 break-all"
                >
                  {BUSINESS_INFO.email}
                </a>
              </div>
            </div>

            {/* Social Accounts (Facebook & Instagram Only) */}
            <div className="pt-2">
              <span className="text-[10px] text-[#C7C7C7]/60 uppercase tracking-widest block mb-2">
                Follow Official Channels
              </span>
              <div className="flex items-center gap-3">
                {/* Facebook */}
                <a
                  href={BUSINESS_INFO.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="footer-facebook-link"
                  className="w-9 h-9 bg-[#111111] border border-white/10 hover:border-[#D4A72C] text-[#C7C7C7] hover:text-[#D4A72C] flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A72C]"
                  aria-label="Ultimate Auto Detailing on Facebook (opens in new tab)"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href={BUSINESS_INFO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="footer-instagram-link"
                  className="w-9 h-9 bg-[#111111] border border-white/10 hover:border-[#D4A72C] text-[#C7C7C7] hover:text-[#D4A72C] flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A72C]"
                  aria-label="Ultimate Auto Detailing on Instagram (opens in new tab)"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#C7C7C7]/60">
          <div>
            &copy; {currentYear} Ultimate Auto Detailing. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Los Angeles, California</span>
            <span>•</span>
            <span>Car Washing & Auto Detailing</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
