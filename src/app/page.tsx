'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Terminal, 
  Cpu, 
  Database, 
  Activity, 
  ChevronRight, 
  Code2, 
  Brain, 
  Bot, 
  Layers, 
  Microchip,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail
} from 'lucide-react';
import GitHubActivity from './components/GitHubActivity';
import { FadeIn, StaggerContainer, StaggerItem, CountUp } from './components/animations';

// --- Configuration Data ---
const SYSTEM_STATS = [
  { icon: Cpu, label: 'Compute Priority', value: 'Robotics / ROS 2', level: 85 },
  { icon: Database, label: 'Neural Load', value: 'AI / LLM Agents', level: 72 },
  { icon: Activity, label: 'Physical Integration', value: 'Mechatronics', level: 94 },
];

const SKILL_CATEGORIES = [
  {
    icon: Brain,
    title: 'AI / ML',
    subtitle: 'Neural Systems',
    skills: [
      { name: 'Python', level: 95 },
      { name: 'Computer Vision / OpenCV', level: 90 },
      { name: 'YOLO / Object Detection', level: 88 },
      { name: 'LLM Agents / RAG', level: 82 },
      { name: 'PyTorch / TensorFlow', level: 78 },
    ],
  },
  {
    icon: Bot,
    title: 'Robotics',
    subtitle: 'Physical Systems',
    skills: [
      { name: 'ROS 2 / Navigation', level: 92 },
      { name: 'SLAM / Path Planning', level: 88 },
      { name: 'C++ / Embedded', level: 85 },
      { name: 'ESP32 / IoT', level: 90 },
      { name: 'PID / Control Systems', level: 86 },
    ],
  },
  {
    icon: Code2,
    title: 'Software',
    subtitle: 'Full Stack',
    skills: [
      { name: 'TypeScript / React', level: 88 },
      { name: 'Next.js / Node.js', level: 85 },
      { name: 'System Architecture', level: 82 },
      { name: 'API Design / GraphQL', level: 80 },
      { name: 'Testing / CI/CD', level: 84 },
    ],
  },
];

const TIMELINE = [
  {
    period: '2025 // PRESENT',
    title: 'AI R&D Engineer',
    company: 'Siemens // Munich',
    description: 'ML pipelines for assembly planning and YOLO-based digitization (>98% accuracy). Novel Fourier-IK methods.',
    active: true,
  },
  {
    period: '2021 // 2025',
    title: 'BSc. Mechatronics',
    company: 'ITESM // Mexico',
    description: 'Scholarship holder. Specialized in Robotics & Industrial Automation. Exchange at TU Dresden, Germany.',
    active: false,
  },
  {
    period: '2023 // 2023',
    title: 'Jr. Front-End Dev',
    company: 'La Brujula // CDMX',
    description: 'Design systems, CI/CD pipelines, and API integrations for real-time translation and automation.',
    active: false,
  },
];

const PROJECTS = [
  {
    id: '01',
    title: 'RobotArm',
    pkg: 'robot-arm-cv',
    description: 'ESP32, IoT, and computer vision enabled servo robot arm. Features a real-time OpenCV pipeline for precise pick-and-place.',
    image: '/portfolio-2026/projects/robotarm.png',
    tags: ['C++', 'Python', 'OpenCV'],
    href: 'https://github.com/papalino456/RobotArm',
  },
  {
    id: '02',
    title: 'RoboMop',
    pkg: 'robomop-slam',
    description: 'Autonomous cleaning robot featuring SLAM, path planning, and a React-based monitoring dashboard.',
    image: '/portfolio-2026/projects/robomop.png',
    tags: ['Python', 'React', 'SLAM'],
    href: 'https://github.com/papalino456/RoboMop',
  },
  {
    id: '03',
    title: 'ISA System',
    pkg: 'isa-watering-ai',
    description: 'Automatic, sustainable watering system using AI and IoT based on the ESP-32 chip for scalable agriculture.',
    image: '/portfolio-2026/projects/isa.png',
    tags: ['Embedded', 'IoT', 'ESP32'],
    href: 'https://github.com/papalino456/ISA',
  },
  {
    id: '04',
    title: 'AGV Robot',
    pkg: 'agv-raspberry-pi',
    description: 'Automatic Guided Vehicle using Raspberry Pi, IR line following, and PID control for industrial logistics.',
    image: '/portfolio-2026/projects/agv.png',
    tags: ['Python', 'RaspberryPi', 'PID'],
    href: 'https://github.com/papalino456/AGV',
  },
];

