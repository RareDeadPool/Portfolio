/*
  Desktop Module - Desktop Portfolio OS
  Handles grid icon navigation, double-click window launch, and persistent sticky notes.
*/

import { winManager } from './window-manager.js';

// Setup window mapping configuration
const WINDOW_CONFIGS = {
  about: { title: 'About Me — About Me.txt', templateId: 'window-about-template' },
  projects: { title: 'My Projects — File Explorer', templateId: 'window-projects-template' },
  terminal: { title: 'Terminal — aditya@portfolio', templateId: 'window-terminal-template' },
  contact: { title: 'Contact — Contact.mail', templateId: 'window-contact-template' }
};

export function openWindow(id) {
  const config = WINDOW_CONFIGS[id];
  if (!config) return;

  // If already open, restore it
  if (winManager.windows.has(id)) {
    winManager.restoreWindow(id);
    return;
  }

  // Otherwise, load from template
  const template = document.getElementById(config.templateId);
  if (!template) return;

  const contentHTML = template.innerHTML;
  winManager.createWindow(id, config.title, contentHTML);

  // Initialize specific features inside the window if necessary
  if (id === 'terminal') {
    // Dispatch event to boot terminal module listeners
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('terminalbooted'));
    }, 50);
  } else if (id === 'projects') {
    // Re-bind Lucide icons inside folder list
    setTimeout(() => {
      if (window.lucide) {
        window.lucide.createIcons();
      }
      setupProjectGridListeners();
    }, 50);
  }
}

// Global exposure for inline HTML handlers
window.openWindow = openWindow;

export function openSearchFromDesktop() {
  const modal = document.getElementById('search-modal');
  const input = document.getElementById('search-input');
  if (modal && input) {
    modal.classList.add('show');
    input.value = '';
    setTimeout(() => input.focus(), 50);
  }
}
window.openSearchFromDesktop = openSearchFromDesktop;

export function resetDesktopLayout() {
  winManager.resetAllLayouts();
}
window.resetDesktopLayout = resetDesktopLayout;

// Setup double-click listener on desktop shortcuts
function setupShortcutListeners() {
  const shortcuts = document.querySelectorAll('.desktop-shortcut');
  shortcuts.forEach(shortcut => {
    shortcut.addEventListener('dblclick', () => {
      const windowId = shortcut.getAttribute('data-window');
      openWindow(windowId);
    });

    // Touch support (double tap)
    let lastTap = 0;
    shortcut.addEventListener('touchend', (e) => {
      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTap;
      if (tapLength < 300 && tapLength > 0) {
        const windowId = shortcut.getAttribute('data-window');
        openWindow(windowId);
        e.preventDefault();
      }
      lastTap = currentTime;
    });
  });
}

// Setup double click listener on folders in Explorer Window
function setupProjectGridListeners() {
  const projectCards = document.querySelectorAll('.project-card-item');
  projectCards.forEach(card => {
    card.addEventListener('dblclick', () => {
      const projectId = card.getAttribute('data-project');
      openProjectDetailWindow(projectId);
    });

    let lastTap = 0;
    card.addEventListener('touchend', (e) => {
      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTap;
      if (tapLength < 300 && tapLength > 0) {
        const projectId = card.getAttribute('data-project');
        openProjectDetailWindow(projectId);
        e.preventDefault();
      }
      lastTap = currentTime;
    });
  });
}

// Triggered when opening a specific project explorer item
function openProjectDetailWindow(projectId) {
  // We will dynamic-render project views from project module data
  const event = new CustomEvent('openproject', { detail: { id: projectId } });
  window.dispatchEvent(event);
}

/* 
  Sticky Notes System 
  Implements design guidelines: sticky-note color (#FDE047), slight rotation, paper-shadow.
*/
const STICKY_STORAGE_KEY = 'aditya-os-sticky-notes';

class StickyNotesManager {
  constructor() {
    this.container = document.getElementById('sticky-notes-container');
    this.notes = this.loadNotes();
    
    // Initial rendering
    if (this.notes.length === 0) {
      // Create a default welcome sticky note
      this.createNote(
        180, 
        80, 
        "Welcome to my Portfolio OS!\n\n- Drag windows around\n- Double click icons to open files\n- Press Ctrl + K to search\n- Double click projects inside the Folder window to see details"
      );
    } else {
      this.notes.forEach(note => this.renderNoteElement(note));
    }

    // Bind dock button trigger
    const addNoteBtn = document.getElementById('dock-add-note');
    if (addNoteBtn) {
      addNoteBtn.addEventListener('click', () => {
        // Random layout offsets
        const x = Math.max(50, Math.min(window.innerWidth - 250, 100 + Math.random() * 200));
        const y = Math.max(80, Math.min(window.innerHeight - 300, 120 + Math.random() * 150));
        this.createNote(x, y, "New Sticky Note\n(double click to write)");
      });
    }
  }

