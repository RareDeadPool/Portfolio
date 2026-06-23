'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Dock({ activeWindows, onOpenWindow, activeFullscreenView, onOpenFullscreen }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const dockItems = [
    { id: 'about', label: 'About Me', type: 'window' },
    { id: 'projects', label: 'Other Projects', type: 'window' },
    { id: 'playground', label: 'Playground', type: 'window' },
    { id: 'skills', label: 'Skills', type: 'window' },
    { id: 'resume', label: 'Resume', type: 'window' },
    { id: 'contact', label: 'Contact', type: 'window' }
  ];

  const handleItemClick = (item) => {
    if (onOpenWindow) {
      onOpenWindow(item.id);
    }
  };

  const renderDockIcon = (id) => {
    switch (id) {
      case 'about':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full pointer-events-none drop-shadow-lg">
            <defs>
              <linearGradient id="dock-bg-about" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1e54e4" />
                <stop offset="100%" stopColor="#051f6e" />
              </linearGradient>
              <linearGradient id="dock-glass-border" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.3)" />
                <stop offset="40%" stopColor="rgba(255, 255, 255, 0.08)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0.03)" />
              </linearGradient>
              <linearGradient id="dock-avatar-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="60%" stopColor="#e2e8f0" />
                <stop offset="100%" stopColor="#cbd5e1" />
              </linearGradient>
              <filter id="dock-squircle-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.5" />
              </filter>
              <filter id="dock-symbol-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.4" />
              </filter>
            </defs>
            <rect x="12" y="12" width="76" height="76" rx="20" fill="url(#dock-bg-about)" filter="url(#dock-squircle-shadow)" />
            <rect x="12" y="12" width="76" height="76" rx="20" fill="none" stroke="url(#dock-glass-border)" strokeWidth="1.25" />
            <path d="M 13.5,28 C 13.5,17 18.5,13.5 28.5,13.5 L 71.5,13.5 C 81.5,13.5 86.5,17 86.5,28" fill="none" stroke="rgba(255, 255, 255, 0.22)" strokeWidth="1.25" strokeLinecap="round" />
            <g filter="url(#dock-symbol-shadow)" transform="translate(0, 3)">
              <path d="M 24,68 C 24,56 34,51 50,51 C 66,51 76,56 76,68 C 76,71 74,72 70,72 L 30,72 C 26,72 24,71 24,68 Z" fill="url(#dock-avatar-grad)" />
              <ellipse cx="50" cy="47.5" rx="10" ry="2.5" fill="#000000" opacity="0.15" />
              <circle cx="50" cy="34" r="12.5" fill="url(#dock-avatar-grad)" />
            </g>
          </svg>
        );
      case 'projects':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full pointer-events-none drop-shadow-lg">
            <defs>
              <linearGradient id="dock-bg-experience" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#434a5c" />
                <stop offset="100%" stopColor="#1e212b" />
              </linearGradient>
              <linearGradient id="dock-glass-border" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.3)" />
                <stop offset="40%" stopColor="rgba(255, 255, 255, 0.08)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0.03)" />
              </linearGradient>
              <linearGradient id="dock-briefcase-body" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="35%" stopColor="#e2e8f0" />
                <stop offset="100%" stopColor="#94a3b8" />
              </linearGradient>
              <linearGradient id="dock-briefcase-handle-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#8e9bb0" />
              </linearGradient>
              <filter id="dock-squircle-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.5" />
              </filter>
              <filter id="dock-symbol-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2.5" stdDeviation="2" floodColor="#000000" floodOpacity="0.45" />
              </filter>
            </defs>
            <rect x="12" y="12" width="76" height="76" rx="20" fill="url(#dock-bg-experience)" filter="url(#dock-squircle-shadow)" />
            <rect x="12" y="12" width="76" height="76" rx="20" fill="none" stroke="url(#dock-glass-border)" strokeWidth="1.25" />
            <path d="M 13.5,28 C 13.5,17 18.5,13.5 28.5,13.5 L 71.5,13.5 C 81.5,13.5 86.5,17 86.5,28" fill="none" stroke="rgba(255, 255, 255, 0.22)" strokeWidth="1.25" strokeLinecap="round" />
            <g filter="url(#dock-symbol-shadow)">
              <path d="M 38,36 C 38,28 62,28 62,36" fill="none" stroke="url(#dock-briefcase-handle-grad)" strokeWidth="3" strokeLinecap="round" />
              <rect x="26" y="36" width="48" height="30" rx="5" fill="url(#dock-briefcase-body)" />
              <rect x="26.75" y="36.75" width="46.5" height="28.5" rx="4.25" fill="none" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="0.75" />
              <line x1="26" y1="47.5" x2="74" y2="47.5" stroke="#475569" strokeWidth="1.5" opacity="0.25" />
              <rect x="44" y="45.5" width="12" height="9" rx="1.5" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="0.5" />
              <rect x="46.5" y="49" width="7" height="2" rx="1" fill="#00d5ff" />
            </g>
          </svg>
        );
      case 'playground':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full pointer-events-none drop-shadow-lg">
            <defs>
              <linearGradient id="dock-bg-playground" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5b37f4" />
                <stop offset="100%" stopColor="#140465" />
              </linearGradient>
              <linearGradient id="dock-glass-border" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.3)" />
                <stop offset="40%" stopColor="rgba(255, 255, 255, 0.08)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0.03)" />
              </linearGradient>
              <linearGradient id="dock-cube-top-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#e2e8f0" />
              </linearGradient>
              <linearGradient id="dock-cube-left-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00c6ff" />
                <stop offset="100%" stopColor="#0072ff" />
              </linearGradient>
              <linearGradient id="dock-cube-right-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#da77f2" />
                <stop offset="100%" stopColor="#862e9c" />
              </linearGradient>
              <filter id="dock-squircle-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.5" />
              </filter>
              <filter id="dock-symbol-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2.5" stdDeviation="2" floodColor="#000000" floodOpacity="0.45" />
              </filter>
            </defs>
            <rect x="12" y="12" width="76" height="76" rx="20" fill="url(#dock-bg-playground)" filter="url(#dock-squircle-shadow)" />
            <rect x="12" y="12" width="76" height="76" rx="20" fill="none" stroke="url(#dock-glass-border)" strokeWidth="1.25" />
            <path d="M 13.5,28 C 13.5,17 18.5,13.5 28.5,13.5 L 71.5,13.5 C 81.5,13.5 86.5,17 86.5,28" fill="none" stroke="rgba(255, 255, 255, 0.22)" strokeWidth="1.25" strokeLinecap="round" />
            <g filter="url(#dock-symbol-shadow)" strokeLinejoin="round">
              <polygon points="50,31 66,40 50,49 34,40" fill="url(#dock-cube-top-grad)" stroke="#ffffff" strokeWidth="0.5" />
              <polygon points="34,40 50,49 50,67 34,58" fill="url(#dock-cube-left-grad)" stroke="#00c6ff" strokeWidth="0.5" />
              <polygon points="50,49 66,40 66,58 50,67" fill="url(#dock-cube-right-grad)" stroke="#da77f2" strokeWidth="0.5" />
            </g>
          </svg>
        );
      case 'skills':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full pointer-events-none drop-shadow-lg">
            <defs>
              <linearGradient id="dock-bg-skills" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0a857a" />
                <stop offset="100%" stopColor="#013632" />
              </linearGradient>
              <linearGradient id="dock-glass-border" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.3)" />
                <stop offset="40%" stopColor="rgba(255, 255, 255, 0.08)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0.03)" />
              </linearGradient>
              <radialGradient id="dock-node-grad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="35%" stopColor="#00ffdf" />
                <stop offset="100%" stopColor="#047857" />
              </radialGradient>
              <filter id="dock-squircle-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.5" />
              </filter>
              <filter id="dock-symbol-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2.5" stdDeviation="2" floodColor="#000000" floodOpacity="0.45" />
              </filter>
            </defs>
            <rect x="12" y="12" width="76" height="76" rx="20" fill="url(#dock-bg-skills)" filter="url(#dock-squircle-shadow)" />
            <rect x="12" y="12" width="76" height="76" rx="20" fill="none" stroke="url(#dock-glass-border)" strokeWidth="1.25" />
            <path d="M 13.5,28 C 13.5,17 18.5,13.5 28.5,13.5 L 71.5,13.5 C 81.5,13.5 86.5,17 86.5,28" fill="none" stroke="rgba(255, 255, 255, 0.22)" strokeWidth="1.25" strokeLinecap="round" />
            <g filter="url(#dock-symbol-shadow)" transform="translate(0, 3)">
              <g opacity="0.35" stroke="#00f5ff" strokeWidth="6" strokeLinecap="round">
                <line x1="50" y1="31" x2="31" y2="41" />
                <line x1="50" y1="31" x2="69" y2="41" />
                <line x1="50" y1="31" x2="50" y2="52" />
                <line x1="31" y1="41" x2="50" y2="52" />
                <line x1="69" y1="41" x2="50" y2="52" />
                <line x1="31" y1="41" x2="31" y2="62" />
                <line x1="69" y1="41" x2="69" y2="62" />
                <line x1="31" y1="62" x2="50" y2="52" />
                <line x1="69" y1="62" x2="50" y2="52" />
              </g>
              <g stroke="#00ffff" strokeWidth="2.2" strokeLinecap="round">
                <line x1="50" y1="31" x2="31" y2="41" />
                <line x1="50" y1="31" x2="69" y2="41" />
                <line x1="50" y1="31" x2="50" y2="52" />
                <line x1="31" y1="41" x2="50" y2="52" />
                <line x1="69" y1="41" x2="50" y2="52" />
                <line x1="31" y1="41" x2="31" y2="62" />
                <line x1="69" y1="41" x2="69" y2="62" />
                <line x1="31" y1="62" x2="50" y2="52" />
                <line x1="69" y1="62" x2="50" y2="52" />
              </g>
              <circle cx="50" cy="31" r="4" fill="url(#dock-node-grad)" />
              <circle cx="31" cy="41" r="4" fill="url(#dock-node-grad)" />
              <circle cx="69" cy="41" r="4" fill="url(#dock-node-grad)" />
              <circle cx="50" cy="52" r="4" fill="url(#dock-node-grad)" />
              <circle cx="31" cy="62" r="4" fill="url(#dock-node-grad)" />
              <circle cx="69" cy="62" r="4" fill="url(#dock-node-grad)" />
            </g>
          </svg>
        );
      case 'resume':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full pointer-events-none drop-shadow-lg">
            <defs>
              <linearGradient id="dock-bg-resume" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e11d48" />
                <stop offset="100%" stopColor="#881337" />
              </linearGradient>
              <linearGradient id="dock-glass-border" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.3)" />
                <stop offset="40%" stopColor="rgba(255, 255, 255, 0.08)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0.03)" />
              </linearGradient>
              <filter id="dock-squircle-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.5" />
              </filter>
              <filter id="dock-symbol-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2.5" stdDeviation="2" floodColor="#000000" floodOpacity="0.45" />
              </filter>
            </defs>
            <rect x="12" y="12" width="76" height="76" rx="20" fill="url(#dock-bg-resume)" filter="url(#dock-squircle-shadow)" />
            <rect x="12" y="12" width="76" height="76" rx="20" fill="none" stroke="url(#dock-glass-border)" strokeWidth="1.25" />
            <path d="M 13.5,28 C 13.5,17 18.5,13.5 28.5,13.5 L 71.5,13.5 C 81.5,13.5 86.5,17 86.5,28" fill="none" stroke="rgba(255, 255, 255, 0.22)" strokeWidth="1.25" strokeLinecap="round" />
            <g filter="url(#dock-symbol-shadow)">
              <rect x="32" y="26" width="36" height="48" rx="3" fill="#ffffff" />
              <rect x="32" y="26" width="36" height="48" rx="3" fill="none" stroke="rgba(0, 0, 0, 0.05)" strokeWidth="1" />
              <line x1="38" y1="36" x2="62" y2="36" stroke="#94a3b8" strokeWidth="2.2" strokeLinecap="round" />
              <line x1="38" y1="44" x2="62" y2="44" stroke="#94a3b8" strokeWidth="2.2" strokeLinecap="round" />
              <line x1="38" y1="52" x2="62" y2="52" stroke="#94a3b8" strokeWidth="2.2" strokeLinecap="round" />
              <line x1="38" y1="60" x2="52" y2="60" stroke="#94a3b8" strokeWidth="2.2" strokeLinecap="round" />
            </g>
          </svg>
        );
      case 'contact':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full pointer-events-none drop-shadow-lg">
            <defs>
              <linearGradient id="dock-bg-contact" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#9d174d" />
              </linearGradient>
              <linearGradient id="dock-glass-border" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.3)" />
                <stop offset="40%" stopColor="rgba(255, 255, 255, 0.08)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0.03)" />
              </linearGradient>
              <linearGradient id="dock-envelope-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#f1f5f9" />
              </linearGradient>
              <filter id="dock-squircle-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.5" />
              </filter>
              <filter id="dock-symbol-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2.5" stdDeviation="2" floodColor="#000000" floodOpacity="0.45" />
              </filter>
            </defs>
            <rect x="12" y="12" width="76" height="76" rx="20" fill="url(#dock-bg-contact)" filter="url(#dock-squircle-shadow)" />
            <rect x="12" y="12" width="76" height="76" rx="20" fill="none" stroke="url(#dock-glass-border)" strokeWidth="1.25" />
            <path d="M 13.5,28 C 13.5,17 18.5,13.5 28.5,13.5 L 71.5,13.5 C 81.5,13.5 86.5,17 86.5,28" fill="none" stroke="rgba(255, 255, 255, 0.22)" strokeWidth="1.25" strokeLinecap="round" />
            <g filter="url(#dock-symbol-shadow)">
              <rect x="28" y="34" width="44" height="30" rx="4" fill="url(#dock-envelope-grad)" />
              <path d="M 28,35 L 50,49 L 72,35" fill="none" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="28.5" y1="63.5" x2="44" y2="49" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
              <line x1="71.5" y1="63.5" x2="56" y2="49" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
            </g>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <nav className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[99999] pointer-events-none select-none">
      <div 
        className="pointer-events-auto flex items-end gap-3 px-4 py-2 bg-black/45 backdrop-blur-3xl border border-white/10 rounded-[20px] shadow-2xl transition-all"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {dockItems.map((item, idx) => {
          const isFullscreenActive = activeFullscreenView === item.id;
          const isWindowOpen = activeWindows && activeWindows.has(item.id);
          const isWindowFocused = isWindowOpen && activeWindows.get(item.id)?.isActive;
          
          const isRunning = isFullscreenActive || isWindowOpen;
          const isFocused = isFullscreenActive || isWindowFocused;
          
          // Magnification zoom level mapping (max 1.22, medium translate)
          let scale = 1;
          let yOffset = 0;
          
          if (hoveredIndex !== null) {
            const dist = Math.abs(idx - hoveredIndex);
            if (dist === 0) {
              scale = 1.22;
              yOffset = -6;
            } else if (dist === 1) {
              scale = 1.1;
              yOffset = -2;
            }
          }

          return (
            <motion.button
              key={item.id}
              onClick={() => handleItemClick(item)}
              onMouseEnter={() => setHoveredIndex(idx)}
              animate={{ 
                scale: scale, 
                y: yOffset
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="relative w-12 h-12 flex items-center justify-center cursor-pointer group"
            >
              {/* Tooltip Label on Hover */}
              <span className="absolute -top-11 scale-0 group-hover:scale-100 transition-transform duration-150 origin-bottom bg-zinc-900 border border-white/10 px-2.5 py-1 rounded text-[10px] font-bold text-white whitespace-nowrap shadow-lg pointer-events-none z-50">
                {item.label}
              </span>
              
              {renderDockIcon(item.id)}

              {/* Running indicator dot */}
              {isRunning && (
                <span 
                  className={`absolute -bottom-2 w-1.2 h-1.2 rounded-full transition-all duration-300 ${
                    isFocused ? 'bg-indigo-400 shadow-[0_0_6px_#6366f1]' : 'bg-zinc-500'
                  }`}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
