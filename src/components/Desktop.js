'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, Download, Share2, Star, Cpu, Terminal as TermIcon, FileText, Play, Search, FolderGit2, CheckCircle, ExternalLink, Award, Sun, Moon, Rocket, ArrowUpRight, Palette, Trophy, Eye } from 'lucide-react';
import Window from './Window';
import Folder from './Folder';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(Draggable);
}
import AnalogClock from './AnalogClock';
import Dock from './Dock';
import SearchModal from './SearchModal';
import LiquidFluid from './LiquidFluid';
import StickyNote from './StickyNote';
import Terminal from './Terminal';
import ProjectsFolder from './ProjectsFolder';
import ProjectDetail from './ProjectDetail';
import ProjectCaseStudy from './ProjectCaseStudy';
import PlaygroundPage from './PlaygroundPage';
import OtherProjectsPage from './OtherProjectsPage';
import ResumePage from './ResumePage';
import AboutPage from './AboutPage';
import EducationPage from './EducationPage';
import ExperiencePage from './ExperiencePage';
import SkillsPage from './SkillsPage';
import AchievementsPage from './AchievementsPage';
import MobileOS from './MobileOS';


// Custom inline SVG for Github icon since brand icons are deprecated/removed from lucide-react
function Github({ className }) {
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

// Custom inline SVG for Linkedin icon since brand icons are deprecated/removed from lucide-react
function Linkedin({ className }) {
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
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function GoogleIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </svg>
  );
}

// Project screens configurations (Peeking card mockups)
const CITYSCAN_SCREENS = [
  '/projects/cityscan.png'
];

const DATAVIZ_SCREENS = [
  '/projects/dataviz.png'
];

const BAATCHEET_SCREENS = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBe-2GX2sIGZ_wjYCOxmLCjO0LJJ_Xgz1RwinplB9FchJk3e495uQ95nE9kOLxa6ArSxvrgxErRHclU0gz8pa7a6VaInyt0BSuxEjxKQwukZSYN0yCxIqdrx3SV3qp6TXTwlW5A2467adchpaKtR35VtH5aro8B_i7u4I5_-4Td_8fwQFUnL3k_dQHW8iGGCtuzVAMN1R3kvzdi2nCoX-4sM6rU1ItaajZ6WoT33CXeA_gPZZOJIyVQHCIeeFT-4fcpTdeeP5Ef2IsF',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCe-RgVZfkKGHbL0-QSbhuq4pkSWYfNTM6kLsXs8o2XU9CvGCDbk75lUt2IoWvke6S4zaBQXEXt_V-pTByr7XxAdgjXtfCpgotf1_YYQjGcl9QXRXxBO7vMV9azl4iXiZ09KueX_tPeRZv2ahjv2r9PBXdKE0d5c_gxvBk54q83YfPM_lkCCLbcjTxU6D6PBVWWJMD1laGKVp33oZXunR4UuRtRDaaw6DZ2D2qg7dY5z0gTHCroA7jtxvXLE97ChZPG0hG9BECBbITH',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDv60BAREN245TSya9mgSXW87HXEEbUmkLLAGFxz9j0uIktPX1-BBawXHG3p2E8fdeFV8BdRe6_grkv9_SZcUastJHtJ0GqIw_83s1Idy3dLgjUoEPy8_AD_ycJ3yL5TMvn7Hi1LkEgvugd4WtoSBaX9IvraOTeFm6Ni3Ts1ucrhNKcus4dEiuzVo6pJQDmoEt3YYSS6NDHAlOEnfZcojtEIH-bwff6Ke2VQAIMNi2LfcZ3xPSrllitpYuwMSYlRwUVcVOdWv64wRmG'
];

const SHIVNER_SCREENS = [
  '/projects/shivner.png'
];

// Project Preview Panel Configuration
const PREVIEW_DATA = {
  cityscan: {
    title: 'CityScan.app',
    subtitle: 'AI Infrastructure Damage Detection',
    desc: 'AI-powered mobile app for detecting infrastructure damage using Flutter, YOLOv8, TFLite, GPS tagging, and report generation.',
    chips: ['Flutter', 'YOLOv8', 'TFLite', 'GPS', 'PDF Reports'],
    accentColor: 'var(--project-cityscan)',
    id: 'cityscan'
  },
  dataviz: {
    title: 'DataViz.app',
    subtitle: 'Interactive High-Dimensional Particle System',
    desc: 'An interactive 3D WebGL particle system visualizing massive relational datasets at 60fps using custom GLSL shaders and force-directed node physics.',
    chips: ['WebGL', 'Three.js', 'GLSL Shaders', 'Web Audio API', 'React'],
    accentColor: 'var(--project-dataviz)',
    id: 'dataviz'
  },
  baatcheet: {
    title: 'Baatcheet.chat',
    subtitle: 'Real-time Collaborative Channel Workspace',
    desc: 'A collaborative real-time message board engine leveraging WebSockets, Redis adapters, caching channels, and MongoDB message storage.',
    chips: ['React', 'Next.js', 'Socket.io', 'Redis', 'MongoDB', 'Tailwind'],
    accentColor: 'var(--project-baatcheet)',
    id: 'baatcheet'
  },
  shivner: {
    title: 'Shivner.api',
    subtitle: 'High-Performance Logistics Routing Engine',
    desc: 'A high-throughput routing engine utilizing custom graph algorithms to calculate dynamic fleet transit maps under live traffic density.',
    chips: ['Go', 'Rust', 'gRPC', 'PostgreSQL', 'Redis', 'Docker'],
    accentColor: 'var(--project-shivner)',
    id: 'shivner'
  },
  projects: {
    title: 'Other Projects',
    subtitle: 'Creative Code & Open Source Utilities',
    desc: 'An explorer directory compiling minor tools, backend API blueprints, microservices setups, and open-source scripts built during my workspace hacking.',
    chips: ['Go API', 'Python CLI', 'Vite', 'Docker Compose', 'GitHub Actions'],
    accentColor: '#818cf8',
    id: 'projects'
  },
  resume: {
    title: 'Resume.pdf',
    subtitle: 'Professional Background & Accreditations',
    desc: 'Downloadable PDF resume summarising academic credentials, core technical skillsets, and organizational roles (GDG Web Dev Core Member).',
    chips: ['Aditya_Sawant_Resume.pdf', 'PDF', 'Downloadable'],
    accentColor: '#ef4444',
    id: 'resume'
  },
  playground: {
    title: 'Developer Playground',
    subtitle: 'Mini Experiments & Sandbox',
    desc: 'An experimental sandbox environment isolating small web app bundles, custom styling, developer tools, and responsive components.',
    chips: ['React', 'Next.js', 'Tailwind', 'Dynamic Imports'],
    accentColor: '#a855f7',
    id: 'playground'
  }
};

