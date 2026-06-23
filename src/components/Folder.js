'use client';

import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { 
  Building2, BarChart3, MessageSquareMore, Code2, Briefcase, Star, Palette,
  User, GraduationCap, Cpu, Trophy, Play, FileText, Eye, Trash2
} from 'lucide-react';

// Premium SVG Color Palette mapping for Back Flaps, Front Flaps, Accents and Icons
const FOLDER_COLORS = {
  yellow: { backStart: '#b45309', backEnd: '#78350f', frontStart: '#f59e0b', frontEnd: '#d97706', accent: '#facc15', text: '#78350f' },
  blue: { backStart: '#1d4ed8', backEnd: '#1e3a8a', frontStart: '#3b82f6', frontEnd: '#2563eb', accent: '#60a5fa', text: '#ffffff' },
  purple: { backStart: '#6d28d9', backEnd: '#4c1d95', frontStart: '#8b5cf6', frontEnd: '#7c3aed', accent: '#a78bfa', text: '#ffffff' },
  green: { backStart: '#047857', backEnd: '#064e3b', frontStart: '#10b981', frontEnd: '#059669', accent: '#34d195', text: '#064e3b' },
  pink: { backStart: '#be185d', backEnd: '#831843', frontStart: '#ec4899', frontEnd: '#db2777', accent: '#f472b6', text: '#ffffff' },
  teal: { backStart: '#0f766e', backEnd: '#134e4a', frontStart: '#14b8a6', frontEnd: '#0d9488', accent: '#2dd4bf', text: '#134e4a' },
  orange: { backStart: '#c2410c', backEnd: '#7c2d12', frontStart: '#f97316', frontEnd: '#ea580c', accent: '#fdba74', text: '#7c2d12' },
  dark: { backStart: '#27272a', backEnd: '#18181b', frontStart: '#52525b', frontEnd: '#3f3f46', accent: '#a1a1aa', text: '#ffffff' }
};

