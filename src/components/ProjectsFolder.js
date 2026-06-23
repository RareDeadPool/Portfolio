'use client';

import React from 'react';
import { Folder, ChevronRight, Terminal, GitBranch } from 'lucide-react';
import { PROJECTS_DATA } from '../data/projectsData';

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

export default function ProjectsFolder({ onOpenProject }) {
  const projects = Object.values(PROJECTS_DATA);

  return (
    <div className="flex h-full select-none">
      {/* 1. Sidebar */}
      <div className="w-[170px] bg-black/15 border-r border-white/5 p-4 flex flex-col gap-1.5 flex-shrink-0">
        <span className="text-[10px] font-bold text-zinc-500 tracking-wider uppercase mb-1.5 px-2">
          Locations
        </span>
        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[13px] bg-white/5 text-white font-medium">
          <Folder className="w-3.5 h-3.5" />
          Desktop
        </div>
        <a 
          href="https://github.com/RareDeadPool" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[13px] text-zinc-400 hover:bg-white/5 hover:text-white transition-colors duration-150"
        >
          <Github className="w-3.5 h-3.5" />
          GitHub
        </a>
        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[13px] text-zinc-400 hover:bg-white/5 hover:text-white transition-colors duration-150 cursor-pointer">
          <GitBranch className="w-3.5 h-3.5" />
          Branches
        </div>
      </div>

      {/* 2. Main Content Grid */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="h-10 border-b border-white/5 px-4 flex items-center text-[12px] text-zinc-400 bg-black/5 select-text flex-shrink-0">
          <span className="flex items-center gap-1">
            Projects <ChevronRight className="w-3 h-3" /> Desktop
          </span>
        </div>
        
        <div className="flex-1 p-5 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 gap-4 content-start">
          {projects.map(proj => (
            <div
              key={proj.id}
              onClick={() => onOpenProject(proj.id)}
              className="flex flex-col items-center justify-center border border-transparent hover:border-white/5 hover:bg-white/5 p-4 rounded-xl cursor-pointer transition-all duration-200 group text-center"
            >
              <div className="w-12 h-10 mb-2 relative flex items-center justify-center">
                <Folder 
                  className="w-10 h-10 transition-transform duration-200 group-hover:scale-105"
                  style={{ color: proj.accentHex, fill: `${proj.accentHex}1A` }}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[12px] font-semibold text-white group-hover:text-indigo-400 transition-colors">
                  {proj.title}
                </span>
                <span className="text-[10px] text-zinc-500 mt-0.5 line-clamp-1">
                  {proj.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
