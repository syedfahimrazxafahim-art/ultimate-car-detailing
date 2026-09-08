import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles, Filter } from 'lucide-react';
import { ALL_GALLERY_IMAGES } from '../data';
import type { GalleryItem } from '../types';

const CATEGORIES = [
  'All Works',
  'Exotics & Luxury',
  'Paint Correction',
  'Exterior Detail',
  'Transformation',
];

export function GallerySection() {
  const [activeCategory, setActiveCategory] = useState('All Works');
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const filteredItems = ALL_GALLERY_IMAGES.filter((item) => {
    if (activeCategory === 'All Works') return true;
    return item.category === activeCategory;
  });

  const openLightbox = (index: number) => {
    setSelectedIdx(index);
  };

  const closeLightbox = useCallback(() => {
    setSelectedIdx(null);
  }, []);

  const prevImage = useCallback(() => {
    setSelectedIdx((current) =>
      current !== null ? (current - 1 + filteredItems.length) % filteredItems.length : null
    );
  }, [filteredItems.length]);

  const nextImage = useCallback(() => {
    setSelectedIdx((current) =>
      current !== null ? (current + 1) % filteredItems.length : null
    );
  }, [filteredItems.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (selectedIdx === null) return;

    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIdx, closeLightbox, prevImage, nextImage]);

  const currentItem = selectedIdx !== null ? filteredItems[selectedIdx] : null;

  return (
    <section
      id="gallery"
      className="relative bg-[#050505] py-24 sm:py-32"
      aria-label="Automotive Detailing Visual Gallery"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-[#111111] border border-[#D4A72C]/30 text-[#D4A72C] text-xs uppercase tracking-[0.2em] font-semibold mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F5C542]" />
            <span>Studio Portfolio ({ALL_GALLERY_IMAGES.length} Projects)</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-[0.1em] text-white"
          >
            CINEMATIC GALLERY
          </motion.h2>

          <div className="w-20 h-[2px] bg-[#D4A72C] mx-auto my-5" aria-hidden="true" />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-sm sm:text-base text-[#C7C7C7] font-light leading-relaxed"
          >
            A visual inspection of high-gloss reflections, deep paint clarification, and detailed vehicle finishes completed at Ultimate Auto Detailing.
          </motion.p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {CATEGORIES.map((category) => {
            const count =
              category === 'All Works'
                ? ALL_GALLERY_IMAGES.length
                : ALL_GALLERY_IMAGES.filter((i) => i.category === category).length;
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setActiveCategory(category);
                  setSelectedIdx(null);
                }}
                className={`px-3.5 sm:px-4 py-2 text-xs uppercase tracking-[0.14em] font-semibold transition-all duration-200 border cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A72C] ${
                  isActive
                    ? 'bg-[#F5C542] text-[#050505] border-[#F5C542] shadow-[0_0_12px_rgba(245,197,66,0.3)]'
                    : 'bg-[#111111] text-[#C7C7C7] border-white/10 hover:border-[#D4A72C]/40 hover:text-white'
                }`}
              >
                <span>{category}</span>
                <span className="ml-1.5 opacity-60 text-[10px]">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Gallery Grid - Responsive 3-Column Luxury Masonry */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {filteredItems.map((item: GalleryItem, index: number) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: (index % 6) * 0.08 }}
              className="group relative bg-[#111111] border border-[#D4A72C]/25 hover:border-[#F5C542] overflow-hidden cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(212,167,44,0.25)] transition-all duration-300"
              onClick={() => openLightbox(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openLightbox(index);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`View ${item.title}`}
            >
              {/* Image Frame with Deep Background and Hover Scale */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#050505]">
                <img
                  src={item.image}
                  alt={item.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 filter brightness-[0.92] contrast-[1.05]"
                  loading="lazy"
                />

                {/* Corner Zoom Indicator */}
                <div className="absolute top-3 right-3 w-8 h-8 bg-[#050505]/85 border border-[#D4A72C]/50 flex items-center justify-center text-[#F5C542] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>

                <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-[#050505]/80 text-[10px] uppercase tracking-wider text-[#D4A72C] font-semibold border border-white/5">
                  {item.category}
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-4 border-t border-white/5 bg-[#111111] flex items-center justify-between">
                <h3 className="font-display text-xs sm:text-sm font-bold uppercase tracking-[0.06em] text-white truncate pr-2 group-hover:text-[#F5C542] transition-colors">
                  {item.title}
                </h3>
                <span className="text-[10px] font-mono text-[#C7C7C7]/50 shrink-0">
                  #{index + 1 < 10 ? `0${index + 1}` : index + 1}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Accessible Full-Screen Lightbox Modal */}
      <AnimatePresence>
        {currentItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Enlarged gallery view"
          >
            {/* Modal Content Wrapper */}
            <div
              className="relative max-w-5xl w-full max-h-[92vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                ref={closeBtnRef}
                type="button"
                onClick={closeLightbox}
                className="absolute -top-12 right-0 sm:top-2 sm:right-2 z-10 w-10 h-10 bg-[#111111] border border-[#D4A72C]/40 text-[#C7C7C7] hover:text-white hover:border-[#F5C542] flex items-center justify-center cursor-pointer transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Close enlarged preview"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Prev and Next Arrows */}
              <button
                type="button"
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-[#050505]/80 border border-[#D4A72C]/50 text-white hover:text-[#F5C542] hover:border-[#F5C542] flex items-center justify-center cursor-pointer transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A72C]"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                type="button"
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-[#050505]/80 border border-[#D4A72C]/50 text-white hover:text-[#F5C542] hover:border-[#F5C542] flex items-center justify-center cursor-pointer transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A72C]"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image Frame */}
              <div className="relative max-w-full max-h-[75vh] overflow-hidden border border-[#D4A72C]/30 bg-[#000000] p-1 shadow-2xl flex items-center justify-center">
                <img
                  src={currentItem.image}
                  alt={currentItem.alt}
                  referrerPolicy="no-referrer"
                  className="max-w-full max-h-[72vh] object-contain"
                />
              </div>

              {/* Caption & Metadata */}
              <div className="w-full mt-3 px-4 py-3 bg-[#111111] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#D4A72C] font-semibold block">
                    {currentItem.category} • Ultimate Auto Detailing
                  </span>
                  <h4 className="font-display text-base font-bold uppercase tracking-wider text-white">
                    {currentItem.title}
                  </h4>
                  {currentItem.description && (
                    <p className="text-xs text-[#C7C7C7] font-light mt-0.5">
                      {currentItem.description}
                    </p>
                  )}
                </div>

                <div className="text-xs font-mono text-[#C7C7C7]/60 shrink-0">
                  {selectedIdx !== null ? selectedIdx + 1 : 1} / {filteredItems.length}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
