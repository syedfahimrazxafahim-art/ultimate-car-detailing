import { useState } from 'react';
import { CLOUDINARY_ASSETS } from '../data';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'mark' | 'compact' | 'hero';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Logo({ className = '', variant = 'full', size = 'md' }: LogoProps) {
  const [imageError, setImageError] = useState(false);

  const frameSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10 sm:w-11 sm:h-11',
    lg: 'w-14 h-14 sm:w-16 sm:h-16',
    xl: 'w-24 h-24 sm:w-32 sm:h-32',
  };

  const textSizes = {
    sm: 'text-xs sm:text-sm',
    md: 'text-sm sm:text-base font-bold',
    lg: 'text-lg sm:text-xl font-bold',
    xl: 'text-2xl sm:text-3xl font-extrabold',
  };

  return (
    <div className={`inline-flex items-center gap-3 group select-none ${className}`}>
      {/* Official Logo Frame - Precisely styled with gold accent borders */}
      <div
        className={`relative flex items-center justify-center shrink-0 ${frameSizes[size]} rounded-md overflow-hidden bg-[#0a0a0a] border border-[#D4A72C]/40 group-hover:border-[#F5C542] shadow-[0_0_12px_rgba(212,167,44,0.2)] group-hover:shadow-[0_0_20px_rgba(245,197,66,0.4)] transition-all duration-300`}
      >
        {!imageError ? (
          <img
            src={CLOUDINARY_ASSETS.logo}
            alt="Ultimate Auto Detailing Official Logo"
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain p-0.5 filter contrast-[1.05] brightness-[1.02] group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
            loading="eager"
          />
        ) : (
          /* High-fidelity Vector Fallback if offline */
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full filter drop-shadow-[0_0_8px_rgba(212,167,44,0.35)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon
              points="50,4 94,28 94,72 50,96 6,72 6,28"
              stroke="#D4A72C"
              strokeWidth="4"
              fill="#080808"
            />
            <path
              d="M36 34 V54 C36 62 42 68 50 68 C58 68 64 62 64 54 V34"
              stroke="#F5C542"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        )}
      </div>

      {variant !== 'mark' && (
        <div className="flex flex-col tracking-wider">
          <span
            className={`font-display uppercase tracking-[0.14em] text-white leading-tight ${textSizes[size]}`}
          >
            Ultimate
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-[#D4A72C] font-semibold leading-none">
              Auto Detailing
            </span>
            <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-[#C7C7C7] opacity-60"></span>
            <span className="hidden sm:inline-block text-[9px] uppercase tracking-[0.18em] text-[#C7C7C7] opacity-80 leading-none">
              Los Angeles
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