interface ConstellationNodeData {
  emoji: string;
  label: string;
  position: string;
  size: 'lg' | 'md' | 'sm';
}

const CONSTELLATION_NODES: ConstellationNodeData[] = [
  // Inner ring
  { emoji: '🐍', label: 'Python', position: 'left-[25%] top-[25%]', size: 'lg' },
  { emoji: '🤖', label: 'ROS 2', position: 'right-[25%] top-[22%]', size: 'lg' },
  { emoji: '⚡', label: 'C++', position: 'right-[20%] bottom-[30%]', size: 'lg' },
  { emoji: '⚛️', label: 'React', position: 'left-[22%] bottom-[28%]', size: 'lg' },
  // Outer ring
  { emoji: '👁️', label: 'OpenCV', position: 'left-[8%] top-[35%]', size: 'md' },
  { emoji: '🔥', label: 'PyTorch', position: 'left-[15%] top-[60%]', size: 'md' },
  { emoji: '🔌', label: 'ESP32', position: 'right-[10%] top-[40%]', size: 'md' },
  { emoji: '▲', label: 'Next.js', position: 'right-[15%] bottom-[25%]', size: 'md' },
  { emoji: '🐳', label: 'Docker', position: 'left-[40%] bottom-[12%]', size: 'md' },
  { emoji: '🧠', label: 'TensorFlow', position: 'right-[35%] top-[12%]', size: 'md' },
  { emoji: '🗺️', label: 'SLAM', position: 'left-[38%] top-[15%]', size: 'md' },
  // Satellite
  { emoji: '🎯', label: 'YOLO', position: 'left-[5%] top-[55%]', size: 'sm' },
  { emoji: '🐧', label: 'Linux', position: 'right-[5%] top-[60%]', size: 'sm' },
  { emoji: '📡', label: 'MQTT', position: 'left-[55%] bottom-[8%]', size: 'sm' },
  { emoji: '⚙️', label: 'CUDA', position: 'right-[8%] top-[18%]', size: 'sm' },
];

// --- Components ---

function SkillBar({ name, level }: { name: string; level: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[10px] uppercase tracking-wider">
        <span className="text-[#666] group-hover:text-white transition-colors duration-300">{name}</span>
        <span className="text-[#333] group-hover:text-blue-500 transition-colors duration-300">{level}%</span>
      </div>
      <div className="h-0.5 bg-[#1f1f1f] overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-600 to-blue-400 skill-bar"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
        />
      </div>
    </div>
  );
}

