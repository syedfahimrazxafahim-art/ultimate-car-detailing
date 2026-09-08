import { motion } from 'motion/react';
import { Logo } from './Logo';

export function BrandStatement() {
  return (
    <section
      id="brand-statement"
      className="relative bg-[#050505] py-24 sm:py-32 overflow-hidden border-t border-b border-[#D4A72C]/15"
      aria-label="Brand Philosophy"
    >
      {/* Decorative Gold Accent Lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#D4A72C]/30 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#D4A72C]/30 to-transparent" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Prominent Logo Treatment */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="mb-8"
        >
          <Logo size="xl" />
        </motion.div>

        {/* Thin Gold Separator */}
        <div className="w-16 h-[1px] bg-[#D4A72C] mb-8 opacity-60" aria-hidden="true" />

        {/* Minimal Luxury Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-[0.16em] text-white leading-tight max-w-3xl"
        >
          DETAILING BEYOND THE ORDINARY.
        </motion.h2>

        {/* Subtle Silver Typography */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-6 text-sm sm:text-base md:text-lg text-[#C7C7C7] max-w-2xl font-light tracking-wide leading-relaxed"
        >
          Crafted for drivers who demand immaculate aesthetics. Every contour, surface, and texture is treated with uncompromising automotive precision.
        </motion.p>

        {/* Subtle Silver Details Grid */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-12 text-center pt-8 border-t border-white/5 w-full max-w-2xl">
          <div>
            <span className="block text-xs uppercase tracking-[0.2em] text-[#D4A72C] font-semibold">
              Location
            </span>
            <span className="text-xs sm:text-sm text-[#C7C7C7] mt-1 block">
              Los Angeles, CA
            </span>
          </div>
          <div>
            <span className="block text-xs uppercase tracking-[0.2em] text-[#D4A72C] font-semibold">
              Specialization
            </span>
            <span className="text-xs sm:text-sm text-[#C7C7C7] mt-1 block">
              Luxury Detailing
            </span>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <span className="block text-xs uppercase tracking-[0.2em] text-[#D4A72C] font-semibold">
              Service
            </span>
            <span className="text-xs sm:text-sm text-[#C7C7C7] mt-1 block">
              Exterior & Interior Care
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
