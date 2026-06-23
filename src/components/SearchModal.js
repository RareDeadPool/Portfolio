'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Search, User, Folder, Terminal, Mail, Play, ShieldAlert, BookOpen, Trophy, Cpu, GraduationCap, Briefcase, FileText } from 'lucide-react';

export default function SearchModal({ isOpen, onClose, onLaunch }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const resultsContainerRef = useRef(null);

  // Search indexing items definitions
  const searchIndex = [
    { id: 'about', title: 'About.app', path: 'Applications / About Me', type: 'app', icon: User },
    { id: 'education', title: 'Education.app', path: 'Applications / Academic timeline', type: 'app', icon: GraduationCap },
    { id: 'experience', title: 'Experience.app', path: 'Applications / Professional Experience', type: 'app', icon: Briefcase },
    { id: 'skills', title: 'Skills.app', path: 'Applications / Technical Toolkit', type: 'app', icon: Cpu },
    { id: 'achievements', title: 'Achievements.app', path: 'Applications / Key Milestones', type: 'app', icon: Trophy },
    { id: 'playground', title: 'Playground.app', path: 'Applications / Developer Playground', type: 'app', icon: Play },
    { id: 'resume', title: 'Resume.pdf', path: 'Applications / Professional CV', type: 'app', icon: FileText },
    { id: 'projects', title: 'Other Projects', path: 'Applications / Projects Explorer', type: 'folder', icon: Folder },
    { id: 'terminal', title: 'Terminal.app', path: 'Applications / System Shell', type: 'app', icon: Terminal },
    { id: 'contact', title: 'Contact.mail', path: 'Applications / Contact Form', type: 'file', icon: Mail },
    
    // Sub-projects
    { id: 'cityscan', title: 'CityScan.app (Smart City Monitor)', path: 'Projects / CityScan', type: 'project', icon: Folder },
    { id: 'dataviz', title: 'DataViz.3D (Interactive WebGL)', path: 'Projects / DataViz', type: 'project', icon: Folder },
    { id: 'baatcheet', title: 'BaatCheet.chat (Real-time Messaging)', path: 'Projects / BaatCheet', type: 'project', icon: Folder },
    { id: 'shivner', title: 'Shivner NGO (Logistics routing)', path: 'Projects / Shivner NGO', type: 'project', icon: Folder },

    // Exact Spotlight Search Commands (User requested)
    { id: 'about', title: 'open about', path: 'Spotlight Commands / Launch About.app', type: 'command', icon: Play },
    { id: 'education', title: 'open education', path: 'Spotlight Commands / Launch Education.app', type: 'command', icon: Play },
    { id: 'experience', title: 'open experience', path: 'Spotlight Commands / Launch Experience.app', type: 'command', icon: Play },
    { id: 'skills', title: 'open skills', path: 'Spotlight Commands / Launch Skills.app', type: 'command', icon: Play },
    { id: 'achievements', title: 'open achievements', path: 'Spotlight Commands / Launch Achievements.app', type: 'command', icon: Play },
    { id: 'cityscan', title: 'open cityscan', path: 'Spotlight Commands / Launch CityScan.app', type: 'command', icon: Play },
    { id: 'dataviz', title: 'open dataviz', path: 'Spotlight Commands / Launch DataViz.app', type: 'command', icon: Play },
    { id: 'baatcheet', title: 'open baatcheet', path: 'Spotlight Commands / Launch BaatCheet.chat', type: 'command', icon: Play },
    { id: 'shivner', title: 'open shivner', path: 'Spotlight Commands / Launch Shivner NGO', type: 'command', icon: Play },
    { id: 'playground', title: 'open playground', path: 'Spotlight Commands / Launch Playground.app', type: 'command', icon: Play },
    { id: 'resume', title: 'open resume', path: 'Spotlight Commands / Launch Resume.pdf', type: 'command', icon: Play },
    { id: 'contact', title: 'contact', path: 'Spotlight Commands / Open Contact Form', type: 'command', icon: Play },

    // Terminal Commands
    { id: 'cmd-neofetch', title: 'Run Terminal: neofetch', path: 'Terminal Commands', type: 'cmd', icon: Terminal },
    { id: 'cmd-help', title: 'Run Terminal: help', path: 'Terminal Commands', type: 'cmd', icon: Terminal },
    { id: 'cmd-theme', title: 'Run Terminal: theme', path: 'Terminal Commands', type: 'cmd', icon: Terminal }
  ];

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 50);
    }
  }, [isOpen]);

  const filteredResults = query.trim() === ''
    ? searchIndex.slice(0, 4) // Show top applications on empty query
    : searchIndex.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) || 
        item.path.toLowerCase().includes(query.toLowerCase())
      );

  const handleKeyDown = (e) => {
    if (filteredResults.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((selectedIndex + 1) % filteredResults.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((selectedIndex - 1 + filteredResults.length) % filteredResults.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      selectItem(filteredResults[selectedIndex]);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const selectItem = (item) => {
    onClose();
    if (onLaunch) onLaunch(item);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/40 backdrop-blur-md z-[999999] flex items-start justify-center pt-[15vh] overflow-hidden"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-[560px] mx-4 rounded-2xl glassmorphism shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search header input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/5 select-text">
          <Search className="w-5 h-5 text-zinc-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search projects, skills, commands..."
            className="flex-1 bg-transparent border-none outline-none text-[15px] text-white placeholder:text-zinc-400 focus:ring-0 p-0"
            autoComplete="off"
          />
          <span className="text-[10px] font-semibold text-zinc-400 bg-white/5 border border-white/5 px-2 py-0.5 rounded">
            ESC
          </span>
        </div>

        {/* Results layout */}
        <div 
          ref={resultsContainerRef}
          className="max-h-[320px] overflow-y-auto p-2 flex flex-col gap-0.5"
        >
          {filteredResults.length === 0 ? (
            <div className="py-8 text-center text-zinc-400 text-[13px] flex flex-col items-center gap-2">
              <ShieldAlert className="w-8 h-8 text-white/10" />
              No results found matching your query.
            </div>
          ) : (
            filteredResults.map((item, index) => {
              const isSelected = index === selectedIndex;
              const Icon = item.icon;
              
              return (
                <div
                  key={item.id}
                  onClick={() => selectItem(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors duration-150 ${
                    isSelected ? 'bg-indigo-500/20 border border-indigo-500/30 text-white' : 'border border-transparent text-zinc-300'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-150 ${
                    isSelected ? 'bg-indigo-500/35 text-indigo-300' : 'bg-white/5 text-zinc-400'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="text-[13px] font-semibold">{item.title}</span>
                    <span className="text-[11px] text-zinc-400 mt-0.5">{item.path}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