export default function Folder({ 
  id, 
  title, 
  accentColor = "var(--project-cityscan)", 
  screens = [], 
  onDoubleClick,
  color = 'yellow', // default yellow
  onColorChange,
  onRemove
}) {
  const folderRef = useRef(null);
  const cardsRef = useRef([]);
  const contextMenuRef = useRef(null);
  const colorPickerRef = useRef(null);
  
  const [isHovered, setIsHovered] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [contextMenu, setContextMenu] = useState(null); // { x: number, y: number } or null

  // Clear array refs
  cardsRef.current = [];

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    
    // Animate cards to peek out of the folder pocket (ignored for squircle icons)
    if (cardsRef.current.length === 1) {
      gsap.to(cardsRef.current[0], { 
        y: -14, 
        scale: 1.06, 
        rotate: -2, 
        duration: 0.4, 
        ease: 'power2.out',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)'
      });
    } else if (cardsRef.current.length > 0) {
      gsap.to(cardsRef.current[0], { y: -8, rotate: -6, scale: 1.03, duration: 0.35, ease: 'power2.out' });
      gsap.to(cardsRef.current[1], { y: -14, rotate: 0, scale: 1.06, duration: 0.35, ease: 'power2.out' });
      gsap.to(cardsRef.current[2], { y: -8, rotate: 6, scale: 1.03, duration: 0.35, ease: 'power2.out' });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    
    // Return cards back into the folder pocket
    if (cardsRef.current.length === 1) {
      gsap.to(cardsRef.current[0], { 
        y: 0, 
        scale: 1, 
        rotate: 0, 
        duration: 0.3, 
        ease: 'power2.inOut',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      });
    } else if (cardsRef.current.length > 0) {
      gsap.to(cardsRef.current[0], { y: 0, rotate: -4, scale: 1, duration: 0.3, ease: 'power2.inOut' });
      gsap.to(cardsRef.current[1], { y: 0, rotate: 0, scale: 1, duration: 0.3, ease: 'power2.inOut' });
      gsap.to(cardsRef.current[2], { y: 0, rotate: 4, scale: 1, duration: 0.3, ease: 'power2.inOut' });
    }
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const rect = folderRef.current.getBoundingClientRect();
    setContextMenu({
      x: Math.max(10, e.clientX - rect.left),
      y: Math.max(10, e.clientY - rect.top)
    });
    setShowColorPicker(false);
  };

  // Close context menu & color picker on click outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      const clickedOutsideMenu = !contextMenuRef.current || !contextMenuRef.current.contains(e.target);
      const clickedOutsidePicker = !colorPickerRef.current || !colorPickerRef.current.contains(e.target);
      
      if (clickedOutsideMenu && clickedOutsidePicker) {
        setContextMenu(null);
        setShowColorPicker(false);
      }
    };
    
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const colorStyles = FOLDER_COLORS[color] || FOLDER_COLORS.yellow;
  const isExperience = id === 'experience';
  const isSkills = id === 'skills';
  const isAchievements = id === 'achievements';
  const isEducation = id === 'education';
  const isAbout = id === 'about';
  const isPlayground = id === 'playground';

  // Render pocket icon matching the type of folder
  const getPocketIcon = () => {
    switch (id) {
      case 'cityscan': return Building2;
      case 'dataviz': return BarChart3;
      case 'baatcheet': return MessageSquareMore;
      case 'shivner': return Code2;
      case 'projects': return Briefcase;
      case 'about': return User;
      case 'education': return GraduationCap;
      case 'experience': return Briefcase;
      case 'skills': return Cpu;
      case 'achievements': return Trophy;
      case 'playground': return Play;
      case 'resume': return FileText;
      default: return Star;
    }
  };
  const PocketIcon = getPocketIcon();

  // Helper values for Skills app icon SVG paths
  const leftChevronD = "M 38,38 L 26,50 L 38,62";
  const rightChevronD = "M 62,38 L 74,50 L 62,62";

  return (
    <div 
      ref={folderRef}
      className="flex flex-col items-center gap-1.5 cursor-pointer w-24 group relative"
      style={{ zIndex: contextMenu || showColorPicker ? 9999 : 'auto' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onDoubleClick={onDoubleClick}
      onContextMenu={handleContextMenu}
    >
      {isExperience ? (
        /* Visual macOS App Icon: Experience */
        <div 
          className="w-16 h-16 relative select-none flex items-center justify-center transition-all duration-350 group-hover:scale-110 group-hover:-translate-y-1.5"
          style={{ perspective: '400px' }}
        >
          {/* Subtle Background Accent Glow on Hover */}
          <div 
            className="absolute -inset-4 opacity-0 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none rounded-full blur-xl"
            style={{ 
              background: `radial-gradient(circle, ${colorStyles.accent}20 0%, transparent 70%)`,
              zIndex: 0 
            }}
          />

          <svg viewBox="0 0 100 100" className="w-full h-full pointer-events-none z-10">
            <defs>
              <linearGradient id={`bg-experience-${id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#434a5c" />
                <stop offset="100%" stopColor="#1e212b" />
              </linearGradient>

              <linearGradient id="glass-border" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.3)" />
                <stop offset="40%" stopColor="rgba(255, 255, 255, 0.08)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0.03)" />
              </linearGradient>

              <linearGradient id="briefcase-body" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="35%" stopColor="#e2e8f0" />
                <stop offset="100%" stopColor="#94a3b8" />
              </linearGradient>

              <linearGradient id="briefcase-handle-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#8e9bb0" />
              </linearGradient>

              <filter id="squircle-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#000000" floodOpacity="0.65" />
              </filter>

              <filter id="symbol-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2.5" stdDeviation="2" floodColor="#000000" floodOpacity="0.45" />
              </filter>
            </defs>

            {/* Base Squircle */}
            <rect x="12" y="12" width="76" height="76" rx="20" fill={`url(#bg-experience-${id})`} filter="url(#squircle-shadow)" />
            <rect x="12" y="12" width="76" height="76" rx="20" fill="none" stroke="url(#glass-border)" strokeWidth="1.25" />
            <path d="M 13.5,28 C 13.5,17 18.5,13.5 28.5,13.5 L 71.5,13.5 C 81.5,13.5 86.5,17 86.5,28" fill="none" stroke="rgba(255, 255, 255, 0.22)" strokeWidth="1.25" strokeLinecap="round" />

            {/* Briefcase Symbol */}
            <g filter="url(#symbol-shadow)">
              {/* Handle */}
              <path d="M 38,36 C 38,28 62,28 62,36" fill="none" stroke="url(#briefcase-handle-grad)" strokeWidth="3" strokeLinecap="round" />
              {/* Briefcase Main Body */}
              <rect x="26" y="36" width="48" height="30" rx="5" fill="url(#briefcase-body)" />
              {/* Highlight Border */}
              <rect x="26.75" y="36.75" width="46.5" height="28.5" rx="4.25" fill="none" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="0.75" />
              {/* Horizontal Lid Slit */}
              <line x1="26" y1="47.5" x2="74" y2="47.5" stroke="#475569" strokeWidth="1.5" opacity="0.25" />
              {/* Center Buckle */}
              <rect x="44" y="45.5" width="12" height="9" rx="1.5" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="0.5" />
              {/* Glowing accent status line on buckle */}
              <rect x="46.5" y="49" width="7" height="2" rx="1" fill="#00d5ff" />
            </g>
          </svg>
        </div>
      ) : isSkills ? (
        /* Visual macOS App Icon: Skills */
        <div 
          className="w-16 h-16 relative select-none flex items-center justify-center transition-all duration-350 group-hover:scale-110 group-hover:-translate-y-1.5"
          style={{ perspective: '400px' }}
        >
          {/* Subtle Background Accent Glow on Hover */}
          <div 
            className="absolute -inset-4 opacity-0 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none rounded-full blur-xl"
            style={{ 
              background: `radial-gradient(circle, ${colorStyles.accent}20 0%, transparent 70%)`,
              zIndex: 0 
            }}
          />

          <svg viewBox="0 0 100 100" className="w-full h-full pointer-events-none z-10">
            <defs>
              <linearGradient id={`bg-skills-${id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0a857a" />
                <stop offset="100%" stopColor="#013632" />
              </linearGradient>

              <linearGradient id="glass-border" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.3)" />
                <stop offset="40%" stopColor="rgba(255, 255, 255, 0.08)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0.03)" />
              </linearGradient>

              <radialGradient id="node-grad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="35%" stopColor="#00ffdf" />
                <stop offset="100%" stopColor="#047857" />
              </radialGradient>

              <filter id="squircle-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#000000" floodOpacity="0.65" />
              </filter>

              <filter id="symbol-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2.5" stdDeviation="2" floodColor="#000000" floodOpacity="0.45" />
              </filter>
            </defs>

            {/* Base Squircle */}
            <rect x="12" y="12" width="76" height="76" rx="20" fill={`url(#bg-skills-${id})`} filter="url(#squircle-shadow)" />
            <rect x="12" y="12" width="76" height="76" rx="20" fill="none" stroke="url(#glass-border)" strokeWidth="1.25" />
            <path d="M 13.5,28 C 13.5,17 18.5,13.5 28.5,13.5 L 71.5,13.5 C 81.5,13.5 86.5,17 86.5,28" fill="none" stroke="rgba(255, 255, 255, 0.22)" strokeWidth="1.25" strokeLinecap="round" />

            {/* Connected Skill Nodes Symbol */}
            <g filter="url(#symbol-shadow)" transform="translate(0, 3)">
              {/* Glowing lines background underlay */}
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
              {/* Sharp foreground lines */}
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

              {/* Node Circles */}
              <circle cx="50" cy="31" r="4" fill="url(#node-grad)" />
              <circle cx="31" cy="41" r="4" fill="url(#node-grad)" />
              <circle cx="69" cy="41" r="4" fill="url(#node-grad)" />
              <circle cx="50" cy="52" r="4" fill="url(#node-grad)" />
              <circle cx="31" cy="62" r="4" fill="url(#node-grad)" />
              <circle cx="69" cy="62" r="4" fill="url(#node-grad)" />
            </g>
          </svg>
        </div>
      ) : isAchievements ? (
        /* Visual macOS App Icon: Achievements */
        <div 
          className="w-16 h-16 relative select-none flex items-center justify-center transition-all duration-350 group-hover:scale-110 group-hover:-translate-y-1.5"
          style={{ perspective: '400px' }}
        >
          {/* Subtle Background Accent Glow on Hover */}
          <div 
            className="absolute -inset-4 opacity-0 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none rounded-full blur-xl"
            style={{ 
              background: `radial-gradient(circle, ${colorStyles.accent}20 0%, transparent 70%)`,
              zIndex: 0 
            }}
          />

          <svg viewBox="0 0 100 100" className="w-full h-full pointer-events-none z-10">
            <defs>
              <linearGradient id={`bg-achievements-${id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffa217" />
                <stop offset="100%" stopColor="#c23900" />
              </linearGradient>

              <linearGradient id="glass-border" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.3)" />
                <stop offset="40%" stopColor="rgba(255, 255, 255, 0.08)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0.03)" />
              </linearGradient>

              <linearGradient id="gold-medallion-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffe787" />
                <stop offset="35%" stopColor="#f5ae3d" />
                <stop offset="100%" stopColor="#9c5a00" />
              </linearGradient>

              <linearGradient id="ribbon-left-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffb834" />
                <stop offset="100%" stopColor="#b55300" />
              </linearGradient>

              <linearGradient id="ribbon-right-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e06200" />
                <stop offset="100%" stopColor="#8a2000" />
              </linearGradient>

              <linearGradient id="gold-light" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fff8d4" />
                <stop offset="100%" stopColor="#f5ae3d" />
              </linearGradient>

              <linearGradient id="gold-dark" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#e59866" />
                <stop offset="100%" stopColor="#8c3300" />
              </linearGradient>

              <filter id="squircle-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#000000" floodOpacity="0.65" />
              </filter>

              <filter id="symbol-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2.5" stdDeviation="2" floodColor="#000000" floodOpacity="0.45" />
              </filter>
            </defs>

            {/* Base Squircle */}
            <rect x="12" y="12" width="76" height="76" rx="20" fill={`url(#bg-achievements-${id})`} filter="url(#squircle-shadow)" />
            <rect x="12" y="12" width="76" height="76" rx="20" fill="none" stroke="url(#glass-border)" strokeWidth="1.25" />
            <path d="M 13.5,28 C 13.5,17 18.5,13.5 28.5,13.5 L 71.5,13.5 C 81.5,13.5 86.5,17 86.5,28" fill="none" stroke="rgba(255, 255, 255, 0.22)" strokeWidth="1.25" strokeLinecap="round" />

            {/* Gold Medal Symbol */}
            <g filter="url(#symbol-shadow)">
              {/* Ribbons */}
              <path d="M 37,48 L 37,73 L 47,64 L 47,48 Z" fill="url(#ribbon-left-grad)" />
              <path d="M 53,48 L 53,64 L 63,73 L 63,48 Z" fill="url(#ribbon-right-grad)" />

              {/* Medallion Outer Ring */}
              <circle cx="50" cy="44" r="19" fill="url(#gold-medallion-grad)" stroke="#804d00" strokeWidth="0.5" />
              {/* Medallion Inner Face */}
              <circle cx="50" cy="44" r="16.5" fill="url(#gold-medallion-grad)" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.5" />

              {/* 3D Star Facets (Center at 50, 44) */}
              {/* Top point */}
              <polygon points="50,44 50,32 47,40.5" fill="url(#gold-light)" />
              <polygon points="50,44 50,32 53,40.5" fill="url(#gold-dark)" />
              {/* Right point */}
              <polygon points="50,44 61.5,40.5 53,40.5" fill="url(#gold-light)" />
              <polygon points="50,44 61.5,40.5 54.5,47" fill="url(#gold-dark)" />
              {/* Bottom-right point */}
              <polygon points="50,44 56,53 54.5,47" fill="url(#gold-light)" />
              <polygon points="50,44 56,53 50,49" fill="url(#gold-dark)" />
              {/* Bottom-left point */}
              <polygon points="50,44 44,53 50,49" fill="url(#gold-light)" />
              <polygon points="50,44 44,53 45.5,47" fill="url(#gold-dark)" />
              {/* Left point */}
              <polygon points="50,44 38.5,40.5 45.5,47" fill="url(#gold-light)" />
              <polygon points="50,44 38.5,40.5 47,40.5" fill="url(#gold-dark)" />
            </g>
          </svg>
        </div>
      ) : isEducation ? (
        /* Visual macOS App Icon: Education */
        <div 
          className="w-16 h-16 relative select-none flex items-center justify-center transition-all duration-350 group-hover:scale-110 group-hover:-translate-y-1.5"
          style={{ perspective: '400px' }}
        >
          {/* Subtle Background Accent Glow on Hover */}
          <div 
            className="absolute -inset-4 opacity-0 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none rounded-full blur-xl"
            style={{ 
              background: `radial-gradient(circle, ${colorStyles.accent}20 0%, transparent 70%)`,
              zIndex: 0 
            }}
          />

          <svg viewBox="0 0 100 100" className="w-full h-full pointer-events-none z-10">
            <defs>
              <linearGradient id={`bg-education-${id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1db3f8" />
                <stop offset="100%" stopColor="#0051c0" />
              </linearGradient>

              <linearGradient id="glass-border" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.3)" />
                <stop offset="40%" stopColor="rgba(255, 255, 255, 0.08)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0.03)" />
              </linearGradient>

              <linearGradient id="cap-top-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#e2e8f0" />
              </linearGradient>

              <linearGradient id="cap-thickness-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#94a3b8" />
              </linearGradient>

              <linearGradient id="cap-base-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f1f5f9" />
                <stop offset="100%" stopColor="#cbd5e1" />
              </linearGradient>

              <filter id="squircle-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#000000" floodOpacity="0.65" />
              </filter>

              <filter id="symbol-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2.5" stdDeviation="2" floodColor="#000000" floodOpacity="0.45" />
              </filter>
            </defs>

            {/* Base Squircle */}
            <rect x="12" y="12" width="76" height="76" rx="20" fill={`url(#bg-education-${id})`} filter="url(#squircle-shadow)" />
            <rect x="12" y="12" width="76" height="76" rx="20" fill="none" stroke="url(#glass-border)" strokeWidth="1.25" />
            <path d="M 13.5,28 C 13.5,17 18.5,13.5 28.5,13.5 L 71.5,13.5 C 81.5,13.5 86.5,17 86.5,28" fill="none" stroke="rgba(255, 255, 255, 0.22)" strokeWidth="1.25" strokeLinecap="round" />

            {/* Graduation Cap Symbol */}
            <g filter="url(#symbol-shadow)">
              <g transform="translate(0, 5.5) rotate(-11, 50, 45)">
                {/* Skull cap */}
                <path d="M 37,42 C 37,42 40,50 50,50 C 60,50 63,42 63,42 L 63,48 C 63,53.5 37,53.5 37,48 Z" fill="url(#cap-base-grad)" stroke="#94a3b8" strokeWidth="0.5" />
                {/* 3D thickness under mortarboard */}
                <path d="M 26,34 L 26,37 Q 50,47 74,37 L 74,34 Q 50,44 26,34 Z" fill="url(#cap-thickness-grad)" />
                {/* Top board diamond */}
                <polygon points="50,25 74,34 50,43 26,34" fill="url(#cap-top-grad)" stroke="#cbd5e1" strokeWidth="0.5" />
                {/* Center button */}
                <ellipse cx="50" cy="34" rx="2" ry="1.2" fill="#e2e8f0" />
                {/* Tassel cord */}
                <path d="M 50,34 C 58,34 68,39 68,46 C 68,48 68.5,50 69,53" fill="none" stroke="#0ea5e9" strokeWidth="1" strokeLinecap="round" />
                {/* Tassel fringe brush */}
                <rect x="67.5" y="53" width="3" height="1.5" rx="0.5" fill="#00e5ff" />
                <path d="M 67.5,54.5 C 67,56.5 66,59.5 66,62.5 C 66,64 72,64 72,62.5 C 72,59.5 71,56.5 70.5,54.5 Z" fill="#00a2ff" />
              </g>
            </g>
          </svg>
        </div>
      ) : isAbout ? (
        /* Visual macOS App Icon: About */
        <div 
          className="w-16 h-16 relative select-none flex items-center justify-center transition-all duration-350 group-hover:scale-110 group-hover:-translate-y-1.5"
          style={{ perspective: '400px' }}
        >
          {/* Subtle Background Accent Glow on Hover */}
          <div 
            className="absolute -inset-4 opacity-0 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none rounded-full blur-xl"
            style={{ 
              background: `radial-gradient(circle, ${colorStyles.accent}20 0%, transparent 70%)`,
              zIndex: 0 
            }}
          />

          <svg viewBox="0 0 100 100" className="w-full h-full pointer-events-none z-10">
            <defs>
              <linearGradient id={`bg-about-${id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1e54e4" />
                <stop offset="100%" stopColor="#051f6e" />
              </linearGradient>

              <linearGradient id="glass-border" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.3)" />
                <stop offset="40%" stopColor="rgba(255, 255, 255, 0.08)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0.03)" />
              </linearGradient>

              <linearGradient id="avatar-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="60%" stopColor="#e2e8f0" />
                <stop offset="100%" stopColor="#cbd5e1" />
              </linearGradient>

              <filter id="squircle-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#000000" floodOpacity="0.65" />
              </filter>

              <filter id="symbol-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2.5" stdDeviation="2" floodColor="#000000" floodOpacity="0.45" />
              </filter>
            </defs>

            {/* Base Squircle */}
            <rect x="12" y="12" width="76" height="76" rx="20" fill={`url(#bg-about-${id})`} filter="url(#squircle-shadow)" />
            <rect x="12" y="12" width="76" height="76" rx="20" fill="none" stroke="url(#glass-border)" strokeWidth="1.25" />
            <path d="M 13.5,28 C 13.5,17 18.5,13.5 28.5,13.5 L 71.5,13.5 C 81.5,13.5 86.5,17 86.5,28" fill="none" stroke="rgba(255, 255, 255, 0.22)" strokeWidth="1.25" strokeLinecap="round" />

            {/* User Avatar Symbol */}
            <g filter="url(#symbol-shadow)" transform="translate(0, 3)">
              {/* Shoulders */}
              <path d="M 24,68 C 24,56 34,51 50,51 C 66,51 76,56 76,68 C 76,71 74,72 70,72 L 30,72 C 26,72 24,71 24,68 Z" fill="url(#avatar-grad)" />
              {/* Shadow between head and shoulders */}
              <ellipse cx="50" cy="47.5" rx="10" ry="2.5" fill="#000000" opacity="0.15" />
              {/* Head */}
              <circle cx="50" cy="34" r="12.5" fill="url(#avatar-grad)" />
            </g>
          </svg>
        </div>
      ) : isPlayground ? (
        /* Visual macOS App Icon: Playground */
        <div 
          className="w-16 h-16 relative select-none flex items-center justify-center transition-all duration-350 group-hover:scale-110 group-hover:-translate-y-1.5"
          style={{ perspective: '400px' }}
        >
          {/* Subtle Background Accent Glow on Hover */}
          <div 
            className="absolute -inset-4 opacity-0 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none rounded-full blur-xl"
            style={{ 
              background: `radial-gradient(circle, ${colorStyles.accent}20 0%, transparent 70%)`,
              zIndex: 0 
            }}
          />

          <svg viewBox="0 0 100 100" className="w-full h-full pointer-events-none z-10">
            <defs>
              <linearGradient id={`bg-playground-${id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5b37f4" />
                <stop offset="100%" stopColor="#140465" />
              </linearGradient>

              <linearGradient id="glass-border" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.3)" />
                <stop offset="40%" stopColor="rgba(255, 255, 255, 0.08)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0.03)" />
              </linearGradient>

              <linearGradient id="cube-top-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#e2e8f0" />
              </linearGradient>

              <linearGradient id="cube-left-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00c6ff" />
                <stop offset="100%" stopColor="#0072ff" />
              </linearGradient>

              <linearGradient id="cube-right-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#da77f2" />
                <stop offset="100%" stopColor="#862e9c" />
              </linearGradient>

              <filter id="squircle-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#000000" floodOpacity="0.65" />
              </filter>

              <filter id="symbol-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2.5" stdDeviation="2" floodColor="#000000" floodOpacity="0.45" />
              </filter>
            </defs>

            {/* Base Squircle */}
            <rect x="12" y="12" width="76" height="76" rx="20" fill={`url(#bg-playground-${id})`} filter="url(#squircle-shadow)" />
            <rect x="12" y="12" width="76" height="76" rx="20" fill="none" stroke="url(#glass-border)" strokeWidth="1.25" />
            <path d="M 13.5,28 C 13.5,17 18.5,13.5 28.5,13.5 L 71.5,13.5 C 81.5,13.5 86.5,17 86.5,28" fill="none" stroke="rgba(255, 255, 255, 0.22)" strokeWidth="1.25" strokeLinecap="round" />

            {/* 3D Isometric Cube Symbol */}
            <g filter="url(#symbol-shadow)" strokeLinejoin="round">
              {/* Top Face */}
              <polygon points="50,31 66,40 50,49 34,40" fill="url(#cube-top-grad)" stroke="#ffffff" strokeWidth="0.5" />
              {/* Left Face */}
              <polygon points="34,40 50,49 50,67 34,58" fill="url(#cube-left-grad)" stroke="#00c6ff" strokeWidth="0.5" />
              {/* Right Face */}
              <polygon points="50,49 66,40 66,58 50,67" fill="url(#cube-right-grad)" stroke="#da77f2" strokeWidth="0.5" />
            </g>
          </svg>
        </div>
      ) : (
        /* Visual Folder Assembly with 3D Perspective */
        <div 
          className="w-20 h-16 relative select-none"
          style={{ perspective: '400px' }}
        >
          
          {/* Subtle Background Accent Glow on Hover */}
          <div 
            className="absolute -inset-4 opacity-0 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none rounded-full blur-xl"
            style={{ 
              background: `radial-gradient(circle, ${colorStyles.accent}25 0%, transparent 70%)`,
              zIndex: 0 
            }}
          />

          {/* 3D Realistic Shadow under folder */}
          <div 
            className="absolute bottom-0 left-[10%] right-[10%] h-[4px] bg-black/40 rounded-full blur-sm transition-all duration-300"
            style={{
              transform: isHovered ? 'scale(1.1) translateY(2px)' : 'scale(1)',
              opacity: isHovered ? 0.6 : 0.4
            }}
          />
          
          {/* 1. Folder Back Plate (Tilts back slightly on hover) */}
          <div 
            className="absolute inset-0 transition-transform duration-300 origin-bottom z-0"
            style={{
              transform: isHovered ? 'rotateX(8deg) scale(1.02)' : 'rotateX(0deg)',
              transformStyle: 'preserve-3d'
            }}
          >
            <svg viewBox="0 0 100 80" className="w-full h-full drop-shadow-md">
              <defs>
                <linearGradient id={`back-grad-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={colorStyles.backStart} />
                  <stop offset="100%" stopColor={colorStyles.backEnd} />
                </linearGradient>
              </defs>
              {/* Custom rounded smooth folder tab shape */}
              <path 
                d="M 0,75 Q 0,80 5,80 L 95,80 Q 100,80 100,75 L 100,23 Q 100,18 95,18 L 52,18 C 46,18 42,5 35,5 L 10,5 Q 0,5 0,15 Z" 
                fill={`url(#back-grad-${id})`}
                stroke={colorStyles.backEnd}
                strokeWidth="0.5"
                strokeOpacity="0.2"
              />
            </svg>
          </div>

          {/* 2. Layered Peeking Screenshot Cards Stack */}
          <div className="absolute inset-x-1.5 bottom-2.5 top-0 overflow-visible">
            {screens.map((screen, index) => {
              const rot = index === 0 ? -4 : index === 2 ? 4 : 0;
              const zIdx = index === 1 ? 12 : 10;
              
              return (
                <div
                  key={index}
                  ref={addToRefs}
                  className="absolute w-16 h-11 bg-zinc-800 rounded-lg border border-white/10 shadow-lg origin-bottom transform overflow-hidden"
                  style={{
                    left: 'calc(50% - 32px)',
                    top: '3px',
                    transform: `rotate(${rot}deg)`,
                    zIndex: zIdx,
                  }}
                >
                  {/* Mock browser header */}
                  <div className="h-1.5 bg-zinc-900 flex items-center px-0.5 gap-0.5 border-b border-white/5">
                    <span className="w-0.5 h-0.5 rounded-full bg-red-400"></span>
                    <span className="w-0.5 h-0.5 rounded-full bg-yellow-400"></span>
                    <span className="w-0.5 h-0.5 rounded-full bg-green-400"></span>
                  </div>
                  {/* Visual mockup representation */}
                  <img 
                    src={screen} 
                    alt="" 
                    className="w-full h-full object-cover filter brightness-95 contrast-95" 
                  />
                </div>
              );
            })}
          </div>

          {/* 3. Folder Front Pocket (Tilts forward open on hover) */}
          <div 
            className="absolute inset-0 transition-transform duration-300 origin-bottom z-25 pointer-events-none"
            style={{
              transform: isHovered ? 'rotateX(-20deg) scaleY(0.98)' : 'rotateX(0deg)',
              transformStyle: 'preserve-3d'
            }}
          >
            <svg viewBox="0 0 100 80" className="w-full h-full drop-shadow-lg">
              <defs>
                <linearGradient id={`front-grad-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={colorStyles.frontStart} />
                  <stop offset="100%" stopColor={colorStyles.frontEnd} />
                </linearGradient>
              </defs>
              {/* Front pocket path matching the smooth rounded folder tab */}
              <path 
                d="M 0,29 Q 0,24 5,24 L 95,24 Q 100,24 100,29 L 100,75 Q 100,80 95,80 L 5,80 Q 0,80 0,75 Z" 
                fill={`url(#front-grad-${id})`}
                stroke={colorStyles.accent}
                strokeWidth="0.5"
                strokeOpacity="0.25"
              />
              {/* Top highlight path for a 3D glass sheen effect */}
              <path 
                d="M 1.5,29 Q 1.5,25 5,25 L 95,25 Q 98.5,25 98.5,29" 
                fill="none" 
                stroke="rgba(255, 255, 255, 0.35)" 
                strokeWidth="0.75" 
              />
            </svg>

            {/* Pocket Icon Symbol */}
            <div className="absolute inset-x-0 bottom-0 h-11 flex items-center justify-center">
              <PocketIcon 
                className="w-4 h-4 opacity-55 transition-colors duration-300"
                style={{ color: colorStyles.text }} 
              />
            </div>
          </div>

        </div>
      )}

      {/* Grid Label */}
      <span className="font-sans text-[10px] font-semibold text-zinc-200 bg-black/45 px-1.5 py-0.5 rounded-full border border-white/5 max-w-[90px] text-center line-clamp-1 group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-200">
        {title}
      </span>

      {/* Custom Context Menu */}
      {contextMenu && (
        <div 
          ref={contextMenuRef}
          className="no-drag absolute bg-zinc-900/95 border border-white/10 rounded-xl py-1 px-1 w-36 shadow-2xl z-[9999] flex flex-col font-sans select-none animate-in fade-in zoom-in-95 duration-100"
          style={{ 
            top: `${contextMenu.y}px`, 
            left: `${contextMenu.x}px` 
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Open / Show Details Option */}
          <button
            onClick={() => {
              if (onDoubleClick) onDoubleClick();
              setContextMenu(null);
            }}
            className="flex items-center gap-2 px-2 py-1.5 w-full text-[11px] font-bold text-zinc-200 hover:text-white hover:bg-indigo-500 rounded-lg text-left transition cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Show Details</span>
          </button>

          {/* Change Color Trigger Option */}
          <button
            onClick={() => {
              setShowColorPicker(true);
              setContextMenu(null);
            }}
            className="flex items-center gap-2 px-2 py-1.5 w-full text-[11px] font-bold text-zinc-200 hover:text-white hover:bg-indigo-500 rounded-lg text-left transition cursor-pointer"
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Change Color</span>
          </button>

          <div className="h-[1px] bg-white/10 my-1 mx-1" />

          {/* Remove Shortcut Option */}
          <button
            onClick={() => {
              if (onRemove) onRemove();
              setContextMenu(null);
            }}
            className="flex items-center gap-2 px-2 py-1.5 w-full text-[11px] font-bold text-red-400 hover:text-white hover:bg-red-500 rounded-lg text-left transition cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Remove</span>
          </button>
        </div>
      )}

      {/* Interactive Color Picker Popover */}
      {showColorPicker && (
        <div 
          ref={colorPickerRef}
          className="no-drag absolute bottom-20 left-1/2 -translate-x-1/2 bg-zinc-900/95 border border-white/10 rounded-full py-1 px-2 shadow-2xl flex items-center gap-1 z-[9999] animate-in fade-in zoom-in-95 duration-150"
          onClick={(e) => e.stopPropagation()}
        >
          {Object.keys(FOLDER_COLORS).map((cName) => (
            <button
              key={cName}
              onClick={() => {
                if (onColorChange) onColorChange(id, cName);
                setShowColorPicker(false);
              }}
              className={`w-3 h-3 rounded-full border border-white/20 transition-all hover:scale-125 hover:border-white/50 cursor-pointer`}
              style={{ backgroundColor: FOLDER_COLORS[cName].accent }}
              title={cName.charAt(0).toUpperCase() + cName.slice(1)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
