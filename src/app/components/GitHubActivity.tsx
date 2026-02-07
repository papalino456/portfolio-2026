'use client';

'use client';

import React from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { Github, GitCommit, GitBranch } from 'lucide-react';

// Steel & Silicon theme for the contribution graph
const customTheme = {
  dark: ['#0a0a0a', '#1f1f1f', '#333333', '#3b82f6', '#60a5fa'],
};

export default function GitHubActivity() {
  return (
    <div className="border border-[#1f1f1f] bg-[#0a0a0a] p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b border-[#1f1f1f] pb-4">
        <div className="flex items-center gap-3">
          <Github size={18} className="text-blue-500" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#666]">Commit Activity Stream</span>
        </div>
        <div className="flex items-center gap-4 text-[10px] text-[#444]">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-[#1f1f1f] rounded-sm" /> None
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-[#333] rounded-sm" /> Low
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-blue-500 rounded-sm" /> High
          </span>
        </div>
      </div>

      {/* Activity Graph */}
      <div className="flex justify-center overflow-x-auto">
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
        <div className="flex items-center gap-3 p-4 bg-[#111]">
          <GitCommit size={14} className="text-blue-500" />
          <div>
            <div className="text-[10px] uppercase tracking-widest text-[#444]">Total Commits</div>
            <div className="text-lg font-light text-white">400+</div>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-[#111]">
          <GitBranch size={14} className="text-blue-500" />
          <div>
            <div className="text-[10px] uppercase tracking-widest text-[#444]">Active Repos</div>
            <div className="text-lg font-light text-white">12</div>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-[#111]">
          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
          <div>
            <div className="text-[10px] uppercase tracking-widest text-[#444]">Current Streak</div>
            <div className="text-lg font-light text-white">Active</div>
          </div>
        </div>
      </div>
    </div>
  );
}