function ConstellationNode({ 
  emoji, 
  label, 
  position, 
  size 
}: { 
  emoji: string; 
  label: string; 
  position: string; 
  size: 'lg' | 'md' | 'sm';
}) {
  const sizeClasses = {
    lg: 'w-12 h-12 text-lg border-blue-400/50 hover:border-blue-400 rounded-lg',
    md: 'w-10 h-10 text-sm border-[#333] hover:border-blue-300 rounded-full',
    sm: 'w-8 h-8 text-xs border-[#222] hover:border-blue-400/40 rounded-full',
  };
  
  const labelClasses = {
    lg: '-bottom-5 text-[9px] text-[#666] group-hover:text-blue-400',
    md: '-bottom-4 text-[9px] text-[#555] group-hover:text-blue-300 opacity-0 group-hover:opacity-100',
    sm: '-bottom-3 text-[8px] text-[#444] group-hover:text-blue-400 opacity-0 group-hover:opacity-100',
  };

  return (
    <div className={`absolute ${position}`}>
      <motion.div 
        className="group relative"
        whileHover={{ scale: 1.15 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className={`${sizeClasses[size]} bg-[#0a0a0a] border flex flex-col items-center justify-center transition-all duration-300 hover:bg-blue-500/10 cursor-crosshair`}>
          <span>{emoji}</span>
        </div>
        <span className={`absolute left-1/2 -translate-x-1/2 ${labelClasses[size]} whitespace-nowrap transition-all duration-300`}>
          {label}
        </span>
      </motion.div>
    </div>
  );
}

export default function PortfolioHome() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#d4d4d4] font-mono selection:bg-blue-500/30 selection:text-white relative">
      {/* Subtle background grid */}
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-50" />
      
      {/* HUD Header */}
      <motion.header 
        className="fixed top-0 left-0 right-0 border-b border-[#1f1f1f] p-4 flex justify-between items-center z-50 glass"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="flex items-center gap-3">
          <motion.div 
            className="w-2.5 h-2.5 bg-blue-500 rounded-full"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [1, 0.7, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <h1 className="text-sm tracking-widest uppercase font-bold text-white">
            Sebastian Barrio <span className="text-[#444]">//</span> Systems Architect
          </h1>
        </div>
        
        <nav className="hidden md:flex gap-8 text-[10px] tracking-[0.2em] uppercase text-[#666]">
          {['Activity', 'History', 'Repos', 'Stack', 'System Status'].map((item, i) => (
            <motion.a 
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="hover:text-white transition-colors relative group"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.3 }}
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-blue-500 group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
          <motion.a 
            href="/masters-research-2027" 
            className="text-blue-500 hover:text-blue-400 transition-colors"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            Masters Dashboard
          </motion.a>
        </nav>
      </motion.header>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-12">
        {/* Hero Section */}
        <section className="mb-40 min-h-[70vh] flex flex-col justify-center">
          <FadeIn delay={0.2}>
            <div className="inline-flex items-center gap-2 border border-blue-500/30 bg-blue-500/5 px-4 py-2 mb-8 text-[10px] text-blue-400 tracking-tighter uppercase w-fit">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
              Status: Available for R&D Collaboration
            </div>
          </FadeIn>
          
          <FadeIn delay={0.3} direction="up" distance={40}>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tighter leading-[0.9]">
              Bridging the gap<br />
              between <span className="text-blue-500">Silicon</span><br />
              and <span className="text-steel drop-shadow-[0_0_30px_rgba(200,200,200,0.2)]">Steel</span>.
            </h2>
          </FadeIn>
          
          <FadeIn delay={0.4}>
            <p className="max-w-2xl text-[#888] text-lg md:text-xl leading-relaxed mb-12">
              AI & Robotics Engineer with a foundation in Mechatronics and a proven record of applying cutting-edge AI to solve complex automation challenges.
            </p>
          </FadeIn>
          
          <FadeIn delay={0.5}>
            <div className="flex flex-wrap gap-4">
              <motion.button 
                onClick={() => window.location.href = 'mailto:sebastianbarrio@example.com'}
                className="group relative bg-white text-black px-8 py-4 text-sm font-bold uppercase tracking-widest overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Initiate Contact
                  <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
                <motion.div 
                  className="absolute inset-0 bg-blue-500"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                />
              </motion.button>
              
              <motion.button 
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="border border-[#333] px-8 py-4 text-sm font-bold uppercase tracking-widest hover:border-white hover:bg-white/5 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View Log (Projects)
              </motion.button>
            </div>
          </FadeIn>
        </section>

        {/* System Stats / Dashboard Grid */}
        <section id="system-status" className="mb-40">
          <FadeIn>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#1f1f1f] to-[#1f1f1f]" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#444]">System Metrics</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#1f1f1f] to-[#1f1f1f]" />
            </div>
          </FadeIn>
          
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-1 border border-[#1f1f1f] bg-[#1f1f1f]" staggerDelay={0.15}>
            {SYSTEM_STATS.map((stat) => (
              <StaggerItem key={stat.label}>
                <motion.div 
                  className="bg-[#0a0a0a] p-8 flex flex-col gap-4 group hover:bg-[#0f0f0f] transition-colors duration-500"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-3 text-[#444]">
                    <stat.icon size={16} className="group-hover:text-blue-500 transition-colors" />
                    <span className="text-[10px] uppercase tracking-widest">{stat.label}</span>
                  </div>
                  <div className="text-3xl font-light text-white italic">{stat.value}</div>
                  <div className="w-full h-1 bg-[#111] mt-auto overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-blue-600 to-blue-400"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${stat.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
                    />
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* GitHub Activity Graph */}
        <section id="github-activity" className="mb-40">
          <FadeIn>
            <div className="flex justify-between items-end mb-8 border-b border-[#1f1f1f] pb-4">
              <h3 className="text-sm uppercase tracking-[0.3em] text-[#666]">Activity Matrix</h3>
              <a 
                href="https://github.com/papalino456" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[10px] text-[#444] hover:text-blue-500 transition-colors flex items-center gap-1 group"
              >
                <Github size={12} />
                github.com/papalino456
                <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <GitHubActivity />
          </FadeIn>
        </section>

        {/* Tech Stack - Skill Constellation */}
        <section id="stack" className="mb-40">
          <FadeIn>
            <div className="flex justify-between items-end mb-12 border-b border-[#1f1f1f] pb-4">
              <h3 className="text-sm uppercase tracking-[0.3em] text-[#666]">Tech Stack</h3>
              <span className="text-[10px] text-[#333]">/ CORE_COMPETENCIES</span>
            </div>
          </FadeIn>

          {/* Skill Radar Grid */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16" staggerDelay={0.1}>
            {SKILL_CATEGORIES.map((category) => (
              <StaggerItem key={category.title}>
                <motion.div 
                  className="group relative bg-[#0a0a0a] border border-[#1f1f1f] p-6 hover:border-blue-500/30 transition-all duration-500 h-full"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                        <category.icon size={20} className="text-blue-500" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-sm uppercase tracking-wider">{category.title}</h4>
                        <span className="text-[10px] text-[#444] uppercase tracking-widest">{category.subtitle}</span>
                      </div>
                    </div>
                    <div className="space-y-5">
                      {category.skills.map((skill) => (
                        <SkillBar key={skill.name} name={skill.name} level={skill.level} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Skill Constellation - Orbital Visualization */}
          <FadeIn delay={0.2}>
            <div className="border border-[#1f1f1f] bg-[#050505] p-8 relative overflow-hidden min-h-[420px]">
              {/* Background constellation lines */}
              <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1f1f1f" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                {/* Constellation lines connecting nodes */}
                <line x1="15%" y1="30%" x2="35%" y2="25%" stroke="#3b82f6" strokeWidth="0.5" opacity="0.3" />
                <line x1="35%" y1="25%" x2="55%" y2="35%" stroke="#3b82f6" strokeWidth="0.5" opacity="0.3" />
                <line x1="55%" y1="35%" x2="75%" y2="28%" stroke="#3b82f6" strokeWidth="0.5" opacity="0.3" />
                <line x1="25%" y1="60%" x2="45%" y2="55%" stroke="#3b82f6" strokeWidth="0.5" opacity="0.3" />
                <line x1="45%" y1="55%" x2="65%" y2="65%" stroke="#3b82f6" strokeWidth="0.5" opacity="0.3" />
                <line x1="15%" y1="30%" x2="25%" y2="60%" stroke="#3b82f6" strokeWidth="0.5" opacity="0.2" />
                <line x1="35%" y1="25%" x2="45%" y2="55%" stroke="#3b82f6" strokeWidth="0.5" opacity="0.2" />
                <line x1="75%" y1="28%" x2="65%" y2="65%" stroke="#3b82f6" strokeWidth="0.5" opacity="0.2" />
                {/* Orbital rings */}
                <ellipse cx="50%" cy="50%" rx="35%" ry="25%" fill="none" stroke="#1f1f1f" strokeWidth="1" />
                <ellipse cx="50%" cy="50%" rx="25%" ry="18%" fill="none" stroke="#1f1f1f" strokeWidth="0.5" opacity="0.5" />
              </svg>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-10">
                  <Layers size={14} className="text-blue-500" />
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#444]">Technology Constellation</span>
                </div>

                {/* Orbital Node Layout */}
                <div className="relative h-[340px]">
                  {/* Center node - Core */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <motion.div 
                      className="relative group"
                      animate={{ 
                        boxShadow: ['0 0 20px rgba(59,130,246,0.2)', '0 0 40px rgba(59,130,246,0.3)', '0 0 20px rgba(59,130,246,0.2)']
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <div className="w-16 h-16 bg-[#0a0a0a] border-2 border-blue-500 rounded-full flex items-center justify-center">
                        <Microchip size={24} className="text-blue-500" />
                      </div>
                      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-wider text-blue-500 whitespace-nowrap">Core Stack</span>
                    </motion.div>
                  </div>

                  {/* Orbital nodes */}
                  {CONSTELLATION_NODES.map((node) => (
                    <ConstellationNode key={node.label} {...node} />
                  ))}
                </div>

                {/* Category Legend */}
                <div className="flex flex-wrap justify-center gap-8 mt-8 pt-6 border-t border-[#1f1f1f]">
                  {[
                    { color: 'bg-blue-500', label: 'Core', shadow: true },
                    { color: 'border border-blue-400/50', label: 'Primary' },
                    { color: 'border border-[#444]', label: 'Secondary' },
                    { color: 'border border-[#333] w-2 h-2', label: 'Tools' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                      <div className={`w-3 h-3 ${item.color} ${item.shadow ? 'rounded-full shadow-lg shadow-blue-500/30' : 'rounded-full'}`} />
                      <span className="text-[10px] uppercase tracking-wider text-[#555]">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* Timeline / History Section */}
        <section id="history" className="mb-40">
          <FadeIn>
            <div className="flex justify-between items-end mb-12 border-b border-[#1f1f1f] pb-4">
              <h3 className="text-sm uppercase tracking-[0.3em] text-[#666]">Trajectory Log</h3>
              <span className="text-[10px] text-[#333]">/ WORK_AND_EDUCATION</span>
            </div>
          </FadeIn>
          
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.15}>
            {TIMELINE.map((entry, index) => (
              <StaggerItem key={entry.period}>
                <motion.div 
                  className="relative pt-8 border-t border-[#1f1f1f] group"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className={`absolute -top-1.5 left-0 w-3 h-3 rounded-full ${entry.active ? 'bg-blue-500' : 'bg-[#333] group-hover:bg-[#444]'}`}
                    animate={entry.active ? {
                      scale: [1, 1.3, 1],
                      opacity: [1, 0.7, 1]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div className={`font-bold text-[10px] mb-4 tracking-widest uppercase ${entry.active ? 'text-blue-500' : 'text-[#444] group-hover:text-[#666]'} transition-colors`}>
                    {entry.period}
                  </div>
                  <h4 className="text-white font-bold text-lg uppercase tracking-tight mb-1 group-hover:text-blue-400 transition-colors">
                    {entry.title}
                  </h4>
                  <div className="text-[#666] text-[10px] uppercase mb-4 tracking-wider">{entry.company}</div>
                  <p className="text-[#888] text-xs leading-relaxed">{entry.description}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* Featured Project Preview */}
        <section id="repos" className="mb-40">
          <FadeIn>
            <div className="flex justify-between items-end mb-12 border-b border-[#1f1f1f] pb-4">
              <h3 className="text-sm uppercase tracking-[0.3em] text-[#666]">Active Repositories</h3>
              <ChevronRight className="text-[#333]" />
            </div>
          </FadeIn>
          
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8" staggerDelay={0.15}>
            {PROJECTS.map((project) => (
              <StaggerItem key={project.id}>
                <motion.a 
                  href={project.href}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group block"
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                >
                  <div className="aspect-video bg-[#111] mb-6 border border-[#1f1f1f] relative overflow-hidden group-hover:border-blue-500/30 transition-colors duration-500">
                    <img 
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
                    <div className="absolute inset-0 opacity-10 pointer-events-none" 
                      style={{ backgroundImage: 'linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[10px] uppercase tracking-wider text-white/30 group-hover:text-blue-500 transition-colors duration-300 bg-[#0a0a0a]/80 px-3 py-1">
                        pkg: {project.pkg}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowUpRight size={20} className="text-blue-500" />
                    </div>
                  </div>
                  
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="text-[10px] text-[#444] font-mono">{project.id}</span>
                    <h4 className="text-xl font-bold text-white group-hover:text-blue-500 transition-colors duration-300">
                      {project.title}
                    </h4>
                  </div>
                  
                  <p className="text-[#666] text-sm mb-4 leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-[9px] border border-[#333] px-2.5 py-1 text-[#555] uppercase tracking-wider group-hover:border-[#444] group-hover:text-[#666] transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.a>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Terminal Style Log Component */}
          <FadeIn delay={0.3}>
            <div className="mt-16 bg-[#050505] border border-[#1f1f1f] p-6 font-mono text-[11px] leading-tight relative group hover:border-[#333] transition-colors">
              <div className="flex justify-between items-center mb-4 border-b border-[#1f1f1f] pb-2 text-[#444]">
                <span>SESSION_LOG: PROACTIVE_AGENT_V3</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  LIVE
                </span>
              </div>
              <div className="space-y-1.5 max-h-[100px] overflow-y-auto pr-2 fade-edge-b" style={{ scrollbarWidth: 'thin', scrollbarColor: '#333 #0a0a0a' }}>
                <p className="text-blue-500">[SYSTEM] Life-Systems Orchestrator: INITIALIZED</p>
                <p className="text-[#666]">[INFO] Scope: Career | R&D | Fitness | Systems</p>
                <p className="text-[#666]">[INFO] Lead Architect: Aoi (Blue Lobster Protocol)</p>
                <p className="text-[#666]">[INFO] Deployment: Verified Assets (RobotArm, RoboMop, ISA, AGV)</p>
                <p className="text-blue-400">[HEARTBEAT] Mar 13 19:30 CST: Portfolio makeover deployed. Premium animations active.</p>
                <p className="text-blue-400">[HEARTBEAT] Mar 06 11:37 CST: Memory flush check passed. Systems nominal.</p>
                <p className="text-green-500">[COMPLETED] Masters Research Phases 1 & 2: ETH/TUM/Delft/US data synced.</p>
                <p className="text-blue-400">[DEPLOYED] GitHub Activity Matrix: Steel & Silicon themed contribution graph live.</p>
                <p className="text-blue-400">[RESEARCH] ETH Zurich ASL (Prof. Siegwart): Perfect match for Siemens background.</p>
                <p className="text-green-500">[ACTION] TOEFL/IELTS scheduled for February 2026. SOP draft v0.1 complete.</p>
                <p className="text-white font-bold">{`>`} MISSION: HOLISTIC_OPTIMIZATION</p>
              </div>
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-100 transition-opacity duration-500">
                <Terminal size={48} className="text-blue-500" />
              </div>
            </div>
          </FadeIn>
        </section>
      </main>

      {/* Terminal Footer */}
      <footer className="relative z-10 border-t border-[#1f1f1f] p-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4 text-[10px] text-[#333]">
            <Terminal size={12} />
            <span>SYSTEM_VERSION: 2.0.0 // PREMIUM_EDITION</span>
          </div>
          
          <div className="flex items-center gap-6">
            <motion.a 
              href="https://github.com/papalino456" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#333] hover:text-blue-500 transition-colors"
              whileHover={{ scale: 1.1, y: -2 }}
            >
              <Github size={18} />
            </motion.a>
            <motion.a 
              href="https://linkedin.com/in/sebastianbarrio" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#333] hover:text-blue-500 transition-colors"
              whileHover={{ scale: 1.1, y: -2 }}
            >
              <Linkedin size={18} />
            </motion.a>
            <motion.a 
              href="mailto:sebastianbarrio@example.com"
              className="text-[#333] hover:text-blue-500 transition-colors"
              whileHover={{ scale: 1.1, y: -2 }}
            >
              <Mail size={18} />
            </motion.a>
          </div>
          
          <div className="text-[10px] text-[#333] tracking-widest uppercase">
            &copy; 2026 Sebastian Barrio
          </div>
        </div>
      </footer>
    </div>
  );
}