  loadNotes() {
    try {
      const data = localStorage.getItem(STICKY_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Failed to load sticky notes from localStorage", e);
      return [];
    }
  }

  saveNotes() {
    try {
      localStorage.setItem(STICKY_STORAGE_KEY, JSON.stringify(this.notes));
    } catch (e) {
      console.error("Failed to save sticky notes", e);
    }
  }

  createNote(x, y, text = '') {
    // Random rotation between -2 and +2 degrees
    const rotation = (Math.random() * 4 - 2).toFixed(1);
    const id = Date.now().toString() + Math.floor(Math.random() * 1000).toString();
    
    const note = { id, x, y, rotation, text };
    this.notes.push(note);
    this.saveNotes();
    this.renderNoteElement(note);
  }

  deleteNote(id) {
    this.notes = this.notes.filter(n => n.id !== id);
    this.saveNotes();
    
    const noteEl = document.getElementById(`sticky-${id}`);
    if (noteEl) {
      noteEl.style.transform = 'scale(0.8)';
      noteEl.style.opacity = '0';
      setTimeout(() => noteEl.remove(), 150);
    }
  }

  updateNoteText(id, text) {
    const note = this.notes.find(n => n.id === id);
    if (note) {
      note.text = text;
      this.saveNotes();
    }
  }

  updateNotePosition(id, x, y) {
    const note = this.notes.find(n => n.id === id);
    if (note) {
      note.x = x;
      note.y = y;
      this.saveNotes();
    }
  }

  renderNoteElement(note) {
    const noteEl = document.createElement('div');
    noteEl.id = `sticky-${note.id}`;
    noteEl.className = 'sticky-note-el';
    noteEl.style.left = `${note.x}px`;
    noteEl.style.top = `${note.y}px`;
    noteEl.style.transform = `rotate(${note.rotation}deg)`;

    noteEl.innerHTML = `
      <div class="sticky-header">
        <span class="sticky-close" title="Delete Note">×</span>
      </div>
      <textarea class="sticky-body" placeholder="Write something...">${note.text}</textarea>
    `;

    this.container.appendChild(noteEl);

    // Setup events
    const closeBtn = noteEl.querySelector('.sticky-close');
    const textarea = noteEl.querySelector('.sticky-body');

    closeBtn.addEventListener('click', () => this.deleteNote(note.id));
    textarea.addEventListener('input', (e) => this.updateNoteText(note.id, e.target.value));

    // Handle note dragging
    this.setupNoteDragging(noteEl, note.id, note.rotation);
  }

  setupNoteDragging(el, id, rotation) {
    let startX = 0, startY = 0, startLeft = 0, startTop = 0;
    let isDragging = false;
    
    const dragStart = (e) => {
      // Avoid dragging when typing in text area
      if (e.target.tagName.toLowerCase() === 'textarea') return;

      // Bring to top
      el.style.zIndex = 95;

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      startX = clientX;
      startY = clientY;
      startLeft = parseInt(el.style.left, 10) || 0;
      startTop = parseInt(el.style.top, 10) || 0;
      isDragging = true;

      // Temp remove rotation to avoid drag displacement jump, or keep transform rotation
      el.style.transform = `rotate(${rotation}deg) scale(1.02)`;
      el.style.boxShadow = '4px 16px 24px rgba(0, 0, 0, 0.35)';

      document.addEventListener('mousemove', dragMove);
      document.addEventListener('mouseup', dragEnd);
      document.addEventListener('touchmove', dragMove, { passive: false });
      document.addEventListener('touchend', dragEnd);
    };

    const dragMove = (e) => {
      if (!isDragging) return;
      if (e.cancelable) e.preventDefault();

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      const dx = clientX - startX;
      const dy = clientY - startY;

      let newLeft = startLeft + dx;
      let newTop = startTop + dy;

      // Boundary limits
      const menuHeight = 32;
      newLeft = Math.max(10, Math.min(window.innerWidth - 210, newLeft));
      newTop = Math.max(menuHeight + 10, Math.min(window.innerHeight - 250, newTop));

      el.style.left = `${newLeft}px`;
      el.style.top = `${newTop}px`;
    };

    const dragEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      
      el.style.transform = `rotate(${rotation}deg)`;
      el.style.boxShadow = '';
      el.style.zIndex = 90;

      const x = parseInt(el.style.left, 10);
      const y = parseInt(el.style.top, 10);
      this.updateNotePosition(id, x, y);

      document.removeEventListener('mousemove', dragMove);
      document.removeEventListener('mouseup', dragEnd);
      document.removeEventListener('touchmove', dragMove);
      document.removeEventListener('touchend', dragEnd);
    };

    el.addEventListener('mousedown', dragStart);
    el.addEventListener('touchstart', dragStart, { passive: true });
  }
}

