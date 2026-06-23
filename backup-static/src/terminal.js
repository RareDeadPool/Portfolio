/*
  Terminal Module - Desktop Portfolio OS
  Implements system shell simulation, ASCII art, commands parsing, and history recall.
*/

import { openWindow } from './desktop.js';
import { winManager } from './window-manager.js';

class TerminalShell {
  constructor() {
    this.history = [];
    this.historyIndex = -1;
    this.logsContainer = null;
    this.input = null;

    // Listen for terminal booting events
    window.addEventListener('terminalbooted', () => this.boot());

    // Listen for quick execution triggers
    window.addEventListener('runcommand', (e) => {
      const command = e.detail.command;
      this.executeQuickCommand(command);
    });
  }

  boot() {
    this.logsContainer = document.getElementById('terminal-logs-container');
    this.input = document.getElementById('terminal-input-el');

    if (!this.input) return;

    // Focus input
    this.input.focus();

    // Bind event listeners
    this.input.addEventListener('keydown', (e) => this.handleKeyDown(e));
    
    // Clicking anywhere in the terminal content focusses the input
    const inner = this.input.closest('.terminal-inner');
    if (inner) {
      inner.addEventListener('click', () => {
        if (this.input) this.input.focus();
      });
    }
  }

  executeQuickCommand(command) {
    // Wait for boot to finish just in case
    setTimeout(() => {
      if (!this.input) this.boot();
      if (this.input) {
        this.input.value = command;
        this.processCommand(command);
      }
    }, 100);
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      const command = this.input.value.trim();
      this.processCommand(command);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.recallHistory(-1);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.recallHistory(1);
    }
  }

  recallHistory(direction) {
    if (this.history.length === 0) return;

    if (direction === -1) { // Up
      if (this.historyIndex === -1) {
        this.historyIndex = this.history.length - 1;
      } else {
        this.historyIndex = Math.max(0, this.historyIndex - 1);
      }
    } else { // Down
      if (this.historyIndex === -1) return;
      this.historyIndex = this.historyIndex + 1;
      if (this.historyIndex >= this.history.length) {
        this.historyIndex = -1;
        this.input.value = '';
        return;
      }
    }

    this.input.value = this.history[this.historyIndex];
  }

  processCommand(rawCommand) {
    // Add command line print
    this.printLine(`aditya@portfolio:~# ${rawCommand}`, 'terminal-prompt');

    // Add to history stack
    if (rawCommand !== '') {
      this.history.push(rawCommand);
      this.historyIndex = -1;
    }

    this.input.value = '';

    const parts = rawCommand.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (cmd === '') return;

    switch (cmd) {
      case 'help':
        this.cmdHelp();
        break;
      case 'clear':
        this.cmdClear();
        break;
      case 'neofetch':
        this.cmdNeofetch();
        break;
      case 'about':
        this.cmdAbout();
        break;
      case 'projects':
        this.cmdProjects(args);
        break;
      case 'contact':
        this.cmdContact();
        break;
      case 'theme':
        this.cmdTheme(args);
        break;
      case 'date':
        this.printLine(new Date().toString());
        break;
      case 'exit':
        winManager.closeWindow('terminal');
        break;
      default:
        this.printLine(`sh: command not found: ${cmd}. Type 'help' for instructions.`, 'terminal-error');
    }

    // Auto scroll to bottom
    const terminalBody = document.getElementById('terminal-body-content');
    if (terminalBody) {
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }
  }

  printLine(text, className = '') {
    if (!this.logsContainer) return;
    const line = document.createElement('div');
    if (className) {
      line.className = className;
    }
    line.innerHTML = text;
    this.logsContainer.appendChild(line);
  }

  cmdHelp() {
    this.printLine('Available commands:', 'terminal-accent');
    const commands = [
      { name: 'about', desc: 'Brief bio and summary of skills' },
      { name: 'projects', desc: 'List all interactive portfolio projects' },
      { name: 'neofetch', desc: 'Render developer logo and hardware statistics' },
      { name: 'theme [1/2/3/dark]', desc: 'Change desktop color scheme theme' },
      { name: 'contact', desc: 'Display details on how to get in touch' },
      { name: 'date', desc: 'Print current date and time' },
      { name: 'clear', desc: 'Clean screen command logs history' },
      { name: 'exit', desc: 'Close this terminal app window' }
    ];

    commands.forEach(c => {
      this.printLine(`  <span class="terminal-primary-accent" style="display:inline-block; width:150px;">${c.name}</span> - ${c.desc}`);
    });
  }

  cmdClear() {
    if (this.logsContainer) {
      this.logsContainer.innerHTML = '';
    }
  }

  cmdNeofetch() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const asciiLogo = `
<pre style="font-family: inherit; line-height: 1.25; color: var(--project-cityscan);">
    _   ___ ___ _____   __ _   
   /_\\ |   \\_ _|_   _| /_\\\\ \\  
  / _ \\| |) | |  | |  / _ \\\\ \\ 
 /_/ \\_\\___/___| |_| /_/ \\_\\\\_\\
</pre>
    `;
    this.printLine(asciiLogo);
    this.printLine('--------------------------------------------', 'terminal-accent');
    this.printLine('<span class="terminal-primary-accent">User:</span> aditya@sawant');
    this.printLine('<span class="terminal-primary-accent">Host:</span> Aditya Sawant Desktop OS Portfolio');
    this.printLine('<span class="terminal-primary-accent">OS:</span> AdityaOS v1.0.0 (Web Workspace Platform)');
    this.printLine('<span class="terminal-primary-accent">Kernel:</span> Vanilla-JS-ES6.Engine');
    this.printLine('<span class="terminal-primary-accent">Uptime:</span> ' + Math.floor(performance.now() / 1000) + ' seconds');
    this.printLine(`<span class="terminal-primary-accent">Resolution:</span> ${screenWidth}x${screenHeight}`);
    this.printLine('<span class="terminal-primary-accent">Shell:</span> antigravity-bash v3.5-flash');
    this.printLine('<span class="terminal-primary-accent">Window Manager:</span> GlassmorphicWindowManager.js');
    this.printLine('<span class="terminal-primary-accent">Terminal Font:</span> JetBrains Mono (13px)');
    this.printLine('<span class="terminal-primary-accent">Theme Colors:</span> <span style="color:#ff5f56">■</span> <span style="color:#ffbd2e">■</span> <span style="color:#27c93f">■</span> <span style="color:#3b82f6">■</span> <span style="color:#a855f7">■</span> <span style="color:#10b981">■</span>');
    this.printLine('--------------------------------------------', 'terminal-accent');
  }

  cmdAbout() {
    this.printLine('About Aditya Sawant:', 'terminal-accent');
    this.printLine('I am a passionate Full-Stack Engineer and UI Designer specialized in building beautiful, highly performant web applications.');
    this.printLine('Core Competencies: Javascript, React, Next.js, Node.js, and CSS layout wizardry.');
    this.printLine('Double click the <span class="terminal-primary-accent">"About Me.txt"</span> shortcut on the desktop to see my full developer bio!');
  }

  cmdProjects(args) {
    if (args.length > 0) {
      const target = args[0].toLowerCase();
      if (['cityscan', 'dataviz', 'baatcheet', 'shivner'].includes(target)) {
        this.printLine(`Launching project details for: ${target}...`, 'terminal-accent');
        openWindow('projects');
        setTimeout(() => {
          const event = new CustomEvent('openproject', { detail: { id: target } });
          window.dispatchEvent(event);
        }, 200);
        return;
      }
    }

    this.printLine('Portfolio Projects:', 'terminal-accent');
    this.printLine('  <span class="terminal-primary-accent">cityscan</span>  - Smart City Monitor Dashboard (Teal Theme)');
    this.printLine('  <span class="terminal-primary-accent">dataviz</span>   - 3D Interactive WebGL Graph Canvas (Purple Theme)');
    this.printLine('  <span class="terminal-primary-accent">baatcheet</span> - Real-time Collaboration Chat Application (Cyan Theme)');
    this.printLine('  <span class="terminal-primary-accent">shivner</span>   - Logistics Shipping Routing Maps Engine (Orange Theme)');
    this.printLine('\nUsage: type <span class="terminal-primary-accent">"projects [project_name]"</span> to open detail panel directly.');
  }

  cmdContact() {
    this.printLine('Get in touch with Aditya:', 'terminal-accent');
    this.printLine('  <span class="terminal-primary-accent">Email:</span>    aditya@sawant.com (Simulated)');
    this.printLine('  <span class="terminal-primary-accent">GitHub:</span>   github.com/aditya-sawant');
    this.printLine('  <span class="terminal-primary-accent">LinkedIn:</span> linkedin.com/in/aditya-sawant');
    this.printLine('Or double-click the <span class="terminal-primary-accent">"Contact.mail"</span> desktop shortcut to open the email form!');
  }

  cmdTheme(args) {
    if (args.length === 0) {
      this.printLine('Usage: theme [1 | 2 | 3 | dark]', 'terminal-accent');
      this.printLine('Examples: theme 2 (purple gradient orbs), theme dark (true black minimalism)');
      return;
    }

    const val = args[0].toLowerCase();
    const g1 = document.querySelector('.glow-1');
    const g2 = document.querySelector('.glow-2');
    const g3 = document.querySelector('.glow-3');

    if (!g1 || !g2 || !g3) {
      this.printLine('Error: wallpaper glow systems not found.', 'terminal-error');
      return;
    }

    // Reset default styling classes
    document.body.style.backgroundColor = '';

    if (val === '1') {
      g1.style.background = 'radial-gradient(circle, rgba(170, 199, 255, 0.2) 0%, rgba(0, 102, 204, 0.05) 70%, transparent 100%)';
      g2.style.background = 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, rgba(45, 212, 191, 0.02) 70%, transparent 100%)';
      g3.style.background = 'radial-gradient(circle, rgba(251, 146, 60, 0.1) 0%, rgba(221, 74, 255, 0.01) 70%, transparent 100%)';
      this.printLine('Theme set to Style Option 1 (System Sequoia)', 'terminal-accent');
    } else if (val === '2') {
      // Purple / Pink sunset theme
      g1.style.background = 'radial-gradient(circle, rgba(236, 72, 153, 0.25) 0%, transparent 70%)';
      g2.style.background = 'radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, transparent 70%)';
      g3.style.background = 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)';
      this.printLine('Theme set to Style Option 2 (Vaporwave Sunset)', 'terminal-accent');
    } else if (val === '3') {
      // Emerald / Cyberpunk neon theme
      g1.style.background = 'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)';
      g2.style.background = 'radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, transparent 70%)';
      g3.style.background = 'radial-gradient(circle, rgba(234, 179, 8, 0.08) 0%, transparent 70%)';
      this.printLine('Theme set to Style Option 3 (Matrix Emerald)', 'terminal-accent');
    } else if (val === 'dark') {
      // Pure dark theme
      g1.style.background = 'none';
      g2.style.background = 'none';
      g3.style.background = 'none';
      document.body.style.backgroundColor = '#070708';
      this.printLine('Theme set to Deep Space (True Black Minimalism)', 'terminal-accent');
    } else {
      this.printLine(`Unknown theme option: ${val}. Options are: 1, 2, 3, dark.`, 'terminal-error');
    }
  }
}

// Bootstrap Shell Engine
new TerminalShell();
