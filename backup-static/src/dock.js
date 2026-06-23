/*
  Dock Module - Desktop Portfolio OS
  Handles macOS-style bottom dock hover zoom (magnification) and window status indicators.
*/

import { openWindow } from './desktop.js';

export class DockManager {
  constructor() {
    this.dockGlass = document.querySelector('.dock-glass');
    this.dockItems = document.querySelectorAll('.dock-item[data-window]');
    this.trash = document.getElementById('dock-trash');

    if (!this.dockGlass) return;

    this.initHoverZoom();
    this.initClickHandlers();
    this.initWindowSync();
  }

  initHoverZoom() {
    // macOS Dock Magnification physics simulation
    const maxScale = 1.35;
    const maxDistance = 90; // distance in px where zoom begins to apply

    const handleMouseMove = (e) => {
      if (window.innerWidth <= 768) {
        // Disable magnification on mobile screens
        this.resetZoom();
        return;
      }

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      this.dockItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        
        // Calculate distance from center of dock item to mouse pointer
        const itemCenterX = rect.left + rect.width / 2;
        const itemCenterY = rect.top + rect.height / 2;
        const dist = Math.sqrt(Math.pow(mouseX - itemCenterX, 2) + Math.pow(mouseY - itemCenterY, 2));

        if (dist < maxDistance) {
          // Scale grows exponentially closer to center
          const scaleFactor = 1 + (maxScale - 1) * (1 - dist / maxDistance);
          item.style.transform = `scale(${scaleFactor}) translateY(-${(scaleFactor - 1) * 12}px)`;
          item.style.margin = `0 ${(scaleFactor - 1) * 6}px`;
        } else {
          item.style.transform = '';
          item.style.margin = '';
        }
      });

      // Include trash bin in scaling
      if (this.trash) {
        const trashRect = this.trash.getBoundingClientRect();
        const trashCenterX = trashRect.left + trashRect.width / 2;
        const trashCenterY = trashRect.top + trashRect.height / 2;
        const trashDist = Math.sqrt(Math.pow(mouseX - trashCenterX, 2) + Math.pow(mouseY - trashCenterY, 2));

        if (trashDist < maxDistance) {
          const trashScale = 1 + (maxScale - 1) * (1 - trashDist / maxDistance);
          this.trash.style.transform = `scale(${trashScale}) translateY(-${(trashScale - 1) * 12}px)`;
          this.trash.style.margin = `0 ${(trashScale - 1) * 6}px`;
        } else {
          this.trash.style.transform = '';
          this.trash.style.margin = '';
        }
      }
    };

    this.dockGlass.addEventListener('mousemove', handleMouseMove);
    this.dockGlass.addEventListener('mouseleave', () => this.resetZoom());
  }

  resetZoom() {
    this.dockItems.forEach(item => {
      item.style.transform = '';
      item.style.margin = '';
    });
    if (this.trash) {
      this.trash.style.transform = '';
      this.trash.style.margin = '';
    }
  }

  initClickHandlers() {
    this.dockItems.forEach(item => {
      item.addEventListener('click', () => {
        const windowId = item.getAttribute('data-window');
        if (!windowId) return;

        // Visual bounce animation on launch
        item.classList.add('bouncing');
        setTimeout(() => item.classList.remove('bouncing'), 800);

        openWindow(windowId);
      });
    });

    if (this.trash) {
      this.trash.addEventListener('click', () => {
        // Bounce trash icon and show system confirmation / empty trash
        this.trash.classList.add('bouncing');
        setTimeout(() => this.trash.classList.remove('bouncing'), 800);
        
        // Simulating clearing sticky notes / localstorage on double click
        const notes = document.querySelectorAll('.sticky-note-el');
        if (notes.length > 0) {
          if (confirm("Do you want to clear all desktop sticky notes?")) {
            localStorage.removeItem('aditya-os-sticky-notes');
            notes.forEach(note => {
              note.style.transform = 'scale(0.8)';
              note.style.opacity = '0';
              setTimeout(() => note.remove(), 200);
            });
          }
        } else {
          alert("Trash is empty!");
        }
      });
    }
  }

  initWindowSync() {
    // Listen to Window Manager updates to toggle active indicators
    window.addEventListener('windowstatechange', (e) => {
      const activeWindows = e.detail.windows;

      this.dockItems.forEach(item => {
        const windowId = item.getAttribute('data-window');
        const runningWindow = activeWindows.find(w => w.id === windowId);

        if (runningWindow) {
          item.classList.add('running');
          
          // Optionally add dim/glow state if minimized
          if (runningWindow.isMinimized) {
            item.style.opacity = '0.65';
          } else {
            item.style.opacity = '1';
          }
        } else {
          item.classList.remove('running');
          item.style.opacity = '1';
        }
      });
    });
  }
}

// Global bounce animation style injection
const style = document.createElement('style');
style.textContent = `
  @keyframes dockBounce {
    0%, 100% { transform: translateY(0) scale(1); }
    30% { transform: translateY(-16px) scale(1.1); }
    50% { transform: translateY(0) scale(0.95); }
    70% { transform: translateY(-8px) scale(1.03); }
    85% { transform: translateY(0) scale(0.98); }
  }
  .dock-item.bouncing {
    animation: dockBounce 0.8s ease;
  }
`;
document.head.appendChild(style);

// Bootstrap on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  new DockManager();
});
