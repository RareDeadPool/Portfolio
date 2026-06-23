'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Cpu, Smartphone, Brain, Server, 
  Palette, Cloud, HelpCircle, Trophy, RefreshCw, Grid, Play, Zap,
  Mail, Download, Phone, ExternalLink, ChevronRight, User, Award,
  Search, Eye, Github, Linkedin, Share2, Calendar, MapPin, Globe, CheckCircle
} from 'lucide-react';
import Matter from 'matter-js';
import { gsap } from 'gsap';

// Import existing content pages for embedding
import AboutPage from './AboutPage';
import EducationPage from './EducationPage';
import ExperiencePage from './ExperiencePage';
import SkillsPage from './SkillsPage';
import AchievementsPage from './AchievementsPage';
import ResumePage from './ResumePage';
import OtherProjectsPage from './OtherProjectsPage';
import ProjectCaseStudy from './ProjectCaseStudy';

// Chibi Deadpool custom icon/logo helper
function CustomLogo() {
  return (
    <img 
      src="/deadpool.png" 
      alt="Deadpool" 
      className="w-6 h-6 object-contain flex-shrink-0 select-none" 
    />
  );
}

// Gravity Cards Data
const MOBILE_GRAVITY_CARDS = [
  { id: 'frontend', title: 'Frontend', label: 'React, Next.js, CSS3', icon: Cpu, accent: '#a855f7' },
  { id: 'mobile', title: 'Mobile', label: 'Flutter, React Native', icon: Smartphone, accent: '#06b6d4' },
  { id: 'ai', title: 'AI Engine', label: 'YOLOv8, TFLite models', icon: Brain, accent: '#10b981' },
  { id: 'backend', title: 'Backend', label: 'Go, Node.js, Postgres', icon: Server, accent: '#f59e0b' },
  { id: 'design', title: 'Design', label: 'Figma, layouts, systems', icon: Palette, accent: '#ec4899' },
  { id: 'deployment', title: 'DevOps', label: 'Docker, Vercel, Actions', icon: Cloud, accent: '#3b82f6' },
  { id: 'problem-solving', title: 'DSA Lab', label: 'Algorithms, complexity', icon: HelpCircle, accent: '#f97316' },
  { id: 'hackathons', title: 'GDG Core', label: 'Workshops, hackathons', icon: Trophy, accent: '#ec4899' }
];

export default## 9. Mobile OS Viewport Switcher & Layout Integration

