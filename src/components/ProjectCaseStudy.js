'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Star, CheckCircle2, ExternalLink, ShieldAlert, RefreshCw, 
  Monitor, Smartphone, Globe, BookOpen, Terminal, 
  Sparkles, X 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS_DATA } from '../data/projectsData';

function GithubIcon({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

const BOOT_LOGS = {
  cityscan: [
    '[SYSTEM] Initializing TensorFlow Lite delegate...',
    '[SYSTEM] Loading YOLOv8 quantized INT8 edge model weights (3.2MB)...',
    '[SYSTEM] Camera frame buffer channel created.',
    '[SYSTEM] Edge Inference engine fully boot active.'
  ],
  dataviz: [
    '[SYSTEM] Requesting WebGL 2.0 rendering context...',
    '[SYSTEM] Vertex shader compile check: SUCCESS',
    '[SYSTEM] Fragment shader compile check: SUCCESS',
    '[SYSTEM] AudioContext active. Oscillator node buffers loaded.',
    '[SYSTEM] 3D Particle Visualizer engine active.'
  ],
  baatcheet: [
    '[SYSTEM] Launching Collaborative Chat workspace service...',
    '[SYSTEM] Connecting to Redis Adapter (redis://127.0.0.1:6379)...',
    '[SYSTEM] Redis sub-channel connection established.',
    '[SYSTEM] MongoDB persistent schema initialized.',
    '[SYSTEM] Collaborative sockets gateway ready.'
  ],
  shivner: [
    '[SYSTEM] Booting low-latency Rust Dijkstra routing worker...',
    '[SYSTEM] Establishing gRPC binary serialized protobuf socket on port :50051...',
    '[SYSTEM] Postgres geospatial PostGIS database mapping active.',
    '[SYSTEM] Clustered network graph loaded: 82,450 spatial vectors.',
    '[SYSTEM] High-throughput routing solver active.'
  ]
};

const LOG_GENERATORS = {
  cityscan: [
    () => `[AI Engine] Scanning camera frame queue...`,
    () => `[YOLOv8] Detected anomaly: "Pothole" at Lat: 19.0760, Lng: 72.8777 (Confidence: 91.2%)`,
    () => `[Inference] Core latency: 41ms | FPS: 24.3`,
    () => `[API Gateway] Dispatching incident report to GIS database...`,
    () => `[gRPC] Postgres write SUCCESS. Incident logged under UUID-8849-PF`,
    () => `[PDF Engine] Auto-compiled Municipal repair schedule: report-PH-992.pdf`
  ],
  dataviz: [
    () => `[WebGL WebGLRenderer] Drawing active node vertices (Total count: 23,450)`,
    () => `[GLSL Shader] Dynamic uniform parameters synchronized. uTime: ${(Date.now() % 10000 / 1005).toFixed(2)}`,
    () => `[Physics] Barnes-Hut repulsion calculation. Time: 1.4ms`,
    () => `[Web Audio API] Active oscillators frequency shifted. Pitch: ${Math.floor(220 + Math.random() * 440)}Hz`,
    () => `[Stats] Render loop cycle: stable 60.0 fps (Memory usage: 18.2 MB)`
  ],
  baatcheet: [
    () => `[SocketIO] WS Connection established client_id=Ws_9981a`,
    () => `[Redis Adapter] Registering sub-channel listener for room: "Vidyalankar Hackathon"`,
    () => `[MongoDB Resolver] Cache MISS. Querying database for thread: "Baatcheet Internal" (took 12ms)`,
    () => `[Redis Cache] cached channel listing metadata, key=channel:metadata:baatcheet`,
    () => `[SocketIO] broadcast message payload: "Winner authentication backend project!"`
  ],
  shivner: [
    () => `[Dijkstra Core] Calculated graph path from node_8842 to node_9918 (Hops: 12)`,
    () => `[Rust solver] Path calculation complete in 2.84ms`,
    () => `[gRPC Server] Serializing Protobuf payload array to Go REST Gateway (gRPC code: OK)`,
    () => `[PostGIS Router] spatial route overlay boundary box generated. Points: 82`,
    () => `[Nginx Proxy] Logged: POST /api/v1/route - 200 OK (3.2ms)`
  ]
};

export default function ProjectCaseStudy({ id, onClose }) {
  const project = PROJECTS_DATA[id];
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'sandbox'
  const [activePreviewMode, setActivePreviewMode] = useState('desktop'); // 'desktop' | 'mobile' | 'console'
  const [isIframeLoading, setIsIframeLoading] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [lightboxImage, setLightboxImage] = useState(null);
  const consoleEndRef = useRef(null);

  // Seed console logs and set up streaming interval when preview mode is 'console'
  useEffect(() => {
    if (activePreviewMode === 'console' && BOOT_LOGS[id]) {
      setConsoleLogs([...BOOT_LOGS[id]]);
      
      const interval = setInterval(() => {
        const generators = LOG_GENERATORS[id];
        if (generators) {
          const randomIdx = Math.floor(Math.random() * generators.length);
          const newLog = generators[randomIdx]();
          setConsoleLogs(prev => [...prev, newLog].slice(-30)); // Limit to last 30 logs
        }
      }, 1800);

      return () => clearInterval(interval);
    }
  }, [activePreviewMode, id]);

  // Scroll to bottom when console logs update
  useEffect(() => {
    if (activePreviewMode === 'console') {
      consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [consoleLogs, activePreviewMode]);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center text-zinc-500 font-sans p-12">
        <ShieldAlert className="w-12 h-12 text-red-500 mb-4 animate-pulse" />
        <h2 className="text-xl font-bold text-zinc-800 dark:text-white mb-2">Project Not Found</h2>
        <button 
          onClick={onClose} 
          className="mt-4 px-4 py-2 bg-zinc-200 hover:bg-zinc-300 dark:bg-white/5 border border-zinc-300 dark:border-white/10 rounded-lg text-zinc-800 dark:text-white transition cursor-pointer"
        >
          Back to Desktop
        </button>
      </div>
    );
  }

  const isShivner = id === 'shivner';
  const displayTitle = isShivner ? 'Shivner NGO' : project.title;
  const displaySubtitle = isShivner ? 'High-Performance Logistics Routing Engine for NGO fleet transit maps' : project.subtitle;

  const handleReload = () => {
    if (activePreviewMode === 'console') {
      setConsoleLogs([
        `[SYSTEM] Connection reset requested...`,
        `[SYSTEM] Re-initializing services...`,
        ...BOOT_LOGS[id]
      ]);
    } else {
      setIsIframeLoading(true);
      setReloadKey(prev => prev + 1);
    }
  };

  return (
    <div 
      className="flex flex-col font-sans select-text pb-20 relative"
      style={{ '--project-accent': project.accentHex }}
    >
      {/* Hero Banner */}
      <section 
        className="relative pt-10 pb-12 px-6 sm:px-12 md:px-16 border-b border-zinc-200 dark:border-white/5 select-text overflow-hidden flex-shrink-0"
        style={{
          background: `linear-gradient(180deg, ${project.accentHex}0a 0%, transparent 100%)`
        }}
      >
        <div 
          className="absolute right-[-10%] top-[-20%] w-[50vw] h-[50vw] rounded-full blur-[140px] opacity-15 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${project.accentHex} 0%, transparent 70%)` }}
        />

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8 relative z-10">
          <div className="flex-grow text-left">
            <span 
              className="text-[10px] font-mono tracking-widest uppercase font-bold px-2.5 py-1 rounded bg-zinc-200/50 dark:bg-white/5 border border-zinc-300 dark:border-white/10"
              style={{ color: project.accentHex, borderColor: `${project.accentHex}20` }}
            >
              {project.stack[0]} Architecture Case
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 dark:text-white tracking-tight mt-4 mb-3">
              {displayTitle}
            </h1>
            <p className="text-zinc-650 dark:text-zinc-400 text-xs sm:text-[13.5px] font-semibold leading-relaxed max-w-2xl">
              {displaySubtitle}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 flex-shrink-0 select-none">
            {project.gitLink && (
              <a 
                href={project.gitLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-zinc-200/60 hover:bg-zinc-200 dark:bg-white/5 border border-zinc-300 dark:border-white/10 text-zinc-700 dark:text-zinc-200 font-bold text-[12px] px-4 py-2 rounded-xl hover:text-zinc-900 dark:hover:text-white transition cursor-pointer"
              >
                <GithubIcon className="w-4 h-4" /> Repository
              </a>
            )}
            {project.liveLink && (
              <a 
                href={project.liveLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-black font-extrabold text-[12px] px-4 py-2 rounded-xl hover:opacity-95 transition cursor-pointer shadow-md font-sans"
                style={{ backgroundColor: project.accentHex }}
              >
                Launch App <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Dynamic Tab Switcher */}
      <section className="px-6 sm:px-12 md:px-16 pb-4 select-none mt-2">
        <div className="max-w-6xl mx-auto flex border-b border-zinc-200 dark:border-white/5">
          {[
            { key: 'overview', label: 'System Design & Overview', icon: BookOpen },
            { key: 'sandbox', label: 'Interactive Sandbox', icon: Sparkles }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-5 py-3 border-b-2 font-bold text-xs sm:text-sm tracking-wide transition duration-200 cursor-pointer border-0 ${
                  isActive
                    ? 'border-b-2 border-solid text-zinc-950 dark:text-white font-extrabold'
                    : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
                }`}
                style={isActive ? { borderBottomColor: project.accentHex, color: project.accentHex } : {}}
              >
                <Icon className="w-4 h-4 animate-none" style={isActive ? { color: project.accentHex } : {}} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Narrative & Custom Component Panels */}
      <section className="flex-grow px-6 sm:px-12 md:px-16 py-6 min-h-[450px]">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                {/* Left Columns - Narrative */}
                <div className="lg:col-span-2 flex flex-col gap-6 text-left">
                  {/* Summary Card */}
                  <div className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-white/[0.03] p-6 shadow-md hover:border-zinc-300 dark:hover:border-white/20 transition-all duration-300">
                    <h4 className="text-[10px] font-extrabold text-zinc-550 dark:text-zinc-500 uppercase tracking-widest mb-3 font-mono">
                      Executive Summary
                    </h4>
                    <p className="text-zinc-700 dark:text-zinc-300 text-[13.5px] leading-relaxed font-medium">
                      {project.desc}
                    </p>
                  </div>

                  {/* Challenge & Solution Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-rose-500/[0.02] dark:bg-rose-500/[0.01] border-rose-500/10 dark:border-rose-500/5 p-6 shadow-sm">
                      <div className="flex items-center gap-2 text-rose-500 mb-3 select-none">
                        <ShieldAlert className="w-4.5 h-4.5" />
                        <h4 className="text-[10px] font-extrabold uppercase tracking-widest font-mono">The Challenge</h4>
                      </div>
                      <p className="text-zinc-655 dark:text-zinc-400 text-[12.5px] leading-relaxed font-medium">
                        {project.problem}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-emerald-500/[0.02] dark:bg-emerald-500/[0.01] border-emerald-500/10 dark:border-emerald-500/5 p-6 shadow-sm">
                      <div className="flex items-center gap-2 text-emerald-500 mb-3 select-none">
                        <CheckCircle2 className="w-4.5 h-4.5" />
                        <h4 className="text-[10px] font-extrabold uppercase tracking-widest font-mono">The Solution</h4>
                      </div>
                      <p className="text-zinc-655 dark:text-zinc-400 text-[12.5px] leading-relaxed font-medium">
                        {project.solution}
                      </p>
                    </div>
                  </div>

                  {/* Features Checklist */}
                  <div className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-white/[0.03] p-6 shadow-md hover:border-zinc-300 dark:hover:border-white/20 transition-all duration-300">
                    <h4 className="text-[10px] font-extrabold text-zinc-550 dark:text-zinc-500 uppercase tracking-widest mb-4 font-mono">
                      Core Architecture Features
                    </h4>
                    <ul className="flex flex-col gap-3 font-medium">
                      {project.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-zinc-700 dark:text-zinc-300 text-[13px]">
                          <CheckCircle2 
                            className="w-4.5 h-4.5 mt-0.5 flex-shrink-0" 
                            style={{ color: project.accentHex }}
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right Column - Spec Sidebar */}
                <div className="flex flex-col gap-6 text-left">
                  {/* Contribution Card */}
                  <div className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-white/[0.03] p-5 shadow-md flex flex-col">
                    <div className="flex items-center gap-2 mb-3 select-none">
                      <Star className="w-4.5 h-4.5 text-zinc-600 dark:text-zinc-400" />
                      <h4 className="text-[10px] font-extrabold text-zinc-550 dark:text-zinc-500 uppercase tracking-widest font-mono">
                        Lead Role Contribution
                      </h4>
                    </div>
                    <p className="text-zinc-650 dark:text-zinc-400 text-[12px] leading-relaxed font-semibold">
                      {project.role}
                    </p>
                  </div>

                  {/* System Gallery */}
                  <div className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-white/[0.03] p-5 shadow-md flex flex-col">
                    <h4 className="text-[10px] font-extrabold text-zinc-550 dark:text-zinc-500 uppercase tracking-widest mb-3.5 font-mono select-none">
                      System Screenshots
                    </h4>
                    <div className="flex flex-col gap-4 select-none">
                      {project.mockScreens.map((screen, idx) => (
                        <div 
                          key={idx} 
                          onClick={() => setLightboxImage(screen)}
                          className="rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-100/50 dark:bg-[#131315]/50 shadow-md overflow-hidden flex flex-col group/item transition duration-300 cursor-zoom-in hover:border-[var(--project-accent)]/30"
                          style={{ '--project-accent': project.accentHex }}
                        >
                          {/* Mock window title bar */}
                          <div className="flex items-center gap-1.5 px-3 py-2 bg-zinc-100 dark:bg-[#131315]/50 border-b border-zinc-200/50 dark:border-white/5 select-none flex-shrink-0">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#ff5f56]" />
                            <span className="w-1.5 h-1.5 rounded-full bg-[#ffbd2e]" />
                            <span className="w-1.5 h-1.5 rounded-full bg-[#27c93f]" />
                          </div>
                          <div className="relative w-full aspect-video bg-zinc-900 overflow-hidden">
                            <img 
                              src={screen} 
                              alt="System Preview Thumbnail" 
                              className="w-full h-full object-cover filter brightness-90 contrast-95 group-hover/item:scale-105 transition duration-300" 
                            />
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/item:opacity-100 transition duration-300 flex items-center justify-center">
                              <span className="bg-black/60 text-white border border-white/10 text-[10px] font-bold px-3 py-1 rounded-full backdrop-blur-sm">Click to Zoom</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'sandbox' && (
              <motion.div
                key="sandbox"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-6"
              >
                {/* Safari Browser Mockup Wrapper */}
                <div className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-white/[0.03] shadow-xl overflow-hidden flex flex-col">
                  {/* Browser Controls */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 bg-zinc-150 dark:bg-[#121215]/80 border-b border-zinc-200/5 dark:border-white/5 select-none">
                    {/* Traffic lights + Refresh */}
                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                        <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                        <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                      </div>
                      
                      <button 
                        onClick={handleReload}
                        className="p-1.5 text-zinc-500 hover:text-zinc-800 dark:hover:text-white rounded-lg hover:bg-zinc-200 dark:hover:bg-white/5 transition cursor-pointer border-0"
                        title={activePreviewMode === 'console' ? 'Reset Console Logs' : 'Reload frame'}
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isIframeLoading ? 'animate-spin' : ''}`} />
                      </button>
                    </div>

                    {/* Central Address Bar */}
                    <div className="flex items-center gap-2 bg-zinc-200/50 dark:bg-white/5 border border-zinc-300 dark:border-white/10 rounded-xl px-4 py-1 text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 w-full sm:max-w-md truncate text-center justify-center font-mono">
                      <Globe className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" />
                      <span className="truncate select-all text-zinc-600 dark:text-zinc-300">
                        {activePreviewMode === 'console' 
                          ? `ws://${project.liveLink.replace(/https?:\/\//, '')}/console-stream`
                          : project.liveLink
                        }
                      </span>
                    </div>

                    {/* Mode Selectors */}
                    <div className="flex items-center gap-2 justify-end w-full sm:w-auto flex-wrap">
                      <div className="flex items-center bg-zinc-200/60 dark:bg-white/5 border border-zinc-300 dark:border-white/10 rounded-xl p-0.5">
                        {[
                          { key: 'desktop', label: 'Desktop', icon: Monitor },
                          { key: 'mobile', label: 'Mobile', icon: Smartphone },
                          { key: 'console', label: 'Console Logs', icon: Terminal }
                        ].map(mode => {
                          const Icon = mode.icon;
                          const isActive = activePreviewMode === mode.key;
                          return (
                            <button
                              key={mode.key}
                              onClick={() => {
                                setActivePreviewMode(mode.key);
                                setIsIframeLoading(false);
                              }}
                              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer border-0 ${
                                isActive
                                  ? 'bg-white dark:bg-white/10 text-zinc-950 dark:text-white shadow-sm'
                                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
                              }`}
                              title={mode.label}
                            >
                              <Icon className="w-3.5 h-3.5 animate-none" />
                              <span className="hidden sm:inline text-[10px]">{mode.label}</span>
                            </button>
                          );
                        })}
                      </div>

                      {project.liveLink && activePreviewMode !== 'console' && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-zinc-200/60 hover:bg-zinc-200 dark:bg-white/5 border border-zinc-300 dark:border-white/10 text-zinc-600 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white rounded-xl transition cursor-pointer"
                          title="Open application in new browser tab"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Browser Viewport Area */}
                  <div className="bg-zinc-950/20 dark:bg-zinc-950/40 p-4 sm:p-6 flex justify-center items-center overflow-hidden min-h-[600px] md:min-h-[640px]">
                    <motion.div
                      layout
                      transition={{ type: 'spring', stiffness: 200, damping: 26 }}
                      className={`bg-zinc-950 border border-zinc-300 dark:border-white/10 rounded-xl overflow-hidden shadow-2xl relative flex flex-col transition-all duration-300 ${
                        activePreviewMode === 'mobile'
                          ? 'w-[360px] h-[580px] sm:w-[390px] sm:h-[640px]'
                          : 'w-full max-w-6xl aspect-[16/10]'
                      }`}
                    >
                      {/* Mobile Notch Bar */}
                      {activePreviewMode === 'mobile' && (
                        <div className="h-5 bg-zinc-900 border-b border-white/5 flex items-center justify-center flex-shrink-0 select-none">
                          <div className="w-14 h-2.5 bg-black rounded-full" />
                        </div>
                      )}

                      {/* Display Content depending on mode */}
                      <div className="flex-1 relative w-full h-full bg-white overflow-hidden">
                        {activePreviewMode === 'console' ? (
                          /* Interactive Terminal Console View */
                          <div className="absolute inset-0 bg-[#0a0a0c] text-zinc-300 p-4 font-mono text-[10.5px] leading-relaxed flex flex-col justify-between select-text text-left">
                            <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-1.5 scrollbar-thin">
                              {consoleLogs.map((log, idx) => {
                                const isSystem = log.startsWith('[SYSTEM]');
                                const isWarn = log.includes('WARN') || log.includes('MISS');
                                const isError = log.includes('Error') || log.includes('Failed');
                                const isAi = log.startsWith('[AI]');
                                return (
                                  <div 
                                    key={idx}
                                    className={
                                      isSystem 
                                        ? 'text-zinc-500 font-semibold' 
                                        : isWarn 
                                        ? 'text-amber-400 font-bold' 
                                        : isError 
                                        ? 'text-red-400 font-bold animate-pulse'
                                        : isAi
                                        ? 'text-indigo-400 font-bold'
                                        : 'text-emerald-400 font-semibold'
                                    }
                                  >
                                    {log}
                                  </div>
                                );
                              })}
                              <div ref={consoleEndRef} />
                            </div>
                            
                            {/* Command Line Input block */}
                            <div className="border-t border-zinc-200/5 dark:border-white/5 pt-2 mt-2 flex items-center gap-2 flex-shrink-0 select-none text-zinc-500 font-bold">
                              <span>$</span>
                              <span className="text-zinc-300">tail -f console-stream --live</span>
                              <span className="w-1.5 h-3 bg-zinc-450 animate-pulse ml-0.5" />
                            </div>
                          </div>
                        ) : (
                          /* Live Web Frame View */
                          <>
                            {isIframeLoading && (
                              <div className="absolute inset-0 bg-zinc-950/75 flex items-center justify-center backdrop-blur-sm z-20 select-none">
                                <div className="flex flex-col items-center gap-3">
                                  <RefreshCw className="w-8 h-8 animate-spin text-zinc-400" />
                                  <span className="text-[11px] text-zinc-450 font-mono">Launching isolated deployment instance...</span>
                                </div>
                              </div>
                            )}
                            
                            <iframe
                              key={reloadKey}
                              src={project.liveLink}
                              onLoad={() => setIsIframeLoading(false)}
                              className="w-full h-full border-0 bg-white"
                              title={`${project.title} deployment frame`}
                              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                              loading="lazy"
                            />
                          </>
                        )}
                      </div>
                    </motion.div>
                  </div>

                  {/* Fallback frame banner */}
                  {activePreviewMode !== 'console' && (
                    <div className="px-4 py-2 bg-zinc-100/50 dark:bg-zinc-900/20 border-t border-zinc-200 dark:border-white/5 text-[10.5px] font-semibold text-zinc-500 dark:text-zinc-400 text-center select-none">
                      <span>Some hosts block frame inclusion. If the browser frame remains white, </span>
                      <a 
                        href={project.liveLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="underline font-bold hover:opacity-90"
                        style={{ color: project.accentHex }}
                      >
                        open the live app directly
                      </a>
                      <span> inside a new tab.</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Screen Preview Lightbox overlay */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 bg-black/95 z-[999] flex items-center justify-center p-4 backdrop-blur-md cursor-zoom-out"
          >
            <motion.img
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              src={lightboxImage}
              alt="Enlarged system preview"
              className="max-w-full max-h-[85vh] rounded-xl object-contain shadow-2xl border border-white/10"
            />
            <button 
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
