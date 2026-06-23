'use client';

import React, { useState } from 'react';
import { School, GraduationCap, Calendar, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EducationPage() {
  const [activeIndex, setActiveIndex] = useState(2); // Default to Amity University (B.Tech)

  const steps = [
    {
      institution: 'Omkar International School',
      level: 'Secondary Education',
      duration: '2010 - 2022',
      icon: School,
      details: 'Completed foundational schooling focusing on science, mathematics, and computer literacy. Participated in technical science fairs and algorithmic problem-solving activities.',
      accentColor: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-500/10 dark:bg-emerald-500/15',
      borderColor: 'border-emerald-500/20 dark:border-emerald-500/30',
      dotColor: 'bg-emerald-500',
      subjectHover: 'hover:border-emerald-500/20 dark:hover:border-emerald-500/30',
      subjects: ['Science & Mathematics', 'Computer Literacy', 'Technical Science Fairs', 'Algorithmic Puzzles']
    },
    {
      institution: 'Vidyalankar Polytechnic',
      level: 'Diploma in Computer Engineering',
      duration: '2022 - 2025',
      icon: BookOpen,
      details: 'Gained intensive hands-on training in object-oriented programming, data structures, computer networks, database systems, and software engineering methodologies.',
      accentColor: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-500/10 dark:bg-amber-500/15',
      borderColor: 'border-amber-500/20 dark:border-amber-500/30',
      dotColor: 'bg-amber-500',
      subjectHover: 'hover:border-amber-500/20 dark:hover:border-amber-500/30',
      subjects: ['OOP (C++ / Java)', 'Data Structures & Algorithms', 'RDBMS & SQL', 'Computer Networks', 'Software Engineering']
    },
    {
      institution: 'Amity University Mumbai',
      level: 'B.Tech in Computer Engineering',
      duration: '2025 - Present',
      icon: GraduationCap,
      details: 'Currently pursuing advanced engineering courses including machine learning integrations, operating systems, cloud systems, and real-time distributed system structures.',
      accentColor: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-indigo-500/10 dark:bg-indigo-500/15',
      borderColor: 'border-indigo-500/20 dark:border-indigo-500/30',
      dotColor: 'bg-indigo-500',
      subjectHover: 'hover:border-indigo-500/20 dark:hover:border-indigo-500/30',
      subjects: ['Machine Learning Systems', 'Operating Systems Design', 'Distributed Systems', 'Cloud Architecture', 'Advanced Algorithms'],
      current: true
    }
  ];

  const activeStep = steps[activeIndex];
  const ActiveIcon = activeStep.icon;

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto flex flex-col gap-4 font-sans select-text text-zinc-700 dark:text-zinc-300 h-full">
      <div className="flex flex-col gap-1 select-none">
        <h1 className="text-xl md:text-2xl font-extrabold text-zinc-950 dark:text-white tracking-tight text-left">Academic Journey</h1>
        <p className="text-[12px] md:text-[13px] text-zinc-550 dark:text-zinc-400 text-left">Browse educational credentials, courses, and key achievements.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-5 items-stretch min-h-0">
        {/* Left Sidebar */}
        <div className="flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible gap-2 pb-2 md:pb-0 w-full md:w-64 flex-shrink-0 select-none border-b md:border-b-0 md:border-r border-zinc-200 dark:border-white/10 pr-0 md:pr-4 scrollbar-none">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isSelected = i === activeIndex;
            return (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`flex flex-1 md:flex-none items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all duration-200 cursor-pointer text-left border outline-none min-w-[180px] md:min-w-0 ${
                  isSelected
                    ? 'bg-zinc-200/50 dark:bg-white/[0.06] border-zinc-300 dark:border-white/10 text-zinc-955 dark:text-white font-semibold shadow-sm'
                    : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:bg-zinc-150/60 dark:hover:bg-white/5 font-medium'
                }`}
              >
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border transition-all duration-200 ${
                  isSelected ? `${step.bgColor} ${step.borderColor}` : 'bg-zinc-200/40 dark:bg-white/5 border-transparent'
                }`}>
                  <Icon className={`w-4 h-4 transition-transform duration-200 ${isSelected ? step.accentColor : 'text-zinc-500 dark:text-zinc-400'}`} />
                </span>
                <div className="flex flex-col text-[12px] leading-tight overflow-hidden">
                  <span className="font-bold truncate text-zinc-900 dark:text-zinc-100">{step.institution}</span>
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5 truncate">{step.level}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Details Panel */}
        <div className="flex-1 min-w-0 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="h-full bg-zinc-100/40 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/10 rounded-xl p-5 md:p-6 flex flex-col justify-between shadow-md hover:shadow-[0_8px_16px_-8px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_-8px_rgba(0,0,0,0.3)] transition-all duration-300"
            >
              <div className="flex flex-col gap-4">
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-zinc-200/60 dark:border-white/5 pb-3.5">
                  <div className="flex items-center gap-3.5 text-left">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center border flex-shrink-0 select-none shadow-sm ${activeStep.bgColor} ${activeStep.borderColor}`}>
                      <ActiveIcon className={`w-5.5 h-5.5 ${activeStep.accentColor}`} />
                    </div>
                    <div>
                      <h2 className="text-[15px] md:text-[17px] font-extrabold text-zinc-950 dark:text-white leading-tight">
                        {activeStep.institution}
                      </h2>
                      <span className={`text-[12px] font-extrabold mt-1 block ${activeStep.accentColor}`}>
                        {activeStep.level}
                      </span>
                    </div>
                  </div>

                  <span className="flex items-center gap-1 text-[10.5px] font-mono text-zinc-600 dark:text-zinc-400 bg-zinc-100/60 dark:bg-white/5 border border-zinc-205 dark:border-white/10 px-2.5 py-1 rounded-lg w-max flex-shrink-0 font-bold select-none h-max">
                    {activeStep.current && (
                      <span className="relative flex h-1.5 w-1.5 mr-0.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                      </span>
                    )}
                    <Calendar className="w-3 h-3" />
                    {activeStep.duration}
                  </span>
                </div>

                {/* Details text */}
                <p className="text-[12.5px] text-zinc-750 dark:text-zinc-300 leading-relaxed font-medium text-left">
                  {activeStep.details}
                </p>

                {/* Subjects Grid */}
                <div className="flex flex-col gap-2.5 mt-1 text-left">
                  <h4 className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-mono select-none">
                    Key Core Subjects & Focus Areas
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 select-none">
                    {activeStep.subjects.map((sub, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border border-zinc-200/50 dark:border-white/5 bg-zinc-150/20 dark:bg-white/[0.01] transition duration-200 ${activeStep.subjectHover}`}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full ${activeStep.dotColor}`} />
                        <span className="text-[11.5px] font-semibold text-zinc-700 dark:text-zinc-300">{sub}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
