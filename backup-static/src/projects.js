/*
  Projects Module - Desktop Portfolio OS
  Handles project metadata, dynamic detail window generation, and interactive project live-demos.
*/

import { winManager } from './window-manager.js';

// Project Database
const PROJECTS_DATA = {
  cityscan: {
    id: 'cityscan',
    title: 'CityScan.app',
    subtitle: 'Smart City IoT Telemetry Dashboard',
    desc: 'A real-time monitoring dashboard for smart cities. Parses live telemetry data from distributed sensor arrays measuring ambient temperature, humidity, air quality indices, and traffic flow counts. Features interactive GIS overlays and anomaly alerting.',
    stack: ['React', 'Leaflet.js', 'Go', 'InfluxDB', 'MQTT', 'Docker'],
    accentHex: '#2dd4bf',
    accentRGB: '45, 212, 191',
    initDemo: (container) => initCityScanDemo(container)
  },
  dataviz: {
    id: 'dataviz',
    title: 'DataViz.3D',
    subtitle: 'Interactive High-Dimensional Particle System',
    desc: 'An interactive 3D canvas rendering engine designed to visualize massive high-dimensional datasets. Leverages force-directed graph layouts and responsive particle nodes that connect dynamically based on proximity and relational weights.',
    stack: ['HTML5 Canvas', 'Three.js', 'GLSL Shaders', 'Web Audio API', 'Webpack'],
    accentHex: '#a855f7',
    accentRGB: '168, 85, 247',
    initDemo: (container) => initDataVizDemo(container)
  },
  baatcheet: {
    id: 'baatcheet',
    title: 'BaatCheet.chat',
    subtitle: 'Real-time Collaborative Workspace Messaging',
    desc: 'A full-featured collaborative chat application supporting instantly synced direct messaging, channels creation, rich markdown previews, file sharing, and automated bot replies.',
    stack: ['Next.js', 'TailwindCSS', 'Socket.io', 'Redis', 'MongoDB', 'Node.js'],
    accentHex: '#22d3ee',
    accentRGB: '34, 211, 238',
    initDemo: (container) => initBaatCheetDemo(container)
  },
  shivner: {
    id: 'shivner',
    title: 'Shivner.api',
    subtitle: 'High-Performance Logistics Routing Engine',
    desc: 'A lightning-fast REST/gRPC API engine built for fleet tracking and logistics optimization. Implements customized Dijkstra and A* heuristics to calculate dynamic route schedules under variable traffic congestion levels.',
    stack: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'gRPC', 'Docker'],
    accentHex: '#fb923c',
    accentRGB: '251, 146, 60',
    initDemo: (container) => initShivnerDemo(container)
  }
};

// Global active loops catalog for page cleanup
const activeIntervals = new Map();
const activeAnimationFrames = new Map();

// Listening for folder explorer double-clicks or search events
window.addEventListener('openproject', (e) => {
  const projectId = e.detail.id;
  openProjectDetail(projectId);
});

export function openProjectDetail(id) {
  const project = PROJECTS_DATA[id];
  if (!project) return;

  const winId = `project-${id}`;

  // If already open, restore and focus
  if (winManager.windows.has(winId)) {
    winManager.restoreWindow(winId);
    return;
  }

  // Create detail window container structure
  const htmlContent = `
    <div class="project-detail-layout" style="--accent-rgb: ${project.accentRGB};">
      <div class="project-hero">
        <span class="project-hero-badge">${project.stack[0]}</span>
        <div class="project-hero-meta">
          <h1>${project.title}</h1>
          <p>${project.subtitle}</p>
        </div>
      </div>
      <div class="project-details-body">
        <div class="project-section">
          <h3>Description</h3>
          <p>${project.desc}</p>
        </div>

        <div class="project-section">
          <h3>Technologies Used</h3>
          <div class="project-stack">
            ${project.stack.map(tech => `<span class="project-stack-tag">${tech}</span>`).join('')}
          </div>
        </div>

        <div class="project-section">
          <h3>Interactive Live Demo</h3>
          <div class="interactive-preview-box" id="demo-box-${id}">
            <!-- Simulated demo goes here -->
          </div>
        </div>
      </div>
    </div>
  `;

  // Spawn the window
  const winEl = winManager.createWindow(winId, `${project.title} Details`, htmlContent);
  
  // Set theme accent variable on window container
  winEl.style.setProperty('--theme-accent', project.accentHex);

  // Initialize specific interactive demo
  const demoBox = winEl.querySelector(`#demo-box-${id}`);
  if (demoBox) {
    project.initDemo(demoBox);
  }

  // Handle cleanup on window close
  const originalClose = winManager.closeWindow.bind(winManager);
  winManager.closeWindow = (targetId) => {
    if (targetId === winId) {
      // Clear timers / requestAnimationFrames
      if (activeIntervals.has(winId)) {
        clearInterval(activeIntervals.get(winId));
        activeIntervals.delete(winId);
      }
      if (activeAnimationFrames.has(winId)) {
        cancelAnimationFrame(activeAnimationFrames.get(winId));
        activeAnimationFrames.delete(winId);
      }
    }
    originalClose(targetId);
  };
}

