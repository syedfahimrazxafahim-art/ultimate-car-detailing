import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { CLOUDINARY_ASSETS } from '../data';

interface FinalCTAProps {
  onBookClick: () => void;
}

export function FinalCTA({ onBookClick }: FinalCTAProps) {
  return (
    <section
      id="final-cta"
      className="relative bg-[#050505] py-28 sm:py-36 overflow-hidden border-t border-[#D4A72C]/20"
      aria-label="Call to Action"
    >
      {/* Cinematic Background with Restrained Gold Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={CLOUDINARY_ASSETS.finalCta}
          alt="Luxury vehicle detailing craftsmanship by Ultimate Auto Detailing in Los Angeles"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.15]"
          loading="lazy"
        />
        {/* Restrained Gold & Deep Black Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-[#050505]/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,167,44,0.12)_0%,transparent_70%)]" />
      </div>

      {/* Decorative Gold Border Line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-[#F5C542]/50 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Gold Emblem Sparkle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-10 h-10 rounded-full border border-[#D4A72C]/50 bg-[#050505]/80 flex items-center justify-center text-[#F5C542] mb-6 shadow-[0_0_15px_rgba(212,167,44,0.3)]"
        >
          <Sparkles className="w-5 h-5" />
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-[0.1em] text-white leading-tight max-w-3xl mb-6"
        >
          GIVE YOUR VEHICLE THE <span className="gold-gradient-text">ULTIMATE FINISH.</span>
        </motion.h2>

        {/* Supporting Line */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-sm sm:text-base md:text-lg text-[#C7C7C7] font-light max-w-2xl leading-relaxed mb-10"
        >
          Experience dedicated automotive care in Los Angeles. Reserve your appointment for paint correction, ceramic coating, or full auto detailing.
        </motion.p>

        {/* Metallic Gold Filled Button */}
        <motion.button
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          id="final-cta-book-button"
          type="button"
          onClick={onBookClick}
          className="px-10 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-[#F5C542] via-[#D4A72C] to-[#F5C542] text-[#050505] font-black text-xs sm:text-sm uppercase tracking-[0.24em] transition-all duration-300 shadow-[0_0_30px_rgba(212,167,44,0.45)] hover:shadow-[0_0_45px_rgba(245,197,66,0.8)] hover:scale-105 active:scale-98 cursor-pointer flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <span>BOOK YOUR DETAIL TODAY</span>
          <ArrowRight className="w-4 h-4 text-[#050505]" />
        </motion.button>
      </div>
    </section>
  );
}
