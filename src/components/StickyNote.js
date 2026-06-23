'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(Draggable);
}

export default function StickyNote({ note, onDelete, onUpdateText, onDragEnd }) {
  const noteRef = useRef(null);
  const dragInstanceRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (noteRef.current) {
      // Set initial position and rotation using GSAP
      const initialRotation = note.id === 'note-welcome' ? 1 : -1;
      gsap.set(noteRef.current, {
        x: note.x,
        y: note.y,
        rotation: initialRotation
      });

      const dragInstances = Draggable.create(noteRef.current, {
        type: 'x,y',
        trigger: noteRef.current.querySelector('.note-handle'),
        edgeResistance: 0.65,
        bounds: '#desktop-canvas',
        onDragEnd: function() {
          // Sync final position back to state
          onDragEnd(this.x, this.y);
        }
      });
      dragInstanceRef.current = dragInstances[0];
    }

    return () => {
      if (dragInstanceRef.current) {
        dragInstanceRef.current.kill();
        dragInstanceRef.current = null;
      }
    };
  }, [note.id]); // Run only on mount

  return (
    <motion.div
      ref={noteRef}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="absolute w-56 h-56 p-4 rounded-sm shadow-2xl flex flex-col group z-40"
      style={{
        left: 0,
        top: 0,
        backgroundColor: '#f6ea91',
        color: '#18181b',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)'
      }}
    >
      {/* Drag handle bar at the top */}
      <div 
        className="note-handle h-6 -mx-4 -mt-4 mb-2 flex items-center justify-between px-3 cursor-grab active:cursor-grabbing select-none rounded-t-sm border-b border-black/5"
        style={{ backgroundColor: '#ebd969' }}
      >
        <span className="text-[9px] font-bold text-yellow-900/60 font-sans tracking-wider uppercase">Sticky Note</span>
        <button 
          onClick={onDelete}
          className="text-[14px] font-bold text-yellow-900/60 hover:text-red-600 cursor-pointer select-none"
        >
          ×
        </button>
      </div>

      <textarea
        value={note.text}
        onChange={(e) => onUpdateText(e.target.value)}
        className="flex-1 bg-transparent border-none outline-none resize-none font-sans text-[12px] leading-relaxed text-zinc-800 focus:ring-0 p-0 font-medium select-text"
        style={{ color: '#18181b' }}
        placeholder="Write something..."
      />
    </motion.div>
  );
}
