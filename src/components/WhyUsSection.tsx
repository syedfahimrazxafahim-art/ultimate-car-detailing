import { motion } from 'motion/react';
import { Eye, Award, Car, Sparkles } from 'lucide-react';

const PILLARS = [
  {
    number: '01',
    title: 'ATTENTION TO DETAIL',
    icon: Eye,
    description:
      'Every visual detail, from door jambs and emblem crevices to microscopic paint imperfections, is addressed with calculated precision.',
  },
  {
    number: '02',
    title: 'PREMIUM PRESENTATION',
    icon: Sparkles,
    description:
      'We curate the entire detailing experience around a polished, luxury-oriented aesthetic designed to elevate your vehicle’s stance and road presence.',
  },
  {
    number: '03',
    title: 'PROFESSIONAL CAR CARE',
    icon: Car,
    description:
      'Systematic wash methods, dual-action machine polishing, and pH-balanced solutions tailored specifically for delicate automotive clear coats and finishes.',
  },
  {
    number: '04',
    title: 'THE ULTIMATE FINISH',
    icon: Award,
    description:
      'Our ultimate objective is deep optical clarity, rich surface gloss, and lasting protection that lets your vehicle stand out in any light.',
  },
];

export function WhyUsSection() {
  return (
    <section
      id="why-us"
      className="relative bg-[#050505] py-24 sm:py-32"
      aria-label="Why Choose Ultimate Auto Detailing"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-[0.1em] text-white"
          >
            THE STANDARD OF CARE
          </motion.h2>

          <div className="w-20 h-[2px] bg-[#D4A72C] mx-auto my-5" aria-hidden="true" />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-sm sm:text-base text-[#C7C7C7] font-light leading-relaxed"
          >
            Refined principles guiding every automotive detailing service we deliver in Los Angeles.
          </motion.p>
        </div>

        {/* 4 Pillars Layout - Clean, editorial typography with gold divider lines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {PILLARS.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative bg-[#111111]/80 border-t-2 border-[#D4A72C]/40 hover:border-[#F5C542] p-8 sm:p-10 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="font-mono text-xs tracking-widest text-[#D4A72C] font-semibold">
                    {pillar.number} // STANDARD
                  </span>
                  <div className="w-10 h-10 flex items-center justify-center bg-[#050505] text-[#D4A72C] group-hover:text-[#F5C542] transition-colors border border-white/5">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-[0.12em] text-white mb-4 group-hover:text-[#F5C542] transition-colors">
                  {pillar.title}
                </h3>

                <div className="w-12 h-[1px] bg-white/10 mb-4 group-hover:w-20 group-hover:bg-[#D4A72C] transition-all duration-300" />

                <p className="text-sm sm:text-base text-[#C7C7C7] font-light leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
