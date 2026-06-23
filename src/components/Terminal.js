'use client';

import React, { useEffect, useState, useRef } from 'react';

export default function Terminal({ onRunCommand, onClose }) {
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [logs, setLogs] = useState([
    { text: "Welcome to Aditya OS Terminal v2.0.0 (Type 'help' for options)", type: 'welcome' }
  ]);
  const [inputVal, setInputVal] = useState('');
  
  const inputRef = useRef(null);
  const logsBottomRef = useRef(null);

  useEffect(() => {
    // Focus terminal input initially
    if (inputRef.current) {
      inputRef.current.focus();
    }

    const handleQuickExec = (e) => {
      const command = e.detail.command;
      executeCommand(command);
    };

    window.addEventListener('runcommand', handleQuickExec);
    return () => window.removeEventListener('runcommand', handleQuickExec);
  }, [history]);

  useEffect(() => {
    // Scroll logs to bottom
    if (logsBottomRef.current) {
      logsBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const executeCommand = (cmdText) => {
    const raw = cmdText.trim();
    if (raw === '') return;

    // Append user input row
    const newLogs = [...logs, { text: `aditya@portfolio:~# ${raw}`, type: 'prompt' }];

    // Command parsing
    const parts = raw.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    let outputRows = [];

    switch (cmd) {
      case 'help':
        outputRows = [
          { text: "Available commands:", type: 'accent' },
          { text: "  about         - Introduction and bio details" },
          { text: "  projects      - List dynamic portfolio projects" },
          { text: "  neofetch      - Render ASCII developer branding specs" },
          { text: "  theme [light|dark|1-3] - Toggle light/dark theme or gradient wallpapers" },
          { text: "  restore       - Restore all hidden/removed desktop shortcuts" },
          { text: "  date          - Output current local system clock" },
          { text: "  clear         - Empty command logger panel" },
          { text: "  exit          - Close the system terminal window" }
        ];
        break;
      case 'clear':
        setLogs([]);
        setHistory([...history, raw]);
        setInputVal('');
        return;
      case 'neofetch':
        outputRows = [
          { text: `
<pre class="text-emerald-400 font-bold leading-none select-none">
    _   ___ ___ _____   __ _   
   /_\\ |   \\_ _|_   _| /_\\\\ \\  
  / _ \\| |) | |  | |  / _ \\\\ \\ 
 /_/ \\_\\___/___| |_| /_/ \\_\\\\_\\
</pre>
          `, type: 'raw' },
          { text: "--------------------------------------------", type: 'accent' },
          { text: "aditya@sawant.dev (Aditya Sawant)", type: 'info' },
          { text: "OS: NextJS DevOS Platform v2.0-AppRouter", type: 'info' },
          { text: "Uptime: Active sessions running since bootup", type: 'info' },
          { text: "Resolution: " + window.innerWidth + "x" + window.innerHeight, type: 'info' },
          { text: "Window Manager: Framer-Motion.WM / GSAP.Transitions", type: 'info' },
          { text: "Shell: React-Stateful-Bash 60fps", type: 'info' },
          { text: "--------------------------------------------", type: 'accent' }
        ];
        break;
      case 'about':
        outputRows = [
          { text: "About Aditya Sawant:", type: 'accent' },
          { text: "I am a Full-Stack Engineer and UX Designer focused on building modern, high-fidelity developer tools and digital architectures." },
          { text: "Double-click the 'About Me.txt' shortcut to launch my visual resume details!" }
        ];
        break;
      case 'projects':
        if (args.length > 0) {
          const target = args[0].toLowerCase();
          if (['cityscan', 'dataviz', 'baatcheet', 'shivner'].includes(target)) {
            outputRows = [{ text: `Launching project view: ${target}...`, type: 'accent' }];
            // Trigger project load callback
            if (onRunCommand) onRunCommand('project', target);
            break;
          }
        }
        outputRows = [
          { text: "Portfolio Projects List:", type: 'accent' },
          { text: "  cityscan  - IoT Telemetry System Dashboard" },
          { text: "  dataviz   - WebGL Canvas Particle Graph visualizer" },
          { text: "  baatcheet - Collab chat workspace framework" },
          { text: "  shivner   - Dijkstra fleet navigations REST API" },
          { text: "Usage: type 'projects [name]' to open specific view panels." }
        ];
        break;
      case 'date':
        outputRows = [{ text: new Date().toString() }];
        break;
      case 'restore':
        if (onRunCommand) onRunCommand('restore', '');
        outputRows = [{ text: "All hidden desktop shortcuts have been restored.", type: 'accent' }];
        break;
      case 'theme':
        if (args.length > 0) {
          const val = args[0];
          if (onRunCommand) onRunCommand('theme', val);
          outputRows = [{ text: `Wallpaper layout swapped to theme options: ${val}`, type: 'accent' }];
        } else {
          outputRows = [{ text: "Usage: theme [light | dark | 1 | 2 | 3]", type: 'accent' }];
        }
        break;
      case 'exit':
        if (onClose) onClose();
        return;
      default:
        outputRows = [{ text: `sh: command not found: ${cmd}. Type 'help' for instructions.`, type: 'error' }];
    }

    setLogs([...newLogs, ...outputRows]);
    setHistory([...history, raw]);
    setHistoryIndex(-1);
    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      
      const newIdx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIdx);
      setInputVal(history[newIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      
      const newIdx = historyIndex + 1;
      if (newIdx >= history.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(newIdx);
        setInputVal(history[newIdx]);
      }
    }
  };

  return (
    <div 
      className="bg-[#0c0c0e] text-emerald-400 font-mono text-[13px] h-full flex flex-col relative select-text"
      onClick={() => inputRef.current && inputRef.current.focus()}
    >
      <div className="flex-1 p-4 overflow-y-auto z-10 flex flex-col gap-2 relative">
        
        {logs.map((log, index) => {
          let cName = 'text-emerald-400';
          if (log.type === 'welcome') cName = 'text-zinc-500 italic';
          if (log.type === 'prompt') cName = 'text-sky-300';
          if (log.type === 'error') cName = 'text-red-400';
          if (log.type === 'accent') cName = 'text-indigo-400 font-bold';
          if (log.type === 'info') cName = 'text-zinc-300';

          if (log.type === 'raw') {
            return (
              <div 
                key={index} 
                className="terminal-log-row leading-none" 
                dangerouslySetInnerHTML={{ __html: log.text }} 
              />
            );
          }

          return (
            <div key={index} className={`terminal-log-row ${cName}`}>
              {log.text}
            </div>
          );
        })}
        
        <div ref={logsBottomRef} />
      </div>

      {/* Input Prompt Row */}
      <div className="h-10 bg-black/40 border-t border-white/5 flex items-center px-4 gap-2 flex-shrink-0 z-10">
        <span className="text-sky-300 select-none">aditya@portfolio:~#</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0 p-0 font-mono text-[13px]"
          autoComplete="off"
          spellCheck={false}
          autoFocus
        />
      </div>

      {/* Grid scanning textures overlay */}
      <div className="terminal-scanlines" />
    </div>
  );
}
