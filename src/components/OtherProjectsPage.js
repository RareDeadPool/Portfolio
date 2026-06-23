'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Cpu, Database, Settings, ExternalLink, Code2, Server, Globe, Play, CheckCircle, RefreshCw, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function OtherProjectsPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto flex flex-col font-sans select-text pb-10 h-full">
      {/* Visual Header */}
      <section className="pb-6 text-left select-none">
        <h1 className="text-xl md:text-2xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
          Creative Code & Utilities
        </h1>
        <p className="text-zinc-550 dark:text-zinc-455 text-[12px] md:text-[13px] leading-relaxed mt-1 font-semibold max-w-2xl">
          An explorer directory compiling minor tools, backend API blueprints, microservices setups, and open-source scripts built during my workspace hacking.
        </p>
      </section>

      {/* Projects Grid Layout */}
      <main className="w-full flex-grow overflow-y-auto pr-0.5 scrollbar-none">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Card 1: Go API Blueprint (Spans 2 columns) */}
          <motion.div
            variants={itemVariants}
            className="group rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-100/40 dark:bg-white/[0.04] p-5 flex flex-col justify-between gap-5 shadow-md hover:-translate-y-1 hover:shadow-[0_10px_20px_-8px_rgba(20,184,166,0.25)] dark:hover:shadow-[0_10px_20px_-8px_rgba(20,184,166,0.3)] hover:border-teal-500/30 dark:hover:border-teal-500/40 hover:bg-gradient-to-br hover:from-zinc-100/50 hover:to-teal-500/[0.04] dark:hover:from-white/[0.04] dark:hover:to-teal-500/[0.05] transition-all duration-300 ease-out text-left lg:col-span-2 md:col-span-2"
          >
            <div className="flex flex-col gap-3.5">
              <div className="flex items-center justify-between select-none">
                <span className="text-[9.5px] font-extrabold text-zinc-550 dark:text-zinc-500 uppercase tracking-widest font-mono">
                  Backend Microservice
                </span>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center border shadow-sm bg-teal-500/10 dark:bg-teal-500/15 border-teal-500/20 dark:border-teal-500/30">
                  <Server className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-5 items-stretch">
                {/* Description Text */}
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="text-[14.5px] font-extrabold text-zinc-950 dark:text-white leading-snug group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    Go API Blueprint
                  </h3>
                  <span className="text-[11px] text-zinc-550 dark:text-zinc-455 font-semibold leading-normal block mt-0.5 select-none">
                    REST & gRPC Microservice Starter Boilerplate
                  </span>
                  <p className="text-[12.5px] text-zinc-650 dark:text-zinc-350 leading-relaxed font-medium mt-3">
                    Production-ready Go boilerplate implementing clean architecture, structured zap logging, CORS middlewares, Prometheus telemetry, and automated DB migration configurations.
                  </p>
                </div>

                {/* API Test Bench Simulator */}
                <div className="w-full md:w-64 flex flex-col gap-2 p-3 bg-zinc-200/50 dark:bg-black/30 border border-zinc-300 dark:border-white/5 rounded-xl font-mono text-[11px] flex-shrink-0">
                  <span className="text-[9.5px] text-zinc-450 dark:text-zinc-500 font-bold uppercase select-none pb-1.5 border-b border-zinc-300 dark:border-white/5">Go API Test Bench</span>
                  <GoApiBench />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 select-none mt-2">
              <div className="flex flex-wrap gap-1.5">
                {['Go', 'gRPC', 'PostgreSQL', 'Docker', 'REST'].map(t => (
                  <span key={t} className="px-2 py-0.5 bg-zinc-200/50 dark:bg-white/5 border border-zinc-300 dark:border-white/10 rounded text-[9.5px] text-zinc-600 dark:text-zinc-300 font-mono font-semibold">{t}</span>
                ))}
              </div>
              <hr className="border-zinc-200 dark:border-white/5" />
              <div className="flex items-center justify-between">
                <a href="https://github.com/RareDeadPool/go-api-blueprint" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white text-[12px] font-bold transition duration-200"><GithubIcon className="w-3.5 h-3.5 fill-current" /><span>GitHub Repo</span></a>
                <span className="text-[9.5px] text-zinc-550 dark:text-zinc-500 font-mono font-bold">v1.0.0</span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Python CLI Resource Monitor */}
          <motion.div
            variants={itemVariants}
            className="group rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-100/40 dark:bg-white/[0.04] p-5 flex flex-col justify-between gap-5 shadow-md hover:-translate-y-1 hover:shadow-[0_10px_20px_-8px_rgba(245,158,11,0.25)] dark:hover:shadow-[0_10px_20px_-8px_rgba(245,158,11,0.3)] hover:border-amber-500/30 dark:hover:border-amber-500/40 hover:bg-gradient-to-br hover:from-zinc-100/50 hover:to-amber-500/[0.04] dark:hover:from-white/[0.04] dark:hover:to-amber-500/[0.05] transition-all duration-300 ease-out text-left"
          >
            <div className="flex flex-col gap-3.5 h-full">
              <div className="flex items-center justify-between select-none">
                <span className="text-[9.5px] font-extrabold text-zinc-550 dark:text-zinc-500 uppercase tracking-widest font-mono">
                  DevOps / System Daemon
                </span>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center border shadow-sm bg-amber-500/10 dark:bg-amber-500/15 border-amber-500/20 dark:border-amber-500/30">
                  <Terminal className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                </div>
              </div>

              <div>
                <h3 className="text-[14.5px] font-extrabold text-zinc-950 dark:text-white leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  Python CLI Resource Monitor
                </h3>
                <span className="text-[11px] text-zinc-550 dark:text-zinc-455 font-semibold leading-normal block mt-0.5 select-none">
                  System Resource Streams & Discord Webhooks
                </span>
                <p className="text-[12.5px] text-zinc-650 dark:text-zinc-350 leading-relaxed font-medium mt-3">
                  Lightweight daemon monitoring server load metrics. Stream CPU, disk space, and RAM bandwidth to a log or broadcast alerts via webhooks.
                </p>
              </div>

              {/* Terminal screen resource ticker */}
              <div className="flex-grow mt-2 bg-zinc-200 dark:bg-black/35 border border-zinc-300 dark:border-white/5 rounded-xl p-3 font-mono text-[10.5px]">
                <PythonMonitorBench />
              </div>
            </div>

            <div className="flex flex-col gap-4 select-none">
              <div className="flex flex-wrap gap-1.5">
                {['Python', 'Psutil', 'Webhooks', 'CLI'].map(t => (
                  <span key={t} className="px-2 py-0.5 bg-zinc-200/50 dark:bg-white/5 border border-zinc-300 dark:border-white/10 rounded text-[9.5px] text-zinc-600 dark:text-zinc-300 font-mono font-semibold">{t}</span>
                ))}
              </div>
              <hr className="border-zinc-200 dark:border-white/5" />
              <div className="flex items-center justify-between">
                <a href="https://github.com/RareDeadPool/cli-telemetry" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white text-[12px] font-bold transition duration-200"><GithubIcon className="w-3.5 h-3.5 fill-current" /><span>GitHub Repo</span></a>
                <span className="text-[9.5px] text-zinc-550 dark:text-zinc-500 font-mono font-bold">v1.2.0</span>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Vite Micro-frontend Sandbox */}
          <motion.div
            variants={itemVariants}
            className="group rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-100/40 dark:bg-white/[0.04] p-5 flex flex-col justify-between gap-5 shadow-md hover:-translate-y-1 hover:shadow-[0_10px_20px_-8px_rgba(99,102,241,0.25)] dark:hover:shadow-[0_10px_20px_-8px_rgba(99,102,241,0.3)] hover:border-indigo-500/30 dark:hover:border-indigo-500/40 hover:bg-gradient-to-br hover:from-zinc-100/50 hover:to-indigo-500/[0.04] dark:hover:from-white/[0.04] dark:hover:to-indigo-500/[0.05] transition-all duration-300 ease-out text-left"
          >
            <div className="flex flex-col gap-3.5 h-full">
              <div className="flex items-center justify-between select-none">
                <span className="text-[9.5px] font-extrabold text-zinc-550 dark:text-zinc-500 uppercase tracking-widest font-mono">
                  Frontend Sandbox
                </span>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center border shadow-sm bg-indigo-500/10 dark:bg-indigo-500/15 border-indigo-500/20 dark:border-indigo-500/30">
                  <Code2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>

              <div>
                <h3 className="text-[14.5px] font-extrabold text-zinc-950 dark:text-white leading-snug group-hover:text-indigo-650 dark:group-hover:text-indigo-400 transition-colors">
                  Vite Micro-frontend Sandbox
                </h3>
                <span className="text-[11px] text-zinc-550 dark:text-zinc-455 font-semibold leading-normal block mt-0.5 select-none">
                  Dynamic Module Imports & Scoped Styling
                </span>
                <p className="text-[12.5px] text-zinc-650 dark:text-zinc-350 leading-relaxed font-medium mt-3">
                  An experimental sandbox playground isolating custom web application bundles dynamically using scoped CSS variables and modules.
                </p>
              </div>

              {/* Dynamic block particles layout morpher */}
              <div className="flex-grow mt-2 bg-zinc-200 dark:bg-black/35 border border-zinc-300 dark:border-white/5 rounded-xl p-3 flex flex-col justify-between">
                <ViteSandboxBench />
              </div>
            </div>

            <div className="flex flex-col gap-4 select-none">
              <div className="flex flex-wrap gap-1.5">
                {['Vite', 'React', 'ES6 Modules', 'CSS Modules'].map(t => (
                  <span key={t} className="px-2 py-0.5 bg-zinc-200/50 dark:bg-white/5 border border-zinc-300 dark:border-white/10 rounded text-[9.5px] text-zinc-600 dark:text-zinc-300 font-mono font-semibold">{t}</span>
                ))}
              </div>
              <hr className="border-zinc-200 dark:border-white/5" />
              <div className="flex items-center justify-between">
                <a href="https://github.com/RareDeadPool/vite-mfe-sandbox" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white text-[12px] font-bold transition duration-200"><GithubIcon className="w-3.5 h-3.5 fill-current" /><span>GitHub Repo</span></a>
                <span className="text-[9.5px] text-zinc-550 dark:text-zinc-500 font-mono font-bold">v1.0.0</span>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Docker Compose Dev Stack */}
          <motion.div
            variants={itemVariants}
            className="group rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-100/40 dark:bg-white/[0.04] p-5 flex flex-col justify-between gap-5 shadow-md hover:-translate-y-1 hover:shadow-[0_10px_20px_-8px_rgba(6,182,212,0.25)] dark:hover:shadow-[0_10px_20px_-8px_rgba(6,182,212,0.3)] hover:border-cyan-500/30 dark:hover:border-cyan-500/40 hover:bg-gradient-to-br hover:from-zinc-100/50 hover:to-cyan-500/[0.04] dark:hover:from-white/[0.04] dark:hover:to-cyan-500/[0.05] transition-all duration-300 ease-out text-left"
          >
            <div className="flex flex-col gap-3.5 h-full">
              <div className="flex items-center justify-between select-none">
                <span className="text-[9.5px] font-extrabold text-zinc-550 dark:text-zinc-500 uppercase tracking-widest font-mono">
                  Cloud Infrastructure
                </span>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center border shadow-sm bg-cyan-500/10 dark:bg-cyan-500/15 border-cyan-500/20 dark:border-cyan-500/30">
                  <Cpu className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                </div>
              </div>

              <div>
                <h3 className="text-[14.5px] font-extrabold text-zinc-950 dark:text-white leading-snug group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                  Docker Compose Local Dev Stack
                </h3>
                <span className="text-[11px] text-zinc-550 dark:text-zinc-455 font-semibold leading-normal block mt-0.5 select-none">
                  Preconfigured Multi-container Cluster Stack
                </span>
                <p className="text-[12.5px] text-zinc-650 dark:text-zinc-350 leading-relaxed font-medium mt-3">
                  A docker-compose suite bundling clustered Redis nodes, PostgreSQL master-replicas, and an Nginx reverse-proxy setup.
                </p>
              </div>

              {/* Connected node visual map of the cluster */}
              <div className="flex-grow mt-2 bg-zinc-200 dark:bg-black/35 border border-zinc-300 dark:border-white/5 rounded-xl p-3 flex items-center justify-center relative overflow-hidden select-none">
                <DockerStackBench />
              </div>
            </div>

            <div className="flex flex-col gap-4 select-none">
              <div className="flex flex-wrap gap-1.5">
                {['Docker', 'Nginx', 'Redis', 'PostgreSQL'].map(t => (
                  <span key={t} className="px-2 py-0.5 bg-zinc-200/50 dark:bg-white/5 border border-zinc-300 dark:border-white/10 rounded text-[9.5px] text-zinc-600 dark:text-zinc-300 font-mono font-semibold">{t}</span>
                ))}
              </div>
              <hr className="border-zinc-200 dark:border-white/5" />
              <div className="flex items-center justify-between">
                <a href="https://github.com/RareDeadPool/dev-docker-stack" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white text-[12px] font-bold transition duration-200"><GithubIcon className="w-3.5 h-3.5 fill-current" /><span>GitHub Repo</span></a>
                <span className="text-[9.5px] text-zinc-550 dark:text-zinc-500 font-mono font-bold">v1.0.0</span>
              </div>
            </div>
          </motion.div>

          {/* Card 5: GitHub Actions Workflows */}
          <motion.div
            variants={itemVariants}
            className="group rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-100/40 dark:bg-white/[0.04] p-5 flex flex-col justify-between gap-5 shadow-md hover:-translate-y-1 hover:shadow-[0_10px_20px_-8px_rgba(16,185,129,0.25)] dark:hover:shadow-[0_10px_20px_-8px_rgba(16,185,129,0.3)] hover:border-emerald-500/30 dark:hover:border-emerald-500/40 hover:bg-gradient-to-br hover:from-zinc-100/50 hover:to-emerald-500/[0.04] dark:hover:from-white/[0.04] dark:hover:to-emerald-500/[0.05] transition-all duration-300 ease-out text-left"
          >
            <div className="flex flex-col gap-3.5 h-full">
              <div className="flex items-center justify-between select-none">
                <span className="text-[9.5px] font-extrabold text-zinc-550 dark:text-zinc-500 uppercase tracking-widest font-mono">
                  Automation / CI-CD
                </span>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center border shadow-sm bg-emerald-500/10 dark:bg-emerald-500/15 border-emerald-500/20 dark:border-emerald-500/30">
                  <Settings className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>

              <div>
                <h3 className="text-[14.5px] font-extrabold text-zinc-950 dark:text-white leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  GitHub Actions deployment workflows
                </h3>
                <span className="text-[11px] text-zinc-550 dark:text-zinc-455 font-semibold leading-normal block mt-0.5 select-none">
                  Automated CI/CD Workflows Blueprint
                </span>
                <p className="text-[12.5px] text-zinc-650 dark:text-zinc-350 leading-relaxed font-medium mt-3">
                  pipeline configurations triggering automated testing, Docker compilations, and zero-downtime server deployments.
                </p>
              </div>

              {/* Looping CI/CD run tracker */}
              <div className="flex-grow mt-2 bg-zinc-200 dark:bg-black/35 border border-zinc-300 dark:border-white/5 rounded-xl p-3 flex flex-col justify-between font-mono text-[10.5px]">
                <GithubActionsBench />
              </div>
            </div>

            <div className="flex flex-col gap-4 select-none">
              <div className="flex flex-wrap gap-1.5">
                {['Actions', 'YAML', 'Bash scripts', 'CI/CD'].map(t => (
                  <span key={t} className="px-2 py-0.5 bg-zinc-200/50 dark:bg-white/5 border border-zinc-300 dark:border-white/10 rounded text-[9.5px] text-zinc-600 dark:text-zinc-300 font-mono font-semibold">{t}</span>
                ))}
              </div>
              <hr className="border-zinc-200 dark:border-white/5" />
              <div className="flex items-center justify-between">
                <a href="https://github.com/RareDeadPool/cicd-blueprints" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white text-[12px] font-bold transition duration-200"><GithubIcon className="w-3.5 h-3.5 fill-current" /><span>GitHub Repo</span></a>
                <span className="text-[9.5px] text-zinc-550 dark:text-zinc-500 font-mono font-bold">v1.0.0</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}

