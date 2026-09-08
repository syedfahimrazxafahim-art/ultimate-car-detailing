import { motion } from 'motion/react';
import { Shield, Sparkles, MapPin, Mail, Phone } from 'lucide-react';
import { CLOUDINARY_ASSETS, BUSINESS_INFO } from '../data';

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative bg-[#080808] py-24 sm:py-32 border-t border-white/5"
      aria-label="About Ultimate Auto Detailing"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Showcase Frame */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative"
          >
            {/* Fine Gold Frame Accent */}
            <div className="relative border border-[#D4A72C]/30 p-2 sm:p-3 bg-[#111111]">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#050505]">
                <img
                  src={CLOUDINARY_ASSETS.aboutDetail}
                  alt="Professional vehicle detailing and paint enhancement in Los Angeles studio"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter brightness-[0.9] contrast-[1.05] hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
              </div>

              {/* Bottom Badge inside frame */}
              <div className="mt-3 flex items-center justify-between px-2 py-1 text-[11px] uppercase tracking-[0.2em] text-[#C7C7C7]">
                <span className="flex items-center gap-1.5 text-[#D4A72C]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Precision Automotive Care</span>
                </span>
                <span>Los Angeles, CA</span>
              </div>
            </div>

            {/* Corner Decorative Accent */}
            <div
              className="absolute -bottom-3 -right-3 w-16 h-16 border-r-2 border-b-2 border-[#D4A72C]/50 pointer-events-none hidden sm:block"
              aria-hidden="true"
            />
          </motion.div>

          {/* Right Column: Company Narrative */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-[1px] bg-[#D4A72C]" aria-hidden="true" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#D4A72C] font-semibold">
                Studio Overview
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-[0.08em] text-white leading-tight mb-6">
              PRESERVING AUTOMOTIVE EXCELLENCE
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#C7C7C7] font-light leading-relaxed mb-8">
              <p>
                Based in <strong className="text-white font-medium">Los Angeles, California</strong>,{' '}
                <strong className="text-white font-medium">Ultimate Auto Detailing</strong> provides specialized automotive detailing solutions focused on premium vehicle care, paint restoration, and interior rejuvenation.
              </p>
              <p>
                Our detailing procedures emphasize careful surface preparation, optical depth, and protective sealants. From comprehensive hand washes to multi-stage paint correction and ceramic coatings, every treatment is tailored to showcase vehicles in their most immaculate state.
              </p>
              <p>
                We prioritize high-end customer communication, respectful vehicle handling, and rigorous standards of presentation across luxury sports cars, exotics, and daily drivers alike.
              </p>
            </div>

            {/* Direct Contact Snapshot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/10">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D4A72C] shrink-0 mt-1" />
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#C7C7C7]/60 block font-semibold">
                    Location
                  </span>
                  <span className="text-xs sm:text-sm text-white font-medium">
                    {BUSINESS_INFO.location}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#D4A72C] shrink-0 mt-1" />
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#C7C7C7]/60 block font-semibold">
                    Direct Line
                  </span>
                  <a
                    href={`tel:${BUSINESS_INFO.phoneRaw}`}
                    className="text-xs sm:text-sm text-white hover:text-[#D4A72C] transition-colors font-medium"
                  >
                    {BUSINESS_INFO.phone}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
