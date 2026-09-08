import { motion } from 'motion/react';
import {
  Sparkles,
  Armchair,
  Droplets,
  Disc,
  ShieldCheck,
  CircleDot,
  Gem,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { SERVICES } from '../data';
import type { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectService: (serviceId: string) => void;
}

const ICON_MAP: Record<string, typeof Sparkles> = {
  Sparkles,
  Armchair,
  Droplets,
  Disc,
  Shield: ShieldCheck,
  CircleDot,
  Gem,
};

export function ServicesSection({ onSelectService }: ServicesSectionProps) {
  return (
    <section
      id="services"
      className="relative bg-[#050505] py-24 sm:py-32"
      aria-label="Automotive Detailing Services"
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
            PRECISION SERVICES
          </motion.h2>

          <div className="w-20 h-[2px] bg-[#D4A72C] mx-auto my-5" aria-hidden="true" />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-sm sm:text-base text-[#C7C7C7] font-light leading-relaxed"
          >
            Specialized automotive detailing treatments engineered to protect, enhance, and maintain the aesthetic integrity of your vehicle.
          </motion.p>
        </div>

        {/* Services Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES.map((service: ServiceItem, index: number) => {
            const IconComponent = ICON_MAP[service.icon] || Sparkles;

            return (
              <motion.article
                key={service.id}
                id={`service-card-${service.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative bg-[#111111] border border-[#D4A72C]/20 hover:border-[#F5C542]/70 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(212,167,44,0.15)] rounded-none"
              >
                {/* Subtle Top Accent Line on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F5C542] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Service Icon Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 flex items-center justify-center bg-[#050505] border border-[#D4A72C]/30 text-[#F5C542] group-hover:text-[#FFFFFF] group-hover:border-[#F5C542] transition-colors duration-300">
                      <IconComponent className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <span className="text-[11px] font-mono tracking-widest text-[#C7C7C7]/50 uppercase">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Service Title */}
                  <h3 className="font-display text-lg sm:text-xl font-bold uppercase tracking-[0.08em] text-white group-hover:text-[#F5C542] transition-colors duration-200 mb-3">
                    {service.name}
                  </h3>

                  {/* Service Summary */}
                  <p className="text-xs sm:text-sm text-[#C7C7C7] font-light leading-relaxed mb-6">
                    {service.summary}
                  </p>

                  {/* Bullet Features */}
                  <ul className="space-y-2 mb-8 border-t border-white/5 pt-4">
                    {service.features.map((feature: string, fIdx: number) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs text-[#C7C7C7]/90">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D4A72C] shrink-0 mt-0.5" />
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Service Action Button */}
                <button
                  id={`book-service-${service.id}-btn`}
                  type="button"
                  onClick={() => onSelectService(service.id)}
                  className="w-full py-3 px-4 bg-[#050505] hover:bg-[#F5C542] text-[#F5C542] hover:text-[#050505] border border-[#D4A72C]/40 hover:border-[#F5C542] text-xs font-bold uppercase tracking-[0.16em] transition-all duration-200 flex items-center justify-center gap-2 group/btn cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A72C]"
                >
                  <span>BOOK THIS SERVICE</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                </button>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