// Lock / Screensaver Overlay Toggle
export function toggleScreenSaver() {
  const lock = document.getElementById('lockscreen');
  if (lock) {
    lock.classList.toggle('hidden');
  }
}
window.toggleScreenSaver = toggleScreenSaver;

// Analog Clock Widget logic (Matches screen.png)
function initAnalogClock() {
  const hrHand = document.querySelector('.hour-hand');
  const minHand = document.querySelector('.min-hand');
  const secHand = document.querySelector('.sec-hand');
  const digitalTime = document.getElementById('widget-digital-time');

  const updateClock = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Rotation calculations
    const secDeg = (seconds / 60) * 360;
    const minDeg = (minutes / 60) * 360 + (seconds / 60) * 6;
    const hrDeg = ((hours % 12) / 12) * 360 + (minutes / 60) * 30;

    if (secHand) secHand.style.transform = `rotate(${secDeg}deg)`;
    if (minHand) minHand.style.transform = `rotate(${minDeg}deg)`;
    if (hrHand) hrHand.style.transform = `rotate(${hrDeg}deg)`;

    if (digitalTime) {
      const hh = hours.toString().padStart(2, '0');
      const mm = minutes.toString().padStart(2, '0');
      digitalTime.textContent = `${hh}:${mm}`;
    }
  };

  updateClock();
  setInterval(updateClock, 1000);
}

// PDF Resume Download logic (Matches screen.png)
export function downloadResume() {
  const resumeText = `%PDF-1.4
%
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length 192 >>
stream
BT
/F1 20 Tf
50 780 Td
(ADITYA SAWANT - FULL STACK ENGINEER) Tj
/F1 12 Tf
0 -30 Td
(Email: hello@aditya.dev | Portfolio: http://localhost:5173/) Tj
0 -20 Td
(Tech Stack: React, Next.js, Node.js, Go, PostgreSQL, Redis, Docker) Tj
0 -30 Td
(Experience:) Tj
0 -15 Td
(- GDG Web Dev Core Member - Leading technical workshops) Tj
0 -15 Td
(- Full-Stack Software Builder - Crafting aesthetic platforms) Tj
ET
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000056 00000 n 
0000000111 00000 n 
0000000250 00000 n 
0000000493 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
576
%%EOF`;

  const blob = new Blob([resumeText], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Aditya_Sawant_Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
window.downloadResume = downloadResume;

function setupResumeTrigger() {
  const resumeShortcut = document.getElementById('shortcut-resume');
  if (resumeShortcut) {
    resumeShortcut.addEventListener('dblclick', () => {
      downloadResume();
    });

    let lastTap = 0;
    resumeShortcut.addEventListener('touchend', (e) => {
      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTap;
      if (tapLength < 300 && tapLength > 0) {
        downloadResume();
        e.preventDefault();
      }
      lastTap = currentTime;
    });
  }

  // Intercept click on the download resume button inside About Me template
  document.addEventListener('click', (e) => {
    if (e.target && e.target.closest('#cv-download-btn')) {
      e.preventDefault();
      downloadResume();
    }
  });
}

// Initialize components
document.addEventListener('DOMContentLoaded', () => {
  setupShortcutListeners();
  new StickyNotesManager();
  initAnalogClock();
  setupResumeTrigger();
  
  // Close menu dropdown on click outside
  document.addEventListener('click', (e) => {
    const trigger = document.getElementById('system-menu-trigger');
    const dropdown = document.getElementById('system-dropdown');
    
    if (trigger && dropdown) {
      if (trigger.contains(e.target)) {
        dropdown.classList.toggle('show');
      } else {
        dropdown.classList.remove('show');
      }
    }
  });

  // Top Menu Time Clock updater
  const clockEl = document.getElementById('clock-display');
  if (clockEl) {
    const updateTime = () => {
      const now = new Date();
      const options = { weekday: 'short', hour: '2-digit', minute: '2-digit' };
      clockEl.textContent = now.toLocaleDateString('en-US', options);
    };
    updateTime();
    setInterval(updateTime, 60000);
  }
});