/* --- DETAILED COMPONENT SIMULATORS --- */

// Card 1 Simulator: API route tester
function GoApiBench() {
  const [response, setResponse] = useState('{ "status": "idle" }');
  const [activeRoute, setActiveRoute] = useState(null);
  const [loading, setLoading] = useState(false);

  const routes = {
    '/health': { status: 200, json: { status: 'healthy', uptime: '118h', services: { db: 'UP', redis: 'UP' } } },
    '/auth': { status: 201, json: { status: 'authenticated', token: 'eyJhbGciOiJIUzI1NiIsIn...', expires_in: 3600 } },
    '/metrics': { status: 200, json: { http_req_total: 15842, db_query_latency_ms: 2.1, go_goroutines: 12 } }
  };

  const handleTest = (route) => {
    setActiveRoute(route);
    setLoading(true);
    setResponse('Connecting...');
    
    setTimeout(() => {
      setLoading(false);
      setResponse(`HTTP/1.1 ${routes[route].status}\nContent-Type: application/json\n\n${JSON.stringify(routes[route].json, null, 2)}`);
    }, 600);
  };

  return (
    <div className="flex flex-col gap-2 flex-grow justify-between">
      <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none select-none flex-shrink-0">
        {Object.keys(routes).map(r => (
          <button
            key={r}
            onClick={() => handleTest(r)}
            className={`px-2 py-1 rounded text-[9.5px] font-semibold font-mono border cursor-pointer ${
              activeRoute === r
                ? 'bg-teal-500/20 border-teal-500/50 text-teal-600 dark:text-teal-400'
                : 'bg-zinc-300 dark:bg-white/5 border-zinc-400 dark:border-white/10 text-zinc-650 dark:text-zinc-400 hover:bg-zinc-400 dark:hover:bg-white/10'
            }`}
          >
            {r}
          </button>
        ))}
      </div>
      <div className="flex-1 bg-zinc-900/90 text-zinc-300 rounded-lg p-2 overflow-y-auto max-h-[85px] leading-relaxed select-text font-mono text-[9px] min-h-[85px]">
        <pre className="whitespace-pre-wrap">{response}</pre>
      </div>
    </div>
  );
}

