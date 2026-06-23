'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function Window({
  id,
  title,
  isOpen,
  isActive,
  isMinimized,
  onClose,
  onMinimize,
  onFocus,
  zIndex,
  children
}) {
  if (!isOpen || isMinimized) return null;

  return (
    <motion.div
      initial={{ scale: 0.96, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.96, opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      style={{
        zIndex: zIndex,
      }}
      onPointerDown={onFocus}
      className={`fixed inset-4 md:inset-6 rounded-[28px] border shadow-2xl overflow-hidden flex flex-col transition-all duration-200
        bg-white/65 dark:bg-[#121216]/95 
        border-white/50 dark:border-white/12
        backdrop-blur-2xl
        shadow-[0_20px_50px_rgba(0,0,0,0.06),0_0_30px_rgba(168,85,247,0.02)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(168,85,247,0.06),0_0_30px_rgba(6,182,212,0.04)]
        ${isActive ? 'ring-1 ring-white/30 dark:ring-white/10' : 'opacity-95'}
      `}
    >
      {/* 1. App Title Bar */}
      <div 
        className="h-12 bg-white/20 dark:bg-white/[0.02] border-b border-white/30 dark:border-white/10 flex items-center justify-between px-5 select-none flex-shrink-0"
        onPointerDown={onFocus}
      >
        {/* macOS style traffic light window controls (Close, Minimize, Placeholder) */}
        <div className="flex gap-2 items-center">
          <button 
            onClick={onClose}
            className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] flex items-center justify-center text-[8px] text-[#5c0000] font-bold hover:opacity-80 transition cursor-pointer"
            title="Close"
          />
          <button 
            onClick={onMinimize}
            className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] flex items-center justify-center text-[8px] text-[#5c3e00] font-bold hover:opacity-80 transition cursor-pointer"
            title="Minimize"
          />
          <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f]/30 border border-[#27c93f]/10" />
        </div>

        {/* Window Title */}
        <span className={`text-[12.5px] font-bold tracking-wide uppercase font-sans ${isActive ? 'text-zinc-800 dark:text-zinc-200' : 'text-zinc-450 dark:text-zinc-555'}`}>
          {title}
        </span>

        {/* Right Action: Back to Desktop Button */}
        <button
          onClick={onClose}
          className="flex items-center gap-1.5 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white font-bold text-[11px] transition-all cursor-pointer px-3.5 py-1.5 rounded-xl bg-white/40 dark:bg-white/5 hover:bg-white/60 dark:hover:bg-white/10 border border-white/50 dark:border-white/10"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Desktop</span>
        </button>
      </div>

      {/* 2. Window Content Area */}
      <div className="flex-1 overflow-y-auto relative bg-white/10 dark:bg-[#0c0c0e]/30 text-zinc-700 dark:text-zinc-355 select-text">
        <div className="min-h-full w-full">
          {children}
        </div>
      </div>
    </motion.div>
  );
}
