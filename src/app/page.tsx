'use client';

import React from 'react';
import { Terminal, Cpu, Database, Activity, ChevronRight, Code2, Brain, Bot, Layers, Microchip } from 'lucide-react';
import GitHubActivity from './components/GitHubActivity';

export default function PortfolioHome() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#d4d4d4] font-mono selection:bg-[#333] selection:text-white">
      {/* HUD Header */}
      <header className="border-b border-[#1f1f1f] p-4 flex justify-between items-center sticky top-0 bg-[#0a0a0a]/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
          <h1 className="text-sm tracking-widest uppercase font-bold">Sebastian Barrio // Systems Architect</h1>
        </div>
        <nav className="hidden md:flex gap-8 text-[10px] tracking-[0.2em] uppercase text-[#666]">
          <a href="#github-activity" className="hover:text-white transition-colors">Activity</a>
          <a href="#history" className="hover:text-white transition-colors">History</a>
          <a href="#projects" className="hover:text-white transition-colors">Repos</a>
          <a href="#stack" className="hover:text-white transition-colors">Stack</a>
          <a href="#status" className="hover:text-white transition-colors">System Status</a>
          <a href="/masters-research-2027" className="text-blue-500 hover:text-blue-400 transition-colors">Masters Dashboard</a>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-6 pt-24 pb-12">
        {/* Hero Section */}
        <section className="mb-32">
          <div className="inline-block border border-blue-500/30 bg-blue-500/5 px-3 py-1 mb-6 text-[10px] text-blue-400 tracking-tighter uppercase">
            Status: Available for R&D Collaboration
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter leading-none">
            Bridging the gap between <span className="text-blue-500">Silicon</span> and <span className="bg-gradient-to-b from-[#e8e8e8] via-[#a0a0a0] to-[#606060] bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(200,200,200,0.3)]">Steel</span>.
          </h2>
          <p className="max-w-xl text-[#888] text-lg leading-relaxed mb-12">
            AI & Robotics Engineer with a foundation in Mechatronics and a proven record of applying cutting-edge AI to solve complex automation challenges.
          </p>
          <div className="flex gap-4">
            <button 
              onClick={() => window.location.href = 'mailto:sebastianbarrio@example.com'}
              className="bg-white text-black px-6 py-3 text-sm font-bold uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all duration-300 active:scale-95"
            >
              Initiate Contact
            </button>
            <button 
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="border border-[#333] px-6 py-3 text-sm font-bold uppercase tracking-widest hover:border-white transition-all active:scale-95"
            >
              View Log (Projects)
            </button>
          </div>
        </section>

        {/* System Stats / Dashboard Grid */}
        <section id="status" className="grid grid-cols-1 md:grid-cols-3 gap-1 border border-[#1f1f1f] bg-[#1f1f1f] mb-32">
          <div className="bg-[#0a0a0a] p-8 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-[#444]">
              <Cpu size={16} />
              <span className="text-[10px] uppercase tracking-widest">Compute Priority</span>
            </div>
            <div className="text-3xl font-light text-white italic">Robotics / ROS 2</div>
            <div className="w-full h-1 bg-[#111] mt-auto">
              <div className="w-[85%] h-full bg-blue-500" />
            </div>
          </div>
          <div className="bg-[#0a0a0a] p-8 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-[#444]">
              <Database size={16} />
              <span className="text-[10px] uppercase tracking-widest">Neural Load</span>
            </div>
            <div className="text-3xl font-light text-white italic">AI / LLM Agents</div>
            <div className="w-full h-1 bg-[#111] mt-auto">
              <div className="w-[72%] h-full bg-blue-500" />
            </div>
          </div>
          <div className="bg-[#0a0a0a] p-8 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-[#444]">
              <Activity size={16} />
              <span className="text-[10px] uppercase tracking-widest">Physical Integration</span>
            </div>
            <div className="text-3xl font-light text-white italic">Mechatronics</div>
            <div className="w-full h-1 bg-[#111] mt-auto">
              <div className="w-[94%] h-full bg-blue-500" />
            </div>
          </div>
        </section>

        {/* GitHub Activity Graph */}
        <section id="github-activity" className="mb-32">
          <div className="flex justify-between items-end mb-6 border-b border-[#1f1f1f] pb-4">
            <h3 className="text-sm uppercase tracking-[0.3em] text-[#666]">Activity Matrix</h3>
            <span className="text-[10px] text-[#333]">/ github.com/papalino456</span>
          </div>
          <GitHubActivity />
        </section>

        {/* Tech Stack - Skill Constellation */}
        <section id="stack" className="mb-32">
          <div className="flex justify-between items-end mb-12 border-b border-[#1f1f1f] pb-4">
            <h3 className="text-sm uppercase tracking-[0.3em] text-[#666]">Tech Stack</h3>
            <span className="text-[10px] text-[#333]">/ CORE_COMPETENCIES</span>
          </div>

          {/* Skill Radar Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {/* AI & Machine Learning */}
            <div className="group relative bg-[#0a0a0a] border border-[#1f1f1f] p-6 hover:border-blue-500/30 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-500/10 border border-blue-500/20">
                    <Brain size={18} className="text-blue-500" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm uppercase tracking-wider">AI / ML</h4>
                    <span className="text-[10px] text-[#444] uppercase tracking-widest">Neural Systems</span>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { name: 'Python', level: 95, color: 'bg-blue-500' },
                    { name: 'Computer Vision / OpenCV', level: 90, color: 'bg-blue-400' },
                    { name: 'YOLO / Object Detection', level: 88, color: 'bg-blue-400' },
                    { name: 'LLM Agents / RAG', level: 82, color: 'bg-blue-300' },
                    { name: 'PyTorch / TensorFlow', level: 78, color: 'bg-blue-300' },
                  ].map((skill) => (
                    <div key={skill.name} className="space-y-1.5">
                      <div className="flex justify-between text-[10px] uppercase tracking-wider">
                        <span className="text-[#666] group-hover:text-white transition-colors">{skill.name}</span>
                        <span className="text-[#333] group-hover:text-blue-500 transition-colors">{skill.level}%</span>
                      </div>
                      <div className="h-0.5 bg-[#1f1f1f] overflow-hidden">
                        <div 
                          className={`h-full ${skill.color} transition-all duration-1000 ease-out group-hover:animate-pulse`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Robotics & Embedded */}
            <div className="group relative bg-[#0a0a0a] border border-[#1f1f1f] p-6 hover:border-blue-500/30 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-500/10 border border-blue-500/20">
                    <Bot size={18} className="text-blue-500" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm uppercase tracking-wider">Robotics</h4>
                    <span className="text-[10px] text-[#444] uppercase tracking-widest">Physical Systems</span>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { name: 'ROS 2 / Navigation', level: 92, color: 'bg-blue-500' },
                    { name: 'SLAM / Path Planning', level: 88, color: 'bg-blue-400' },
                    { name: 'C++ / Embedded', level: 85, color: 'bg-blue-400' },
                    { name: 'ESP32 / IoT', level: 90, color: 'bg-blue-500' },
                    { name: 'PID / Control Systems', level: 86, color: 'bg-blue-300' },
                  ].map((skill) => (
                    <div key={skill.name} className="space-y-1.5">
                      <div className="flex justify-between text-[10px] uppercase tracking-wider">
                        <span className="text-[#666] group-hover:text-white transition-colors">{skill.name}</span>
                        <span className="text-[#333] group-hover:text-blue-500 transition-colors">{skill.level}%</span>
                      </div>
                      <div className="h-0.5 bg-[#1f1f1f] overflow-hidden">
                        <div 
                          className={`h-full ${skill.color} transition-all duration-1000 ease-out`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Software Engineering */}
            <div className="group relative bg-[#0a0a0a] border border-[#1f1f1f] p-6 hover:border-blue-500/30 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-500/10 border border-blue-500/20">
                    <Code2 size={18} className="text-blue-500" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm uppercase tracking-wider">Software</h4>
                    <span className="text-[10px] text-[#444] uppercase tracking-widest">Full Stack</span>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { name: 'TypeScript / React', level: 88, color: 'bg-blue-500' },
                    { name: 'Next.js / Node.js', level: 85, color: 'bg-blue-400' },
                    { name: 'System Architecture', level: 82, color: 'bg-blue-300' },
                    { name: 'API Design / GraphQL', level: 80, color: 'bg-blue-300' },
                    { name: 'Testing / CI/CD', level: 84, color: 'bg-blue-400' },
                  ].map((skill) => (
                    <div key={skill.name} className="space-y-1.5">
                      <div className="flex justify-between text-[10px] uppercase tracking-wider">
                        <span className="text-[#666] group-hover:text-white transition-colors">{skill.name}</span>
                        <span className="text-[#333] group-hover:text-blue-500 transition-colors">{skill.level}%</span>
                      </div>
                      <div className="h-0.5 bg-[#1f1f1f] overflow-hidden">
                        <div 
                          className={`h-full ${skill.color} transition-all duration-1000 ease-out`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Skill Constellation - Orbital Visualization */}
          <div className="border border-[#1f1f1f] bg-[#050505] p-8 relative overflow-hidden min-h-[400px]">
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
              <div className="flex items-center gap-3 mb-8">
                <Layers size={14} className="text-blue-500" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#444]">Technology Constellation</span>
              </div>

              {/* Orbital Node Layout */}
              <div className="relative h-[320px]">
                {/* Center node - Core */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full animate-pulse" />
                    <div className="relative w-16 h-16 bg-[#0a0a0a] border-2 border-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20">
                      <Microchip size={24} className="text-blue-500" />
                    </div>
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-wider text-blue-500 whitespace-nowrap">Core Stack</span>
                  </div>
                </div>

                {/* Orbital nodes - Inner ring */}
                <div className="absolute left-[25%] top-[25%]">
                  <div className="group relative">
                    <div className="w-12 h-12 bg-[#0a0a0a] border border-blue-400/50 hover:border-blue-400 rounded-lg flex flex-col items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-blue-500/10 cursor-crosshair">
                      <span className="text-lg">🐍</span>
                    </div>
                    <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-wider text-[#666] group-hover:text-blue-400 whitespace-nowrap transition-colors">Python</span>
                  </div>
                </div>

                <div className="absolute right-[25%] top-[22%]">
                  <div className="group relative">
                    <div className="w-12 h-12 bg-[#0a0a0a] border border-blue-400/50 hover:border-blue-400 rounded-lg flex flex-col items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-blue-500/10 cursor-crosshair">
                      <span className="text-lg">🤖</span>
                    </div>
                    <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-wider text-[#666] group-hover:text-blue-400 whitespace-nowrap transition-colors">ROS 2</span>
                  </div>
                </div>

                <div className="absolute right-[20%] bottom-[30%]">
                  <div className="group relative">
                    <div className="w-12 h-12 bg-[#0a0a0a] border border-blue-400/50 hover:border-blue-400 rounded-lg flex flex-col items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-blue-500/10 cursor-crosshair">
                      <span className="text-lg">⚡</span>
                    </div>
                    <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-wider text-[#666] group-hover:text-blue-400 whitespace-nowrap transition-colors">C++</span>
                  </div>
                </div>

                <div className="absolute left-[22%] bottom-[28%]">
                  <div className="group relative">
                    <div className="w-12 h-12 bg-[#0a0a0a] border border-blue-400/50 hover:border-blue-400 rounded-lg flex flex-col items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-blue-500/10 cursor-crosshair">
                      <span className="text-lg">⚛️</span>
                    </div>
                    <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-wider text-[#666] group-hover:text-blue-400 whitespace-nowrap transition-colors">React</span>
                  </div>
                </div>

                {/* Outer ring nodes */}
                <div className="absolute left-[8%] top-[35%]">
                  <div className="group relative">
                    <div className="w-10 h-10 bg-[#0a0a0a] border border-[#333] hover:border-blue-300 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-blue-500/50 cursor-crosshair">
                      <span className="text-sm">👁️</span>
                    </div>
                    <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-wider text-[#555] group-hover:text-blue-300 whitespace-nowrap transition-colors opacity-0 group-hover:opacity-100">OpenCV</span>
                  </div>
                </div>

                <div className="absolute left-[15%] top-[60%]">
                  <div className="group relative">
                    <div className="w-10 h-10 bg-[#0a0a0a] border border-[#333] hover:border-blue-300 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-blue-500/50 cursor-crosshair">
                      <span className="text-sm">🔥</span>
                    </div>
                    <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-wider text-[#555] group-hover:text-blue-300 whitespace-nowrap transition-colors opacity-0 group-hover:opacity-100">PyTorch</span>
                  </div>
                </div>

                <div className="absolute right-[10%] top-[40%]">
                  <div className="group relative">
                    <div className="w-10 h-10 bg-[#0a0a0a] border border-[#333] hover:border-blue-300 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-blue-500/50 cursor-crosshair">
                      <span className="text-sm">🔌</span>
                    </div>
                    <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-wider text-[#555] group-hover:text-blue-300 whitespace-nowrap transition-colors opacity-0 group-hover:opacity-100">ESP32</span>
                  </div>
                </div>

                <div className="absolute right-[15%] bottom-[25%]">
                  <div className="group relative">
                    <div className="w-10 h-10 bg-[#0a0a0a] border border-[#333] hover:border-blue-300 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-blue-500/50 cursor-crosshair">
                      <span className="text-sm">▲</span>
                    </div>
                    <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-wider text-[#555] group-hover:text-blue-300 whitespace-nowrap transition-colors opacity-0 group-hover:opacity-100">Next.js</span>
                  </div>
                </div>

                <div className="absolute left-[40%] bottom-[12%]">
                  <div className="group relative">
                    <div className="w-10 h-10 bg-[#0a0a0a] border border-[#333] hover:border-blue-300 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-blue-500/50 cursor-crosshair">
                      <span className="text-sm">🐳</span>
                    </div>
                    <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-wider text-[#555] group-hover:text-blue-300 whitespace-nowrap transition-colors opacity-0 group-hover:opacity-100">Docker</span>
                  </div>
                </div>

                <div className="absolute right-[35%] top-[12%]">
                  <div className="group relative">
                    <div className="w-10 h-10 bg-[#0a0a0a] border border-[#333] hover:border-blue-300 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-blue-500/50 cursor-crosshair">
                      <span className="text-sm">🧠</span>
                    </div>
                    <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-wider text-[#555] group-hover:text-blue-300 whitespace-nowrap transition-colors opacity-0 group-hover:opacity-100">TensorFlow</span>
                  </div>
                </div>

                <div className="absolute left-[38%] top-[15%]">
                  <div className="group relative">
                    <div className="w-10 h-10 bg-[#0a0a0a] border border-[#333] hover:border-blue-300 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-blue-500/50 cursor-crosshair">
                      <span className="text-sm">🗺️</span>
                    </div>
                    <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-wider text-[#555] group-hover:text-blue-300 whitespace-nowrap transition-colors opacity-0 group-hover:opacity-100">SLAM</span>
                  </div>
                </div>

                {/* Satellite nodes - smallest */}
                <div className="absolute left-[5%] top-[55%]">
                  <div className="group relative">
                    <div className="w-8 h-8 bg-[#0a0a0a] border border-[#222] hover:border-blue-400/40 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-125 hover:bg-blue-500/5 cursor-crosshair">
                      <span className="text-xs">🎯</span>
                    </div>
                    <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-[8px] uppercase tracking-wider text-[#444] group-hover:text-blue-400 whitespace-nowrap transition-colors opacity-0 group-hover:opacity-100">YOLO</span>
                  </div>
                </div>

                <div className="absolute right-[5%] top-[60%]">
                  <div className="group relative">
                    <div className="w-8 h-8 bg-[#0a0a0a] border border-[#222] hover:border-blue-400/40 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-125 hover:bg-blue-500/5 cursor-crosshair">
                      <span className="text-xs">🐧</span>
                    </div>
                    <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-[8px] uppercase tracking-wider text-[#444] group-hover:text-blue-400 whitespace-nowrap transition-colors opacity-0 group-hover:opacity-100">Linux</span>
                  </div>
                </div>

                <div className="absolute left-[55%] bottom-[8%]">
                  <div className="group relative">
                    <div className="w-8 h-8 bg-[#0a0a0a] border border-[#222] hover:border-blue-400/40 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-125 hover:bg-blue-500/5 cursor-crosshair">
                      <span className="text-xs">📡</span>
                    </div>
                    <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-[8px] uppercase tracking-wider text-[#444] group-hover:text-blue-400 whitespace-nowrap transition-colors opacity-0 group-hover:opacity-100">MQTT</span>
                  </div>
                </div>

                <div className="absolute right-[8%] top-[18%]">
                  <div className="group relative">
                    <div className="w-8 h-8 bg-[#0a0a0a] border border-[#222] hover:border-blue-400/40 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-125 hover:bg-blue-500/5 cursor-crosshair">
                      <span className="text-xs">⚙️</span>
                    </div>
                    <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-[8px] uppercase tracking-wider text-[#444] group-hover:text-blue-400 whitespace-nowrap transition-colors opacity-0 group-hover:opacity-100">CUDA</span>
                  </div>
                </div>
              </div>

              {/* Category Legend */}
              <div className="flex flex-wrap justify-center gap-8 mt-4 pt-6 border-t border-[#1f1f1f]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full shadow-lg shadow-blue-500/30" />
                  <span className="text-[10px] uppercase tracking-wider text-[#555]">Core</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 border border-blue-400/50 rounded-lg" />
                  <span className="text-[10px] uppercase tracking-wider text-[#555]">Primary</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 border border-[#444] rounded-full" />
                  <span className="text-[10px] uppercase tracking-wider text-[#555]">Secondary</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 border border-[#333] rounded-full" />
                  <span className="text-[10px] uppercase tracking-wider text-[#444]">Tools</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline / History Section - Horizontal Layout */}
        <section id="history" className="mb-32">
          <div className="flex justify-between items-end mb-12 border-b border-[#1f1f1f] pb-4">
            <h3 className="text-sm uppercase tracking-[0.3em] text-[#666]">Trajectory Log</h3>
            <span className="text-[10px] text-[#333]">/ WORK_AND_EDUCATION</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Entry 01 */}
            <div className="relative pt-8 border-t border-[#1f1f1f]">
              <div className="absolute -top-1.5 left-0 w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
              <div className="text-blue-500 font-bold text-[10px] mb-4 tracking-widest uppercase">2025 // PRESENT</div>
              <h4 className="text-white font-bold text-lg uppercase tracking-tight mb-1">AI R&D Engineer</h4>
              <div className="text-[#666] text-[10px] uppercase mb-4 tracking-wider">Siemens // Munich</div>
              <p className="text-[#888] text-xs leading-relaxed">
                ML pipelines for assembly planning and YOLO-based digitization (&gt;98% accuracy). Novel Fourier-IK methods.
              </p>
            </div>

            {/* Entry 02 */}
            <div className="relative pt-8 border-t border-[#1f1f1f]">
              <div className="absolute -top-1.5 left-0 w-3 h-3 bg-[#333] rounded-full" />
              <div className="text-[#444] font-bold text-[10px] mb-4 tracking-widest uppercase">2021 // 2025</div>
              <h4 className="text-white font-bold text-lg uppercase tracking-tight mb-1">BSc. Mechatronics</h4>
              <div className="text-[#666] text-[10px] uppercase mb-4 tracking-wider">ITESM // Mexico</div>
              <p className="text-[#888] text-xs leading-relaxed">
                Scholarship holder. Specialized in Robotics & Industrial Automation. Exchange at TU Dresden, Germany.
              </p>
            </div>

            {/* Entry 03 */}
            <div className="relative pt-8 border-t border-[#1f1f1f]">
              <div className="absolute -top-1.5 left-0 w-3 h-3 bg-[#333] rounded-full" />
              <div className="text-[#444] font-bold text-[10px] mb-4 tracking-widest uppercase">2023 // 2023</div>
              <h4 className="text-white font-bold text-lg uppercase tracking-tight mb-1">Jr. Front-End Dev</h4>
              <div className="text-[#666] text-[10px] uppercase mb-4 tracking-wider">La Brujula // CDMX</div>
              <p className="text-[#888] text-xs leading-relaxed">
                Design systems, CI/CD pipelines, and API integrations for real-time translation and automation.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Project Preview */}
        <section id="projects" className="mb-32">
          <div className="flex justify-between items-end mb-12 border-b border-[#1f1f1f] pb-4">
            <h3 className="text-sm uppercase tracking-[0.3em] text-[#666]">Active Repositories</h3>
            <ChevronRight className="text-[#333]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Project 01: RobotArm */}
            <a 
              href="https://github.com/papalino456/RobotArm" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group cursor-crosshair block active:scale-[0.98] transition-transform"
            >
              <div className="aspect-video bg-[#111] mb-6 border border-[#1f1f1f] relative overflow-hidden">
                <img 
                  src="/portfolio-2026/projects/robotarm.png" 
                  alt="RobotArm" 
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity"
                />
                <div className="absolute inset-0 opacity-10 pointer-events-none" 
                  style={{ backgroundImage: 'linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                <div className="absolute inset-0 flex items-center justify-center text-[10px] text-white/20 uppercase group-hover:text-blue-500 transition-colors">pkg: robot-arm-cv</div>
              </div>
              <h4 className="text-xl font-bold text-white mb-2 group-hover:text-blue-500 transition-colors">01 / RobotArm</h4>
              <p className="text-[#666] text-sm mb-4">ESP32, IoT, and computer vision enabled servo robot arm. Features a real-time OpenCV pipeline for precise pick-and-place.</p>
              <div className="flex gap-2">
                <span className="text-[9px] border border-[#333] px-2 py-0.5 text-[#444] uppercase">C++</span>
                <span className="text-[9px] border border-[#333] px-2 py-0.5 text-[#444] uppercase">Python</span>
                <span className="text-[9px] border border-[#333] px-2 py-0.5 text-[#444] uppercase">OpenCV</span>
              </div>
            </a>

            {/* Project 02: RoboMop */}
            <a 
              href="https://github.com/papalino456/RoboMop" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group cursor-crosshair block active:scale-[0.98] transition-transform"
            >
              <div className="aspect-video bg-[#111] mb-6 border border-[#1f1f1f] relative overflow-hidden">
                <img 
                  src="/portfolio-2026/projects/robomop.png" 
                  alt="RoboMop" 
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity"
                />
                <div className="absolute inset-0 opacity-10 pointer-events-none" 
                  style={{ backgroundImage: 'linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                <div className="absolute inset-0 flex items-center justify-center text-[10px] text-white/20 uppercase group-hover:text-blue-500 transition-colors">pkg: robomop-slam</div>
              </div>
              <h4 className="text-xl font-bold text-white mb-2 group-hover:text-blue-500 transition-colors">02 / RoboMop</h4>
              <p className="text-[#666] text-sm mb-4">Autonomous cleaning robot featuring SLAM, path planning, and a React-based monitoring dashboard.</p>
              <div className="flex gap-2">
                <span className="text-[9px] border border-[#333] px-2 py-0.5 text-[#444] uppercase">Python</span>
                <span className="text-[9px] border border-[#333] px-2 py-0.5 text-[#444] uppercase">React</span>
                <span className="text-[9px] border border-[#333] px-2 py-0.5 text-[#444] uppercase">SLAM</span>
              </div>
            </a>

            {/* Project 03: ISA */}
            <a 
              href="https://github.com/papalino456/ISA" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group cursor-crosshair block active:scale-[0.98] transition-transform"
            >
              <div className="aspect-video bg-[#111] mb-6 border border-[#1f1f1f] relative overflow-hidden">
                <img 
                  src="/portfolio-2026/projects/isa.png" 
                  alt="ISA" 
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity"
                />
                <div className="absolute inset-0 opacity-10 pointer-events-none" 
                  style={{ backgroundImage: 'linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                <div className="absolute inset-0 flex items-center justify-center text-[10px] text-white/20 uppercase group-hover:text-blue-500 transition-colors">pkg: isa-watering-ai</div>
              </div>
              <h4 className="text-xl font-bold text-white mb-2 group-hover:text-blue-500 transition-colors">03 / ISA System</h4>
              <p className="text-[#666] text-sm mb-4">Automatic, sustainable watering system using AI and IoT based on the ESP-32 chip for scalable agriculture.</p>
              <div className="flex gap-2">
                <span className="text-[9px] border border-[#333] px-2 py-0.5 text-[#444] uppercase">Embedded</span>
                <span className="text-[9px] border border-[#333] px-2 py-0.5 text-[#444] uppercase">IoT</span>
                <span className="text-[9px] border border-[#333] px-2 py-0.5 text-[#444] uppercase">ESP32</span>
              </div>
            </a>

            {/* Project 04: FaceTracker */}
            <a 
              href="https://github.com/papalino456/AGV" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group cursor-crosshair block active:scale-[0.98] transition-transform"
            >
              <div className="aspect-video bg-[#111] mb-6 border border-[#1f1f1f] relative overflow-hidden">
                <img 
                  src="/portfolio-2026/projects/agv.png" 
                  alt="AGV" 
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity"
                />
                <div className="absolute inset-0 opacity-10 pointer-events-none" 
                  style={{ backgroundImage: 'linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                <div className="absolute inset-0 flex items-center justify-center text-[10px] text-white/20 uppercase group-hover:text-blue-500 transition-colors">pkg: agv-raspberry-pi</div>
              </div>
              <h4 className="text-xl font-bold text-white mb-2 group-hover:text-blue-500 transition-colors">04 / AGV Robot</h4>
              <p className="text-[#666] text-sm mb-4">Automatic Guided Vehicle using Raspberry Pi, IR line following, and PID control for industrial logistics.</p>
              <div className="flex gap-2">
                <span className="text-[9px] border border-[#333] px-2 py-0.5 text-[#444] uppercase">Python</span>
                <span className="text-[9px] border border-[#333] px-2 py-0.5 text-[#444] uppercase">RaspberryPi</span>
                <span className="text-[9px] border border-[#333] px-2 py-0.5 text-[#444] uppercase">PID</span>
              </div>
            </a>

            {/* Terminal Style Log Component */}
            <div className="md:col-span-2 bg-[#050505] border border-[#1f1f1f] p-6 font-mono text-[11px] leading-tight relative group">
              <div className="flex justify-between items-center mb-4 border-b border-[#1f1f1f] pb-2 text-[#444]">
                <span>SESSION_LOG: PROACTIVE_AGENT_V3</span>
                <span className="animate-pulse">● LIVE</span>
              </div>
              <div className="space-y-1 max-h-[84px] overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#333 #0a0a0a' }}>
                <p className="text-blue-500">[SYSTEM] Life-Systems Orchestrator: INITIALIZED</p>
                <p className="text-[#666]">[INFO] Scope: Career | R&D | Fitness | Systems</p>
                <p className="text-[#666]">[INFO] Lead Architect: Aoi (Blue Lobster Protocol)</p>
                <p className="text-[#666]">[INFO] Deployment: Verified Assets (RobotArm, RoboMop, ISA, AGV)</p>
                <p className="text-[#666]">[INFO] Fix: Replaced broken assets with GH OpenGraph renders</p>
                <p className="text-[#666]">[INFO] Inboxes: LinkedIn/Gmail monitored. No urgent updates (Ricardo).</p>
                <p className="text-[#666]">[INFO] Heartbeat: Checked system logs & portfolio health. All systems nominal.</p>
                <p className="text-[#666]">[INFO] Knowledge: Monitoring top AI/Robotics Masters (TUM/ETH/Stanford).</p>
                <p className="text-[#666]">[INFO] Maintenance: Synchronized long-term memory & trajectory tracking.</p>
                <p className="text-[#666]">[INFO] Optimization: Refined proactive ideas for Career and R&D momentum.</p>
                <p className="text-[#666]">[INFO] Health: Verified system integrity and deployment stability.</p>
                <p className="text-[#666]">[INFO] Self-Healing: Resolved cron model mismatch for Macro-Coach.</p>
                <p className="text-[#666]">[INFO] Monitoring: Career trajectories and R&D benchmarks synced.</p>
                <p className="text-[#666]">[INFO] Dashboard: Initialized Phase 1 research for Masters 2027.</p>
                <p className="text-[#666]">[INFO] Dashboard: Deployed Masters Application Tracker 2027.</p>
                <p className="text-green-500">[COMPLETED] Masters Research Phases 1 & 2: ETH/TUM/Delft/US data synced.</p>
                <p className="text-blue-400">[DEPLOYED] Masters Dashboard v2.0: Interactive requirements & financial roadmap live.</p>
                <p className="text-blue-400">[DESIGN] Consolidated Masters Dashboard to 'Steel & Silicon' monochromatic theme with Electric Blue accents.</p>
                <p className="text-[#666]">[INFO] Heartbeat: Synced daily systems (Calendar/Inbox). Flagged maintenance task (DINN). Deployment: Stable.</p>
                <p className="text-blue-400">[PROACTIVE] User feedback: Increased heartbeat frequency. New content generation: ACTIVE.</p>
                <p className="text-blue-400">[IDEA] Research Note: Google AI's RT-2 model shows promise for bridging high-level reasoning with low-level robotic control—directly relevant to Siemens R&D trajectory.</p>
                <p className="text-blue-400">[RESEARCH] TU Delft Cognitive Robotics Lab (Prof. Kober): Perfect alignment found. Inverse kinematics + learning-based manipulation research matches Fourier-IK expertise. Program at capacity—early application critical.</p>
                <p className="text-blue-400">[RESEARCH] ETH Zurich ASL (Prof. Siegwart): Perfect match for Siemens background. Focus on control + autonomous systems. Deadline: Nov 30.</p>
                <p className="text-blue-400">[RESEARCH] TUM (MSc Robotics): German B2 hurdle identified. Tuition shift to €4k-6k/sem verified.</p>
                <p className="text-green-500">[STATUS] Job Hunter Phase 1: Lead acquisition from Amazon (Frontier AI), Samsung, and Waymo active.</p>
                <p className="text-green-500">[ACTION] TOEFL/IELTS scheduled for February 2026. SOP draft v0.1 complete. Masters 2027 trajectory: ON TRACK.</p>
                <p className="text-blue-400">[RESEARCH] TUM MSc Robotics documented: English sufficient (EU), May 31 2027 deadline, Munich ecosystem ideal for Siemens alumni.</p>
                <p className="text-blue-400">[CONTENT] LinkedIn drafts (3 angles) + SOP draft ready. Job Hunter: 17 leads, top 3 prioritized (Edison Smart, FieldAI, Prehensio).</p>
                <p className="text-[#666]">[HEARTBEAT] Portfolio verified (HTTP 200). No recruiter updates. Systems nominal.</p>
                <p className="text-blue-400">[RESEARCH] Investigating Google's latest 'Internal Teammatching' strategies to better assist with Ricardo's upcoming follow-up.</p>
                <p className="text-blue-400">[LEAD] Glassdoor alert: 9 Mechatronics/Robotics roles in Germany. Prehensio GmbH (Heilbronn) hiring for Grasp Planning + Perception. €50-80k range. Strong Siemens ecosystem overlap.</p>
                <p className="text-blue-400">[DEPLOYED] GitHub Activity Matrix: Steel & Silicon themed contribution graph live. 400+ commits visualized with custom zinc-to-blue gradient.</p>
                <p className="text-yellow-500">[DECISION] QS Discover Masters Fair (Feb 11) — Attendance cancelled. Pivoting to virtual info sessions + direct professor outreach.</p>
                <p className="text-blue-400">[PROACTIVE] QS Discover cheat sheet created for alternative outreach: TUM/ETH/Delft contact strategy ready.</p>
                <p className="text-[#666]">[HEARTBEAT] Afternoon check: Portfolio healthy, no recruiter updates. Deep work period active.</p>
                <p className="text-blue-400">[HEARTBEAT] Feb 28 15:00 CST: Scanned inboxes — 6 new US research roles flagged (DeepMind Applied Robotics, Amazon FAR, Apple ML Research). Mercedes-Benz connection pending. German applications due for follow-up.</p>
                <p className="text-blue-400">[HEARTBEAT] Feb 28 21:00 CST: Portfolio verified (HTTP 200, screenshot captured). Gmail storage at 89% — cleanup recommended. No updates from Ricardo (team-matching continues). Calendar clear next 7 days.</p>
                <p className="text-white font-bold">{">"} MISSION: HOLISTIC_OPTIMIZATION</p>
              </div>
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                 <Terminal size={40} className="text-blue-500" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Terminal Footer */}
      <footer className="border-t border-[#1f1f1f] p-8 text-[10px] text-[#333] flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Terminal size={12} />
          <span>SYSTEM_VERSION: 1.0.4 // DESKTOP-5D7BUJT</span>
        </div>
        <div className="tracking-widest uppercase">
          &copy; 2026 Sebastian Barrio. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
