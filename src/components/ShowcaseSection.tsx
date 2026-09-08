import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { CLOUDINARY_ASSETS } from '../data';

const SHOWCASE_TABS = [
  {
    id: 'before-after',
    title: 'Before & After Transformation',
    image: CLOUDINARY_ASSETS.beforeAfter,
    alt: 'Before and after automotive paint and surface detailing transformation by Ultimate Auto Detailing',
    focus: 'Direct Surface Comparison',
    description:
      'Demonstrating the dramatic difference professional detailing creates — eradicating dulling oxidation, micro-scratches, and road film to unleash flawless reflection and color depth.',
    highlights: [
      'Multi-stage clear coat swirl elimination',
      'Intensive decontamination and deep cleansing',
      'True mirror-finish gloss restoration',
    ],
  },
  {
    id: 'paint',
    title: 'Paint Correction & Reflection',
    image: CLOUDINARY_ASSETS.aboutDetail,
    alt: 'Studio close-up of glossy paint reflection with mirror-like clarity',
    focus: 'Micro-scratch removal & depth restoration',
    description:
      'Precision machine compounding and fine polishing eliminates haze and swirls to expose the true metallic depth and reflective luster of automotive paint.',
    highlights: [
      'Multi-stage rotary & dual-action compounding',
      'Severe swirl, haze, and hologram correction',
      'Hydrophobic protective finish for sustained gloss',
    ],
  },
  {
    id: 'interior',
    title: 'Interior Craftsmanship',
    image: 'https://res.cloudinary.com/fzobzdco/image/upload/v1788906298/dqwdwqdjhu.jpg',
    alt: 'Clean black leather luxury automotive cabin with conditioned surfaces and console',
    focus: 'Surface preservation & fiber sanitization',
    description:
      'Immaculate care for perforated leather, alcantara, seams, and high-gloss consoles without greasy residue, sticky dressings, or artificial fragrances.',
    highlights: [
      'Conditioned matte finish on premium leather',
      'Sanitized, dust-free vents and tactile switches',
      'Deep hot-water fiber soil extraction',
    ],
  },
  {
    id: 'wheels',
    title: 'Wheel & Rim Refinement',
    image: 'https://res.cloudinary.com/fzobzdco/image/upload/v1788906299/gyu_gqvdytqdbd.jpg',
    alt: 'Detailed forged alloy wheel with satin tire dressing and polished caliper face',
    focus: 'Brake dust decontamination & satin finish',
    description:
      'Intensive decontamination removing corrosive metallic brake dust from wheels and calipers, paired with durable non-sling satin tire dressing.',
    highlights: [
      'Acid-free brake dust dissolution',
      'Caliper face cleansing and barrel detailing',
      'Non-sling hydrophobic tire treatment',
    ],
  },
];

export function ShowcaseSection({ onBookClick }: { onBookClick: () => void }) {
  const [activeTabId, setActiveTabId] = useState('before-after');
  const currentTab = SHOWCASE_TABS.find((t) => t.id === activeTabId) || SHOWCASE_TABS[0];

  return (
    <section
      id="showcase"
      className="relative bg-[#080808] py-24 sm:py-32 border-t border-b border-[#D4A72C]/15"
      aria-label="Detailing Showcase"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-[#111111] border border-[#D4A72C]/30 text-[#D4A72C] text-xs uppercase tracking-[0.2em] font-semibold mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F5C542]" />
            <span>Real Detailing Transformations</span>
          </motion.div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-[0.1em] text-white">
            THE ULTIMATE TRANSFORMATION
          </h2>

          <div className="w-20 h-[2px] bg-[#D4A72C] mx-auto my-5" aria-hidden="true" />

          <p className="text-sm sm:text-base text-[#C7C7C7] font-light leading-relaxed">
            Examine our high-end automotive detailing standards across key vehicle surfaces.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-10">
          {SHOWCASE_TABS.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                id={`showcase-tab-${tab.id}`}
                type="button"
                onClick={() => setActiveTabId(tab.id)}
                className={`px-4 sm:px-5 py-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] transition-all duration-300 border cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A72C] ${
                  isActive
                    ? 'bg-[#F5C542] text-[#050505] border-[#F5C542] shadow-[0_0_15px_rgba(245,197,66,0.3)] font-bold'
                    : 'bg-[#111111] text-[#C7C7C7] border-white/10 hover:border-[#D4A72C]/50 hover:text-white'
                }`}
              >
                {tab.title}
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#111111] border border-[#D4A72C]/20 p-6 sm:p-10 shadow-2xl">
          {/* Visual Showcase (Image with Dark Film and Gold Edge Frame) */}
          <div className="lg:col-span-7 relative overflow-hidden bg-[#050505] border border-white/10 aspect-[16/10] rounded-sm group">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentTab.id}
                src={currentTab.image}
                alt={currentTab.alt}
                referrerPolicy="no-referrer"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full object-cover filter brightness-[0.92] contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] uppercase tracking-wider text-white/90 bg-[#050505]/85 backdrop-blur-sm px-3.5 py-2 border border-[#D4A72C]/30">
              <span className="text-[#F5C542] font-semibold">{currentTab.focus}</span>
              <span className="text-[#C7C7C7]">Studio Standard</span>
            </div>
          </div>

          {/* Tab Explanation Details */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="text-xs uppercase tracking-[0.22em] text-[#D4A72C] font-semibold mb-2 block">
              Surface Precision
            </span>

            <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-[0.08em] text-white mb-4">
              {currentTab.title}
            </h3>

            <p className="text-sm sm:text-base text-[#C7C7C7] font-light leading-relaxed mb-6">
              {currentTab.description}
            </p>

            <ul className="space-y-3 mb-8 border-t border-white/10 pt-5">
              {currentTab.highlights.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-white">
                  <CheckCircle2 className="w-4 h-4 text-[#F5C542] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <button
              id="showcase-cta-button"
              type="button"
              onClick={onBookClick}
              className="py-3 px-6 bg-gradient-to-r from-[#F5C542] to-[#D4A72C] text-[#050505] font-bold text-xs uppercase tracking-[0.18em] transition-all hover:brightness-110 active:scale-98 cursor-pointer self-start shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Request Detail Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
