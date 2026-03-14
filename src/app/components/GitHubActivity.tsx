'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GitHubCalendar } from 'react-github-calendar';
import { Github, GitCommit, GitBranch, Star } from 'lucide-react';
import { CountUp } from './animations';

// Steel & Silicon theme for the contribution graph
const customTheme = {
  dark: ['#0a0a0a', '#1a1a1a', '#2a2a2a', '#3b82f6', '#60a5fa'],
};

const STATS = [
  { icon: GitCommit, label: 'Total Commits', value: 400, suffix: '+' },
  { icon: GitBranch, label: 'Active Repos', value: 12, suffix: '' },
  { icon: Star, label: 'Contributions', value: 50, suffix: '+' },
];

export default function GitHubActivity() {
  return (
    <div className="border border-[#1f1f1f] bg-[#0a0a0a] p-6 hover:border-[#2a2a2a] transition-colors duration-500">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b border-[#1f1f1f] pb-4">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Github size={18} className="text-blue-500" />
          </motion.div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#666]">Commit Activity Stream</span>
        </div>
        <div className="flex items-center gap-4 text-[10px] text-[#444]">
          {[
            { color: 'bg-[#0a0a0a]', label: 'None' },
            { color: 'bg-[#1a1a1a]', label: 'Low' },
            { color: 'bg-[#2a2a2a]', label: 'Med' },
            { color: 'bg-blue-500', label: 'High' },
          ].map((item) => (
            <span key={item.label} className="flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 ${item.color} rounded-sm`} /> 
              {item.label}
            </span>
          ))}
        </div>
      </div>

      {/* Activity Graph */}
      <div className="flex justify-center overflow-x-auto py-2">
        <GitHubCalendar
          username="papalino456"
          theme={customTheme}
          blockSize={12}
          blockMargin={3}
          fontSize={10}
          colorScheme="dark"
          style={{
            color: '#666',
          }}
          labels={{
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            totalCount: '{{count}} commits in the last year',
          }}
        />
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-1 mt-6 pt-4 border-t border-[#1f1f1f]">
        {STATS.map((stat, index) => (
          <motion.div 
            key={stat.label}
            className="flex items-center gap-3 p-4 bg-[#111] group hover:bg-[#161616] transition-colors"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <stat.icon size={16} className="text-blue-500 group-hover:scale-110 transition-transform" />
            <div>
              <div className="text-[10px] uppercase tracking-widest text-[#444]">{stat.label}</div>
              <div className="text-xl font-light text-white">
                <CountUp end={stat.value} suffix={stat.suffix} duration={2} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
