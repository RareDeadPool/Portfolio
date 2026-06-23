/*
  Window Manager Module - Desktop Portfolio OS
  Handles dragging, resizing, active focus, minimize, maximize, and close events.
*/

export class WindowManager {
  constructor() {
    this.windows = new Map();
    this.activeWindow = null;
    this.baseZIndex = 100;
    this.topZIndex = 100;
    
    // Bind events
    document.addEventListener('mousedown', (e) => this.handleGlobalMouseDown(e));
    document.addEventListener('touchstart', (e) => this.handleGlobalMouseDown(e), { passive: true });
    window.addEventListener('resize', () => this.handleViewportResize());
  }

  createWindow(id, title, contentHTML) {
    if (this.windows.has(id)) {
      this.restoreWindow(id);
      return this.windows.get(id).element;
    }

    // Create window elements
    const win = document.createElement('div');
    win.id = `win-${id}`;
    win.className = 'window';
    win.style.width = '640px';
    win.style.height = '420px';
    
    // Position window with slight offset so they don't stack perfectly over each other
    const count = this.windows.size;
    const offset = 30 * (count % 6);
    const startLeft = Math.max(40, Math.min(window.innerWidth - 680, 100 + offset));
    const startTop = Math.max(60, Math.min(window.innerHeight - 480, 80 + offset));
    
    win.style.left = `${startLeft}px`;
    win.style.top = `${startTop}px`;

    // Titlebar
    const titlebar = document.createElement('div');
    titlebar.className = 'window-titlebar';
    titlebar.innerHTML = `
      <div class="window-controls">
        <div class="control-circle ctrl-close" data-win-id="${id}" title="Close"></div>
        <div class="control-circle ctrl-minimize" data-win-id="${id}" title="Minimize"></div>
        <div class="control-circle ctrl-maximize" data-win-id="${id}" title="Maximize"></div>
      </div>
      <div class="window-title">${title}</div>
      <div class="window-drag-spacer"></div>
    `;

    // Content container
    const content = document.createElement('div');
    content.className = 'window-content';
    content.innerHTML = contentHTML;

    // Resizer handle
    const resizer = document.createElement('div');
    resizer.className = 'window-resizer';

    // Assemble window
    win.appendChild(titlebar);
    win.appendChild(content);
    win.appendChild(resizer);

    // Append to canvas
    const canvas = document.getElementById('desktop-canvas');
    canvas.appendChild(win);

    const windowData = {
      element: win,
      id: id,
      title: title,
      isMaximized: false,
      isMinimized: false,
      prevWidth: '640px',
      prevHeight: '420px',
      prevLeft: `${startLeft}px`,
      prevTop: `${startTop}px`
    };

    this.windows.set(id, windowData);

    // Make window open with slide/fade animation
    setTimeout(() => {
      win.classList.add('open');
      this.focusWindow(id);
    }, 10);

    // Setup window controls listeners
    titlebar.querySelector('.ctrl-close').addEventListener('click', () => this.closeWindow(id));
    titlebar.querySelector('.ctrl-minimize').addEventListener('click', () => this.minimizeWindow(id));
    titlebar.querySelector('.ctrl-maximize').addEventListener('click', () => this.maximizeWindow(id));

    // Dragging setup
    this.setupDragging(win, titlebar, id);

    // Resizing setup
    this.setupResizing(win, resizer, id);

    // Trigger custom events or external hooks (e.g. updating dock indicators)
    this.triggerWindowCountChange();

    return win;
  }

  focusWindow(id) {
    const winData = this.windows.get(id);
    if (!winData || winData.isMinimized) return;

    if (this.activeWindow === id) return;

    // Remove active class from previous window
    if (this.activeWindow) {
      const prevWin = this.windows.get(this.activeWindow);
      if (prevWin) {
        prevWin.element.classList.remove('active');
      }
    }

    // Set new active window
    this.activeWindow = id;
    this.topZIndex += 1;
    winData.element.style.zIndex = this.topZIndex;
    winData.element.classList.add('active');

    // Update active application indicator in top menu bar
    const activeDisplay = document.getElementById('active-app-display');
    if (activeDisplay) {
      activeDisplay.textContent = winData.title;
    }
  }

