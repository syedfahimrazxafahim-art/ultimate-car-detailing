import { useState, useEffect, useRef, useCallback, type TouchEvent } from 'react';
import { motion } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Pause, Play, AlertCircle } from 'lucide-react';
import { SAMPLE_REVIEWS } from '../data';
import type { ReviewItem } from '../types';

export function ReviewsSection() {
  const [startIndex, setStartIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Responsive visible count: Desktop 3, Tablet 2, Mobile 1
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsPlaying(false);
    }
  }, []);

  // Pause when browser tab is hidden
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        setIsPlaying(false);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  const totalReviews = SAMPLE_REVIEWS.length;
  const maxStartIndex = Math.max(0, totalReviews - visibleCount);

  const prevSlide = useCallback(() => {
    setStartIndex((prev) => (prev <= 0 ? maxStartIndex : prev - 1));
  }, [maxStartIndex]);

  const nextSlide = useCallback(() => {
    setStartIndex((prev) => (prev >= maxStartIndex ? 0 : prev + 1));
  }, [maxStartIndex]);

  // Gentle autoplay
  useEffect(() => {
    if (!isPlaying || isHovered || isFocused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [isPlaying, isHovered, isFocused, nextSlide]);

  // Touch swipe support
  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
  };

  const visibleReviews = SAMPLE_REVIEWS.slice(startIndex, startIndex + visibleCount);
  // If at edge and wrapped
  if (visibleReviews.length < visibleCount && totalReviews >= visibleCount) {
    const remaining = visibleCount - visibleReviews.length;
    visibleReviews.push(...SAMPLE_REVIEWS.slice(0, remaining));
  }

  return (
    <section
      id="reviews"
      className="relative bg-[#080808] py-24 sm:py-32 border-t border-white/5"
      aria-label="Client Feedback and Reviews"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          {/* Transparent Preview Notice Label */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#111111] border border-[#D4A72C]/40 text-[#D4A72C] text-[11px] uppercase tracking-[0.2em] font-semibold mb-4">
            <AlertCircle className="w-3.5 h-3.5 text-[#F5C542]" />
            <span>SAMPLE REVIEW — PREVIEW CONTENT</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-[0.1em] text-white">
            CLIENT EXPERIENCES
          </h2>

          <div className="w-20 h-[2px] bg-[#D4A72C] mx-auto my-5" aria-hidden="true" />

          <p className="text-sm sm:text-base text-[#C7C7C7] font-light leading-relaxed">
            Illustrative customer experiences previewing service delivery and satisfaction standards.
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleReviews.map((review: ReviewItem, idx: number) => (
              <motion.div
                key={`${review.id}-${startIndex}-${idx}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-[#111111] border border-[#D4A72C]/20 hover:border-[#D4A72C]/60 p-6 sm:p-8 flex flex-col justify-between transition-colors duration-300 relative"
              >
                <div>
                  {/* Gold Stars */}
                  <div className="flex items-center gap-1 mb-4" aria-label={`Rating: ${review.rating} out of 5 stars`}>
                    {[...Array(review.rating)].map((_, starIdx) => (
                      <Star
                        key={starIdx}
                        className="w-4 h-4 fill-[#F5C542] text-[#F5C542]"
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-sm text-[#FFFFFF] font-light leading-relaxed italic mb-6">
                    "{review.text}"
                  </p>
                </div>

                {/* Author Details */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-[#FFFFFF] block">
                      {review.author}
                    </span>
                    <span className="text-[#C7C7C7]/70 text-[11px]">
                      {review.vehicle}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4A72C]">
                    Preview
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Carousel Controls Bar */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/5 max-w-xl mx-auto">
            {/* Prev Button */}
            <button
              id="reviews-prev-button"
              type="button"
              onClick={prevSlide}
              className="p-2.5 bg-[#111111] border border-[#D4A72C]/30 text-white hover:text-[#F5C542] hover:border-[#F5C542] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A72C]"
              aria-label="Previous reviews slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Pagination Indicators */}
            <div className="flex items-center gap-2">
              {Array.from({ length: maxStartIndex + 1 }).map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => setStartIndex(dotIdx)}
                  className={`h-1.5 transition-all duration-300 rounded-none focus:outline-none ${
                    dotIdx === startIndex
                      ? 'w-6 bg-[#F5C542]'
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to reviews slide ${dotIdx + 1}`}
                />
              ))}
            </div>

            {/* Next and Autoplay Pause/Play Buttons */}
            <div className="flex items-center gap-2">
              <button
                id="reviews-autoplay-toggle"
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2.5 bg-[#111111] border border-[#D4A72C]/30 text-[#C7C7C7] hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A72C]"
                aria-label={isPlaying ? 'Pause review autoplay' : 'Play review autoplay'}
                title={isPlaying ? 'Pause slideshow' : 'Resume slideshow'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              <button
                id="reviews-next-button"
                type="button"
                onClick={nextSlide}
                className="p-2.5 bg-[#111111] border border-[#D4A72C]/30 text-white hover:text-[#F5C542] hover:border-[#F5C542] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A72C]"
                aria-label="Next reviews slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