### Changes Made
- Modified [Desktop.js](file:///c:/Users/Aditya%20Sawant/Desktop/portfolio/src/components/Desktop.js):
  - Imported [MobileOS.js](file:///c:/Users/Aditya%20Sawant/Desktop/portfolio/src/components/MobileOS.js) to serve the premium iOS-inspired Portfolio Phone OS.
  - Implemented client-side layout switching using `isMobile` (checking for screen width `< 768px`) and a resize hook listener.
  - Resolved potential Next.js server-side rendering (SSR) hydration mismatches by tracking a client-side `mounted` state and rendering a clean dark background placeholder until mount.
  - Connected the mobile OS interface to the identical backend logic and triggers by passing down the `downloadResumePDF`, `handleContactSubmit`, `contactSuccess`, and `setContactSuccess` states/handlers.

---

## 10. Verification & Build Results

- **Build Check**: Executed `npm run build` locally. The entire application compiles successfully with the new layout integration:
  ```bash
  ✓ Compiled successfully in 5.5s
  ✓ Generating static pages using 5 workers (4/4) in 1645ms
  Finalizing page optimization ...
  ```
- **Error Validation**: Confirmed 0 compiler, static rendering, hydration, or dependency warnings. Both macOS desktop and iOS mobile OS views resolve client-side bindings cleanly.
evements'
  const [searchQuery, setSearchQuery] = useState('');
  const [isShareToast, setIsShareToast] = useState(false);

  // App List definition
  const apps = [
    { id: 'about', label: 'About.app', icon: User, color: 'from-blue-500 to-indigo-650 font-bold text-white' },
    { id: 'education', label: 'Education.app', icon: Award, color: 'from-purple-500 to-indigo-655 font-bold text-white' },
    { id: 'experience', label: 'Experience.app', icon: Trophy, color: 'from-indigo-500 to-indigo-700 font-bold text-white' },
    { id: 'skills', label: 'Skills.app', icon: Cpu, color: 'from-teal-400 to-emerald-600 font-bold text-white' },
    { id: 'achievements', label: 'Milestones.app', icon: Award, color: 'from-pink-500 to-rose-600 font-bold text-white' },
    { id: 'playground', label: 'Playground.app', icon: Play, color: 'from-violet-500 to-fuchsia-600 font-bold text-white' },
    { id: 'resume', label: 'Resume.pdf', icon: Cloud, color: 'from-red-500 to-rose-600 font-bold text-white' },
    { id: 'contact', label: 'Contact.app', icon: Mail, color: 'from-emerald-400 to-teal-600 font-bold text-white' }
  ];

  // Filtered Apps based on search query
  const filteredApps = apps.filter(app => 
    app.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
    app.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.origin);
    setIsShareToast(true);
    setTimeout(() => setIsShareToast(false), 2000);
  };

  return (
    <div className="relative min-h-screen bg-[#0d0d10] text-zinc-200 overflow-x-hidden font-sans select-none flex flex-col justify-between pb-24">
      {/* Background radial overlays */}
      <div className="absolute top-[-10%] right-[-10%] w-[80vw] h-[80vw] bg-purple-650/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[80vw] h-[80vw] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* TOP HEADER AREA */}
      <header className="px-5 pt-4 pb-2 border-b border-white/5 bg-[#0f0f12]/50 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CustomLogo />
          <div className="flex flex-col text-left">
            <h1 className="text-sm font-extrabold text-white leading-tight">Aditya Sawant</h1>
            <span className="text-[10px] text-zinc-500 font-bold tracking-wide">Full-Stack Developer</span>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-[9px] font-extrabold text-zinc-400">
            <MapPin className="w-3 h-3 text-rose-500" />
            <span>Mumbai</span>
          </div>
          <button 
            onClick={handleShare}
            className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 active:scale-95 transition"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* HOME PAGE BODY */}
      <main className="flex-1 px-5 py-4 flex flex-col gap-5">
        <AnimatePresence mode="wait">
          {activeApp === null ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-5"
            >
              {/* HERO CARD WIDGET */}
              <div className="rounded-2xl border border-zinc-200/5 bg-white/[0.03] p-5 shadow-xl text-left flex flex-col justify-between gap-4 relative overflow-hidden backdrop-blur-xl">
                <div className="absolute top-[-30px] right-[-30px] w-28 h-28 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
                <div>
                  <span className="text-[9.5px] font-bold text-indigo-400 uppercase tracking-widest font-mono select-none block mb-1">Interactive OS v1.0</span>
                  <h2 className="text-2xl font-black text-white leading-tight">I'm Aditya...</h2>
                  <p className="text-[12.5px] text-zinc-400 mt-2 font-medium leading-relaxed">
                    Building high-fidelity full-stack applications, scalable AI inspection tools, and cross-platform mobile systems.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setActiveApp('contact')}
                    className="flex-1 bg-indigo-600 active:bg-indigo-700 text-white font-bold text-xs py-3 rounded-xl transition cursor-pointer select-none text-center justify-center"
                  >
                    Contact Me
                  </button>
                  <button 
                    onClick={downloadResumePDF}
                    className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs py-3 rounded-xl transition cursor-pointer select-none text-center justify-center"
                  >
                    Download CV
                  </button>
                </div>
              </div>

              {/* SEARCH BAR */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search apps, projects, credentials..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-indigo-500/50 font-medium tracking-wide placeholder-zinc-500"
                />
              </div>

              {/* FEATURED PROJECTS SLIDER */}
              {searchQuery === '' && (
                <div className="flex flex-col gap-2.5">
                  <h3 className="text-[10px] font-extrabold text-zinc-500 uppercase tracking-widest font-mono text-left">Featured Case Studies</h3>
                  <div className="flex overflow-x-auto gap-4 pb-2 scrollbar-none snap-x snap-mandatory">
                    {/* Project: CityScan */}
                    <div className="flex-shrink-0 w-[280px] snap-center rounded-2xl border border-zinc-200/5 bg-white/[0.02] p-4 flex flex-col justify-between gap-4 text-left">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                          <Smartphone className="w-4 h-4 text-teal-400" />
                        </div>
                        <div className="flex flex-col">
                          <h4 className="text-[13px] font-black text-white leading-tight">CityScan.app</h4>
                          <span className="text-[9px] text-zinc-500 font-bold">AI Infrastructure Scan</span>
                        </div>
                      </div>
                      <p className="text-[11.5px] text-zinc-400 leading-relaxed font-medium">
                        AI infrastructure damage detection app with Flutter, YOLOv8, TFLite, GPS tagging, offline reports, and PDF generation.
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {['Flutter', 'YOLOv8', 'TFLite', 'GPS'].map(c => (
                          <span key={c} className="text-[8px] font-bold font-mono px-2 py-0.5 bg-white/5 border border-white/5 text-zinc-300 rounded-md">{c}</span>
                        ))}
                      </div>
                      <button 
                        onClick={() => setActiveApp('project-cityscan')}
                        className="w-full bg-teal-500/10 border border-teal-500/20 text-teal-400 hover:bg-teal-500/20 font-bold text-[10.5px] py-2 rounded-xl transition cursor-pointer select-none"
                      >
                        View Case Study
                      </button>
                    </div>

                    {/* Project: DataViz */}
                    <div className="flex-shrink-0 w-[280px] snap-center rounded-2xl border border-zinc-200/5 bg-white/[0.02] p-4 flex flex-col justify-between gap-4 text-left">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                          <Palette className="w-4 h-4 text-purple-400" />
                        </div>
                        <div className="flex flex-col">
                          <h4 className="text-[13px] font-black text-white leading-tight">DataViz.app</h4>
                          <span className="text-[9px] text-zinc-500 font-bold">3D Particle Visualizer</span>
                        </div>
                      </div>
                      <p className="text-[11.5px] text-zinc-400 leading-relaxed font-medium">
                        Interactive data visualization platform that turns uploaded datasets into AI-assisted charts.
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {['WebGL', 'Three.js', 'GLSL', 'React'].map(c => (
                          <span key={c} className="text-[8px] font-bold font-mono px-2 py-0.5 bg-white/5 border border-white/5 text-zinc-300 rounded-md">{c}</span>
                        ))}
                      </div>
                      <button 
                        onClick={() => setActiveApp('project-dataviz')}
                        className="w-full bg-purple-500/10 border border-purple-500/20 text-purple-450 hover:bg-purple-500/20 font-bold text-[10.5px] py-2 rounded-xl transition cursor-pointer select-none"
                      >
                        View Case Study
                      </button>
                    </div>

                    {/* Project: Shivner */}
                    <div className="flex-shrink-0 w-[280px] snap-center rounded-2xl border border-zinc-200/5 bg-white/[0.02] p-4 flex flex-col justify-between gap-4 text-left">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                          <Trophy className="w-4 h-4 text-orange-400" />
                        </div>
                        <div className="flex flex-col">
                          <h4 className="text-[13px] font-black text-white leading-tight">Shivner NGO</h4>
                          <span className="text-[9px] text-zinc-500 font-bold">Logistics & Admin Portal</span>
                        </div>
                      </div>
                      <p className="text-[11.5px] text-zinc-400 leading-relaxed font-medium">
                        NGO management platform for events, donations, certificates, and admin workflows.
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {['Go', 'Rust', 'PostgreSQL', 'gRPC'].map(c => (
                          <span key={c} className="text-[8px] font-bold font-mono px-2 py-0.5 bg-white/5 border border-white/5 text-zinc-300 rounded-md">{c}</span>
                        ))}
                      </div>
                      <button 
                        onClick={() => setActiveApp('project-shivner')}
                        className="w-full bg-orange-500/10 border border-orange-500/20 text-orange-400 hover:bg-orange-500/20 font-bold text-[10.5px] py-2 rounded-xl transition cursor-pointer select-none"
                      >
                        View Case Study
                      </button>
                    </div>

                    {/* Project: Helix AI */}
                    <div className="flex-shrink-0 w-[280px] snap-center rounded-2xl border border-zinc-200/5 bg-white/[0.02] p-4 flex flex-col justify-between gap-4 text-left">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                          <Brain className="w-4 h-4 text-cyan-400" />
                        </div>
                        <div className="flex flex-col">
                          <h4 className="text-[13px] font-black text-white leading-tight">Helix AI</h4>
                          <span className="text-[9px] text-zinc-500 font-bold">Generative Website Builder</span>
                        </div>
                      </div>
                      <p className="text-[11.5px] text-zinc-400 leading-relaxed font-medium">
                        AI website builder that converts business prompts into modular full-stack applications.
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {['Next.js', 'LLMs', 'Node.js', 'MongoDB'].map(c => (
                          <span key={c} className="text-[8px] font-bold font-mono px-2 py-0.5 bg-white/5 border border-white/5 text-zinc-300 rounded-md">{c}</span>
                        ))}
                      </div>
                      <button 
                        onClick={() => setActiveApp('projects')}
                        className="w-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20 font-bold text-[10.5px] py-2 rounded-xl transition cursor-pointer select-none"
                      >
                        View All Projects
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* APP GRID SECTION */}
              <div className="flex flex-col gap-2.5">
                <h3 className="text-[10px] font-extrabold text-zinc-550 dark:text-zinc-500 uppercase tracking-widest font-mono text-left">
                  {searchQuery !== '' ? 'Search Results' : 'Workspace Applications'}
                </h3>
                {filteredApps.length > 0 ? (
                  <div className="grid grid-cols-4 gap-y-4 gap-x-2.5">
                    {filteredApps.map(app => {
                      const Icon = app.icon;
                      return (
                        <button
                          key={app.id}
                          onClick={() => {
                            setActiveApp(app.id);
                            setSearchQuery('');
                          }}
                          className="flex flex-col items-center gap-1.5 focus:outline-none active:scale-95 transition-transform cursor-pointer"
                        >
                          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${app.color} flex items-center justify-center shadow-lg border border-white/10 relative overflow-hidden`}>
                            {/* App Glossy Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/15" />
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-[10px] font-semibold text-zinc-400 truncate max-w-full leading-tight">{app.label}</span>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-xs text-zinc-500 py-6 text-center">No apps or matches found.</p>
                )}
              </div>

              {/* BOTTOM WIDGETS STACK (TODAY VIEW STYLE) */}
              {searchQuery === '' && (
                <div className="flex flex-col gap-4 border-t border-white/5 pt-5">
                  <h3 className="text-[10px] font-extrabold text-zinc-500 uppercase tracking-widest font-mono text-left">Today View Widgets</h3>

                  {/* Widget: Tech Stack */}
                  <div className="rounded-2xl border border-zinc-200/5 bg-white/[0.02] p-4 text-left flex flex-col gap-2.5 shadow-md">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-indigo-400" />
                      <span className="text-[9.5px] font-extrabold text-zinc-500 uppercase tracking-wider font-mono">Toolkit Inventory</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {['React', 'Next.js', 'Flutter', 'Go', 'Node.js', 'Python', 'Docker', 'PostgreSQL'].map(t => (
                        <span key={t} className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-zinc-300">{t}</span>
                      ))}
                    </div>
                  </div>

                  {/* Widget: Latest Milestone */}
                  <div className="rounded-2xl border border-zinc-200/5 bg-white/[0.02] p-4 text-left flex items-center gap-3.5 shadow-md">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <Trophy className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[9px] font-extrabold text-zinc-500 uppercase tracking-widest font-mono">Latest Milestone</span>
                      <span className="text-[11.5px] text-white font-bold leading-snug mt-0.5">GDG Web Development Core Member at Amity University</span>
                    </div>
                  </div>

                  {/* Widget: Get in Touch */}
                  <a
                    href="mailto:sawantaditya0708@gmail.com"
                    className="rounded-2xl border border-zinc-200/5 bg-white/[0.02] p-4 flex items-center justify-between shadow-md active:scale-[0.99] transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-4.5 h-4.5 text-emerald-400" />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider font-mono">Let's build together</span>
                        <span className="text-[11.5px] text-white font-bold mt-0.5 leading-none">sawantaditya0708@gmail.com</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-500" />
                  </a>
                </div>
              )}
            </motion.div>
          ) : (
            /* FULL SCREEN APP VIEW */
            <motion.div
              key="app"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="flex flex-col gap-4"
            >
              {/* App Page Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <button
                  onClick={() => setActiveApp(null)}
                  className="flex items-center gap-1 text-[11px] font-bold text-indigo-400 uppercase font-mono bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
                <span className="text-[11px] font-extrabold text-zinc-500 font-mono tracking-widest uppercase select-none">
                  {activeApp.startsWith('project-') ? 'CaseStudy.app' : `${activeApp.toUpperCase()}.APP`}
                </span>
              </div>

              {/* Render Selected App Body */}
              <div className="flex-1 w-full overflow-y-auto scrollbar-none">
                {activeApp === 'about' && (
                  <AboutPage
                    onContactClick={() => setActiveApp('contact')}
                    onDownloadResume={downloadResumePDF}
                  />
                )}
                {activeApp === 'education' && <EducationPage />}
                {activeApp === 'experience' && <ExperiencePage />}
                {activeApp === 'skills' && <SkillsPage />}
                {activeApp === 'achievements' && <AchievementsPage />}
                {activeApp === 'resume' && (
                  <ResumePage
                    onDownload={downloadResumePDF}
                  />
                )}
                {activeApp === 'contact' && (
                  <div className="flex flex-col gap-5 text-left">
                    {/* Contact card */}
                    <div className="rounded-2xl border border-zinc-200/5 bg-white/[0.02] p-5 shadow-lg flex flex-col gap-4">
                      <div className="flex items-center gap-3 select-none pb-3 border-b border-white/5">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                          <Mail className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div className="flex flex-col text-left">
                          <h3 className="text-sm font-extrabold text-white">Contact Info</h3>
                          <span className="text-[10px] text-zinc-500">Reach out directly anytime</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2.5 text-xs">
                        <a href="mailto:sawantaditya0708@gmail.com" className="flex items-center justify-between text-zinc-350 hover:text-white transition">
                          <span className="font-semibold text-zinc-500 font-mono text-[10px] uppercase">Email</span>
                          <span className="font-bold underline">sawantaditya0708@gmail.com</span>
                        </a>
                        <div className="h-[1px] bg-white/5" />
                        <a href="tel:+918591211342" className="flex items-center justify-between text-zinc-350 hover:text-white transition">
                          <span className="font-semibold text-zinc-500 font-mono text-[10px] uppercase">Phone</span>
                          <span className="font-bold">+91 85912 11342</span>
                        </a>
                        <div className="h-[1px] bg-white/5" />
                        <a href="https://www.linkedin.com/in/aditya-sawant-25932527b/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-zinc-350 hover:text-white transition">
                          <span className="font-semibold text-zinc-500 font-mono text-[10px] uppercase">LinkedIn</span>
                          <span className="font-bold underline">Aditya Sawant</span>
                        </a>
                        <div className="h-[1px] bg-white/5" />
                        <a href="https://github.com/RareDeadPool" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-zinc-350 hover:text-white transition">
                          <span className="font-semibold text-zinc-500 font-mono text-[10px] uppercase">GitHub</span>
                          <span className="font-bold underline">RareDeadPool</span>
                        </a>
                      </div>
                    </div>

                    {/* Contact Message Form */}
                    <div className="rounded-2xl border border-zinc-200/5 bg-white/[0.02] p-5 shadow-lg flex flex-col gap-4">
                      {!contactSuccess ? (
                        <>
                          <div className="flex flex-col text-left">
                            <h3 className="text-sm font-extrabold text-white">Send a Message</h3>
                            <span className="text-[10px] text-zinc-500">I will get back to you shortly</span>
                          </div>
                          <form onSubmit={handleContactSubmit} className="flex flex-col gap-4 font-sans text-xs">
                            <div className="flex flex-col gap-1.5">
                              <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Name</label>
                              <input name="name" type="text" required placeholder="John Doe" className="bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-indigo-500/50 font-semibold" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                              <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Email</label>
                              <input name="email" type="email" required placeholder="john@example.com" className="bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-indigo-500/50 font-semibold" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                              <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Message</label>
                              <textarea name="message" rows={4} required placeholder="Hey Aditya, let's connect..." className="bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-indigo-500/50 resize-none font-semibold" />
                            </div>
                            <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition shadow cursor-pointer">
                              Send Message
                            </button>
                          </form>
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center text-center gap-3 py-6 select-none">
                          <CheckCircle className="w-10 h-10 text-emerald-400 animate-bounce" />
                          <h4 className="text-sm font-extrabold text-white">Message Sent Successfully!</h4>
                          <p className="text-zinc-400 text-xs max-w-xs leading-relaxed mt-0.5">Your email was forwarded to sawantaditya0708@gmail.com.</p>
                          <button
                            onClick={() => setContactSuccess(false)}
                            className="mt-2 bg-white/5 border border-white/10 text-zinc-300 font-bold px-4 py-2 rounded-xl hover:bg-white/10 cursor-pointer"
                          >
                            Send Another Message
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {activeApp === 'projects' && <OtherProjectsPage />}
                {activeApp === 'playground' && <MobilePlayground />}
                {activeApp.startsWith('project-') && (
                  <ProjectCaseStudy
                    id={activeApp.replace('project-', '')}
                    onClose={() => setActiveApp(null)}
                  />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* BOTTOM GLASS DOCK */}
      <nav className="fixed bottom-4 inset-x-4 h-16 bg-[#0f0f12]/60 backdrop-blur-xl border border-white/5 rounded-2xl flex items-center justify-around px-4 z-40 select-none shadow-[0_15px_30px_-5px_rgba(0,0,0,0.5)]">
        {[
          { id: null, label: 'Home', icon: User },
          { id: 'projects', label: 'Projects', icon: Globe },
          { id: 'skills', label: 'Skills', icon: Cpu },
          { id: 'resume', label: 'Resume', icon: Cloud },
          { id: 'contact', label: 'Contact', icon: Mail }
        ].map(item => {
          const Icon = item.icon;
          const isActive = activeApp === item.id;
          return (
            <button
              key={item.label}
              onClick={() => setActiveApp(item.id)}
              className="flex flex-col items-center justify-center gap-1 focus:outline-none active:scale-90 transition-transform cursor-pointer"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                isActive 
                  ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300 shadow-md shadow-indigo-500/5' 
                  : 'bg-white/5 border-transparent text-zinc-550'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
            </button>
          );
        })}
      </nav>

      {/* Share copied link Toast overlay */}
      {isShareToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-zinc-900 border border-white/10 px-4 py-2 rounded-xl text-[10px] font-bold text-white shadow-2xl z-[999] animate-bounce select-none">
          Portfolio URL copied to clipboard!
        </div>
      )}
    </div>
  );
}

// MOBILE PLAYGROUND - DRAGGABLE GRAVITY CARDS COMPONENT
function MobilePlayground() {
  const sandboxRef = useRef(null);
  const engineRef = useRef(null);
  const runnerRef = useRef(null);
  const cardBodiesRef = useRef([]);
  const [isGridMode, setIsGridMode] = useState(false);

  const cardWidth = 98;
  const cardHeight = 62;

  useEffect(() => {
    const sandbox = sandboxRef.current;
    if (!sandbox) return;

    const rect = sandbox.getBoundingClientRect();
    const width = rect.width || window.innerWidth - 40;
    const height = rect.height || 360;

    // 1. Matter.js Engine
    const engine = Matter.Engine.create({
      gravity: { y: 0.85, x: 0 }
    });
    engineRef.current = engine;

    // 2. Bound boxes (floor, ceiling, walls)
    const wallThick = 100;
    const floor = Matter.Bodies.rectangle(width / 2, height + wallThick / 2, width * 2, wallThick, { isStatic: true });
    const ceiling = Matter.Bodies.rectangle(width / 2, -wallThick / 2, width * 2, wallThick, { isStatic: true });
    const leftWall = Matter.Bodies.rectangle(-wallThick / 2, height / 2, wallThick, height * 2, { isStatic: true });
    const rightWall = Matter.Bodies.rectangle(width + wallThick / 2, height / 2, wallThick, height * 2, { isStatic: true });

    Matter.World.add(engine.world, [floor, ceiling, leftWall, rightWall]);

    // 3. Setup Draggable Card objects
    const bodies = MOBILE_GRAVITY_CARDS.map((card, idx) => {
      const x = width / 2 + (Math.random() - 0.5) * (width * 0.6);
      const y = 40 + idx * 12;

      const body = Matter.Bodies.rectangle(x, y, cardWidth, cardHeight, {
        restitution: 0.5,
        friction: 0.05,
        frictionAir: 0.015,
        angle: (Math.random() - 0.5) * 0.4
      });
      body.plugin = { cardId: card.id };

      return {
        card,
        body,
        element: document.getElementById(`mobile-gcard-${card.id}`)
      };
    });

    cardBodiesRef.current = bodies;
    Matter.World.add(engine.world, bodies.map(b => b.body));

    // 4. Mouse constraints supporting Touch actions
    const mouse = Matter.Mouse.create(sandbox);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.12,
        render: { visible: false }
      }
    });

    Matter.World.add(engine.world, mouseConstraint);

    // Disable screen scrolling while dragging cards inside the sandbox
    mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
    mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);

    // 5. Physics tick loops
    const runner = Matter.Runner.create();
    runnerRef.current = runner;
    Matter.Runner.run(runner, engine);

    // 6. Hook ticks to translate DOM elements
    Matter.Events.on(engine, 'afterUpdate', () => {
      bodies.forEach(({ body, element }) => {
        if (!element || body.isStatic) return;
        const tx = body.position.x - cardWidth / 2;
        const ty = body.position.y - cardHeight / 2;
        element.style.transform = `translate3d(${tx}px, ${ty}px, 0px) rotate(${body.angle}rad)`;
      });
    });

    // 7. Flash border on collision
    Matter.Events.on(engine, 'collisionStart', (e) => {
      e.pairs.forEach(pair => {
        const checkFlash = (body) => {
          if (body.plugin && body.plugin.cardId) {
            const el = document.getElementById(`mobile-gcard-${body.plugin.cardId}`);
            if (el) {
              gsap.fromTo(el,
                { borderColor: 'rgba(168, 85, 247, 0.4)' },
                { borderColor: 'rgba(255, 255, 255, 0.1)', duration: 0.4 }
              );
            }
          }
        };
        checkFlash(pair.bodyA);
        checkFlash(pair.bodyB);
      });
    });

    // Intro drop drop
    gsap.fromTo('.mobile-gcard-el',
      { scale: 0.6, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, stagger: 0.04, ease: 'power2.out' }
    );

    return () => {
      Matter.Runner.stop(runner);
      Matter.World.clear(engine.world);
      Matter.Engine.clear(engine);
      gsap.killTweensOf('.mobile-gcard-el');
    };
  }, []);

  const handleBounceCard = (id) => {
    if (isGridMode) return;
    const match = cardBodiesRef.current.find(b => b.card.id === id);
    if (!match) return;

    const body = match.body;
    const el = match.element;

    Matter.Body.applyForce(body, body.position, {
      x: (Math.random() - 0.5) * 0.03,
      y: -0.15
    });
    Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.2);

    gsap.fromTo(el,
      { scale: 0.9 },
      { scale: 1, duration: 0.35, ease: 'elastic.out(1.2, 0.4)' }
    );
  };

  const handleResetGravity = () => {
    setIsGridMode(false);
    const sandbox = sandboxRef.current;
    if (!sandbox) return;

    const rect = sandbox.getBoundingClientRect();
    const width = rect.width || window.innerWidth - 40;

    cardBodiesRef.current.forEach(({ body, element }, idx) => {
      const rx = width / 2 + (Math.random() - 0.5) * (width * 0.6);
      const ry = 30 + idx * 8;

      Matter.Body.setStatic(body, false);
      Matter.Body.setPosition(body, { x: rx, y: ry });
      Matter.Body.setVelocity(body, { x: (Math.random() - 0.5) * 2, y: 1 });
      Matter.Body.setAngle(body, (Math.random() - 0.5) * 0.3);

      if (element) {
        gsap.to(element, { scale: 1, duration: 0.25 });
      }
    });

    if (runnerRef.current && engineRef.current) {
      Matter.Runner.run(runnerRef.current, engineRef.current);
    }
  };

  const handleArrangeGrid = () => {
    setIsGridMode(true);
    const sandbox = sandboxRef.current;
    if (!sandbox) return;

    const rect = sandbox.getBoundingClientRect();
    const width = rect.width || window.innerWidth - 40;
    const height = rect.height || 360;

    if (runnerRef.current) {
      Matter.Runner.stop(runnerRef.current);
    }

    // Grid coordinates (cols x rows)
    const cols = 3;
    const gapX = 10;
    const gapY = 12;
    const totalW = cols * cardWidth + (cols - 1) * gapX;
    const startX = (width - totalW) / 2;
    const startY = (height - (3 * cardHeight + 2 * gapY)) / 2;

    cardBodiesRef.current.forEach(({ body, element }, idx) => {
      const r = Math.floor(idx / cols);
      const c = idx % cols;
      const tx = startX + c * (cardWidth + gapX);
      const ty = startY + r * (cardHeight + gapY);

      Matter.Body.setStatic(body, true);
      Matter.Body.setPosition(body, { x: tx + cardWidth / 2, y: ty + cardHeight / 2 });
      Matter.Body.setAngle(body, 0);

      if (element) {
        gsap.to(element, {
          x: tx,
          y: ty,
          rotation: 0,
          scale: 1,
          duration: 0.5,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      }
    });
  };

  return (
    <div className="flex flex-col gap-4 text-left">
      <div className="flex flex-col gap-0.5">
        <h2 className="text-lg font-black text-white flex items-center gap-2">
          <Zap className="w-4.5 h-4.5 text-purple-400" /> Gravity Cards
        </h2>
        <p className="text-[11.5px] text-zinc-500">
          Draggable cards with gravity, wall collisions and snap grid. Touch and drag cards, or double-tap to bounce.
        </p>
      </div>

      {/* Physics Box container */}
      <div 
        ref={sandboxRef}
        className="w-full h-[360px] bg-black/45 border border-white/5 rounded-2xl relative overflow-hidden select-none"
      >
        <div className="absolute inset-0 bg-dot-grid opacity-10 pointer-events-none" />

        {/* Floating Cards */}
        {MOBILE_GRAVITY_CARDS.map(card => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              id={`mobile-gcard-${card.id}`}
              onTouchStart={() => handleBounceCard(card.id)}
              onDoubleClick={() => handleBounceCard(card.id)}
              className="mobile-gcard-el absolute top-0 left-0 border rounded-xl p-2 bg-zinc-950/70 border-white/10 backdrop-blur-xl shadow-lg cursor-grab active:cursor-grabbing text-left flex flex-col justify-between"
              style={{
                width: `${cardWidth}px`,
                height: `${cardHeight}px`,
                transform: 'translate3d(0px, 0px, 0px)',
                willChange: 'transform',
                transformOrigin: 'center center'
              }}
            >
              <div className="flex items-center justify-between select-none pointer-events-none">
                <div className="p-0.5 rounded bg-white/5 border border-white/5 flex items-center justify-center">
                  <Icon className="w-3 h-3" style={{ color: card.accent }} />
                </div>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: card.accent }} />
              </div>
              <div className="flex flex-col gap-0 mt-1 select-none pointer-events-none">
                <span className="text-[9.5px] font-extrabold text-white leading-tight">{card.title}</span>
                <span className="text-[7.5px] text-zinc-500 font-bold leading-none truncate">{card.label}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Control Actions */}
      <div className="flex items-center gap-3 select-none pt-2 justify-center">
        <button
          onClick={handleResetGravity}
          className="flex items-center gap-1.5 bg-purple-600 text-white font-bold text-[11px] px-5 py-3 rounded-xl active:bg-purple-700 transition cursor-pointer select-none"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Gravity</span>
        </button>

        <button
          onClick={handleArrangeGrid}
          className="flex items-center gap-1.5 bg-white/5 border border-white/10 text-zinc-300 font-bold text-[11px] px-5 py-3 rounded-xl active:bg-white/10 transition cursor-pointer select-none"
        >
          <Grid className="w-3.5 h-3.5" />
          <span>Arrange Grid</span>
        </button>
      </div>
    </div>
  );
}