  closeWindow(id) {
    const winData = this.windows.get(id);
    if (!winData) return;

    winData.element.classList.remove('open');
    
    // Wait for fade animation, then remove
    setTimeout(() => {
      winData.element.remove();
      this.windows.delete(id);
      
      // Auto focus next window
      if (this.activeWindow === id) {
        this.activeWindow = null;
        let nextFocusId = null;
        let maxZ = 0;
        
        this.windows.forEach((w, key) => {
          if (!w.isMinimized && parseInt(w.element.style.zIndex) > maxZ) {
            maxZ = parseInt(w.element.style.zIndex);
            nextFocusId = key;
          }
        });
        
        if (nextFocusId) {
          this.focusWindow(nextFocusId);
        } else {
          const activeDisplay = document.getElementById('active-app-display');
          if (activeDisplay) {
            activeDisplay.textContent = 'Finder';
          }
        }
      }
      this.triggerWindowCountChange();
    }, 200);
  }

  minimizeWindow(id) {
    const winData = this.windows.get(id);
    if (!winData) return;

    winData.isMinimized = true;
    winData.element.classList.remove('open');
    winData.element.classList.remove('active');

    // Lose focus
    if (this.activeWindow === id) {
      this.activeWindow = null;
      let nextFocusId = null;
      let maxZ = 0;
      
      this.windows.forEach((w, key) => {
        if (!w.isMinimized && parseInt(w.element.style.zIndex) > maxZ) {
          maxZ = parseInt(w.element.style.zIndex);
          nextFocusId = key;
        }
      });
      
      if (nextFocusId) {
        this.focusWindow(nextFocusId);
      } else {
        const activeDisplay = document.getElementById('active-app-display');
        if (activeDisplay) {
          activeDisplay.textContent = 'Finder';
        }
      }
    }

    this.triggerWindowCountChange();
  }

  restoreWindow(id) {
    const winData = this.windows.get(id);
    if (!winData) return;

    if (winData.isMinimized) {
      winData.isMinimized = false;
      winData.element.classList.add('open');
    }

    this.focusWindow(id);
    this.triggerWindowCountChange();
  }

  maximizeWindow(id) {
    const winData = this.windows.get(id);
    if (!winData || winData.isMinimized) return;

    this.focusWindow(id);

    if (winData.isMaximized) {
      // Restore previous size
      winData.element.style.width = winData.prevWidth;
      winData.element.style.height = winData.prevHeight;
      winData.element.style.left = winData.prevLeft;
      winData.element.style.top = winData.prevTop;
      winData.element.style.borderRadius = '';
      winData.isMaximized = false;
    } else {
      // Save current layout to restore later
      winData.prevWidth = winData.element.style.width;
      winData.prevHeight = winData.element.style.height;
      winData.prevLeft = winData.element.style.left;
      winData.prevTop = winData.element.style.top;

      // Maximize to full height of desktop area minus menu/dock
      winData.element.style.width = '100%';
      winData.element.style.height = '100%';
      winData.element.style.left = '0';
      winData.element.style.top = '0';
      winData.element.style.borderRadius = '0';
      winData.isMaximized = true;
    }
  }

  setupDragging(win, titlebar, id) {
    let startX = 0, startY = 0, startLeft = 0, startTop = 0;
    let isDragging = false;

    const dragStart = (e) => {
      const winData = this.windows.get(id);
      if (winData && winData.isMaximized) return;

      this.focusWindow(id);

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      startX = clientX;
      startY = clientY;
      startLeft = parseInt(win.style.left, 10) || 0;
      startTop = parseInt(win.style.top, 10) || 0;
      isDragging = true;

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

      // Restrict out-of-bounds (Keep at least 100px width/50px height visible in top/left bounds)
      const menuHeight = 32;
      newLeft = Math.max(-win.offsetWidth + 100, Math.min(window.innerWidth - 100, newLeft));
      newTop = Math.max(menuHeight, Math.min(window.innerHeight - 80, newTop));

      win.style.left = `${newLeft}px`;
      win.style.top = `${newTop}px`;
    };

    const dragEnd = () => {
      isDragging = false;
      document.removeEventListener('mousemove', dragMove);
      document.removeEventListener('mouseup', dragEnd);
      document.removeEventListener('touchmove', dragMove);
      document.removeEventListener('touchend', dragEnd);
    };

    titlebar.addEventListener('mousedown', dragStart);
    titlebar.addEventListener('touchstart', dragStart, { passive: true });
  }