/* --- INTERACTIVE SIMULATOR: CITYSCAN (TEAL ACCENT) --- */
function initCityScanDemo(container) {
  container.innerHTML = `
    <div class="cityscan-preview">
      <div class="cityscan-log-line">> Establishing secure socket connection to nodes...</div>
    </div>
  `;

  const preview = container.querySelector('.cityscan-preview');
  
  const nodes = ['Node-21 (Downtown)', 'Node-09 (Koregaon Park)', 'Node-17 (Kothrud)', 'Node-42 (Station)'];
  const metrics = ['PM2.5', 'AQI', 'Temperature', 'Humidity', 'Noise Level', 'Traffic Rate'];

  const logTimer = setInterval(() => {
    if (!preview) return;

    const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
    const randomMetric = metrics[Math.floor(Math.random() * metrics.length)];
    
    let val = '';
    let status = 'OK';
    let statusColor = '#2dd4bf';

    if (randomMetric === 'Temperature') {
      val = (22 + Math.random() * 12).toFixed(1) + '°C';
    } else if (randomMetric === 'PM2.5') {
      const pmVal = Math.floor(8 + Math.random() * 45);
      val = pmVal + ' µg/m³';
      if (pmVal > 35) { status = 'WARN'; statusColor = '#fb923c'; }
    } else if (randomMetric === 'AQI') {
      const aqiVal = Math.floor(40 + Math.random() * 90);
      val = aqiVal.toString();
      if (aqiVal > 100) { status = 'POLLUTED'; statusColor = '#f87171'; }
    } else if (randomMetric === 'Traffic Rate') {
      val = Math.floor(5 + Math.random() * 80) + ' vehicles/min';
    } else {
      val = Math.floor(30 + Math.random() * 50) + '%';
    }

    const logEl = document.createElement('div');
    logEl.className = 'cityscan-log-line';
    logEl.innerHTML = `> [${new Date().toLocaleTimeString()}] <span style="color:#ffffff">${randomNode}</span> - ${randomMetric}: <strong style="color:${statusColor}">${val}</strong> | Status: <span style="color:${statusColor}; font-weight:600">${status}</span>`;
    
    preview.appendChild(logEl);

    // Keep logs small
    if (preview.children.length > 8) {
      preview.children[0].remove();
    }
    
    // Auto scroll container
    container.scrollTop = container.scrollHeight;
  }, 1200);

  activeIntervals.set('project-cityscan', logTimer);
}