export default function Desktop() {
  const [windows, setWindows] = useState(new Map());
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [topZIndex, setTopZIndex] = useState(100);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState('1'); // '1', '2', '3', 'dark'
  const theme = 'dark';
  const [stickyNotes, setStickyNotes] = useState([]);
  const [toast, setToast] = useState('');
  const [hiddenFolders, setHiddenFolders] = useState([]);
  const [transparentDeadpool, setTransparentDeadpool] = useState('');

  // Dynamically remove white background from the Deadpool logo image
  useEffect(() => {
    const img = new Image();
    img.src = '/deadpool.png';
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        // If pixel is white or very close to white
        if (r > 240 && g > 240 && b > 240) {
          data[i + 3] = 0; // set alpha to 0
        }
      }
      ctx.putImageData(imgData, 0, 0);
      setTransparentDeadpool(canvas.toDataURL());
    };
  }, []);

  const handleRemoveFolder = (id) => {
    setHiddenFolders(prev => [...prev, id]);
    showToastMsg(`Shortcut removed. Run 'restore' in Terminal to reset desktop.`);
  };

  const dragTargetsRef = useRef([]);
  dragTargetsRef.current = [];
  const addToDragTargets = (el) => {
    if (el && !dragTargetsRef.current.includes(el)) {
      dragTargetsRef.current.push(el);
    }
  };

  // Custom folder colors state with persistence
  const [folderColors, setFolderColors] = useState({
    cityscan: 'yellow',
    dataviz: 'yellow',
    baatcheet: 'yellow',
    shivner: 'yellow',
    projects: 'yellow'
  });

  // Active Project Preview state
  const [previewId, setPreviewId] = useState('cityscan');
  const [hoveredCustom, setHoveredCustom] = useState(null); // 'projects' | 'resume' | 'playground' | null

  // Interactive googly eyes tracking coordinates refs
  const eyeLeftRef = useRef(null);
  const eyeRightRef = useRef(null);
  const milestoneEyeLeftRef = useRef(null);
  const milestoneEyeRightRef = useRef(null);
  const greetingNoteRef = useRef(null);



  // Load folder colors and theme on mount
  useEffect(() => {
    const savedColors = localStorage.getItem('aditya-os-folder-colors');
    if (savedColors) {
      try {
        setFolderColors(JSON.parse(savedColors));
      } catch (e) {
        console.error(e);
      }
    }
    // Dark theme default on mount
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
    document.body.classList.remove('light-theme');
    localStorage.setItem('aditya-portfolio-theme', 'dark');
  }, []);

  const handleFolderColorChange = (id, newColor) => {
    setFolderColors(prev => {
      const updated = { ...prev, [id]: newColor };
      localStorage.setItem('aditya-os-folder-colors', JSON.stringify(updated));
      return updated;
    });
    showToastMsg(`Folder "${id}" color changed to ${newColor}!`);
  };

  // Initialize and load persistent elements
  useEffect(() => {
    // Welcome default windows load
    setTimeout(() => {
      openWindow('about');
    }, 800);

    // Initial sticky notes setup
    const stored = localStorage.getItem('aditya-os-sticky-notes-react-v2');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const checked = parsed.filter(n => n.id !== 'note-welcome');
        setStickyNotes(checked);
        localStorage.setItem('aditya-os-sticky-notes-react-v2', JSON.stringify(checked));
      } catch (e) {
        console.error(e);
      }
    } else {
      setStickyNotes([]);
    }

    // Googly eyes tracking event listener
    const handleMouseMove = (e) => {
      const mx = e.clientX;
      const my = e.clientY;

      [eyeLeftRef, eyeRightRef, milestoneEyeLeftRef, milestoneEyeRightRef].forEach(ref => {
        const el = ref.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        const angle = Math.atan2(my - cy, mx - cx);

        // Translate pupil: max 4px for header, max 2px for small milestone eyes
        const isSmall = el.getAttribute('data-eye-size') === 'small';
        const limit = isSmall ? 2 : 4;
        const tx = Math.cos(angle) * limit;
        const ty = Math.sin(angle) * limit;

        const pupil = el.querySelector('.pupil');
        if (pupil) {
          pupil.style.transform = `translate(${tx}px, ${ty}px)`;
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Command listener to update themes from inside the terminal
    const handleCommandTheme = (e) => {
      if (e.detail.command === 'theme') {
        const arg = e.detail.args && e.detail.args[0] ? e.detail.args[0] : '1';
        if (arg !== 'light' && arg !== 'dark') {
          setActiveTheme(arg);
        }
      }
    };
    window.addEventListener('themechange', handleCommandTheme);

    // Listen to Spotlight search launching applications
    const handleSpotlightLaunch = (e) => {
      const item = e.detail.item;
      handleLaunchItem(item);
    };
    window.addEventListener('spotlightlaunch', handleSpotlightLaunch);

    // Listen to custom Resume download trigger
    const handleDownloadResumeTrigger = () => {
      downloadResumePDF();
    };
    window.addEventListener('downloadresume', handleDownloadResumeTrigger);

    // Global Ctrl+K / Cmd+K listener
    const handleGlobalKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('themechange', handleCommandTheme);
      window.removeEventListener('spotlightlaunch', handleSpotlightLaunch);
      window.removeEventListener('downloadresume', handleDownloadResumeTrigger);
      window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, []);

  // Initialize draggable greeting sticky note
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (greetingNoteRef.current) {
      const dragInstances = Draggable.create(greetingNoteRef.current, {
        type: 'left,top',
        edgeResistance: 0.65,
        bounds: '#desktop-canvas',
      });
      return () => {
        if (dragInstances[0]) {
          dragInstances[0].kill();
        }
      };
    }
  }, []);

  // Initialize draggable folders and shortcuts
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const elements = dragTargetsRef.current;
    let dragInstances = [];
    if (elements.length > 0) {
      dragInstances = Draggable.create(elements, {
        type: 'x,y',
        edgeResistance: 0.65,
        bounds: '#desktop-canvas',
        cancel: '.no-drag, button, a, select, input, textarea',
        onDragStart: function () {
          this.target.style.zIndex = '999';
        },
        onDragEnd: function () {
          this.target.style.zIndex = '';
        }
      });
    }
    return () => {
      dragInstances.forEach(inst => inst.kill());
    };
  }, []);



  // Sync sticky notes state to localStorage
  const saveStickyNotes = (notes) => {
    setStickyNotes(notes);
    localStorage.setItem('aditya-os-sticky-notes-react-v2', JSON.stringify(notes));
  };

  const showToastMsg = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  // Draggable window state handlers
  const openWindow = (id, title = '') => {
    setWindows(prev => {
      const updated = new Map(prev);
      if (updated.has(id)) {
        // Just restore/focus it
        const current = updated.get(id);
        const nextZ = topZIndex + 1;
        setTopZIndex(nextZ);
        updated.set(id, { ...current, isMinimized: false, isActive: true, zIndex: nextZ });
      } else {
        // Create new window state
        let winTitle = title;
        if (!winTitle) {
          if (id === 'about') winTitle = 'About.app';
          if (id === 'education') winTitle = 'Education.app';
          if (id === 'experience') winTitle = 'Experience.app';
          if (id === 'skills') winTitle = 'Skills.app';
          if (id === 'achievements') winTitle = 'Achievements.app';
          if (id === 'playground') winTitle = 'Playground.app';
          if (id === 'resume') winTitle = 'Resume.pdf';
          if (id === 'projects') winTitle = 'Other Projects';
          if (id === 'terminal') winTitle = 'Terminal';
          if (id === 'contact') winTitle = 'Contact.mail';
          if (id === 'cityscan') winTitle = 'CityScan.app';
          if (id === 'dataviz') winTitle = 'DataViz.app';
          if (id === 'baatcheet') winTitle = 'BaatCheet.chat';
          if (id === 'shivner') winTitle = 'Shivner NGO';
          if (id.startsWith('project-detail-')) {
            const projId = id.replace('project-detail-', '');
            winTitle = `${projId.toUpperCase()} Details`;
          }
        }

        const nextZ = topZIndex + 1;
        setTopZIndex(nextZ);
        updated.set(id, {
          id,
          title: winTitle,
          isOpen: true,
          isActive: true,
          isMinimized: false,
          isMaximized: false,
          zIndex: nextZ
        });
      }

      // Mark other windows inactive
      updated.forEach((win, key) => {
        if (key !== id) updated.set(key, { ...win, isActive: false });
      });

      return updated;
    });
  };

  const closeWindow = (id) => {
    setWindows(prev => {
      const updated = new Map(prev);
      updated.delete(id);
      return updated;
    });
  };

  const minimizeWindow = (id) => {
    setWindows(prev => {
      const updated = new Map(prev);
      if (updated.has(id)) {
        updated.set(id, { ...updated.get(id), isMinimized: true, isActive: false });
      }
      return updated;
    });
  };

  const maximizeWindow = (id) => {
    setWindows(prev => {
      const updated = new Map(prev);
      if (updated.has(id)) {
        const current = updated.get(id);
        updated.set(id, { ...current, isMaximized: !current.isMaximized });
      }
      return updated;
    });
  };

  const focusWindow = (id) => {
    setWindows(prev => {
      const updated = new Map(prev);
      if (!updated.has(id)) return prev;

      const current = updated.get(id);
      if (current.isActive) return prev;

      const nextZ = topZIndex + 1;
      setTopZIndex(nextZ);

      updated.forEach((win, key) => {
        if (key === id) {
          updated.set(key, { ...win, isActive: true, zIndex: nextZ });
        } else {
          updated.set(key, { ...win, isActive: false });
        }
      });
      return updated;
    });
  };

  // Sticky Note handlers
  const addStickyNote = () => {
    const notesList = [...stickyNotes];
    const id = `note-${Date.now()}`;
    const x = Math.max(50, Math.min(window.innerWidth - 260, 100 + Math.random() * 250));
    const y = Math.max(100, Math.min(window.innerHeight - 300, 100 + Math.random() * 150));
    const newNote = {
      id,
      x,
      y,
      text: "Double click to edit sticky note text..."
    };
    saveStickyNotes([...notesList, newNote]);
  };

  const updateStickyNoteText = (id, val) => {
    const updated = stickyNotes.map(n => n.id === id ? { ...n, text: val } : n);
    saveStickyNotes(updated);
  };

  const deleteStickyNote = (id) => {
    const filtered = stickyNotes.filter(n => n.id !== id);
    saveStickyNotes(filtered);
  };

  const clearDesktopNotes = () => {
    if (stickyNotes.length > 0) {
      if (confirm("Are you sure you want to clear all desktop sticky notes?")) {
        saveStickyNotes([]);
      }
    }
  };

  const handleLaunchItem = (item) => {
    if (item.type === 'file' || item.type === 'folder' || item.type === 'app' || item.type === 'project' || item.type === 'command') {
      openWindow(item.id);
    } else if (item.type === 'cmd') {
      const command = item.id.replace('cmd-', '');
      openWindow('terminal');
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('runcommand', { detail: { command } }));
      }, 200);
    }
  };

  // Download original resume PDF
  const downloadResumePDF = () => {
    const link = document.createElement('a');
    link.href = '/resume/Aditya%20Sawant%20Resume.pdf';
    link.download = 'Aditya Sawant Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToastMsg('Resume PDF downloaded successfully!');
  };

  // Share link triggers
  const handleShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    showToastMsg('Portfolio URL link copied to clipboard!');
  };

  // Contacts form logic using FormSubmit.co
  const [contactSuccess, setContactSuccess] = useState(false);
  const [isSendingContact, setIsSendingContact] = useState(false);
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSendingContact(true);
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    try {
      const response = await fetch("https://formsubmit.co/ajax/sawantaditya0708@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          message
        })
      });
      if (response.ok) {
        setContactSuccess(true);
      } else {
        alert("Failed to send message. Please try again or email directly.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please try again or email directly.");
    } finally {
      setIsSendingContact(false);
    }
  };

  // Wallpaper glows selection
  let glowClasses = 'glow-1';
  if (activeTheme === '2') {
    glowClasses = 'bg-gradient-to-br from-pink-500/20 via-purple-500/10 to-transparent';
  } else if (activeTheme === '3') {
    glowClasses = 'bg-gradient-to-br from-emerald-500/25 via-cyan-500/10 to-transparent';
  } else if (activeTheme === 'dark') {
    glowClasses = 'opacity-0';
  }

  if (!mounted) {
    return <div className="min-h-screen w-full bg-[#0d0d10]" />;
  }

  if (isMobile) {
    return (
      <MobileOS 
        downloadResumePDF={downloadResumePDF}
        handleContactSubmit={handleContactSubmit}
        contactSuccess={contactSuccess}
        setContactSuccess={setContactSuccess}
      />
    );
  }

  return (
    <div className="flex flex-col flex-1 h-screen w-screen relative overflow-hidden select-none">

      {/* Background configurations */}
      <div className="desktop-dot-grid" />
      <div className="center-purple-glow" />

      {/* Liquid Fluid WebGL Animation Background */}
      <div className="absolute inset-0 pointer-events-none z-0 blur-[32px] opacity-70">
        <LiquidFluid
          BLOOM={true}
          BLOOM_INTENSITY={0.15}
          SUNRAYS={false}
          BRAND_COLOR_INTENSITY={0.15}
          SPLAT_RADIUS={0.12}
          DENSITY_DISSIPATION={1.8}
          AUTOPLAY={false}
        />
      </div>

      {/* SVG Mountain backdrops at the bottom (Matches screenshot 2) */}
      <svg className="mountain-backdrop" viewBox="0 0 1440 250" fill="none" preserveAspectRatio="none">
        <path d="M0 200 L120 160 L320 220 L580 130 L800 210 L1080 140 L1280 220 L1440 180 L1440 250 L0 250 Z" fill="#1b1b1f" opacity="0.4" />
        <path d="M0 220 L220 180 L450 230 L720 150 L950 220 L1150 170 L1440 240 L1440 250 L0 250 Z" fill="#131315" opacity="0.75" />
      </svg>

      {/* Top Header Navigation (Designer portfolio style, Matches screen.png) */}
      <header className="fixed top-0 inset-x-0 h-11 bg-[var(--header-bg)] backdrop-blur-md border-b border-[var(--header-border)] flex items-center justify-between px-6 z-40 select-none text-[var(--header-text)]">
        {/* Left name + Interactive Googly Eyes */}
        <div className="flex items-center gap-3">
          {/* Mockup A. circular icon branding */}
          <img src={transparentDeadpool || '/deadpool.png'} alt="Deadpool" className="w-6 h-6 object-contain flex-shrink-0 select-none" />

          <div className="flex gap-0.5 select-none">
            <div ref={eyeLeftRef} className="w-5 h-5 rounded-full bg-white border border-black/10 flex items-center justify-center relative">
              <div className="pupil w-1.5 h-1.5 rounded-full bg-black absolute" />
            </div>
            <div ref={eyeRightRef} className="w-5 h-5 rounded-full bg-white border border-black/10 flex items-center justify-center relative">
              <div className="pupil w-1.5 h-1.5 rounded-full bg-black absolute" />
            </div>
          </div>
          <span className="font-semibold text-[13px] tracking-wide">
            Aditya Sawant
          </span>
        </div>

        {/* Right action options */}
        <div className="flex items-center gap-3">
          <a href="https://github.com/RareDeadPool" target="_blank" rel="noopener noreferrer" className="w-7 h-7 bg-white/5 border border-white/5 rounded-full flex items-center justify-center text-zinc-400 hover:bg-white/10 hover:text-white transition-all bg-[var(--header-icon-btn)] hover:bg-[var(--header-icon-btn-hover)] border-[var(--glass-border)]">
            <Github className="w-4 h-4" />
          </a>
          <a href="https://www.linkedin.com/in/aditya-sawant-25932527b/" target="_blank" rel="noopener noreferrer" className="w-7 h-7 bg-white/5 border border-white/5 rounded-full flex items-center justify-center text-zinc-400 hover:bg-white/10 hover:text-white transition-all bg-[var(--header-icon-btn)] hover:bg-[var(--header-icon-btn-hover)] border-[var(--glass-border)]">
            <Linkedin className="w-4 h-4" />
          </a>
          <button onClick={() => openWindow('contact')} className="w-7 h-7 bg-white/5 border border-white/5 rounded-full flex items-center justify-center text-zinc-400 hover:bg-white/10 hover:text-white transition-all cursor-pointer bg-[var(--header-icon-btn)] hover:bg-[var(--header-icon-btn-hover)] border-[var(--glass-border)]">
            <Mail className="w-4 h-4" />
          </button>

          <div className="w-[1px] h-4 bg-white/10 mx-1 opacity-50" />

          <button
            onClick={downloadResumePDF}
            className="flex items-center gap-1.5 bg-white/5 border border-white/5 text-zinc-300 font-semibold text-[11px] px-3 py-1 rounded-lg hover:bg-white/10 hover:text-white transition-all cursor-pointer border-[var(--glass-border)]"
          >
            <Download className="w-3.5 h-3.5" /> Get CV
          </button>

          <button
            onClick={handleShareLink}
            className="flex items-center gap-1.5 bg-indigo-500/20 border border-indigo-500/20 text-indigo-300 font-semibold text-[11px] px-3 py-1 rounded-lg hover:bg-indigo-500/35 hover:text-indigo-200 transition-all cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" /> Share
          </button>
        </div>
      </header>

      {/* Main desktop workspace area */}
      <main id="desktop-canvas" className="flex-1 w-full h-full relative z-10 select-none">

        {/* Absolutely Floating Desktop Search Pill */}
        <div className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-lg px-4 z-[99] select-none pointer-events-auto">
          <div
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center border rounded-full h-11 w-full px-4 gap-3 cursor-pointer shadow-lg transition-all duration-300 hover:scale-[1.01] border-[var(--glass-border)] bg-[var(--glass-bg)] justify-between"
          >
            <div className="flex items-center gap-3">
              <Search className="w-4.5 h-4.5 text-zinc-400" />
              <span className="text-[13px] text-zinc-400 font-sans">Search case studies, skills, commands...</span>
            </div>
            <div className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded border border-white/5 text-[10px] text-zinc-400 font-mono select-none">
              <span>⌘</span>
              <span>K</span>
            </div>
          </div>
        </div>

        {/* Desktop Layout Grid (Main grid + widgets sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 h-full px-6 pt-12 pb-4 select-none items-stretch">

          {/* LEFT/CENTER DESKTOP: Aligned vertical columns of apps */}
          <div className="flex-grow flex gap-10 p-2 pt-2 pb-2 z-20 overflow-hidden select-none justify-start items-start">

            {/* Column 1: Identity & System Apps */}
            <div className="flex flex-col gap-3 items-center">
              {!hiddenFolders.includes('about') && (
                <div ref={addToDragTargets} className="draggable-shortcut select-none">
                  <Folder id="about" title="About.app" onDoubleClick={() => openWindow('about')} color="blue" onRemove={() => handleRemoveFolder('about')} />
                </div>
              )}
              {!hiddenFolders.includes('education') && (
                <div ref={addToDragTargets} className="draggable-shortcut select-none">
                  <Folder id="education" title="Education.app" onDoubleClick={() => openWindow('education')} color="purple" onRemove={() => handleRemoveFolder('education')} />
                </div>
              )}
              {!hiddenFolders.includes('experience') && (
                <div ref={addToDragTargets} className="draggable-shortcut select-none">
                  <Folder id="experience" title="Experience.app" onDoubleClick={() => openWindow('experience')} color="indigo" onRemove={() => handleRemoveFolder('experience')} />
                </div>
              )}
              {!hiddenFolders.includes('skills') && (
                <div ref={addToDragTargets} className="draggable-shortcut select-none">
                  <Folder id="skills" title="Skills.app" onDoubleClick={() => openWindow('skills')} color="teal" onRemove={() => handleRemoveFolder('skills')} />
                </div>
              )}
              {!hiddenFolders.includes('achievements') && (
                <div ref={addToDragTargets} className="draggable-shortcut select-none">
                  <Folder id="achievements" title="Achievements.app" onDoubleClick={() => openWindow('achievements')} color="pink" onRemove={() => handleRemoveFolder('achievements')} />
                </div>
              )}
              {!hiddenFolders.includes('playground') && (
                <div ref={addToDragTargets} className="draggable-shortcut select-none">
                  <Folder id="playground" title="Playground.app" onDoubleClick={() => openWindow('playground')} color="purple" onRemove={() => handleRemoveFolder('playground')} />
                </div>
              )}
            </div>

            {/* Column 2: Documents & Projects */}
            <div className="flex flex-col gap-3 items-center">
              {!hiddenFolders.includes('resume') && (
                <div ref={addToDragTargets} className="draggable-shortcut select-none">
                  <Folder id="resume" title="Resume.pdf" onDoubleClick={() => openWindow('resume')} color="dark" onRemove={() => handleRemoveFolder('resume')} />
                </div>
              )}
              {!hiddenFolders.includes('cityscan') && (
                <div ref={addToDragTargets} className="draggable-shortcut select-none">
                  <Folder id="cityscan" title="CityScan.app" accentColor="var(--project-cityscan)" screens={CITYSCAN_SCREENS} onDoubleClick={() => openWindow('cityscan')} color={folderColors.cityscan} onColorChange={handleFolderColorChange} onRemove={() => handleRemoveFolder('cityscan')} />
                </div>
              )}
              {!hiddenFolders.includes('dataviz') && (
                <div ref={addToDragTargets} className="draggable-shortcut select-none">
                  <Folder id="dataviz" title="DataViz.app" accentColor="var(--project-dataviz)" screens={DATAVIZ_SCREENS} onDoubleClick={() => openWindow('dataviz')} color={folderColors.dataviz} onColorChange={handleFolderColorChange} onRemove={() => handleRemoveFolder('dataviz')} />
                </div>
              )}
              {!hiddenFolders.includes('baatcheet') && (
                <div ref={addToDragTargets} className="draggable-shortcut select-none">
                  <Folder id="baatcheet" title="BaatCheet.chat" accentColor="var(--project-baatcheet)" screens={BAATCHEET_SCREENS} onDoubleClick={() => openWindow('baatcheet')} color={folderColors.baatcheet} onColorChange={handleFolderColorChange} onRemove={() => handleRemoveFolder('baatcheet')} />
                </div>
              )}
              {!hiddenFolders.includes('shivner') && (
                <div ref={addToDragTargets} className="draggable-shortcut select-none">
                  <Folder id="shivner" title="Shivner NGO" accentColor="var(--project-shivner)" screens={SHIVNER_SCREENS} onDoubleClick={() => openWindow('shivner')} color={folderColors.shivner} onColorChange={handleFolderColorChange} onRemove={() => handleRemoveFolder('shivner')} />
                </div>
              )}
              {!hiddenFolders.includes('projects') && (
                <div ref={addToDragTargets} className="draggable-shortcut select-none">
                  <Folder id="projects" title="Other Projects" accentColor="#818cf8" onDoubleClick={() => openWindow('projects')} color={folderColors.projects} onColorChange={handleFolderColorChange} onRemove={() => handleRemoveFolder('projects')} />
                </div>
              )}
            </div>

          </div>

          {/* RIGHT SIDEBAR: Stacked Glass Widgets */}
          <motion.aside
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
            className="hidden lg:flex flex-col gap-2.5 w-[340px] flex-shrink-0 z-20 select-none overflow-hidden"
          >
            {/* Clock Widget */}
            <AnalogClock />

            {/* Playground Widget */}
            <div
              onClick={() => openWindow('playground')}
              className="backdrop-blur-2xl border rounded-2xl p-3.5 shadow-2xl cursor-pointer hover:bg-white/10 hover:border-white/15 transition-all duration-300 hover:scale-[1.02] border-[var(--glass-border)] bg-[var(--glass-bg)] flex flex-col gap-2.5 text-left"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Play className="w-4 h-4 text-purple-400 fill-purple-500/10" />
                  <h3 className="font-sans text-[10px] font-bold text-[var(--widget-title)] uppercase tracking-widest leading-none">
                    Motion Playground
                  </h3>
                </div>
                <span className="text-[9px] font-mono font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">Active Lab</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[11.5px] text-[var(--widget-text)] leading-normal font-semibold">
                  Frontend experiments with motion and physics.
                </span>
                <div className="bg-black/45 border border-white/5 rounded-lg p-2 font-mono text-[9.5px] text-zinc-400 flex flex-col gap-1">
                  <span className="text-purple-400 font-bold select-none">&gt; run motion-lab</span>
                  <span className="text-emerald-400 font-bold select-none">Status: Ready to interact</span>
                </div>
              </div>
              <button className="w-full bg-purple-500/15 border border-purple-500/25 hover:bg-purple-500/25 text-purple-300 text-[10px] font-bold py-1.5 rounded-xl transition cursor-pointer select-none">
                Open Playground
              </button>
            </div>

            {/* Tech stack tags widget */}
            <div className="backdrop-blur-2xl border rounded-2xl p-3.5 shadow-2xl transition-all duration-300 hover:scale-[1.02] border-[var(--glass-border)] bg-[var(--glass-bg)]">
              <div className="flex items-center gap-2 mb-1.5">
                <Cpu className="w-4 h-4 text-purple-400" />
                <h3 className="font-sans text-[10px] font-bold text-[var(--widget-title)] uppercase tracking-widest leading-none">
                  Tech Stack
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {['React', 'Next.js', 'TypeScript', 'Flutter', 'Node.js', 'Python', 'Tailwind', 'MongoDB', 'PostgreSQL', 'Figma', 'Vercel'].map(chip => (
                  <span key={chip} className="px-2 py-0.5 rounded-lg text-[9.5px] font-semibold text-[var(--widget-text)] hover:bg-purple-500/20 hover:border-purple-500/30 transition-all cursor-default bg-[var(--card-bg)] border border-[var(--card-border)]">{chip}</span>
                ))}
              </div>
            </div>

            {/* Latest Achievement Widget */}
            <div className="backdrop-blur-2xl border rounded-2xl p-3.5 shadow-2xl relative overflow-hidden transition-all duration-300 hover:scale-[1.02] border-[var(--glass-border)] bg-[var(--glass-bg)] flex flex-col gap-2">
              <div className="absolute -right-8 -top-8 w-24 h-24 bg-yellow-500/5 blur-3xl rounded-full" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-yellow-400" />
                  <h3 className="font-sans text-[10px] font-bold text-[var(--widget-title)] uppercase tracking-widest leading-none">
                    Latest Milestone
                  </h3>
                </div>
                <span className="text-[9px] font-mono font-bold text-yellow-400 bg-yellow-500/10 px-2 py-0.5 rounded border border-yellow-500/20">Active</span>
              </div>
              <div className="flex items-center gap-2.5 text-left">
                <div className="w-9 h-9 rounded-lg border flex items-center justify-center bg-[var(--card-bg)] border-[var(--card-border)] flex-shrink-0 select-none p-1.5">
                  <GoogleIcon className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[12px] text-[var(--widget-header)] font-semibold leading-snug">
                    Became GDG Web-Development Core Member at Amity University
                  </span>
                </div>
              </div>
            </div>

            {/* Get in Touch Widget (Link button, Matches screen.png) */}
            <a
              href="mailto:sawantaditya0708@gmail.com"
              className="backdrop-blur-2xl border rounded-2xl p-3.5 shadow-2xl hover:bg-white/10 hover:border-white/15 cursor-pointer group flex items-center justify-between transition-all duration-300 hover:scale-[1.02] border-[var(--glass-border)] bg-[var(--glass-bg)]"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg border flex items-center justify-center text-[var(--widget-header)] bg-[var(--card-bg)] border-[var(--card-border)]">
                  <Mail className="w-4.5 h-4.5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[9px] font-bold tracking-wider text-[var(--widget-title)] uppercase leading-none">Get in touch</span>
                  <span className="text-[12px] text-[var(--widget-header)] font-semibold mt-1 leading-none hover:underline">sawantaditya0708@gmail.com</span>
                  <span className="text-[10px] text-[var(--widget-title)] mt-0.5 leading-none">Let's build something amazing.</span>
                </div>
              </div>
              <ArrowUpRight className="w-4.5 h-4.5 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
          </motion.aside>

        </div>

        {/* Desktop Sticky Notes rendering (GSAP Draggable component) */}
        {stickyNotes.map(note => (
          <StickyNote
            key={note.id}
            note={note}
            onDelete={() => deleteStickyNote(note.id)}
            onUpdateText={(val) => updateStickyNoteText(note.id, val)}
            onDragEnd={(x, y) => {
              const updated = stickyNotes.map(n => n.id === note.id ? { ...n, x, y } : n);
              saveStickyNotes(updated);
            }}
          />
        ))}

        {/* Floating Draggable Greeting Sticky Note */}
        <motion.div
          ref={greetingNoteRef}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, ease: 'easeOut', delay: 0.2 }}
          className="absolute w-64 p-5 rounded-sm shadow-2xl z-30 cursor-move"
          style={{
            left: 'calc(50% - 380px)',
            top: '160px',
            backgroundColor: '#f6ea91',
            color: '#18181b',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)',
          }}
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-6 bg-black/10 rounded-sm shadow-sm backdrop-blur-sm transform rotate-1" />
          <h2 className="font-sans text-[18px] font-bold mb-3" style={{ color: '#18181b' }}>I'm Aditya...</h2>
          <p className="font-sans text-[12px] mb-5 leading-relaxed font-medium" style={{ color: '#27272a' }}>
            Open folders. Explore the builder. A workspace dedicated to shipping scalable AI, Web, and Mobile systems.
          </p>
          <button
            onClick={() => openWindow('contact')}
            className="font-sans text-[11px] font-bold py-2 px-3 rounded transition-colors w-full flex items-center justify-center gap-2 cursor-pointer shadow-md"
            style={{
              backgroundColor: '#e2ce64',
              color: '#18181b',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#d8c150'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#e2ce64'; }}
          >
            <Mail className="w-3.5 h-3.5" />
            Contact Me
          </button>
        </motion.div>

      </main>

      {/* RENDER ACTIVE WINDOW PANELS */}
      {Array.from(windows.values()).map(win => (
        <Window
          key={win.id}
          id={win.id}
          title={win.title}
          isOpen={win.isOpen}
          isActive={win.isActive}
          isMinimized={win.isMinimized}
          isMaximized={win.isMaximized}
          zIndex={win.zIndex}
          onClose={() => closeWindow(win.id)}
          onMinimize={() => minimizeWindow(win.id)}
          onMaximize={() => maximizeWindow(win.id)}
          onFocus={() => focusWindow(win.id)}
        >
          {win.id === 'about' && (
            <AboutPage
              onContactClick={() => openWindow('contact')}
              onDownloadResume={downloadResumePDF}
            />
          )}

          {win.id === 'education' && (
            <EducationPage />
          )}

          {win.id === 'experience' && (
            <ExperiencePage />
          )}

          {win.id === 'skills' && (
            <SkillsPage />
          )}

          {win.id === 'achievements' && (
            <AchievementsPage />
          )}

          {win.id === 'playground' && (
            <PlaygroundPage onClose={() => closeWindow('playground')} />
          )}

          {win.id === 'resume' && (
            <ResumePage
              onDownload={downloadResumePDF}
            />
          )}

          {win.id === 'projects' && (
            <OtherProjectsPage />
          )}

          {['cityscan', 'dataviz', 'baatcheet', 'shivner'].includes(win.id) && (
            <ProjectCaseStudy
              id={win.id}
              onClose={() => closeWindow(win.id)}
            />
          )}

          {win.id === 'terminal' && (
            <Terminal
              onRunCommand={(type, val) => {
                if (type === 'theme') {
                  if (val !== 'light' && val !== 'dark') {
                    setActiveTheme(val);
                  }
                } else if (type === 'project') {
                  openWindow(val);
                } else if (type === 'restore') {
                  setHiddenFolders([]);
                }
              }}
              onClose={() => closeWindow('terminal')}
            />
          )}

          {win.id === 'contact' && (
            <div className="p-6 flex flex-col h-full bg-[#131315]/90 select-text">
              {!contactSuccess ? (
                <>
                  <div className="mb-4">
                    <h2 className="text-[16px] font-bold text-white">Send a Message</h2>
                    <p className="text-[12px] text-zinc-400 mt-1">Feel free to reach out for collaborations or inquiries!</p>
                  </div>
                  <form onSubmit={handleContactSubmit} className="flex-1 flex flex-col gap-4 font-sans text-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Name</label>
                        <input name="name" type="text" required disabled={isSendingContact} placeholder="John Doe" className="bg-zinc-200/40 dark:bg-white/5 border border-zinc-300 dark:border-white/5 rounded-lg px-3 py-2 text-zinc-900 dark:text-white focus:outline-none focus:border-indigo-500/50 font-semibold disabled:opacity-50" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Email</label>
                        <input name="email" type="email" required disabled={isSendingContact} placeholder="john@example.com" className="bg-zinc-200/40 dark:bg-white/5 border border-zinc-300 dark:border-white/5 rounded-lg px-3 py-2 text-zinc-900 dark:text-white focus:outline-none focus:border-indigo-500/50 font-semibold disabled:opacity-50" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Message</label>
                      <textarea name="message" rows={4} required disabled={isSendingContact} placeholder="Hey Aditya, I'd love to chat about..." className="bg-zinc-200/40 dark:bg-white/5 border border-zinc-300 dark:border-white/5 rounded-lg px-3 py-2 text-zinc-900 dark:text-white focus:outline-none focus:border-indigo-500/50 resize-none font-semibold disabled:opacity-50" />
                    </div>
                    <button type="submit" disabled={isSendingContact} className="bg-indigo-500 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-indigo-650 disabled:bg-indigo-500/60 disabled:cursor-not-allowed transition-colors w-full cursor-pointer mt-2 shadow select-none">
                      {isSendingContact ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center text-center gap-3 py-10">
                  <CheckCircle className="w-12 h-12 text-emerald-400 animate-bounce" />
                  <h3 className="text-lg font-bold text-white">Message Sent!</h3>
                  <p className="text-zinc-400 text-sm max-w-xs leading-relaxed">Thank you. Your message was received successfully. Aditya will get back to you shortly.</p>
                  <button
                    onClick={() => setContactSuccess(false)}
                    className="mt-4 bg-zinc-200 dark:bg-white/5 border border-zinc-300 dark:border-white/10 text-zinc-700 dark:text-zinc-300 font-semibold px-4 py-2 rounded-lg hover:bg-zinc-350 dark:hover:bg-white/10 cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              )}
            </div>
          )}

          {win.id.startsWith('project-detail-') && (
            <ProjectDetail id={win.id.replace('project-detail-', '')} />
          )}

        </Window>
      ))}





      {/* Dock component launcher shelf */}
      <Dock
        activeWindows={windows}
        onOpenWindow={openWindow}
      />

      {/* Spotlight search modal overlay */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onLaunch={handleLaunchItem}
      />

      {/* Global Toast Alerts */}
      {toast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 bg-zinc-900 border border-white/15 px-4 py-2 rounded-xl text-xs font-semibold text-white shadow-2xl z-[9999999] animate-bounce">
          {toast}
        </div>
      )}

    </div>
  );
}