  setupResizing(win, resizer, id) {
    let startX = 0, startY = 0, startWidth = 0, startHeight = 0;
    let isResizing = false;

    const resizeStart = (e) => {
      const winData = this.windows.get(id);
      if (winData && winData.isMaximized) return;

      this.focusWindow(id);
      e.stopPropagation(); // Stop drag event triggering from titlebar overlay if any

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      startX = clientX;
      startY = clientY;
      startWidth = parseInt(win.offsetWidth, 10);
      startHeight = parseInt(win.offsetHeight, 10);
      isResizing = true;

      document.addEventListener('mousemove', resizeMove);
      document.addEventListener('mouseup', resizeEnd);
      document.addEventListener('touchmove', resizeMove, { passive: false });
      document.addEventListener('touchend', resizeEnd);
    };

    const resizeMove = (e) => {
      if (!isResizing) return;
      if (e.cancelable) e.preventDefault();

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      const dx = clientX - startX;
      const dy = clientY - startY;

      const newWidth = Math.max(320, startWidth + dx);
      const newHeight = Math.max(220, startHeight + dy);

      win.style.width = `${newWidth}px`;
      win.style.height = `${newHeight}px`;
    };

    const resizeEnd = () => {
      isResizing = false;
      document.removeEventListener('mousemove', resizeMove);
      document.removeEventListener('mouseup', resizeEnd);
      document.removeEventListener('touchmove', resizeMove);
      document.removeEventListener('touchend', resizeEnd);
    };

    resizer.addEventListener('mousedown', resizeStart);
    resizer.addEventListener('touchstart', resizeStart, { passive: true });
  }

  handleGlobalMouseDown(e) {
    // Check if clicked element or parent is a window
    const winEl = e.target.closest('.window');
    if (winEl) {
      const id = winEl.id.replace('win-', '');
      this.focusWindow(id);
    }
  }

  handleViewportResize() {
    // Restrict maximized/open windows to fit inside container
    this.windows.forEach((winData) => {
      if (winData.isMaximized) {
        // Update maximized dimensions
        winData.element.style.width = '100%';
        winData.element.style.height = '100%';
      } else {
        // Adjust normal window positions if window bounds fall off-screen entirely
        let left = parseInt(winData.element.style.left, 10);
        let top = parseInt(winData.element.style.top, 10);
        
        left = Math.min(left, window.innerWidth - 100);
        top = Math.min(top, window.innerHeight - 120);
        
        winData.element.style.left = `${Math.max(10, left)}px`;
        winData.element.style.top = `${Math.max(40, top)}px`;
      }
    });
  }

  resetAllLayouts() {
    let index = 0;
    this.windows.forEach((winData, id) => {
      if (winData.isMinimized) {
        this.restoreWindow(id);
      }
      winData.isMaximized = false;
      winData.element.classList.add('open');
      winData.element.style.borderRadius = '';
      
      const offset = 30 * (index % 6);
      const startLeft = 100 + offset;
      const startTop = 80 + offset;
      
      winData.element.style.width = '640px';
      winData.element.style.height = '420px';
      winData.element.style.left = `${startLeft}px`;
      winData.element.style.top = `${startTop}px`;
      
      this.focusWindow(id);
      index++;
    });
  }

  triggerWindowCountChange() {
    // Broadcast window states to update dock dots and list counts
    const event = new CustomEvent('windowstatechange', {
      detail: {
        windows: Array.from(this.windows.entries()).map(([key, value]) => ({
          id: key,
          isMinimized: value.isMinimized,
          isMaximized: value.isMaximized,
          title: value.title
        }))
      }
    });
    window.dispatchEvent(event);
  }
}

// Singleton reference
export const winManager = new WindowManager();
window.winManager = winManager; // globally accessible wrapper