// Card 2 Simulator: Live terminal resource monitor
function PythonMonitorBench() {
  const [metrics, setMetrics] = useState({ cpu: 42, ram: 60, disk: 44 });
  const [logs, setLogs] = useState(['[INFO] Monitoring daemon initialized.']);

  useEffect(() => {
    const interval = setInterval(() => {
      const cpuVal = Math.floor(25 + Math.random() * 50);
      const ramVal = Math.floor(58 + Math.random() * 12);
      setMetrics({
        cpu: cpuVal,
        ram: ramVal,
        disk: 44
      });

      if (cpuVal > 68) {
        setLogs(prev => [`[WARN] High CPU detected: ${cpuVal}%`, ...prev].slice(0, 3));
      } else if (Math.random() > 0.7) {
        const time = new Date().toLocaleTimeString();
        setLogs(prev => [`[INFO] Snapshot: RAM at ${ramVal}% | ${time}`, ...prev].slice(0, 3));
      }
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const getBar = (val) => {
    const barsCount = Math.floor(val / 10);
    return '[' + '|'.repeat(barsCount) + '.'.repeat(10 - barsCount) + ']';
  };

  return (
    <div className="flex flex-col gap-1.5 h-full text-amber-600 dark:text-amber-400 text-left select-none">
      <div className="flex flex-col gap-0.5 leading-none">
        <div className="flex justify-between">
          <span>CPU load</span>
          <span className="text-zinc-800 dark:text-zinc-300 font-bold">{metrics.cpu}%</span>
        </div>
        <div className="text-zinc-650 dark:text-zinc-550 font-bold">{getBar(metrics.cpu)}</div>
      </div>
      <div className="flex flex-col gap-0.5 leading-none mt-0.5">
        <div className="flex justify-between">
          <span>RAM active</span>
          <span className="text-zinc-800 dark:text-zinc-300 font-bold">{metrics.ram}%</span>
        </div>
        <div className="text-zinc-650 dark:text-zinc-555 font-bold">{getBar(metrics.ram)}</div>
      </div>
      <div className="flex-1 overflow-hidden mt-1.5 border-t border-zinc-350 dark:border-white/5 pt-1.5 flex flex-col gap-0.5 text-[9.5px]">
        {logs.map((log, idx) => (
          <div key={idx} className={`truncate font-bold leading-relaxed ${log.includes('WARN') ? 'text-red-500' : 'text-zinc-450 dark:text-zinc-500'}`}>
            {log}
          </div>
        ))}
      </div>
    </div>
  );
}

// Card 3 Simulator: Dynamic sandbox physics morpher
function ViteSandboxBench() {
  const [layout, setLayout] = useState('grid'); // 'grid' | 'circle' | 'scatter'

  const toggleLayout = () => {
    const modes = ['grid', 'circle', 'scatter'];
    const nextIdx = (modes.indexOf(layout) + 1) % modes.length;
    setLayout(modes[nextIdx]);
  };

  const getPosition = (idx) => {
    // 6 particles positions depending on active layout mode
    const gridCoords = [
      { top: '15%', left: '20%' },
      { top: '15%', left: '50%' },
      { top: '15%', left: '80%' },
      { top: '65%', left: '20%' },
      { top: '65%', left: '50%' },
      { top: '65%', left: '80%' }
    ];

    const circleCoords = [
      { top: '15%', left: '50%' },
      { top: '35%', left: '80%' },
      { top: '65%', left: '70%' },
      { top: '65%', left: '30%' },
      { top: '35%', left: '20%' },
      { top: '40%', left: '50%' }
    ];

    const scatterCoords = [
      { top: '25%', left: '80%' },
      { top: '15%', left: '15%' },
      { top: '55%', left: '45%' },
      { top: '75%', left: '85%' },
      { top: '45%', left: '70%' },
      { top: '70%', left: '10%' }
    ];

    if (layout === 'circle') return circleCoords[idx];
    if (layout === 'scatter') return scatterCoords[idx];
    return gridCoords[idx];
  };

  const colors = [
    'bg-indigo-500 shadow-indigo-500/20',
    'bg-teal-500 shadow-teal-500/20',
    'bg-amber-500 shadow-amber-500/20',
    'bg-rose-500 shadow-rose-500/20',
    'bg-cyan-500 shadow-cyan-500/20',
    'bg-emerald-500 shadow-emerald-500/20'
  ];

  return (
    <div className="flex flex-col gap-2 flex-grow justify-between select-none">
      <div className="relative flex-1 bg-zinc-900/60 rounded-lg overflow-hidden h-[75px] min-h-[75px]">
        {colors.map((color, idx) => {
          const pos = getPosition(idx);
          return (
            <div
              key={idx}
              className={`absolute w-3.5 h-3.5 rounded transition-all duration-500 ease-in-out border border-white/10 shadow-md ${color}`}
              style={{
                top: pos.top,
                left: pos.left,
                transform: layout === 'circle' ? 'rotate(15deg)' : 'none'
              }}
            />
          );
        })}
        <span className="absolute bottom-1 right-2 text-[8px] font-mono text-zinc-500 uppercase tracking-widest leading-none">Sandbox Shell</span>
      </div>
      <button
        onClick={toggleLayout}
        className="w-full bg-zinc-300 dark:bg-white/5 border border-zinc-400 dark:border-white/10 hover:bg-zinc-400 dark:hover:bg-white/10 text-zinc-700 dark:text-zinc-300 text-[10px] font-bold py-1 rounded-lg transition cursor-pointer select-none"
      >
        Toggle Layout: <span className="font-mono text-indigo-500 dark:text-indigo-400 uppercase">{layout}</span>
      </button>
    </div>
  );
}

// Card 4 Simulator: Docker Stack Topology
function DockerStackBench() {
  const [hoveredNode, setHoveredNode] = useState(null);

  const nodes = [
    { id: 'nginx', label: 'Nginx', x: '50%', y: '15%', desc: 'Reverse Proxy' },
    { id: 'back', label: 'Go API', x: '50%', y: '50%', desc: 'API Ingestion' },
    { id: 'redis', label: 'Redis', x: '20%', y: '85%', desc: 'Pub/Sub Session' },
    { id: 'db', label: 'Postgres', x: '80%', y: '85%', desc: 'Master DB' }
  ];

  return (
    <div className="relative w-full h-[115px] select-none text-[9.5px]">
      {/* Topology connector lines */}
      <svg className="absolute inset-0 w-full h-full stroke-zinc-400 dark:stroke-white/10 stroke-1 pointer-events-none z-0 fill-none">
        {/* Nginx to Backend */}
        <line x1="50%" y1="20%" x2="50%" y2="45%" className={hoveredNode === 'nginx' || hoveredNode === 'back' ? 'stroke-cyan-500 stroke-[1.5]' : ''} />
        {/* Backend to Redis */}
        <line x1="50%" y1="55%" x2="25%" y2="80%" className={hoveredNode === 'back' || hoveredNode === 'redis' ? 'stroke-cyan-500 stroke-[1.5]' : ''} />
        {/* Backend to Postgres */}
        <line x1="50%" y1="55%" x2="75%" y2="80%" className={hoveredNode === 'back' || hoveredNode === 'db' ? 'stroke-cyan-500 stroke-[1.5]' : ''} />
      </svg>

      {/* Nodes */}
      {nodes.map(node => {
        const isHovered = hoveredNode === node.id;
        return (
          <div
            key={node.id}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
            className={`absolute -translate-x-1/2 -translate-y-1/2 rounded px-2 py-1 flex items-center justify-center border shadow transition-all duration-200 cursor-help font-mono font-bold z-10 ${
              isHovered
                ? 'bg-cyan-500/10 border-cyan-500/60 text-cyan-600 dark:text-cyan-400 scale-105'
                : 'bg-zinc-350 dark:bg-zinc-900 border-zinc-400 dark:border-white/5 text-zinc-700 dark:text-zinc-400'
            }`}
            style={{ top: node.y, left: node.x }}
            title={node.desc}
          >
            {node.label}
          </div>
        );
      })}
    </div>
  );
}

// Card 5 Simulator: GitHub Actions Pipeline Runner
function GithubActionsBench() {
  const [pipelineState, setPipelineState] = useState('idle'); // 'idle' | 'lint' | 'test' | 'build' | 'deploy' | 'success'
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { id: 'lint', name: 'Lint Rules' },
    { id: 'test', name: 'Unit Tests' },
    { id: 'build', name: 'Docker Build' },
    { id: 'deploy', name: 'Zero-Downtime Deploy' }
  ];

  useEffect(() => {
    let timer;
    const runPipeline = () => {
      setActiveStep(0);
      setPipelineState('lint');
      
      // Progressively step through tasks
      timer = setTimeout(() => {
        setActiveStep(1);
        setPipelineState('test');
        
        timer = setTimeout(() => {
          setActiveStep(2);
          setPipelineState('build');
          
          timer = setTimeout(() => {
            setActiveStep(3);
            setPipelineState('deploy');
            
            timer = setTimeout(() => {
              setActiveStep(4);
              setPipelineState('success');
              
              timer = setTimeout(() => {
                runPipeline();
              }, 4000); // Wait 4s on success before resetting
            }, 1200);
          }, 1200);
        }, 1200);
      }, 1200);
    };

    runPipeline();

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col justify-between flex-grow text-left select-none text-[9.5px]">
      <div className="flex flex-col gap-1.5">
        {steps.map((step, idx) => {
          const isPending = idx > activeStep;
          const isActive = idx === activeStep;
          const isSuccess = idx < activeStep || pipelineState === 'success';

          return (
            <div key={step.id} className="flex items-center gap-2.5">
              <span className="flex-shrink-0">
                {isSuccess && <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />}
                {isActive && <RefreshCw className="w-3.5 h-3.5 text-emerald-500 animate-spin" />}
                {isPending && <div className="w-3.5 h-3.5 rounded-full border border-zinc-400 dark:border-white/10" />}
              </span>
              <span className={`font-bold font-mono ${
                isSuccess
                  ? 'text-zinc-800 dark:text-zinc-300'
                  : isActive
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-zinc-500 dark:text-zinc-550'
              }`}>
                {step.name}
              </span>
            </div>
          );
        })}
      </div>
      <div className="border-t border-zinc-350 dark:border-white/5 pt-1.5 mt-2 flex items-center justify-between text-[8px] font-mono text-zinc-500 uppercase tracking-widest leading-none">
        <span>Pipeline Status:</span>
        <span className={pipelineState === 'success' ? 'text-emerald-500 font-bold animate-pulse' : 'text-zinc-400 font-bold'}>{pipelineState}</span>
      </div>
    </div>
  );
}

// Custom inline SVG for Github icon since brand icons are deprecated/removed from lucide-react
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
