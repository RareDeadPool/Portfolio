'use client';

import React, { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';

export default function AnalogClock() {
  const [secDeg, setSecDeg] = useState(0);
  const [minDeg, setMinDeg] = useState(0);
  const [hrDeg, setHrDeg] = useState(0);
  const [dateStr, setDateStr] = useState('');
  const [timeStr, setTimeStr] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    let animId;

    const updateClock = () => {
      const d = new Date();
      const ms = d.getMilliseconds();
      const s = d.getSeconds() + ms / 1000;
      const m = d.getMinutes() + s / 60;
      const h = (d.getHours() % 12) + m / 60;

      setSecDeg((s / 60) * 360);
      setMinDeg((m / 60) * 360);
      setHrDeg((h / 12) * 360);

      // Time zone string
      let hh = d.getHours();
      const mm = d.getMinutes().toString().padStart(2, '0');
      const ampm = hh >= 12 ? 'PM' : 'AM';
      hh = hh % 12 || 12;
      setTimeStr(`${hh}:${mm} ${ampm} IST`);

      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      setDateStr(`${days[d.getDay()]} | ${d.getDate()} ${months[d.getMonth()]}`);

      animId = requestAnimationFrame(updateClock);
    };

    updateClock();
    return () => cancelAnimationFrame(animId);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex items-center justify-between p-5 w-full h-[100px] select-none animate-pulse backdrop-blur-2xl border rounded-2xl border-[var(--glass-border)] bg-[var(--glass-bg)] shadow-2xl">
        <div className="w-[76px] h-[76px] flex items-center justify-center flex-shrink-0">
          <div className="w-[76px] h-[76px] rounded-full border border-white/10" />
        </div>
      </div>
    );
  }

  // Polar to Cartesian conversion helper for ticks
  const polarToCartesian = (angle, radius) => {
    const radians = ((angle - 90) * Math.PI) / 180;
    return {
      x: 50 + Math.cos(radians) * radius,
      y: 50 + Math.sin(radians) * radius,
    };
  };

  const tickOuterRadius = 46;
  const tickInnerMajorRadius = 42.2;
  const tickInnerMinorRadius = 44.0;

  return (
    <div className="backdrop-blur-2xl border rounded-2xl p-4 shadow-2xl transition-all duration-300 hover:scale-[1.02] border-[var(--glass-border)] bg-[var(--glass-bg)] flex items-center justify-between w-full select-none">
      <div className="flex items-center gap-4 w-full">
        
        {/* SVG Clock Dial */}
        <div className="relative w-[76px] h-[76px] flex-shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible block">
            {/* Dial Face Background */}
            <circle cx="50" cy="50" r="49" fill="#151517" />
            <circle cx="50" cy="50" r="47.6" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="0.4" />

            {/* Minor & Major Ticks */}
            {Array.from({ length: 60 }).map((_, index) => {
              const angle = index * 6;
              const isMajor = index % 5 === 0;
              const outer = polarToCartesian(angle, tickOuterRadius);
              const inner = polarToCartesian(angle, isMajor ? tickInnerMajorRadius : tickInnerMinorRadius);
              return (
                <line
                  key={index}
                  x1={outer.x}
                  y1={outer.y}
                  x2={inner.x}
                  y2={inner.y}
                  stroke={isMajor ? "rgba(255, 255, 255, 0.45)" : "rgba(255, 255, 255, 0.18)"}
                  strokeWidth={isMajor ? 0.65 : 0.32}
                  strokeLinecap="round"
                />
              );
            })}

            {/* Numbers: 1 to 12 */}
            {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((numeral, index) => {
              const angle = index * 30;
              const point = polarToCartesian(angle, 33.5);
              return (
                <text
                  key={numeral}
                  x={point.x}
                  y={point.y + 0.8}
                  fill="#FFFFFF"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="7.5"
                  fontWeight="700"
                  fontFamily="Inter, system-ui, sans-serif"
                >
                  {numeral}
                </text>
              );
            })}

            {/* MSC Label */}
            <text
              x="50"
              y="63"
              fill="rgba(255, 255, 255, 0.28)"
              textAnchor="middle"
              fontSize="8"
              fontWeight="800"
              fontFamily="Inter, system-ui, sans-serif"
              letterSpacing="0.05em"
            >
              MSC
            </text>

            {/* Hour Hand */}
            <g transform={`rotate(${hrDeg} 50 50)`}>
              <line x1="50" y1="51.5" x2="50" y2="28" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" />
            </g>

            {/* Minute Hand */}
            <g transform={`rotate(${minDeg} 50 50)`}>
              <line x1="50" y1="52" x2="50" y2="18" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
            </g>

            {/* Second Hand */}
            <g transform={`rotate(${secDeg} 50 50)`}>
              <line x1="50" y1="54.5" x2="50" y2="14" stroke="#f97316" strokeWidth="0.75" strokeLinecap="round" />
            </g>

            {/* Center Axis Pin */}
            <circle cx="50" cy="50" r="2.8" fill="#FFFFFF" />
            <circle cx="50" cy="50" r="0.8" fill="#151517" />
          </svg>
        </div>

        {/* Location & Time Info */}
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-indigo-400 tracking-wide mb-0.5">
            <MapPin className="w-3.5 h-3.5" />
            <span>Mumbai, India</span>
          </div>
          <span className="font-sans text-[12px] font-semibold text-[var(--widget-text)] opacity-80 leading-snug">
            {dateStr || "Saturday, 24 May"}
          </span>
          <span className="font-sans text-[15px] font-bold text-[var(--widget-header)] tracking-tight mt-0.5 leading-none">
            {timeStr || "10:30 PM IST"}
          </span>
        </div>

      </div>
    </div>
  );
}
