import React from 'react';
import { Terminal, Cpu, Database, Activity, ChevronRight } from 'lucide-react';

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
          <a href="#projects" className="hover:text-white transition-colors">Projects</a>
          <a href="#stack" className="hover:text-white transition-colors">Stack</a>
          <a href="#status" className="hover:text-white transition-colors">System Status</a>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-6 pt-24 pb-12">
        {/* Hero Section */}
        <section className="mb-32">
          <div className="inline-block border border-blue-500/30 bg-blue-500/5 px-3 py-1 mb-6 text-[10px] text-blue-400 tracking-tighter uppercase">
            Status: Available for R&D Collaboration
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter leading-none">
            Bridging the gap between <span className="text-blue-500">Silicon</span> and <span className="text-[#444]">Steel</span>.
          </h2>
          <p className="max-w-xl text-[#888] text-lg leading-relaxed mb-12">
            AI & Robotics Engineer with a foundation in Mechatronics and a proven record of applying cutting-edge AI to solve complex automation challenges.
          </p>
          <div className="flex gap-4">
            <button className="bg-white text-black px-6 py-3 text-sm font-bold uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all duration-300">
              Initiate Contact
            </button>
            <button className="border border-[#333] px-6 py-3 text-sm font-bold uppercase tracking-widest hover:border-white transition-all">
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

        {/* Featured Project Preview */}
        <section id="projects" className="mb-32">
          <div className="flex justify-between items-end mb-12 border-b border-[#1f1f1f] pb-4">
            <h3 className="text-sm uppercase tracking-[0.3em] text-[#666]">Active Repositories</h3>
            <ChevronRight className="text-[#333]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Terminal Style Log Component */}
            <div className="md:col-span-2 bg-[#050505] border border-[#1f1f1f] p-6 font-mono text-[11px] leading-tight overflow-hidden relative group">
              <div className="flex justify-between items-center mb-4 border-b border-[#1f1f1f] pb-2 text-[#444]">
                <span>SESSION_LOG: PROACTIVE_AGENT_V1</span>
                <span className="animate-pulse">● LIVE</span>
              </div>
              <div className="space-y-1">
                <p className="text-blue-500">[SYSTEM] Syncing CV data with R&D experience...</p>
                <p className="text-[#666]">[INFO] Siemens Munich Internship: Discovered</p>
                <p className="text-[#666]">[INFO] Fourier-IK Optimization: Integrated</p>
                <p className="text-[#666]">[INFO] Scanning active mechatronics repositories...</p>
                <p className="text-white font-bold">{">"} DEPLOYMENT_READY: PORTFOLIO_V1.1.0</p>
              </div>
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                 <Terminal size={40} className="text-blue-500" />
              </div>
            </div>

            <div className="group cursor-crosshair">
              <div className="aspect-video bg-[#111] mb-6 border border-[#1f1f1f] relative overflow-hidden">
                {/* Simulated Grid Overlay */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" 
                  style={{ backgroundImage: 'linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                <div className="absolute inset-0 flex items-center justify-center text-[10px] text-[#333] uppercase">Image_Placeholder:Autonomous_Rover</div>
              </div>
              <h4 className="text-xl font-bold text-white mb-2 group-hover:text-blue-500 transition-colors">01 / assembly-by-disassembly</h4>
              <p className="text-[#666] text-sm mb-4">Engineered an ML pipeline for AI-driven assembly planning (Python/C#) at Siemens, featuring ML-RRT*, D*, and RL for path-finding.</p>
              <div className="flex gap-2">
                <span className="text-[9px] border border-[#333] px-2 py-0.5 text-[#444] uppercase">Python</span>
                <span className="text-[9px] border border-[#333] px-2 py-0.5 text-[#444] uppercase">C#</span>
                <span className="text-[9px] border border-[#333] px-2 py-0.5 text-[#444] uppercase">RL</span>
              </div>
            </div>
            <div className="group cursor-crosshair">
              <div className="aspect-video bg-[#111] mb-6 border border-[#1f1f1f] relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none" 
                  style={{ backgroundImage: 'linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                <div className="absolute inset-0 flex items-center justify-center text-[10px] text-[#333] uppercase">Image_Placeholder:Kinematics_Fourier</div>
              </div>
              <h4 className="text-xl font-bold text-white mb-2 group-hover:text-blue-500 transition-colors">02 / Fourier-IK</h4>
              <p className="text-[#666] text-sm mb-4">Novel method for constrained component placement using Fourier transforms to estimate solution density for discrete inverse kinematics.</p>
              <div className="flex gap-2">
                <span className="text-[9px] border border-[#333] px-2 py-0.5 text-[#444] uppercase">Python</span>
                <span className="text-[9px] border border-[#333] px-2 py-0.5 text-[#444] uppercase">Mechatronics</span>
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
