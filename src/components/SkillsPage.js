'use client';

import React, { useState } from 'react';
import { 
  Monitor, Phone, Cpu, Database, Brain, Settings, ChevronRight,
  Code, Palette, Braces, Atom, Wind, Zap, Smartphone, Server, Network, Flame, Eye, GitFork, Lightbulb, GitBranch, Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SkillsPage() {
  const [activeCatIndex, setActiveCatIndex] = useState(0);
  const [activeSkillIndex, setActiveSkillIndex] = useState(0);

  const categories = [
    {
      title: 'Frontend Development',
      icon: Monitor,
      color: 'indigo',
      accentColor: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-indigo-500/10 dark:bg-indigo-500/15',
      borderColor: 'border-indigo-500/20 dark:border-indigo-500/30',
      barColor: 'bg-indigo-500 dark:bg-indigo-400',
      skills: [
        { name: 'HTML5', icon: Code, iconColor: 'text-[#E34F26]', confidence: 'Strong', experience: '2+ years', usedIn: 'Portfolio, Shivner NGO, DataViz, Helix AI', desc: 'Semantic HTML markup structure, accessibility standards (ARIA), SEO optimizations, and structured DOM hierarchies.' },
        { name: 'CSS3 / PostCSS', icon: Palette, iconColor: 'text-[#1572B6]', confidence: 'Strong', experience: '2+ years', usedIn: 'Portfolio, Shivner NGO, DataViz, Helix AI', desc: 'Advanced responsive layouts (Grid/Flexbox), custom animations, media queries, variables, and modern Tailwind extensions.' },
        { name: 'JavaScript (ES6+)', icon: Braces, iconColor: 'text-[#F7DF1E]', confidence: 'Strong', experience: '2+ years', usedIn: 'Portfolio, Shivner NGO, DataViz, Helix AI', desc: 'Asynchronous event loops, promise handling, OOP/functional patterns, dynamic DOM scripting, and core JS engines execution.' },
        { name: 'React.js', icon: Atom, iconColor: 'text-[#61DAFB]', confidence: 'Strong', experience: '2+ years', usedIn: 'Portfolio, Shivner NGO, DataViz, Helix AI', desc: 'State management, custom hooks development, virtual DOM rendering performance, Context API, and stateful layouts.' },
        { name: 'Tailwind CSS', icon: Wind, iconColor: 'text-[#38BDF8]', confidence: 'Strong', experience: '2+ years', usedIn: 'Portfolio, Shivner NGO, DataViz, Helix AI', desc: 'Rapid prototyping, customized configurations, utility-first design consistency, and dark mode toggling support.' },
        { name: 'Next.js', icon: Zap, iconColor: 'text-zinc-900 dark:text-white', confidence: 'Strong', experience: '1+ years', usedIn: 'Portfolio, Baatcheet, Helix AI', desc: 'Server-side rendering (SSR), static site generation (SSG), dynamic routing optimization, custom APIs, and component hydration.' }
      ]
    },
    {
      title: 'Mobile Applications',
      icon: Phone,
      color: 'amber',
      accentColor: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-500/10 dark:bg-amber-500/15',
      borderColor: 'border-amber-500/20 dark:border-amber-500/30',
      barColor: 'bg-amber-500 dark:bg-amber-400',
      skills: [
        { name: 'Flutter', icon: Smartphone, iconColor: 'text-[#02569B]', confidence: 'Strong', experience: '2+ years', usedIn: 'CityScan, Shivner NGO', desc: 'Cross-platform app development in Dart, state management (Provider/Bloc), custom widget layouts, and native platform integrations.' },
        { name: 'React Native', icon: Atom, iconColor: 'text-[#61DAFB]', confidence: 'Moderate', experience: '1+ year', usedIn: 'Shivner NGO, Personal Sandbox', desc: 'Mobile application design using React, flex layouts, cross-platform modules, and standard mobile components.' }
      ]
    },
    {
      title: 'Backend & Databases',
      icon: Database,
      color: 'teal',
      accentColor: 'text-teal-650 dark:text-teal-400',
      bgColor: 'bg-teal-500/10 dark:bg-teal-500/15',
      borderColor: 'border-teal-500/20 dark:border-teal-500/30',
      barColor: 'bg-teal-500 dark:bg-teal-400',
      skills: [
        { name: 'Node.js', icon: Server, iconColor: 'text-[#339933]', confidence: 'Strong', experience: '2+ years', usedIn: 'Baatcheet, Shivner NGO, Helix AI', desc: 'Asynchronous backend routing, event emitters, file systems stream processing, REST API structuring, and package integrations.' },
        { name: 'Express.js', icon: Network, iconColor: 'text-zinc-650 dark:text-zinc-350', confidence: 'Strong', experience: '2+ years', usedIn: 'Baatcheet, Shivner NGO, Helix AI', desc: 'Router setups, custom middleware execution, error handling pathways, CORS configuration, and RESTful service development.' },
        { name: 'MongoDB', icon: Database, iconColor: 'text-[#47A248]', confidence: 'Strong', experience: '2+ years', usedIn: 'Baatcheet, Shivner NGO, Helix AI', desc: 'Document schema design, aggregation pipeline execution, indexing optimization, and custom mongoose schemas.' },
        { name: 'Firebase', icon: Flame, iconColor: 'text-[#FFCA28]', confidence: 'Strong', experience: '2+ years', usedIn: 'CityScan, Fitness App, Sandbox', desc: 'Realtime database synchronization, cloud storage integrations, secure custom authentications, and hosting configurations.' }
      ]
    },
    {
      title: 'AI / Machine Learning',
      icon: Brain,
      color: 'rose',
      accentColor: 'text-rose-650 dark:text-rose-400',
      bgColor: 'bg-rose-500/10 dark:bg-rose-500/15',
      borderColor: 'border-rose-500/20 dark:border-rose-500/30',
      barColor: 'bg-rose-500 dark:bg-rose-400',
      skills: [
        { name: 'YOLOv8', icon: Eye, iconColor: 'text-[#0052FF]', confidence: 'Strong', experience: '1+ years', usedIn: 'CityScan, Edge AI Pipeline', desc: 'Real-time object detection models training, dataset annotations, model compression, and inference optimization.' },
        { name: 'TFLite', icon: Cpu, iconColor: 'text-[#FF6F00]', confidence: 'Strong', experience: '1+ years', usedIn: 'CityScan, Edge AI Pipeline', desc: 'TensorFlow model conversions, quantized weights mapping, and edge-device deep learning deployments.' }
      ]
    },
    {
      title: 'Core Fundamentals',
      icon: Cpu,
      color: 'cyan',
      accentColor: 'text-cyan-650 dark:text-cyan-400',
      bgColor: 'bg-cyan-500/10 dark:bg-cyan-500/15',
      borderColor: 'border-cyan-500/20 dark:border-cyan-500/30',
      barColor: 'bg-cyan-500 dark:bg-cyan-400',
      skills: [
        { name: 'Data Structures (DSA)', icon: GitFork, iconColor: 'text-purple-550 dark:text-purple-400', confidence: 'Strong', experience: '3+ years', usedIn: 'Dijkstra Solver, Graph Pathfinders', desc: 'Deep knowledge of core structures (hash maps, trees, graphs) and complexity analysis (Time & Space complexities).' },
        { name: 'Problem Solving', icon: Lightbulb, iconColor: 'text-yellow-555 dark:text-yellow-450', confidence: 'Strong', experience: '3+ years', usedIn: 'Internal Hackathons, Industrial Hackathons', desc: 'Algorithmic efficiency adjustments, sorting/searching algorithms, dynamic programming, and competitive code compilation.' }
      ]
    },
    {
      title: 'Developer Tools',
      icon: Settings,
      color: 'emerald',
      accentColor: 'text-emerald-650 dark:text-emerald-400',
      bgColor: 'bg-emerald-500/10 dark:bg-emerald-500/15',
      borderColor: 'border-emerald-500/20 dark:border-emerald-500/30',
      barColor: 'bg-emerald-500 dark:bg-emerald-400',
      skills: [
        { name: 'Git & GitHub', icon: GitBranch, iconColor: 'text-[#F05032]', confidence: 'Strong', experience: '3+ years', usedIn: 'All Projects, Team Collaboration', desc: 'Branch management strategies, merge conflict resolutions, rebase workflows, and remote repository hosting hooks.' },
        { name: 'Vercel Deployments', icon: Globe, iconColor: 'text-zinc-900 dark:text-white', confidence: 'Strong', experience: '2+ years', usedIn: 'Portfolio, CityScan, Baatcheet', desc: 'Automated CD pipelines, serverless function routing, preview deployments, and custom domain integrations.' }
      ]
    }
  ];

  const handleCategoryClick = (idx) => {
    setActiveCatIndex(idx);
    setActiveSkillIndex(0);
  };

  const activeCategory = categories[activeCatIndex];
  const activeSkill = activeCategory.skills[activeSkillIndex] || activeCategory.skills[0];
  const ActiveSkillIcon = activeSkill.icon;

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto flex flex-col gap-4 font-sans select-text text-zinc-750 dark:text-zinc-300 h-full">
      <div className="flex flex-col gap-1 select-none">
        <h1 className="text-xl md:text-2xl font-extrabold text-zinc-950 dark:text-white tracking-tight text-left">Technical Toolkit</h1>
        <p className="text-[12px] md:text-[13px] text-zinc-500 dark:text-zinc-400 text-left">Browse software credentials, languages, and frameworks.</p>
      </div>

      {/* Desktop macOS Finder Layout (Side-by-side Columns) */}
      <div className="hidden md:flex flex-row gap-5 items-stretch min-h-0 h-[420px]">
        {/* Column 1: Categories Sidebar */}
        <div className="w-52 flex-shrink-0 flex flex-col gap-1 pr-4 border-r border-zinc-200 dark:border-white/10 select-none overflow-y-auto scrollbar-none">
          {categories.map((cat, i) => {
            const CatIcon = cat.icon;
            const isSelected = i === activeCatIndex;
            return (
              <button
                key={i}
                onClick={() => handleCategoryClick(i)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all duration-200 cursor-pointer text-left border outline-none ${
                  isSelected
                    ? 'bg-zinc-200/50 dark:bg-white/[0.06] border-zinc-300 dark:border-white/10 text-zinc-950 dark:text-white font-semibold shadow-sm'
                    : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:bg-zinc-150/60 dark:hover:bg-white/5 font-medium'
                }`}
              >
                <CatIcon className={`w-4.5 h-4.5 transition-colors duration-200 flex-shrink-0 ${isSelected ? cat.accentColor : 'text-zinc-400'}`} />
                <span className={`text-[12px] truncate font-bold ${isSelected ? 'text-zinc-900 dark:text-zinc-200' : 'text-zinc-600 dark:text-zinc-400'}`}>{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* Column 2: Skills inside Active Category */}
        <div className="w-56 flex-shrink-0 flex flex-col gap-1 pr-4 border-r border-zinc-200 dark:border-white/10 select-none overflow-y-auto scrollbar-none">
          {activeCategory.skills.map((skill, i) => {
            const SkillIcon = skill.icon;
            const isSelected = i === activeSkillIndex;
            return (
              <button
                key={i}
                onClick={() => setActiveSkillIndex(i)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all duration-200 cursor-pointer text-left border outline-none ${
                  isSelected
                    ? 'bg-zinc-200/50 dark:bg-white/[0.06] border-zinc-300 dark:border-white/10 text-zinc-950 dark:text-white font-semibold shadow-sm'
                    : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:bg-zinc-150/60 dark:hover:bg-white/5 font-medium'
                }`}
              >
                <SkillIcon className={`w-4 h-4 transition-transform duration-200 flex-shrink-0 group-hover:scale-110 ${skill.iconColor}`} />
                <span className={`text-[12px] truncate font-bold ${isSelected ? 'text-zinc-950 dark:text-white font-extrabold' : 'text-zinc-600 dark:text-zinc-400'}`}>{skill.name}</span>
              </button>
            );
          })}
        </div>

        {/* Column 3: Skill Detail Preview Card */}
        <div className="flex-1 min-w-0 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCatIndex}-${activeSkillIndex}`}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="h-full bg-zinc-100/40 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/10 rounded-xl p-5 flex flex-col justify-between shadow-md hover:shadow-[0_8px_16px_-8px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_-8px_rgba(0,0,0,0.3)] transition-all duration-300 text-left"
            >
              <div className="flex flex-col gap-4">
                {/* File path breadcrumbs */}
                <div className="text-[9.5px] font-mono text-zinc-500 dark:text-zinc-400 tracking-wide uppercase select-none pb-2 border-b border-zinc-200/40 dark:border-white/5">
                  Toolkit &gt; {activeCategory.title.split(' ')[0]} &gt; {activeSkill.name}
                </div>

                {/* Big Preview Icon and Title */}
                <div className="flex flex-col items-center justify-center py-4 select-none bg-zinc-100/30 dark:bg-white/[0.01] rounded-xl border border-zinc-200/50 dark:border-white/5 gap-2">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-sm ${activeCategory.bgColor} ${activeCategory.borderColor}`}>
                    <ActiveSkillIcon className="w-6 h-6" />
                  </div>
                  <h2 className="text-[14px] font-extrabold text-zinc-950 dark:text-white leading-tight">
                    {activeSkill.name}
                  </h2>
                </div>

                {/* Skill Details Metadata Grid */}
                <div className="flex flex-col gap-2.5 bg-zinc-200/40 dark:bg-black/15 border border-zinc-200 dark:border-white/5 rounded-xl p-3.5 select-none text-[12px]">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider text-[9.5px]">Experience</span>
                    <span className="font-bold text-zinc-800 dark:text-zinc-200">{activeSkill.experience}</span>
                  </div>
                  <div className="h-[1px] bg-zinc-200 dark:bg-white/5" />
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider text-[9.5px]">Confidence</span>
                    <span className={`font-bold ${activeCategory.accentColor}`}>{activeSkill.confidence}</span>
                  </div>
                  <div className="h-[1px] bg-zinc-200 dark:bg-white/5" />
                  <div className="flex flex-col gap-0.5 items-start text-left">
                    <span className="text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider text-[9.5px]">Used in</span>
                    <span className="font-semibold text-zinc-750 dark:text-zinc-300 leading-relaxed mt-0.5">{activeSkill.usedIn}</span>
                  </div>
                </div>

                {/* Description usecase */}
                <div className="flex flex-col gap-1.5 text-left">
                  <span className="text-[9.5px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-mono select-none">Application & Details</span>
                  <p className="text-[12px] text-zinc-600 dark:text-zinc-300 leading-relaxed font-medium">
                    {activeSkill.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Layout (Scrollable Category Tabs + Accordion List) */}
      <div className="flex md:hidden flex-col gap-3 h-full">
        {/* Categories Bar */}
        <div className="flex overflow-x-auto gap-2 pb-1.5 select-none scrollbar-none">
          {categories.map((cat, i) => {
            const CatIcon = cat.icon;
            const isSelected = i === activeCatIndex;
            return (
              <button
                key={i}
                onClick={() => handleCategoryClick(i)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all duration-200 cursor-pointer text-left border outline-none whitespace-nowrap ${
                  isSelected
                    ? 'bg-zinc-200/50 dark:bg-white/[0.06] border-zinc-300 dark:border-white/10 text-zinc-950 dark:text-white font-semibold shadow-sm'
                    : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:bg-zinc-150/60 dark:hover:bg-white/5 font-medium text-[12px]'
                }`}
              >
                <CatIcon className={`w-4 h-4 flex-shrink-0 ${isSelected ? cat.accentColor : 'text-zinc-400'}`} />
                <span className="text-[11.5px] font-bold">{cat.title.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Accordion List */}
        <div className="flex flex-col gap-2 overflow-y-auto pr-0.5">
          {activeCategory.skills.map((skill, idx) => {
            const SkillIcon = skill.icon;
            const isSkillSelected = idx === activeSkillIndex;
            return (
              <div key={idx} className="flex flex-col gap-1.5">
                <button
                  onClick={() => setActiveSkillIndex(idx)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-[12.5px] font-semibold text-left transition duration-200 outline-none ${
                    isSkillSelected
                      ? 'bg-zinc-200/50 dark:bg-white/[0.06] border-zinc-300 dark:border-white/10 text-zinc-950 dark:text-white font-extrabold'
                      : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:bg-zinc-150/60 dark:hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <SkillIcon className={`w-4 h-4 flex-shrink-0 ${skill.iconColor}`} />
                    {skill.name}
                  </span>
                  <ChevronRight className={`w-4 h-4 transition-transform duration-200 text-zinc-400 ${isSkillSelected ? 'rotate-90' : ''}`} />
                </button>

                <AnimatePresence>
                  {isSkillSelected && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="overflow-hidden bg-zinc-100/40 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5 rounded-xl p-4 flex flex-col gap-3"
                    >
                      {/* Mobile stats panel */}
                      <div className="flex flex-col gap-2 bg-zinc-200/40 dark:bg-black/15 border border-zinc-200 dark:border-white/5 rounded-xl p-3 text-[11.5px] select-none text-left">
                        <div className="flex justify-between">
                          <span className="text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider text-[9px]">Experience</span>
                          <span className="font-bold text-zinc-800 dark:text-zinc-200">{skill.experience}</span>
                        </div>
                        <div className="h-[1px] bg-zinc-200 dark:bg-white/5" />
                        <div className="flex justify-between">
                          <span className="text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider text-[9px]">Confidence</span>
                          <span className={`font-bold ${activeCategory.accentColor}`}>{skill.confidence}</span>
                        </div>
                        <div className="h-[1px] bg-zinc-200 dark:bg-white/5" />
                        <div className="flex flex-col gap-0.5">
                          <span className="text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider text-[9px]">Used in</span>
                          <span className="font-semibold text-zinc-700 dark:text-zinc-300 mt-0.5 leading-relaxed">{skill.usedIn}</span>
                        </div>
                      </div>

                      <p className="text-[12px] text-zinc-600 dark:text-zinc-300 leading-relaxed font-medium text-left">
                        {skill.desc}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
