/*
  Spotlight Search Module - Desktop Portfolio OS
  Handles keyboard shortcut overlays (Ctrl/Cmd + K), results listing, and launching shortcuts.
*/

import { openWindow } from './desktop.js';

class SpotlightSearch {
  constructor() {
    this.modal = document.getElementById('search-modal');
    this.input = document.getElementById('search-input');
    this.resultsList = document.getElementById('search-results-list');
    this.triggerBtn = document.getElementById('search-trigger-btn');
    
    this.searchIndex = this.buildSearchIndex();
    this.selectedIndex = -1;
    this.currentResults = [];

    if (!this.modal) return;

    this.initEvents();
  }

  buildSearchIndex() {
    return [
      { id: 'about', title: 'About Me.txt', path: 'Applications / About Me', type: 'file', icon: 'user' },
      { id: 'projects', title: 'My Projects', path: 'Applications / Projects Folder', type: 'folder', icon: 'folder-git-2' },
      { id: 'terminal', title: 'Terminal.app', path: 'Applications / System Shell', type: 'app', icon: 'terminal' },
      { id: 'contact', title: 'Contact.mail', path: 'Applications / Contact Form', type: 'file', icon: 'mail' },
      
      // Projects
      { id: 'project-cityscan', title: 'CityScan.app (Smart City Monitor)', path: 'Projects / CityScan', type: 'project', icon: 'folder' },
      { id: 'project-dataviz', title: 'DataViz.3D (Interactive WebGL)', path: 'Projects / DataViz', type: 'project', icon: 'folder' },
      { id: 'project-baatcheet', title: 'BaatCheet.chat (Real-time Messaging)', path: 'Projects / BaatCheet', type: 'project', icon: 'folder' },
      { id: 'project-shivner', title: 'Shivner.api (Logistics Routing)', path: 'Projects / Shivner', type: 'project', icon: 'folder' },

      // Terminal Quick Actions
      { id: 'cmd-neofetch', title: 'Run Terminal: neofetch', path: 'Terminal Commands', type: 'cmd', icon: 'play' },
      { id: 'cmd-help', title: 'Run Terminal: help', path: 'Terminal Commands', type: 'cmd', icon: 'play' },
      { id: 'cmd-theme', title: 'Run Terminal: theme', path: 'Terminal Commands', type: 'cmd', icon: 'play' }
    ];
  }

  initEvents() {
    // Ctrl + K / Cmd + K to open search modal
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        this.toggleSearch();
      }
    });

    if (this.triggerBtn) {
      this.triggerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleSearch();
      });
    }

    // Input events
    this.input.addEventListener('input', () => this.handleSearchQuery());
    this.input.addEventListener('keydown', (e) => this.handleKeyboardNav(e));

    // Close on click outside search container
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.closeSearch();
      }
    });
  }

  toggleSearch() {
    if (this.modal.classList.contains('show')) {
      this.closeSearch();
    } else {
      this.openSearch();
    }
  }

  openSearch() {
    this.modal.classList.add('show');
    this.input.value = '';
    this.selectedIndex = -1;
    this.handleSearchQuery(); // populate defaults
    setTimeout(() => this.input.focus(), 50);
  }

  closeSearch() {
    this.modal.classList.remove('show');
    this.input.blur();
  }

  handleSearchQuery() {
    const query = this.input.value.trim().toLowerCase();
    
    if (query === '') {
      // Show default applications
      this.currentResults = this.searchIndex.slice(0, 4);
    } else {
      // Simple text filter
      this.currentResults = this.searchIndex.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.path.toLowerCase().includes(query)
      );
    }

    this.selectedIndex = this.currentResults.length > 0 ? 0 : -1;
    this.renderResults();
  }

  renderResults() {
    this.resultsList.innerHTML = '';

    if (this.currentResults.length === 0) {
      this.resultsList.innerHTML = `
        <div style="padding: 16px; text-align: center; color: var(--outline); font-size: 13px;">
          No items found matching search terms.
        </div>
      `;
      return;
    }

    this.currentResults.forEach((item, index) => {
      const isSelected = index === this.selectedIndex;
      const itemEl = document.createElement('div');
      itemEl.className = `search-result-item ${isSelected ? 'selected' : ''}`;
      
      itemEl.innerHTML = `
        <div class="search-result-icon">
          <i data-lucide="${item.icon}" style="width: 16px; height: 16px;"></i>
        </div>
        <div class="search-result-info">
          <span class="search-result-title">${item.title}</span>
          <span class="search-result-path">${item.path}</span>
        </div>
      `;

      itemEl.addEventListener('click', () => this.executeItem(item));
      this.resultsList.appendChild(itemEl);
    });

    // Re-bind Lucide icons for results
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  handleKeyboardNav(e) {
    if (this.currentResults.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.selectedIndex = (this.selectedIndex + 1) % this.currentResults.length;
      this.renderResults();
      this.scrollToSelected();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.selectedIndex = (this.selectedIndex - 1 + this.currentResults.length) % this.currentResults.length;
      this.renderResults();
      this.scrollToSelected();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (this.selectedIndex >= 0 && this.selectedIndex < this.currentResults.length) {
        this.executeItem(this.currentResults[this.selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      this.closeSearch();
    }
  }

  scrollToSelected() {
    const selectedEl = this.resultsList.querySelector('.search-result-item.selected');
    if (selectedEl) {
      selectedEl.scrollIntoView({ block: 'nearest' });
    }
  }

  executeItem(item) {
    this.closeSearch();

    if (item.type === 'file' || item.type === 'folder' || item.type === 'app') {
      openWindow(item.id);
    } else if (item.type === 'project') {
      // Extract project key and trigger custom event
      const projectId = item.id.replace('project-', '');
      openWindow('projects');
      setTimeout(() => {
        const event = new CustomEvent('openproject', { detail: { id: projectId } });
        window.dispatchEvent(event);
      }, 300);
    } else if (item.type === 'cmd') {
      const command = item.id.replace('cmd-', '');
      openWindow('terminal');
      setTimeout(() => {
        const event = new CustomEvent('runcommand', { detail: { command } });
        window.dispatchEvent(event);
      }, 300);
    }
  }
}

// Bootstrap on DOM load
document.addEventListener('DOMContentLoaded', () => {
  new SpotlightSearch();
});
