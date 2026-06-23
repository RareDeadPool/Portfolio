'use client';

import React from 'react';
import { Trophy, Award, Zap } from 'lucide-react';

export default function AchievementsPage() {
  const items = [
    {
      title: 'Web Development GDG Core Member',
      subtitle: 'Amity University Mumbai',
      badge: 'Core Team',
      desc: 'Selected as a Web Development Core Member for Google Developer Groups (GDG). Organizing student workshops, leading technical projects, and fostering a community of engineering students.',
      icon: Trophy,
      bgColor: 'bg-amber-500/10 dark:bg-amber-500/15',
      borderColor: 'border-amber-500/20 dark:border-amber-500/30 hover:border-amber-500/30 dark:hover:border-amber-500/40',
      accentColor: 'text-amber-600 dark:text-amber-400',
      badgeStyle: 'text-amber-600 dark:text-amber-400 border-amber-500/20 dark:border-amber-500/30',
      hoverBg: 'hover:bg-gradient-to-br hover:from-zinc-100/50 hover:to-amber-500/[0.04] dark:hover:from-white/[0.04] dark:hover:to-amber-500/[0.05]',
      glowColor: 'hover:shadow-[0_12px_24px_-10px_rgba(245,158,11,0.2)] dark:hover:shadow-[0_12px_24px_-10px_rgba(245,158,11,0.3)]',
      tags: ['Leadership', 'Technical Mentoring', 'Public Speaking', 'React & Next.js']
    },
    {
      title: 'Industrial Hackathon Winner',
      subtitle: 'Vidyalankar Polytechnic',
      badge: '1st Place Winner',
      desc: 'Won first prize in the campus Industrial Hackathon for developing a high-performance, secure, and optimized Authentication backend system.',
      icon: Award,
      bgColor: 'bg-purple-500/10 dark:bg-purple-500/15',
      borderColor: 'border-purple-500/20 dark:border-purple-500/30 hover:border-purple-500/30 dark:hover:border-purple-500/40',
      accentColor: 'text-purple-600 dark:text-purple-400',
      badgeStyle: 'text-purple-600 dark:text-purple-400 border-purple-500/20 dark:border-purple-500/30',
      hoverBg: 'hover:bg-gradient-to-br hover:from-zinc-100/50 hover:to-purple-500/[0.04] dark:hover:from-white/[0.04] dark:hover:to-purple-500/[0.05]',
      glowColor: 'hover:shadow-[0_12px_24px_-10px_rgba(168,85,247,0.2)] dark:hover:shadow-[0_12px_24px_-10px_rgba(168,85,247,0.3)]',
      tags: ['Node.js', 'Express.js', 'JWT Auth', 'Cryptography']
    },
    {
      title: 'Internal Hackathon Winner',
      subtitle: 'Vidyalankar Polytechnic',
      badge: 'First Prize',
      desc: 'Secured first place in the internal polytechnic hackathon for designing and building "Baatcheet", a real-time collaborative chat application featuring instant message synchronization.',
      icon: Zap,
      bgColor: 'bg-cyan-500/10 dark:bg-cyan-500/15',
      borderColor: 'border-cyan-500/20 dark:border-cyan-500/30 hover:border-cyan-500/30 dark:hover:border-cyan-500/40',
      accentColor: 'text-cyan-600 dark:text-cyan-400',
      badgeStyle: 'text-cyan-600 dark:text-cyan-400 border-cyan-500/20 dark:border-cyan-500/30',
      hoverBg: 'hover:bg-gradient-to-br hover:from-zinc-100/50 hover:to-cyan-500/[0.04] dark:hover:from-white/[0.04] dark:hover:to-cyan-500/[0.05]',
      glowColor: 'hover:shadow-[0_12px_24px_-10px_rgba(6,182,212,0.2)] dark:hover:shadow-[0_12px_24px_-10px_rgba(6,182,212,0.3)]',
      tags: ['React.js', 'Socket.io', 'Node.js', 'Real-Time Sync']
    }
  ];

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto flex flex-col gap-4 font-sans select-text text-zinc-700 dark:text-zinc-300 h-full">
      <div className="flex flex-col gap-1 select-none text-left">
        <h1 className="text-xl md:text-2xl font-extrabold text-zinc-950 dark:text-white tracking-tight">Milestones & Accreditations</h1>
        <p className="text-[12px] md:text-[13px] text-zinc-500 dark:text-zinc-400">Honorable awards, community roles, and hackathon wins.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div 
              key={idx}
              className={`group rounded-xl border bg-zinc-100/40 dark:bg-white/[0.04] p-5 shadow-md hover:-translate-y-1.5 transition-all duration-300 ease-out flex flex-col justify-between text-left ${item.glowColor} ${item.borderColor} ${item.hoverBg}`}
            >
              <div>
                <div className="flex items-center justify-between select-none">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center border shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${item.bgColor} ${item.borderColor}`}>
                    <Icon className={`w-5 h-5 ${item.accentColor}`} />
                  </div>
                  <span className={`text-[9.5px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-full border bg-white dark:bg-[#131315] shadow-sm select-none ${item.badgeStyle}`}>
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-[14.5px] font-bold text-zinc-950 dark:text-white leading-tight mt-4 text-left">
                  {item.title}
                </h3>
                <span className="text-[11.5px] text-zinc-600 dark:text-zinc-400 font-extrabold mt-1 block uppercase tracking-wider font-mono text-left select-none">
                  {item.subtitle}
                </span>

                <p className="text-[12.5px] text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium mt-3.5 text-left">
                  {item.desc}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-5 select-none">
                {item.tags.map((tag, idx) => (
                  <span 
                    key={idx}
                    className="text-[9.5px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-md bg-zinc-200/50 dark:bg-white/5 border border-zinc-300/30 dark:border-white/5 text-zinc-650 dark:text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
