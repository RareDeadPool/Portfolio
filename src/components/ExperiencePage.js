'use client';

import React from 'react';
import { Briefcase, Calendar, Star, CheckCircle2 } from 'lucide-react';

export default function ExperiencePage() {
  const techChips = [
    'Flutter', 'Firebase', 'Mobile App Development', 'Real-time Database', 'Email Verification'
  ];

  return (
    <div className="p-6 md:p-12 max-w-4xl mx-auto flex flex-col gap-8 font-sans select-text text-zinc-700 dark:text-zinc-300">
      <div className="flex flex-col gap-2 mb-2 select-none text-left">
        <h1 className="text-2xl font-extrabold text-zinc-950 dark:text-white tracking-tight">Professional Experience</h1>
        <p className="text-[13px] text-zinc-500 dark:text-zinc-400">Industry roles, engineering internships, and application builds.</p>
      </div>

      {/* Main Experience Card */}
      <div className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-100/40 dark:bg-white/[0.06] p-6 md:p-8 shadow-xl flex flex-col gap-6 text-left">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-zinc-200/60 dark:border-white/5 pb-4 select-none text-left">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/15 flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-zinc-950 dark:text-white">Intern</h3>
              <span className="text-[13px] text-indigo-600 dark:text-indigo-400 font-extrabold block">
                Jinshaashan Info LLP
              </span>
            </div>
          </div>
          <span className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-600 dark:text-zinc-400 bg-zinc-100/60 dark:bg-white/5 border border-zinc-200 dark:border-white/10 px-3 py-1.5 rounded-lg w-max flex-shrink-0">
            <Calendar className="w-4 h-4" />
            2024 - 2024
          </span>
        </div>

        <p className="text-zinc-700 dark:text-zinc-300 text-[14px] leading-relaxed font-medium">
          “My internship at Jinshaashan Info LLP, under Mr. Vikram’s guidance, provided hands-on experience in mobile app development, web content creation, and data collection. I contributed to a Fitness App, implementing email verification and real-time databases using Flutter and Firebase. This experience strengthened my technical skills, teamwork, and time management.”
        </p>

        {/* Tech Chips */}
        <div className="flex flex-col gap-2.5">
          <span className="text-[10px] text-zinc-500 dark:text-zinc-500 font-bold uppercase tracking-widest font-mono select-none">
            Technologies Applied
          </span>
          <div className="flex flex-wrap gap-2 select-none justify-start">
            {techChips.map(chip => (
              <span 
                key={chip} 
                className="px-3 py-1 bg-zinc-100/60 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-lg text-[11px] font-semibold text-zinc-600 dark:text-zinc-300"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Related Project Section */}
      <div className="flex flex-col gap-4 text-left">
        <h3 className="text-[11.5px] font-bold text-zinc-550 dark:text-zinc-500 uppercase tracking-widest font-mono select-none">
          Associated Project Developments
        </h3>

        <div className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-100/40 dark:bg-white/[0.06] p-6 shadow-md hover:border-zinc-300 dark:hover:border-white/20 transition duration-200 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-zinc-200/60 dark:border-white/5 pb-3 select-none">
            <Star className="w-4.5 h-4.5 text-indigo-600 dark:text-indigo-400 fill-indigo-500/10" />
            <h4 className="text-[15px] font-bold text-zinc-950 dark:text-white">Fitness App Development</h4>
          </div>
          <p className="text-[13px] text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
            “Developed a Flutter-based fitness app with an intuitive UI, real-time progress tracking via Firebase, personalized fitness plans, workout logging, and progress graphs.”
          </p>
          <div className="flex items-center gap-2.5 text-[11.5px] text-zinc-600 dark:text-zinc-400 font-semibold select-none">
            <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500" />
            <span>Successfully completed prototype deployments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
