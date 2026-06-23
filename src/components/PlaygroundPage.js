'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { 
  ArrowLeft, Cpu, Smartphone, Brain, Server, 
  Palette, Cloud, HelpCircle, Trophy, RefreshCw, Grid, Play, Zap, Magnet 
} from 'lucide-react';
import Matter from 'matter-js';

// --- CONFIGURATIONS & PRESETS ---



// Cards for Experiment 2
const GRAVITY_CARDS_DATA = [
  { id: 'frontend', title: 'Frontend', label: 'React, Next.js, motion design', icon: Cpu, accent: '#a855f7' },
  { id: 'mobile', title: 'Mobile', label: 'Flutter, iOS & Android systems', icon: Smartphone, accent: '#06b6d4' },
  { id: 'ai', title: 'AI Engine', label: 'LLMs, YOLOv8 edge detection', icon: Brain, accent: '#10b981' },
  { id: 'backend', title: 'Backend', label: 'Go, Node.js, REST & gRPC APIs', icon: Server, accent: '#f59e0b' },
  { id: 'design', title: 'Design', label: 'Figma, design systems, layouts', icon: Palette, accent: '#ec4899' },
  { id: 'deployment', title: 'Deployment', label: 'Vercel, Docker, CI/CD pipelines', icon: Cloud, accent: '#3b82f6' },
  { id: 'problem-solving', title: 'Logic Lab', label: 'Algorithms, complexity analysis', icon: HelpCircle, accent: '#f97316' },
  { id: 'hackathons', title: 'GDG Core', label: 'GDG Core Member, tech events', icon: Trophy, accent: '#ec4899' }
];

