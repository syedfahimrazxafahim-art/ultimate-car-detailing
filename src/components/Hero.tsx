import { motion } from 'motion/react';
import { ArrowDown, Sparkles } from 'lucide-react';
import { CLOUDINARY_ASSETS, BUSINESS_INFO } from '../data';

interface HeroProps {
  onBookClick: () => void;
  onViewServicesClick: () => void;
}

export function Hero({ onBookClick, onViewServicesClick }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#050505] pt-20"
      aria-label="Welcome to Ultimate Auto Detailing"
    >
      {/* Background Image with Cinematic Dark Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src={CLOUDINARY_ASSETS.showcaseHero}
          alt="Cinematic luxury automotive detailing studio presentation by Ultimate Auto Detailing in Los Angeles"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[0.6] contrast-[1.1]"
          loading="eager"
        />
        {/* Deep Black & Metallic Gold Vignette Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-[#050505]/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/50 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050505_80%)]" />
      </div>

      {/* Subtle Metallic Gold Light Streak */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#D4A72C]/40 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        {/* Subtle Location & Brand Quality Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none border border-[#D4A72C]/40 bg-[#050505]/80 backdrop-blur-md mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#F5C542]" />
          <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#C7C7C7]">
            {BUSINESS_INFO.location}
          </span>
        </motion.div>

        {/* Hero Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          id="hero-main-heading"
          className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-[0.08em] leading-[1.05] text-white max-w-4xl"
        >
          ULTIMATE SHINE.
          <br />
          <span className="gold-gradient-text">EXCEPTIONAL DETAIL.</span>
        </motion.h1>

        {/* Thin Gold Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-24 sm:w-32 h-[2px] bg-gradient-to-r from-transparent via-[#D4A72C] to-transparent my-6"
          aria-hidden="true"
        />

        {/* Supporting Copy */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-base sm:text-lg md:text-xl text-[#C7C7C7] max-w-2xl font-light leading-relaxed mb-10"
        >
          Premium auto detailing designed to restore, protect, and elevate your vehicle.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md sm:max-w-none"
        >
          {/* Primary CTA */}
          <button
            id="hero-primary-cta"
            type="button"
            onClick={onBookClick}
            className="w-full sm:w-auto px-8 sm:px-10 py-4 bg-gradient-to-r from-[#F5C542] via-[#D4A72C] to-[#F5C542] text-[#050505] font-extrabold text-xs sm:text-sm uppercase tracking-[0.22em] transition-all duration-300 shadow-[0_0_25px_rgba(212,167,44,0.4)] hover:shadow-[0_0_35px_rgba(245,197,66,0.7)] hover:scale-[1.02] active:scale-98 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            BOOK YOUR DETAIL
          </button>

          {/* Secondary CTA */}
          <button
            id="hero-secondary-cta"
            type="button"
            onClick={onViewServicesClick}
            className="w-full sm:w-auto px-8 sm:px-10 py-4 bg-[#050505]/70 text-[#FFFFFF] hover:text-[#F5C542] border border-[#D4A72C]/50 hover:border-[#F5C542] font-semibold text-xs sm:text-sm uppercase tracking-[0.22em] transition-all duration-300 hover:bg-[#111111]/80 hover:scale-[1.02] active:scale-98 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A72C]"
          >
            VIEW SERVICES
          </button>
        </motion.div>

        {/* Informative Fine Print Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 text-[11px] uppercase tracking-[0.18em] text-[#C7C7C7]/50"
        >
          Professional Detailing Studio • Hand Wash • Paint Correction • Ceramic Coating
        </motion.div>
      </div>

      {/* Down Scroll Anchor */}
      <a
        href="#brand-statement"
        id="hero-scroll-indicator"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-[#C7C7C7]/70 hover:text-[#D4A72C] transition-colors p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A72C]"
        aria-label="Scroll down to brand statement"
      >
        <ArrowDown className="w-5 h-5 animate-bounce text-[#D4A72C]" />
      </a>
    </section>
  );
}
