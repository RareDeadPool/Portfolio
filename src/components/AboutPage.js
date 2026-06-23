'use client';

import React from 'react';
import { Mail, Download, MapPin, Cpu, Layout, Layers, Sparkles, Code2 } from 'lucide-react';

export default function AboutPage({ onContactClick, onDownloadResume }) {
  const cards = [
    {
      title: 'Full-Stack Development',
      desc: 'Architecting high-performance backends in Go/Node.js coupled with responsive, stateful web frontends. Designing robust databases and microservices that scale efficiently under load.',
      icon: Code2,
      gridSpan: 'lg:col-span-2 md:col-span-2',
      glowColor: 'hover:shadow-[0_12px_24px_-10px_rgba(99,102,241,0.2)] dark:hover:shadow-[0_12px_24px_-10px_rgba(99,102,241,0.3)]',
      iconBg: 'bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/20 dark:border-indigo-500/30',
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      borderColor: 'hover:border-indigo-500/30 dark:hover:border-indigo-500/40',
      hoverBg: 'hover:bg-gradient-to-br hover:from-zinc-100/50 hover:to-indigo-500/[0.04] dark:hover:from-white/[0.04] dark:hover:to-indigo-500/[0.05]',
      tags: ['Go', 'Node.js', 'React/Next.js', 'PostgreSQL', 'Docker', 'REST & gRPC']
    },
    {
      title: 'AI + Web + Mobile Systems',
      desc: 'Integrating machine learning pipelines and custom neural network models into cross-platform mobile apps.',
      icon: Cpu,
      gridSpan: 'lg:col-span-1 md:col-span-1',
      glowColor: 'hover:shadow-[0_12px_24px_-10px_rgba(20,184,166,0.2)] dark:hover:shadow-[0_12px_24px_-10px_rgba(20,184,166,0.3)]',
      iconBg: 'bg-teal-500/10 dark:bg-teal-500/15 border border-teal-500/20 dark:border-teal-500/30',
      iconColor: 'text-teal-600 dark:text-teal-400',
      borderColor: 'hover:border-teal-500/30 dark:hover:border-teal-500/40',
      hoverBg: 'hover:bg-gradient-to-br hover:from-zinc-100/50 hover:to-teal-500/[0.04] dark:hover:from-white/[0.04] dark:hover:to-teal-500/[0.05]'
    },
    {
      title: 'Frontend Development',
      desc: 'Crafting visually stunning, high-fidelity user experiences and interactive WebGL canvas systems with pixel-perfect layouts.',
      icon: Layout,
      gridSpan: 'lg:col-span-1 md:col-span-1',
      glowColor: 'hover:shadow-[0_12px_24px_-10px_rgba(6,182,212,0.2)] dark:hover:shadow-[0_12px_24px_-10px_rgba(6,182,212,0.3)]',
      iconBg: 'bg-cyan-500/10 dark:bg-cyan-500/15 border border-cyan-500/20 dark:border-cyan-500/30',
      iconColor: 'text-cyan-600 dark:text-cyan-400',
      borderColor: 'hover:border-cyan-500/30 dark:hover:border-cyan-500/40',
      hoverBg: 'hover:bg-gradient-to-br hover:from-zinc-100/50 hover:to-cyan-500/[0.04] dark:hover:from-white/[0.04] dark:hover:to-cyan-500/[0.05]'
    },
    {
      title: 'Problem Solving',
      desc: 'Implementing optimized data structures and algorithms to achieve sub-millisecond computations and low-overhead solutions.',
      icon: Layers,
      gridSpan: 'lg:col-span-1 md:col-span-1',
      glowColor: 'hover:shadow-[0_12px_24px_-10px_rgba(245,158,11,0.2)] dark:hover:shadow-[0_12px_24px_-10px_rgba(245,158,11,0.3)]',
      iconBg: 'bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/20 dark:border-amber-500/30',
      iconColor: 'text-amber-600 dark:text-amber-400',
      borderColor: 'hover:border-amber-500/30 dark:hover:border-amber-500/40',
      hoverBg: 'hover:bg-gradient-to-br hover:from-zinc-100/50 hover:to-amber-500/[0.04] dark:hover:from-white/[0.04] dark:hover:to-amber-500/[0.05]'
    },
    {
      title: 'Real-world Project Builder',
      desc: 'Applying engineering discipline to create stable, production-ready logistics, chat, and collaborative applications.',
      icon: Sparkles,
      gridSpan: 'lg:col-span-1 md:col-span-1',
      glowColor: 'hover:shadow-[0_12px_24px_-10px_rgba(244,63,94,0.2)] dark:hover:shadow-[0_12px_24px_-10px_rgba(244,63,94,0.3)]',
      iconBg: 'bg-rose-500/10 dark:bg-rose-500/15 border border-rose-500/20 dark:border-rose-500/30',
      iconColor: 'text-rose-600 dark:text-rose-400',
      borderColor: 'hover:border-rose-500/30 dark:hover:border-rose-500/40',
      hoverBg: 'hover:bg-gradient-to-br hover:from-zinc-100/50 hover:to-rose-500/[0.04] dark:hover:from-white/[0.04] dark:hover:to-rose-500/[0.05]'
    }
  ];

  return (
    <div className="p-6 md:p-12 max-w-5xl mx-auto flex flex-col gap-8 font-sans select-text text-zinc-700 dark:text-zinc-300">
      {/* Introduction Hero Card */}
      <div className="rounded-3xl border border-zinc-200 dark:border-white/10 bg-zinc-100/50 dark:bg-white/[0.04] p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start shadow-xl">
        <div className="w-32 h-44 md:w-52 md:h-72 rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border border-zinc-200 dark:border-white/10 flex-shrink-0 select-none relative bg-zinc-150 dark:bg-zinc-850">
          <img
            src="/projects/meeee.jpeg"
            alt="Aditya Sawant"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-left">
              <h1 className="text-3xl font-extrabold text-zinc-950 dark:text-white tracking-tight">Aditya Sawant</h1>
              <p className="text-[14px] text-zinc-600 dark:text-zinc-400 font-semibold mt-1">
                Full-Stack Developer & Software Engineering Student
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 text-[12.5px] font-semibold bg-zinc-100/60 dark:bg-white/5 border border-zinc-200 dark:border-white/10 px-3 py-1.5 rounded-full select-none">
              <MapPin className="w-4 h-4 text-rose-500" />
              <span>Mumbai, India</span>
            </div>
          </div>

          <p className="text-zinc-700 dark:text-zinc-300 text-[14.5px] leading-relaxed mt-6 font-medium text-left">
            “Fueled by a deep enthusiasm for technology and innovation, I am a software engineering student keen to apply my academic knowledge to real-world challenges. I approach tasks with creativity and discipline, aiming to craft impactful digital solutions. I am eager to gain hands-on experience and bring my skills in front-end development, full-stack development, and problem-solving to new opportunities.”
          </p>

          <div className="flex flex-wrap gap-4 mt-8 select-none">
            <button
              onClick={onContactClick}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[12.5px] px-5 py-3 rounded-2xl transition duration-200 shadow-lg cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Me</span>
            </button>
            <button
              onClick={onDownloadResume}
              className="flex items-center gap-2 bg-zinc-100/60 hover:bg-zinc-200/60 dark:bg-white/5 dark:hover:bg-white/10 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-white/10 font-bold text-[12.5px] px-5 py-3 rounded-2xl transition duration-200 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume</span>
            </button>
          </div>
        </div>
      </div>

      {/* Focus Area Profile Cards */}
      <div className="flex flex-col gap-4">
        <h2 className="text-[11.5px] font-bold text-zinc-550 dark:text-zinc-500 uppercase tracking-widest font-mono select-none text-left">
          Focus Areas & Core Capabilities
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div 
                key={i}
                className={`group rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-100/40 dark:bg-white/[0.04] p-6 shadow-md hover:-translate-y-1.5 transition-all duration-300 ease-out text-left flex flex-col justify-between ${card.gridSpan} ${card.borderColor} ${card.glowColor} ${card.hoverBg}`}
              >
                <div>
                  <div className={`w-10 h-10 rounded-xl ${card.iconBg} flex items-center justify-center mb-4 select-none group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                    <Icon className={`w-5 h-5 ${card.iconColor}`} />
                  </div>
                  <h3 className="text-[14.5px] font-bold text-zinc-950 dark:text-white leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-[12.5px] text-zinc-650 dark:text-zinc-400 mt-2 leading-relaxed font-medium">
                    {card.desc}
                  </p>
                </div>
                
                {card.tags && (
                  <div className="flex flex-wrap gap-2 mt-5 select-none">
                    {card.tags.map((tag, idx) => (
                      <span 
                        key={idx} 
                        className="text-[10px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-lg bg-zinc-200/50 dark:bg-white/5 border border-zinc-300/30 dark:border-white/5 text-zinc-600 dark:text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
