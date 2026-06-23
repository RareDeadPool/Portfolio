'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Send, CheckCircle, Smartphone, Terminal, Server, Cpu } from 'lucide-react';
import { PROJECTS_DATA } from '../data/projectsData';

export default function ProjectDetail({ id }) {
  const project = PROJECTS_DATA[id];
  
  if (!project) return <div className="p-6 text-center text-zinc-400">Project data not found.</div>;

  return (
    <div className="flex flex-col h-full bg-[#131315]/80 select-text" style={{ '--theme-accent': project.accentHex }}>
      
      {/* 1. Hero */}
      <div 
        className="h-32 flex flex-col justify-end p-6 border-b border-white/5 relative"
        style={{ background: `linear-gradient(135deg, ${project.accentHex}1A 0%, transparent 100%)` }}
      >
        <span 
          className="absolute top-4 right-4 text-[10px] font-mono border border-white/10 px-2 py-0.5 rounded text-white bg-black/40"
          style={{ borderColor: `${project.accentHex}40`, color: project.accentHex }}
        >
          {project.stack[0]}
        </span>
        <h1 className="text-2xl font-bold text-white mb-1">{project.title}</h1>
        <p className="text-[13px] text-zinc-400 font-medium leading-none">{project.subtitle}</p>
      </div>

      {/* 2. Body Details */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
        <div className="flex flex-col">
          <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Description</h3>
          <p className="text-[14px] leading-relaxed text-zinc-300 font-normal">{project.desc}</p>
        </div>

        <div className="flex flex-col">
          <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Technologies Used</h3>
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map(tech => (
              <span 
                key={tech} 
                className="text-[10px] font-mono border px-2 py-0.5 rounded-sm"
                style={{ 
                  borderColor: `${project.accentHex}33`, 
                  backgroundColor: `${project.accentHex}0F`, 
                  color: project.accentHex 
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">Interactive Live Demo</h3>
          <div className="bg-black/35 border border-white/5 rounded-xl overflow-hidden p-4 min-h-[140px] font-mono text-[12px]">
            {id === 'cityscan' && <CityScanDemo />}
            {id === 'dataviz' && <DataVizDemo />}
            {id === 'baatcheet' && <BaatCheetDemo />}
            {id === 'shivner' && <ShivnerDemo />}
          </div>
        </div>
      </div>

    </div>
  );
}

/* --- IoT SIMULATOR: CITYSCAN --- */
function CityScanDemo() {
  const [logs, setLogs] = useState([
    { text: "> Secure socket connection established to nodes...", color: '#2dd4bf' }
  ]);
  const bottomRef = useRef(null);

  useEffect(() => {
    const nodes = ['Node-21 (Downtown)', 'Node-09 (Koregaon Park)', 'Node-17 (Kothrud)', 'Node-42 (Station)'];
    const metrics = ['PM2.5', 'AQI', 'Temperature', 'Humidity', 'Noise Level', 'Traffic Rate'];

    const interval = setInterval(() => {
      const node = nodes[Math.floor(Math.random() * nodes.length)];
      const metric = metrics[Math.floor(Math.random() * metrics.length)];
      let val = '';
      let status = 'OK';
      let col = '#2dd4bf';

      if (metric === 'Temperature') {
        val = (21 + Math.random() * 13).toFixed(1) + '°C';
      } else if (metric === 'PM2.5') {
        const pmVal = Math.floor(10 + Math.random() * 42);
        val = pmVal + ' µg/m³';
        if (pmVal > 35) { status = 'WARN'; col = '#fb923c'; }
      } else if (metric === 'AQI') {
        const aqiVal = Math.floor(40 + Math.random() * 80);
        val = aqiVal.toString();
        if (aqiVal > 100) { status = 'POLLUTED'; col = '#f87171'; }
      } else if (metric === 'Traffic Rate') {
        val = Math.floor(5 + Math.random() * 70) + ' vehicles/min';
      } else {
        val = Math.floor(40 + Math.random() * 40) + '%';
      }

      const time = new Date().toLocaleTimeString();
      const line = `> [${time}] <span class="text-white">${node}</span> - ${metric}: <strong style="color:${col}">${val}</strong> | Status: <span style="color:${col}; font-weight:600">${status}</span>`;
      
      setLogs(prev => {
        const appended = [...prev, { text: line, color: col }];
        return appended.slice(-6); // keep bounded
      });
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="flex flex-col gap-1 text-[#2dd4bf]">
      {logs.map((log, index) => (
        <div key={index} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: log.text }} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}

/* --- CANVAS GRAPH SIMULATOR: DATAVIZ --- */
function DataVizDemo() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    const particles = [];
    const maxParticles = 40;
    const connectionDist = 70;
    let mouse = { x: null, y: null };

    const resize = () => {
      if (!canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = 140;
    };
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor(x, y) {
        this.x = x !== undefined ? x : Math.random() * canvas.width;
        this.y = y !== undefined ? y : Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.radius = Math.random() * 2 + 1.5;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#a855f7';
        ctx.fill();
      }
    }

    for (let i = 0; i < maxParticles; i++) {
      particles.push(new Particle());
    }

    const mouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const mouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    canvas.addEventListener('mousemove', mouseMove);
    canvas.addEventListener('mouseleave', mouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${1 - dist / connectionDist})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        if (mouse.x !== null) {
          const dx = particles[i].x - mouse.x;
          const dy = particles[i].y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${0.8 * (1 - dist / 80)})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      if (canvas) {
        canvas.removeEventListener('mousemove', mouseMove);
        canvas.removeEventListener('mouseleave', mouseLeave);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full relative h-[140px] bg-black/40 overflow-hidden rounded-lg">
      <canvas ref={canvasRef} className="block cursor-crosshair w-full h-full" />
      <span className="absolute bottom-2 left-3 text-[10px] text-purple-400 select-none pointer-events-none">
        Proximity Graph Particle Mesh Simulator
      </span>
    </div>
  );
}

/* --- COLLAB WORKSPACE CHAT: BAATCHEET --- */
function BaatCheetDemo() {
  const [messages, setMessages] = useState([
    { text: "Welcome to BaatCheet channel. Drop me a question!", sender: 'Bot' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const listRef = useRef(null);

  const responses = [
    "Redis pub/sub acts as the cluster message dispatcher behind my chat engines.",
    "Try double-clicking another project folder to see different interactive feeds!",
    "My socket event hooks ensure messaging scales under low bandwidth.",
    "Want to contact Aditya Sawant? Double click the 'Contact.mail' file shortcut!",
    "I'm stateful and built with React hooks + Next.js App Router API configurations."
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const val = input.trim();
    if (val === '') return;

    setMessages(prev => [...prev, { text: val, sender: 'User' }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const reply = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { text: reply, sender: 'Bot' }]);
    }, 1200);
  };

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col h-[180px] bg-black/20 rounded-lg p-2 gap-2 text-zinc-300 font-sans">
      <div ref={listRef} className="flex-1 overflow-y-auto flex flex-col gap-2 p-1">
        {messages.map((m, i) => {
          const isUser = m.sender === 'User';
          return (
            <div 
              key={i} 
              className={`max-w-[80%] rounded-xl px-3 py-1.5 text-[12px] leading-relaxed ${
                isUser ? 'bg-cyan-500/20 border border-cyan-500/30 text-white self-end' : 'bg-white/5 border border-white/5 text-zinc-300 self-start'
              }`}
            >
              {!isUser && <strong className="text-cyan-400 mr-1.5">Assistant:</strong>}
              {m.text}
            </div>
          );
        })}
        {isTyping && (
          <div className="bg-white/5 border border-white/5 rounded-xl px-3 py-1.5 text-[12px] self-start text-zinc-400 italic">
            Assistant is typing...
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 flex-shrink-0">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          className="flex-1 bg-white/5 border border-white/5 rounded-lg px-3 py-1 text-[12px] text-white focus:outline-none focus:border-cyan-500/50"
          autoComplete="off"
        />
        <button type="submit" className="bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 px-3.5 rounded-lg text-[11px] font-bold hover:bg-cyan-500/30">
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}

/* --- API STATS SIMULATOR: SHIVNER --- */
function ShivnerDemo() {
  const [stats, setStats] = useState({ transits: 1842, latency: 4.2, rate: 890, cpu: 12.4 });

  useEffect(() => {
    const timer = setInterval(() => {
      setStats({
        transits: Math.floor(1800 + Math.random() * 110),
        latency: parseFloat((3.8 + Math.random() * 1.6).toFixed(1)),
        rate: Math.floor(820 + Math.random() * 140),
        cpu: parseFloat((10 + Math.random() * 14).toFixed(1))
      });
    }, 1500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col gap-3 font-sans">
      <div className="grid grid-cols-2 gap-3 text-zinc-300">
        <div className="bg-white/5 p-3 rounded-lg border border-white/5 flex flex-col">
          <span className="text-orange-400 text-[16px] font-bold tracking-tight">
            {stats.transits.toLocaleString()}
          </span>
          <span className="text-[10px] text-zinc-500 font-bold uppercase mt-1">Active API Transits</span>
        </div>
        <div className="bg-white/5 p-3 rounded-lg border border-white/5 flex flex-col">
          <span className="text-orange-400 text-[16px] font-bold tracking-tight">
            {stats.latency}ms
          </span>
          <span className="text-[10px] text-zinc-500 font-bold uppercase mt-1">Dijkstra Planner Latency</span>
        </div>
        <div className="bg-white/5 p-3 rounded-lg border border-white/5 flex flex-col">
          <span className="text-orange-400 text-[16px] font-bold tracking-tight">
            {stats.rate} req/s
          </span>
          <span className="text-[10px] text-zinc-500 font-bold uppercase mt-1">API Ingestion Rate</span>
        </div>
        <div className="bg-white/5 p-3 rounded-lg border border-white/5 flex flex-col">
          <span className="text-orange-400 text-[16px] font-bold tracking-tight">
            {stats.cpu}%
          </span>
          <span className="text-[10px] text-zinc-500 font-bold uppercase mt-1">CPU Logistics Server Load</span>
        </div>
      </div>
    </div>
  );
}