export default function PlaygroundPage({ onClose }) {
  const [activeTab, setActiveTab] = useState('gravity'); // 'gravity' | 'kinetic' | 'codelab'

  return (
    <div className="flex flex-col min-h-full bg-[#0d0d11] text-zinc-300 font-sans select-none pb-12">
      {/* 1. Header Area */}
      <header className="p-6 md:p-8 border-b border-white/5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 select-none">
        <div>
          <div className="flex items-center gap-3">
            <button 
              onClick={onClose}
              className="md:hidden flex items-center justify-center w-8 h-8 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-zinc-400" />
            </button>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Motion Playground
            </h1>
          </div>
          <p className="text-[12.5px] text-zinc-400 font-semibold mt-1 max-w-xl">
            Frontend experiments with motion, physics, and interaction.
          </p>
        </div>

        {/* Horizontal Navigation Tabs */}
        <nav className="flex gap-2.5 bg-black/35 border border-white/5 p-1 rounded-2xl w-full md:w-max flex-wrap">
          {[
            { id: 'gravity', label: 'Gravity Cards' },
            { id: 'kinetic', label: 'Kinetic Type Lab' },
            { id: 'codelab', label: 'GSAP Code Lab' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 md:flex-none px-4 py-2 text-[11.5px] font-bold rounded-xl transition-all duration-200 cursor-pointer text-center whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/35 shadow-lg' 
                  : 'text-zinc-500 border border-transparent hover:text-zinc-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      {/* 2. Main Canvas Grid */}
      <main className="flex-1 px-6 md:px-8 mt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-full flex flex-col gap-6"
          >
            {activeTab === 'gravity' && <GravityCardsExperiment />}
            {activeTab === 'kinetic' && <KineticTypeExperiment />}
            {activeTab === 'codelab' && <GSAPCodeLabExperiment />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}



// ==========================================
// EXPERIMENT 2: GRAVITY CARDS
// ==========================================
function GravityCardsExperiment() {
  const sandboxRef = useRef(null);
  const engineRef = useRef(null);
  const runnerRef = useRef(null);
  const cardBodiesRef = useRef([]);
  const [isGridMode, setIsGridMode] = useState(false);

  const cardWidth = 145;
  const cardHeight = 80;

  useEffect(() => {
    const sandbox = sandboxRef.current;
    if (!sandbox) return;

    const rect = sandbox.getBoundingClientRect();
    const width = rect.width || 800;
    const height = rect.height || 420;

    // 1. Create Engine
    const engine = Matter.Engine.create({
      gravity: { y: 0.85, x: 0 }
    });
    engineRef.current = engine;

    // 2. Boundaries setup (Walls + Floor + Ceiling)
    const wallThickness = 120;
    const floor = Matter.Bodies.rectangle(width / 2, height + wallThickness / 2, width * 2, wallThickness, { isStatic: true });
    const ceiling = Matter.Bodies.rectangle(width / 2, -wallThickness / 2, width * 2, wallThickness, { isStatic: true });
    const leftWall = Matter.Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 2, { isStatic: true });
    const rightWall = Matter.Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 2, { isStatic: true });

    Matter.World.add(engine.world, [floor, ceiling, leftWall, rightWall]);

    // 3. Create Draggable Card Bodies
    const bodies = GRAVITY_CARDS_DATA.map((card, idx) => {
      // Stagger base launch positions across width
      const x = width / 2 + (Math.random() - 0.5) * (width * 0.5);
      const y = 50 + idx * 15;

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
        element: document.getElementById(`gravity-card-${card.id}`)
      };
    });

    cardBodiesRef.current = bodies;
    Matter.World.add(engine.world, bodies.map(b => b.body));

    // 4. Mouse constraints for dragging cards
    const mouse = Matter.Mouse.create(sandbox);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.12,
        render: { visible: false }
      }
    });

    Matter.World.add(engine.world, mouseConstraint);
    
    // Fix scroll scrollbar issues on touch devices
    mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
    mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);

    // 5. Runner ticks
    const runner = Matter.Runner.create();
    runnerRef.current = runner;
    Matter.Runner.run(runner, engine);

    // 6. Hook into update event to reposition DOM cards
    Matter.Events.on(engine, 'afterUpdate', () => {
      bodies.forEach(({ body, element }) => {
        if (!element || body.isStatic) return;
        // Shift by half card dimensions for center origin alignment
        const tx = body.position.x - cardWidth / 2;
        const ty = body.position.y - cardHeight / 2;
        element.style.transform = `translate3d(${tx}px, ${ty}px, 0px) rotate(${body.angle}rad)`;
      });
    });

    // 7. Collision start flash triggers
    Matter.Events.on(engine, 'collisionStart', (e) => {
      e.pairs.forEach(pair => {
        const checkFlash = (body) => {
          if (body.plugin && body.plugin.cardId) {
            const cardEl = document.getElementById(`gravity-card-${body.plugin.cardId}`);
            if (cardEl) {
              gsap.fromTo(cardEl, 
                { borderColor: 'rgba(168, 85, 247, 0.4)' }, 
                { borderColor: 'rgba(255, 255, 255, 0.12)', duration: 0.45 }
              );
            }
          }
        };
        checkFlash(pair.bodyA);
        checkFlash(pair.bodyB);
      });
    });

    // Intro stagger drop
    gsap.fromTo('.gravity-card-element',
      { scale: 0.6, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, stagger: 0.05, ease: 'power2.out' }
    );

    return () => {
      // 8. Clean up engine fully on unmount
      Matter.Runner.stop(runner);
      Matter.World.clear(engine.world);
      Matter.Engine.clear(engine);
      gsap.killTweensOf('.gravity-card-element');
    };
  }, []);

  // Card double-click forces
  const handleCardDoubleClick = (id) => {
    if (isGridMode) return;
    const match = cardBodiesRef.current.find(b => b.card.id === id);
    if (!match) return;

    const body = match.body;
    const el = match.element;

    // Apply massive kinetic impulse
    Matter.Body.applyForce(body, body.position, {
      x: (Math.random() - 0.5) * 0.05,
      y: -0.19
    });
    Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.3);

    // Bounce scale animation
    gsap.fromTo(el, 
      { scale: 0.93 }, 
      { scale: 1, duration: 0.4, ease: 'elastic.out(1.2, 0.4)' }
    );
  };

  const handleResetGravity = () => {
    setIsGridMode(false);
    const sandbox = sandboxRef.current;
    if (!sandbox) return;

    const rect = sandbox.getBoundingClientRect();
    const width = rect.width || 800;
    
    cardBodiesRef.current.forEach(({ body, element }, idx) => {
      const rx = width / 2 + (Math.random() - 0.5) * (width * 0.5);
      const ry = 40 + idx * 10;
      
      // Make dynamic and position to top
      Matter.Body.setStatic(body, false);
      Matter.Body.setPosition(body, { x: rx, y: ry });
      Matter.Body.setVelocity(body, { x: (Math.random() - 0.5) * 3, y: 1.5 });
      Matter.Body.setAngle(body, (Math.random() - 0.5) * 0.35);
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);

      if (element) {
        gsap.to(element, { scale: 1, duration: 0.3 });
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
    const width = rect.width || 800;
    const height = rect.height || 420;

    // Halt physics engine updates
    if (runnerRef.current) {
      Matter.Runner.stop(runnerRef.current);
    }

    // Grid details
    const cols = 4;
    const cardGapX = 20;
    const cardGapY = 20;
    const totalW = cols * cardWidth + (cols - 1) * cardGapX;
    const startX = (width - totalW) / 2;
    const startY = (height - (2 * cardHeight + cardGapY)) / 2;

    cardBodiesRef.current.forEach(({ body, element }, idx) => {
      const r = Math.floor(idx / cols);
      const c = idx % cols;
      const tx = startX + c * (cardWidth + cardGapX);
      const ty = startY + r * (cardHeight + cardGapY);

      // Lock position statically
      Matter.Body.setStatic(body, true);
      Matter.Body.setPosition(body, { x: tx + cardWidth / 2, y: ty + cardHeight / 2 });
      Matter.Body.setAngle(body, 0);

      // Animate card element smoothly to coordinates
      if (element) {
        gsap.to(element, {
          x: tx,
          y: ty,
          rotation: 0,
          scale: 1,
          duration: 0.75,
          ease: 'power3.out',
          overwrite: 'auto'
        });
      }
    });
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Text Info */}
      <div className="flex flex-col gap-1">
        <h2 className="text-[17px] font-bold text-white flex items-center gap-2 select-none">
          <Zap className="w-4 h-4 text-purple-400" /> Gravity Cards
        </h2>
        <p className="text-[11.5px] text-zinc-400">
          Draggable glass cards with gravity, bounds collisions, and grid snap. Drag cards to throw them, or double-click to bounce.
        </p>
      </div>

      {/* Physics Sandbox Box */}
      <div 
        ref={sandboxRef}
        className="w-full h-[420px] bg-black/45 border border-white/5 rounded-2xl relative overflow-hidden shadow-2xl select-none"
      >
        <div className="absolute inset-0 bg-dot-grid opacity-15 pointer-events-none" />

        {/* HTML Render elements */}
        {GRAVITY_CARDS_DATA.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              id={`gravity-card-${card.id}`}
              onDoubleClick={() => handleCardDoubleClick(card.id)}
              className="gravity-card-element absolute top-0 left-0 border rounded-2xl p-3 bg-zinc-950/70 border-white/10 backdrop-blur-xl shadow-[0_10px_25px_-5px_rgba(0,0,0,0.6)] cursor-grab active:cursor-grabbing text-left flex flex-col justify-between"
              style={{
                width: `${cardWidth}px`,
                height: `${cardHeight}px`,
                transform: 'translate3d(0px, 0px, 0px)',
                willChange: 'transform',
                transformOrigin: 'center center'
              }}
            >
              {/* Card Header (Icon + Accent dot) */}
              <div className="flex items-center justify-between pointer-events-none select-none">
                <div className="p-1 rounded bg-white/5 border border-white/5 flex items-center justify-center">
                  <Icon className="w-3.5 h-3.5" style={{ color: card.accent }} />
                </div>
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: card.accent }} />
              </div>

              {/* Title & Info */}
              <div className="flex flex-col gap-0.5 mt-2 pointer-events-none select-none">
                <span className="text-[11px] font-extrabold text-white leading-tight">{card.title}</span>
                <span className="text-[9px] text-zinc-400 font-semibold leading-none truncate">{card.label}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 select-none flex-wrap justify-between border-t border-white/5 pt-4">
        <div className="flex gap-2">
          <button
            onClick={handleResetGravity}
            className="flex items-center gap-1.5 bg-purple-650 hover:bg-purple-600 text-white font-bold text-[11px] px-4 py-2 rounded-xl transition cursor-pointer shadow-lg shadow-purple-600/10"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Gravity</span>
          </button>
          
          <button
            onClick={handleArrangeGrid}
            className="flex items-center gap-1.5 bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-300 hover:text-white font-bold text-[11px] px-4 py-2 rounded-xl transition cursor-pointer"
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Arrange Grid</span>
          </button>
        </div>
      </div>

      {/* What it Showcases */}
      <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 select-none text-left">
        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">What this showcases</span>
        <p className="text-[12px] text-zinc-400 mt-1 font-medium">
          Matter.js physics, draggable UI, collision-based motion.
        </p>
      </div>
    </div>
  );
}

