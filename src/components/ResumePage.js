'use client';

import React from 'react';
import { Download, Mail, Phone, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

// Custom inline SVG for Github icon since brand icons are removed from lucide-react
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

// Custom inline SVG for Linkedin icon since brand icons are removed from lucide-react
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

export default function ResumePage({ onDownload }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 120 } }
  };

  return (
    <div className="p-6 md:p-12 max-w-5xl mx-auto flex flex-col font-sans select-text pb-24">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-white/[0.06] p-5 shadow-lg mb-8 select-none">
        <div className="flex items-center gap-3">
          <GraduationCap className="w-5 h-5 text-indigo-650 dark:text-indigo-400" />
          <span className="text-[12.5px] text-zinc-700 dark:text-zinc-300 font-bold uppercase tracking-widest font-mono">Interactive CV</span>
        </div>
        <button
          onClick={onDownload}
          className="flex items-center gap-1.5 bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-550 text-white font-extrabold text-[12.5px] px-4 py-2.5 rounded-xl transition duration-200 cursor-pointer shadow-md"
        >
          <Download className="w-4 h-4" /> Download Resume.pdf
        </button>
      </div>

      {/* Main Resume Sheet */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900/90 text-zinc-800 dark:text-zinc-200 p-8 md:p-12 shadow-2xl flex flex-col gap-6"
      >
        {/* Name & Title Header */}
        <motion.div variants={itemVariants} className="text-center flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white uppercase">
            Aditya Sawant
          </h1>
          <p className="text-[14px] font-bold text-zinc-650 dark:text-zinc-400 tracking-widest uppercase mt-2">
            Full-Stack Developer
          </p>
          <hr className="w-full border-t border-zinc-300 dark:border-zinc-700/60 my-4" />
        </motion.div>

        {/* Contact Info Row */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 text-xs md:text-sm text-zinc-700 dark:text-zinc-300 font-semibold"
        >
          <a href="tel:+918591211342" className="flex items-center gap-2 hover:text-indigo-600 dark:hover:text-white transition">
            <Phone className="w-4 h-4 text-zinc-500" /> +91 85912 11342
          </a>
          <a href="mailto:sawantaditya0708@gmail.com" className="flex items-center gap-2 hover:text-indigo-600 dark:hover:text-white transition">
            <Mail className="w-4 h-4 text-zinc-500" /> sawantaditya0708@gmail.com
          </a>
          <a
            href="https://www.linkedin.com/in/aditya-sawant-25932527b/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-indigo-600 dark:hover:text-white transition underline"
          >
            <Linkedin className="w-4 h-4 text-zinc-500" /> linkedin
          </a>
          <a
            href="https://github.com/RareDeadPool"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-indigo-600 dark:hover:text-white transition underline"
          >
            <Github className="w-4 h-4 text-zinc-500" /> Github
          </a>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <hr className="w-full border-t border-zinc-300 dark:border-zinc-700/60 mb-2" />
        </motion.div>

        {/* Section: About Me */}
        <motion.div variants={itemVariants} className="flex flex-col text-left">
          <h2 className="text-[15px] font-extrabold tracking-wider text-zinc-950 dark:text-white uppercase font-sans">
            About Me
          </h2>
          <hr className="border-t-2 border-zinc-950 dark:border-white mt-1.5 mb-3 w-full" />
          <p className="text-[13.5px] leading-relaxed text-zinc-700 dark:text-zinc-300 font-medium">
            Fueled by a deep enthusiasm for technology and innovation, I am a software engineering student keen to apply my academic knowledge to real-world challenges. I approach tasks with creativity and discipline, aiming to craft impactful digital solutions. Eager to gain hands-on experience, I’m ready to bring my skills in front-end development and problem-solving to new opportunities.
          </p>
        </motion.div>

        {/* Section: Achievements */}
        <motion.div variants={itemVariants} className="flex flex-col text-left">
          <h2 className="text-[15px] font-extrabold tracking-wider text-zinc-950 dark:text-white uppercase font-sans">
            Achievements
          </h2>
          <hr className="border-t-2 border-zinc-950 dark:border-white mt-1.5 mb-3 w-full" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13.5px] font-bold text-zinc-900 dark:text-zinc-100">
            <div>
              <span className="underline select-text">Industrial Hackathon Winner</span>
            </div>
            <div>
              <span className="underline select-text">Internal Hackathon Winner</span>
            </div>
          </div>
        </motion.div>

        {/* Section: Projects */}
        <motion.div variants={itemVariants} className="flex flex-col text-left">
          <h2 className="text-[15px] font-extrabold tracking-wider text-zinc-950 dark:text-white uppercase font-sans">
            Projects
          </h2>
          <hr className="border-t-2 border-zinc-950 dark:border-white mt-1.5 mb-3 w-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
            {/* Project 1 */}
            <div className="flex flex-col">
              <a
                href="https://github.com/KishuKing/Shivner-Pratishthan-Frontend"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[14px] font-bold text-zinc-950 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                <Github className="w-4 h-4 text-zinc-650 dark:text-zinc-400 flex-shrink-0" />
                <span className="underline">Shivner Pratishthan</span>
              </a>
              <p className="text-[12.5px] leading-relaxed text-zinc-650 dark:text-zinc-400 mt-2 font-medium">
                Developed an NGO management website and Mobile App using React.js, Express.js, Node.js, and MongoDB and ReactNative, featuring Razorpay donations, event management, and user engagement tools.
              </p>
            </div>

            {/* Project 2 */}
            <div className="flex flex-col">
              <a
                href="https://github.com/RareDeadPool/DataVZ"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[14px] font-bold text-zinc-950 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                <Github className="w-4 h-4 text-zinc-650 dark:text-zinc-400 flex-shrink-0" />
                <span className="underline">DataViz</span>
              </a>
              <p className="text-[12.5px] leading-relaxed text-zinc-650 dark:text-zinc-400 mt-2 font-medium">
                DataViz is a web-based data visualization platform that allows users to upload datasets and instantly generate interactive charts and visual insights. It transforms complex raw data into clear, dynamic visuals through an intuitive interface.
              </p>
            </div>

            {/* Project 3 */}
            <div className="flex flex-col">
              <a
                href="https://github.com/RareDeadPool/AI-powered-infrastructure-Damage-Detection"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[14px] font-bold text-zinc-950 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                <Github className="w-4 h-4 text-zinc-650 dark:text-zinc-400 flex-shrink-0" />
                <span className="underline">CityScan</span>
              </a>
              <p className="text-[12.5px] leading-relaxed text-zinc-650 dark:text-zinc-400 mt-2 font-medium">
                Developed a Flutter-based edge AI application for real-time detection of potholes, cracks, and pipeline defects using YOLOv8, featuring live scanning, severity assessment, geotagged reporting, and offline inference.
              </p>
            </div>

            {/* Project 4 */}
            <div className="flex flex-col">
              <a
                href="https://github.com/RareDeadPool"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[14px] font-bold text-zinc-950 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                <Github className="w-4 h-4 text-zinc-650 dark:text-zinc-400 flex-shrink-0" />
                <span className="underline">Fitness App Development</span>
              </a>
              <p className="text-[12.5px] leading-relaxed text-zinc-650 dark:text-zinc-400 mt-2 font-medium">
                Developed a Flutter-based fitness app with an intuitive UI, real-time progress tracking via Firebase, personalized fitness plans, and workout logging with detailed progress graphs, enhancing user engagement.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Section: Experience */}
        <motion.div variants={itemVariants} className="flex flex-col text-left">
          <h2 className="text-[15px] font-extrabold tracking-wider text-zinc-950 dark:text-white uppercase font-sans">
            Experience
          </h2>
          <hr className="border-t-2 border-zinc-950 dark:border-white mt-1.5 mb-3 w-full" />
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4">
            <div className="flex flex-col">
              <span className="text-[13.5px] font-extrabold text-zinc-950 dark:text-white">2024-2024</span>
              <span className="text-[12.5px] text-zinc-600 dark:text-zinc-400 mt-0.5 font-bold">Jinshaashan Info LLP</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[13.5px] font-extrabold text-zinc-950 dark:text-white">Intern</span>
              <p className="text-[13px] leading-relaxed text-zinc-650 dark:text-zinc-400 mt-2 font-medium">
                My internship at Jinshaashan Info LLP, under Mr. Vikram's guidance, provided hands-on experience in mobile app development, web content creation, and data collection. I contributed to a Fitness App, implementing email verification and real-time databases using Flutter and Firebase. This experience strengthened my technical skills, teamwork, and time management.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Section: Skills */}
        <motion.div variants={itemVariants} className="flex flex-col text-left">
          <h2 className="text-[15px] font-extrabold tracking-wider text-zinc-950 dark:text-white uppercase font-sans">
            Skills
          </h2>
          <hr className="border-t-2 border-zinc-950 dark:border-white mt-1.5 mb-3 w-full" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[13px] text-zinc-750 dark:text-zinc-300 font-bold select-text">
            <ul className="flex flex-col gap-1">
              <li>• HTML</li>
              <li>• CSS</li>
            </ul>
            <ul className="flex flex-col gap-1">
              <li>• React</li>
              <li>• Tailwind CSS</li>
            </ul>
            <ul className="flex flex-col gap-1">
              <li>• React native</li>
              <li>• Flutter</li>
            </ul>
            <ul className="flex flex-col gap-1">
              <li>• Javascript</li>
              <li>• DSA</li>
            </ul>
          </div>
        </motion.div>

        {/* Section: Education */}
        <motion.div variants={itemVariants} className="flex flex-col text-left">
          <h2 className="text-[15px] font-extrabold tracking-wider text-zinc-950 dark:text-white uppercase font-sans">
            Education
          </h2>
          <hr className="border-t-2 border-zinc-950 dark:border-white mt-1.5 mb-3 w-full" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Edu 1 */}
            <div className="flex flex-col">
              <span className="text-[13.5px] font-extrabold text-zinc-950 dark:text-white">Omkar International School</span>
              <span className="text-[12px] text-zinc-650 dark:text-zinc-400 mt-1 font-semibold">Secondary Education</span>
              <span className="text-[11px] text-zinc-550 dark:text-zinc-550 mt-0.5 font-bold font-mono">(2010-2022)</span>
            </div>

            {/* Edu 2 */}
            <div className="flex flex-col">
              <span className="text-[13.5px] font-extrabold text-zinc-950 dark:text-white">Vidyalankar Polytechnic</span>
              <span className="text-[12px] text-zinc-650 dark:text-zinc-400 mt-1 font-semibold">Diploma in Computer Engineering</span>
              <span className="text-[11px] text-zinc-550 dark:text-zinc-550 mt-0.5 font-bold font-mono">(2023- 2025)</span>
            </div>

            {/* Edu 3 */}
            <div className="flex flex-col">
              <span className="text-[13.5px] font-extrabold text-zinc-950 dark:text-white">Amity University</span>
              <span className="text-[12px] text-zinc-650 dark:text-zinc-400 mt-1 font-semibold">B.TECH in Computer Engineering</span>
              <span className="text-[11px] text-zinc-550 dark:text-zinc-550 mt-0.5 font-bold font-mono">(2025- Present)</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