/* --- INTERACTIVE SIMULATOR: DATAVIZ (PURPLE ACCENT) --- */
function initDataVizDemo(container) {
  container.innerHTML = `
    <div class="dataviz-preview">
      <canvas class="dataviz-canvas"></canvas>
      <div style="position:absolute; bottom:6px; left:8px; font-size:10px; color:#a855f7; pointer-events:none;">
        WebGL Grid Physics (Hover / Drag / Click to create connections)
      </div>
    </div>
  `;

  const canvas = container.querySelector('.dataviz-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  
  // Resize canvas to fill element
  const resizeCanvas = () => {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  };
  resizeCanvas();
  setTimeout(resizeCanvas, 50);

  const particles = [];
  const maxParticles = 45;
  const connectionDist = 75;

  class Particle {
    constructor(x, y) {
      this.x = x !== undefined ? x : Math.random() * canvas.width;
      this.y = y !== undefined ? y : Math.random() * canvas.height;
      this.vx = (Math.random() * 1 - 0.5) * 0.8;
      this.vy = (Math.random() * 1 - 0.5) * 0.8;
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

  // Populate initially
  for (let i = 0; i < maxParticles; i++) {
    particles.push(new Particle());
  }

  // Mouse interactivity
  let mouse = { x: null, y: null };
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    
    // Spawn 5 particles on click
    for (let i = 0; i < 5; i++) {
      if (particles.length >= 75) particles.shift(); // keep array bounded
      particles.push(new Particle(mx + (Math.random() * 20 - 10), my + (Math.random() * 20 - 10)));
    }
  });

  const animate = () => {
    if (!canvas || !canvas.parentElement) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw particles
    particles.forEach(p => {
      p.update();
      p.draw();
    });

    // Draw connection lines
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

      // Check mouse line connections
      if (mouse.x !== null) {
        const dx = particles[i].x - mouse.x;
        const dy = particles[i].y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(168, 85, 247, ${0.8 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    const frameId = requestAnimationFrame(animate);
    activeAnimationFrames.set('project-dataviz', frameId);
  };

  animate();
}

/* --- INTERACTIVE SIMULATOR: BAATCHEET (CYAN ACCENT) --- */
function initBaatCheetDemo(container) {
  container.innerHTML = `
    <div class="baatcheet-preview">
      <div class="chat-messages" id="chat-messages-container">
        <div class="chat-bubble bubble-received">
          <strong>Assistant Bot:</strong> Welcome to BaatCheet workspace chat. Ask me a question!
        </div>
      </div>
      <form class="chat-composer" id="chat-composer-form">
        <input type="text" class="chat-input" placeholder="Type a message..." required autocomplete="off">
        <button type="submit" class="btn btn-primary" style="padding:4px 12px; font-size:11px;">Send</button>
      </form>
    </div>
  `;

  const messages = container.querySelector('#chat-messages-container');
  const form = container.querySelector('#chat-composer-form');
  const input = container.querySelector('.chat-input');

  const botResponses = [
    "I'm powered by WebSockets! Sending messages incurs < 10ms network latency.",
    "Aditya built me to handle multiple channels with Redis pub/sub brokers.",
    "You can try double clicking another project file inside the explorer to see more!",
    "BaatCheet translates to 'Chitchat' or 'Conversations' in Hindi. Cool, right?",
    "Need to contact Aditya? You can send a direct form submission from the Mail icon!"
  ];

  if (!form || !messages) return;

  const handleSendMessage = (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (text === '') return;

    // Append user message
    const userBubble = document.createElement('div');
    userBubble.className = 'chat-bubble bubble-sent';
    userBubble.textContent = text;
    messages.appendChild(userBubble);
    
    input.value = '';
    
    // Auto scroll chat
    messages.scrollTop = messages.scrollHeight;

    // Bot Typing status simulation
    setTimeout(() => {
      const typingBubble = document.createElement('div');
      typingBubble.className = 'chat-bubble bubble-received';
      typingBubble.id = 'bot-typing-status';
      typingBubble.innerHTML = '<em>Bot is typing...</em>';
      messages.appendChild(typingBubble);
      messages.scrollTop = messages.scrollHeight;

      // Bot reply
      setTimeout(() => {
        const typingEl = document.getElementById('bot-typing-status');
        if (typingEl) typingEl.remove();

        const botBubble = document.createElement('div');
        botBubble.className = 'chat-bubble bubble-received';
        
        const randomResp = botResponses[Math.floor(Math.random() * botResponses.length)];
        botBubble.innerHTML = `<strong>Assistant Bot:</strong> ${randomResp}`;
        messages.appendChild(botBubble);
        messages.scrollTop = messages.scrollHeight;
      }, 1000);
    }, 400);
  };

  form.addEventListener('submit', handleSendMessage);
}

/* --- INTERACTIVE SIMULATOR: SHIVNER (ORANGE ACCENT) --- */
function initShivnerDemo(container) {
  container.innerHTML = `
    <div class="shivner-preview">
      <div class="shivner-stat-grid">
        <div class="shivner-stat-card">
          <div class="shivner-stat-val" id="shivner-active-transits">1,842</div>
          <div class="shivner-stat-lbl">Active API Transits</div>
        </div>
        <div class="shivner-stat-card">
          <div class="shivner-stat-val" id="shivner-avg-latency">4.2ms</div>
          <div class="shivner-stat-lbl">Route Planning Latency</div>
        </div>
        <div class="shivner-stat-card">
          <div class="shivner-stat-val" id="shivner-api-requests">892 req/s</div>
          <div class="shivner-stat-lbl">API Ingestion Rate</div>
        </div>
        <div class="shivner-stat-card">
          <div class="shivner-stat-val" id="shivner-cpu-load">12.4%</div>
          <div class="shivner-stat-lbl">CPU Usage Core</div>
        </div>
      </div>
      <div style="font-size:10px; color:#fb923c; text-align:center; margin-top:4px;">
        API telemetry feeds update live (1.5s refresh cycle)
      </div>
    </div>
  `;

  const transitsVal = container.querySelector('#shivner-active-transits');
  const latencyVal = container.querySelector('#shivner-avg-latency');
  const requestsVal = container.querySelector('#shivner-api-requests');
  const cpuVal = container.querySelector('#shivner-cpu-load');

  const statsTimer = setInterval(() => {
    if (!transitsVal) return;

    // Simulate subtle floating metrics
    const tVal = Math.floor(1800 + Math.random() * 120);
    const lVal = (3.8 + Math.random() * 1.5).toFixed(1) + 'ms';
    const rVal = Math.floor(820 + Math.random() * 150) + ' req/s';
    const cVal = (10 + Math.random() * 15).toFixed(1) + '%';

    transitsVal.textContent = tVal.toLocaleString();
    latencyVal.textContent = lVal;
    requestsVal.textContent = rVal;
    cpuVal.textContent = cVal;
  }, 1500);

  activeIntervals.set('project-shivner', statsTimer);
}