// ==========================================
// EXPERIMENT 3: KINETIC TYPE LAB
// ==========================================
function KineticTypeExperiment() {
  const containerRef = useRef(null);
  const lettersRef = useRef([]);
  const timeRef = useRef(0);
  const [inputText, setInputText] = useState('Build Better Interfaces');
  const [activeMode, setActiveMode] = useState('wave'); // 'wave' | 'explode' | 'magnetic' | 'elastic' | 'glitch'
  const mousePos = useRef({ x: 0, y: 0 });
  const isMouseIn = useRef(false);

  // Split text into spans for animations
  const letters = inputText.split('');

  useEffect(() => {
    // Reset any manual transformations on letters when switching mode
    gsap.killTweensOf('.kinetic-letter');
    gsap.to('.kinetic-letter', {
      x: 0,
      y: 0,
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
      skewX: 0,
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out',
      overwrite: 'auto'
    });

    if (activeMode === 'explode') {
      // Trigger explosive scatter
      gsap.to('.kinetic-letter', {
        x: () => (Math.random() - 0.5) * 220,
        y: () => (Math.random() - 0.5) * 120,
        rotation: () => (Math.random() - 0.5) * 90,
        duration: 0.95,
        ease: 'power3.out',
        stagger: { amount: 0.25 }
      });
      return;
    }

    if (activeMode === 'glitch') {
      // Custom repeating noise timeline for digital glitch look
      const glitchTl = gsap.timeline({ repeat: -1 });
      glitchTl.to('.kinetic-letter', {
        x: () => (Math.random() - 0.5) * 6,
        y: () => (Math.random() - 0.5) * 4,
        skewX: () => (Math.random() - 0.5) * 12,
        opacity: () => Math.random() > 0.08 ? 1 : 0.35,
        duration: 0.06,
        stagger: 0.015
      });
      return () => glitchTl.kill();
    }

    // Ticker loops for continuous frame updates
    const tick = () => {
      timeRef.current += 0.08;

      if (activeMode === 'wave') {
        const els = document.querySelectorAll('.kinetic-letter');
        els.forEach((el, idx) => {
          gsap.to(el, {
            y: Math.sin(idx * 0.45 + timeRef.current) * 10,
            duration: 0.1,
            overwrite: 'auto'
          });
        });
      }

      if (activeMode === 'magnetic' && isMouseIn.current) {
        const els = document.querySelectorAll('.kinetic-letter');
        const rect = containerRef.current.getBoundingClientRect();
        
        els.forEach((el) => {
          const elRect = el.getBoundingClientRect();
          // Relative to container
          const elX = elRect.left - rect.left + elRect.width / 2;
          const elY = elRect.top - rect.top + elRect.height / 2;

          const dx = mousePos.current.x - elX;
          const dy = mousePos.current.y - elY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 160 && dist > 1) {
            const pct = 1 - dist / 160;
            // Pull text letters toward mouse
            const force = pct * 24;
            gsap.to(el, {
              x: (dx / dist) * force,
              y: (dy / dist) * force,
              duration: 0.25,
              overwrite: 'auto'
            });
          } else {
            gsap.to(el, {
              x: 0,
              y: 0,
              duration: 0.4,
              overwrite: 'auto'
            });
          }
        });
      }
    };

    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      gsap.killTweensOf('.kinetic-letter');
    };
  }, [activeMode, inputText]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mousePos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handleLetterHover = (e) => {
    if (activeMode !== 'elastic') return;
    // Stretch vertically and compress horizontally on hover
    gsap.to(e.target, {
      scaleY: 1.6,
      scaleX: 0.55,
      y: -18,
      duration: 0.12,
      ease: 'power1.out',
      onComplete: () => {
        gsap.to(e.target, {
          scaleY: 1,
          scaleX: 1,
          y: 0,
          duration: 0.7,
          ease: 'elastic.out(1.2, 0.45)'
        });
      }
    });
  };

  const handleResetType = () => {
    setInputText('Build Better Interfaces');
    setActiveMode('wave');
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Text Info */}
      <div className="flex flex-col gap-1">
        <h2 className="text-[17px] font-bold text-white flex items-center gap-2 select-none">
          <Play className="w-4 h-4 text-purple-400 fill-current" /> Kinetic Type Lab
        </h2>
        <p className="text-[11.5px] text-zinc-400">
          Interactive animated typography. Select an animation mode and type your custom message to see letters move.
        </p>
      </div>

      {/* Sandbox Type Area */}
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => { isMouseIn.current = true; }}
        onMouseLeave={() => { isMouseIn.current = false; }}
        className="w-full min-h-[220px] bg-black/45 border border-white/5 rounded-2xl relative overflow-hidden shadow-2xl flex items-center justify-center p-8 select-none"
      >
        <div className="absolute inset-0 bg-dot-grid opacity-15 pointer-events-none" />

        {/* Big Typography Output */}
        <div className="text-2xl sm:text-4xl md:text-5xl font-black text-white text-center flex flex-wrap justify-center gap-x-2 gap-y-3 relative z-10 break-all select-none max-w-3xl">
          {letters.map((char, idx) => (
            <span
              key={idx}
              onMouseEnter={handleLetterHover}
              className="kinetic-letter inline-block transform origin-bottom hover:text-purple-400 select-none cursor-default transition-colors duration-250 font-sans tracking-tight"
              style={{
                display: char === ' ' ? 'inline' : 'inline-block',
                marginRight: char === ' ' ? '14px' : '0px',
                willChange: 'transform'
              }}
            >
              {char}
            </span>
          ))}
        </div>
      </div>

      {/* Controls input & Modes */}
      <div className="flex flex-col gap-4 select-none border-t border-white/5 pt-4">
        {/* Input box */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch select-none">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            maxLength={35}
            placeholder="Type something..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-[12px] text-white focus:outline-none focus:border-purple-500/50 font-bold tracking-wide placeholder-zinc-650"
          />
          <button
            onClick={handleResetType}
            className="flex items-center justify-center gap-1.5 bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-300 hover:text-white font-bold text-[11px] px-5 py-2.5 rounded-xl transition cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </button>
        </div>

        {/* Modes Selectors */}
        <div className="flex flex-wrap gap-2 select-none">
          {[
            { id: 'wave', label: 'Wave Mode' },
            { id: 'explode', label: 'Explode Mode' },
            { id: 'magnetic', label: 'Magnetic Mode' },
            { id: 'elastic', label: 'Elastic Mode' },
            { id: 'glitch', label: 'Glitch Mode' }
          ].map(mode => (
            <button
              key={mode.id}
              onClick={() => setActiveMode(mode.id)}
              className={`px-4.5 py-2.5 text-[11px] font-bold rounded-xl transition-all duration-200 cursor-pointer ${
                activeMode === mode.id 
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/10' 
                  : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-zinc-200 border border-white/5'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* What it Showcases */}
      <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 select-none text-left">
        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">What this showcases</span>
        <p className="text-[12px] text-zinc-400 mt-1 font-medium">
          Typography animation, GSAP timelines, interactive motion design.
        </p>
      </div>
    </div>
  );
}

// ==========================================
// EXPERIMENT 4: GSAP CODE LAB
// ==========================================
function GSAPCodeLabExperiment() {
  const [animType, setAnimType] = useState('slideUp'); // 'fadeIn' | 'slideUp' | 'scalePop' | 'tilt3d' | 'stagger'
  const [duration, setDuration] = useState(0.8);
  const [ease, setEase] = useState('power3.out');
  const [stagger, setStagger] = useState(0.12);
  const [copied, setCopied] = useState(false);

  const playAnimation = () => {
    // Kill existing animations
    gsap.killTweensOf('.sandbox-card');

    // Reset styles
    gsap.set('.sandbox-card', {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotationX: 0,
      transformPerspective: 1000,
      transformOrigin: '50% 50%'
    });

    const targets = '.sandbox-card';
    const config = {
      duration: duration,
      ease: ease,
      stagger: stagger,
      overwrite: 'auto'
    };

    // Trigger selected tween
    switch (animType) {
      case 'fadeIn':
        gsap.fromTo(targets, { opacity: 0 }, { opacity: 1, ...config });
        break;
      case 'slideUp':
        gsap.fromTo(targets, { y: 60, opacity: 0 }, { y: 0, opacity: 1, ...config });
        break;
      case 'scalePop':
        gsap.fromTo(targets, { scale: 0.2, opacity: 0 }, { scale: 1, opacity: 1, ...config });
        break;
      case 'tilt3d':
        gsap.fromTo(targets, { rotationX: -70, opacity: 0, transformOrigin: '50% 0%' }, { rotationX: 0, opacity: 1, ...config });
        break;
      case 'stagger':
        gsap.fromTo(targets, { x: -45, opacity: 0 }, { x: 0, opacity: 1, ...config });
        break;
    }
  };

  // Replay animation on parameter adjustments
  useEffect(() => {
    playAnimation();
  }, [animType, duration, ease, stagger]);

  // Code generator
  const getCodeSnippet = () => {
    let fromState = '';
    let toState = '';

    switch (animType) {
      case 'fadeIn':
        fromState = '{ opacity: 0 }';
        toState = `{ opacity: 1, duration: ${duration}, ease: "${ease}", stagger: ${stagger} }`;
        break;
      case 'slideUp':
        fromState = '{ y: 60, opacity: 0 }';
        toState = `{ y: 0, opacity: 1, duration: ${duration}, ease: "${ease}", stagger: ${stagger} }`;
        break;
      case 'scalePop':
        fromState = '{ scale: 0.2, opacity: 0 }';
        toState = `{ scale: 1, opacity: 1, duration: ${duration}, ease: "${ease}", stagger: ${stagger} }`;
        break;
      case 'tilt3d':
        fromState = '{ rotationX: -70, opacity: 0, transformOrigin: "50% 0%" }';
        toState = `{ rotationX: 0, opacity: 1, duration: ${duration}, ease: "${ease}", stagger: ${stagger} }`;
        break;
      case 'stagger':
        fromState = '{ x: -45, opacity: 0 }';
        toState = `{ x: 0, opacity: 1, duration: ${duration}, ease: "${ease}", stagger: ${stagger} }`;
        break;
    }

    return `gsap.fromTo(".card", \n  ${fromState}, \n  ${toState}\n);`;
  };

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(getCodeSnippet());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Title & Info */}
      <div className="flex flex-col gap-1">
        <h2 className="text-[17px] font-bold text-white flex items-center gap-2 select-none">
          <Palette className="w-4 h-4 text-purple-400" /> GSAP Sandbox & Code Lab
        </h2>
        <p className="text-[11.5px] text-zinc-400">
          Configure animations, preview effects live on canvas cards, and copy generated GSAP snippet configurations.
        </p>
      </div>

      {/* Grid Layout (Preview + Controls) */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-stretch">
        
        {/* Left Side: Preview Canvas */}
        <div 
          onClick={playAnimation}
          className="bg-black/45 border border-white/5 rounded-2xl h-[360px] relative overflow-hidden shadow-2xl flex items-center justify-center gap-4 px-6 cursor-pointer select-none"
        >
          <div className="absolute inset-0 bg-dot-grid opacity-15 pointer-events-none" />
          <span className="absolute top-4 right-5 text-[9px] font-mono text-zinc-550 font-bold uppercase tracking-widest bg-white/5 border border-white/5 px-2 py-0.5 rounded">Canvas Sandbox</span>

          {/* Animating Cards */}
          {['Card A', 'Card B', 'Card C', 'Card D'].map((label, idx) => (
            <div
              key={label}
              className="sandbox-card w-24 h-28 border border-white/10 rounded-2xl bg-zinc-950/70 shadow-lg backdrop-blur-xl flex flex-col items-center justify-center gap-2"
              style={{
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden'
              }}
            >
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-[10px] text-purple-300 font-bold font-mono">
                {idx + 1}
              </div>
              <span className="text-[10px] font-bold text-white tracking-wide">{label}</span>
            </div>
          ))}
        </div>

        {/* Right Side: Controls Panel */}
        <div className="border border-white/5 bg-white/[0.02] backdrop-blur-2xl rounded-2xl p-5 flex flex-col gap-4 text-left select-none justify-between">
          <div className="flex flex-col gap-4">
            
            {/* 1. Animation Type */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Animation Type</label>
              <select
                value={animType}
                onChange={(e) => setAnimType(e.target.value)}
                className="bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-[11.5px] text-white focus:outline-none focus:border-purple-500/50 font-bold cursor-pointer"
              >
                <option value="fadeIn">Fade In</option>
                <option value="slideUp">Slide Up</option>
                <option value="scalePop">Scale Pop</option>
                <option value="tilt3d">3D Tilt</option>
                <option value="stagger">Stagger Cards</option>
              </select>
            </div>

            {/* 2. Duration Slider */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                <span>Duration</span>
                <span className="text-purple-400 font-mono font-extrabold">{duration}s</span>
              </div>
              <input
                type="range"
                min="0.3"
                max="2.0"
                step="0.1"
                value={duration}
                onChange={(e) => setDuration(parseFloat(e.target.value))}
                className="w-full accent-purple-500 bg-zinc-800 rounded-lg appearance-none h-1.5 cursor-pointer mt-1"
              />
            </div>

            {/* 3. Ease Select */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Easing</label>
              <select
                value={ease}
                onChange={(e) => setEase(e.target.value)}
                className="bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-[11.5px] text-white focus:outline-none focus:border-purple-500/50 font-bold cursor-pointer"
              >
                <option value="power3.out">power3.out</option>
                <option value="elastic.out(1, 0.45)">elastic.out</option>
                <option value="back.out(1.7)">back.out</option>
                <option value="expo.out">expo.out</option>
              </select>
            </div>

            {/* 4. Stagger Slider */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                <span>Stagger</span>
                <span className="text-purple-400 font-mono font-extrabold">{stagger}s</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="0.30"
                step="0.02"
                value={stagger}
                onChange={(e) => setStagger(parseFloat(e.target.value))}
                className="w-full accent-purple-500 bg-zinc-800 rounded-lg appearance-none h-1.5 cursor-pointer mt-1"
              />
            </div>

          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-2 mt-2">
            <button
              onClick={playAnimation}
              className="w-full bg-purple-650 hover:bg-purple-600 text-white font-bold text-[11px] py-2.5 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Replay Animation</span>
            </button>
            <button
              onClick={handleCopySnippet}
              className="w-full bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-300 hover:text-white font-bold text-[11px] py-2.5 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>{copied ? 'Copied to Clipboard!' : 'Copy GSAP Snippet'}</span>
            </button>
          </div>

        </div>

      </div>

      {/* Snippet Code block */}
      <div className="bg-black/55 border border-white/5 rounded-2xl p-4 font-mono text-[11px] text-left flex flex-col gap-2 shadow-inner">
        <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest block border-b border-white/5 pb-1">Generated Snippet</span>
        <pre className="text-purple-300 leading-normal font-semibold font-mono whitespace-pre-wrap select-all">
          {getCodeSnippet()}
        </pre>
      </div>

      {/* What it Showcases */}
      <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 select-none text-left">
        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">What this showcases</span>
        <p className="text-[12px] text-zinc-400 mt-1 font-medium">
          GSAP Tweens parameter tuning, dynamic code generation, and UI animation configurations.
        </p>
      </div>

    </div>
  );
}
