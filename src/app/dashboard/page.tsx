'use client';

import React, { useState, useMemo } from 'react';
import { 
  Terminal, 
  Calendar, 
  DollarSign, 
  CheckCircle2, 
  Circle, 
  Clock, 
  AlertTriangle, 
  ChevronDown, 
  ChevronUp,
  ExternalLink,
  GraduationCap,
  FileText,
  Award,
  Target,
  TrendingUp,
  MapPin,
  BookOpen
} from 'lucide-react';
import { 
  universities, 
  getDaysUntil, 
  getUrgencyColor, 
  getStatusColor, 
  getStatusLabel,
  getCompletedCount,
  getTotalRequired,
  getOverallProgress,
  type University,
  type ChecklistItem
} from '../../data/masters-data';

export default function Dashboard() {
  const [expandedUni, setExpandedUni] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'financial'>('overview');

  const sortedUniversities = useMemo(() => {
    return [...universities].sort((a, b) => a.deadlineDate.getTime() - b.deadlineDate.getTime());
  }, []);

  const overallProgress = getOverallProgress();
  const totalCost = universities.reduce((sum, u) => {
    const cost = parseInt(u.totalCost.replace(/[^0-9]/g, '')) || 0;
    return sum + cost;
  }, 0);

  const toggleExpand = (id: string) => {
    setExpandedUni(expandedUni === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#d4d4d4] font-mono selection:bg-[#333] selection:text-white">
      {/* HUD Header */}
      <header className="border-b border-[#1f1f1f] p-4 flex justify-between items-center sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-md z-50">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
          <div>
            <h1 className="text-sm tracking-widest uppercase font-bold">Masters Dashboard 2027</h1>
            <p className="text-[9px] text-[#666] tracking-wider">AI / ROBOTICS TRACK</p>
          </div>
        </div>
        <nav className="hidden md:flex gap-6 text-[10px] tracking-[0.2em] uppercase">
          <a href="/" className="text-[#666] hover:text-white transition-colors">Portfolio</a>
          <span className="text-white">Dashboard</span>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-12">
        {/* Hero Stats */}
        <section className="mb-8">
          <div className="flex justify-between items-end mb-6 border-b border-[#1f1f1f] pb-4">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Application Command Center</h2>
              <p className="text-[#666] text-sm mt-1">Track deadlines, progress, and financials across 5 target programs</p>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-[#666] uppercase tracking-widest mb-1">Overall Progress</div>
              <div className="text-3xl font-bold text-blue-500">{overallProgress}%</div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-1 bg-[#111] p-1 rounded mb-6">
            {(['overview', 'timeline', 'financial'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 text-[10px] uppercase tracking-widest transition-all ${
                  activeTab === tab 
                    ? 'bg-blue-500 text-white' 
                    : 'text-[#666] hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </section>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <section className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {sortedUniversities.map((uni) => {
                const daysUntil = getDaysUntil(uni.deadlineDate);
                const urgencyColor = getUrgencyColor(daysUntil);
                const completed = getCompletedCount(uni);
                const total = uni.checklist.length;
                const isExpanded = expandedUni === uni.id;

                return (
                  <div 
                    key={uni.id}
                    className="border border-[#1f1f1f] bg-[#0f0f0f] overflow-hidden"
                  >
                    {/* Card Header */}
                    <div 
                      className="p-4 cursor-pointer hover:bg-[#151515] transition-colors"
                      onClick={() => toggleExpand(uni.id)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span 
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: getStatusColor(uni.status) }}
                            />
                            <span className="text-[9px] uppercase tracking-widest text-[#666]">
                              Priority #{uni.priority}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-white">{uni.name}</h3>
                          <p className="text-[#888] text-xs">{uni.program}</p>
                        </div>
                        <div className="text-right">
                          <div 
                            className="text-2xl font-bold"
                            style={{ color: urgencyColor }}
                          >
                            {daysUntil < 0 ? 'OVER' : daysUntil}
                          </div>
                          <div className="text-[9px] text-[#666] uppercase tracking-wider">
                            {daysUntil < 0 ? 'DAYS AGO' : 'DAYS LEFT'}
                          </div>
                        </div>
                      </div>

                      {/* Quick Stats Row */}
                      <div className="grid grid-cols-3 gap-2 text-[10px] mb-3">
                        <div className="bg-[#0a0a0a] p-2 border border-[#1f1f1f]">
                          <div className="text-[#666] mb-1">DEADLINE</div>
                          <div className="text-white">{uni.deadline}</div>
                        </div>
                        <div className="bg-[#0a0a0a] p-2 border border-[#1f1f1f]">
                          <div className="text-[#666] mb-1">TOTAL COST</div>
                          <div className="text-white">{uni.totalCost}</div>
                        </div>
                        <div className="bg-[#0a0a0a] p-2 border border-[#1f1f1f]">
                          <div className="text-[#666] mb-1">PROGRESS</div>
                          <div className="text-white">{completed}/{total}</div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full h-1 bg-[#1f1f1f] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 transition-all duration-500"
                          style={{ width: `${(completed / total) * 100}%` }}
                        />
                      </div>

                      <div className="flex justify-between items-center mt-3">
                        <span className="text-[9px] text-[#666] uppercase tracking-wider">
                          {getStatusLabel(uni.status)}
                        </span>
                        {isExpanded ? (
                          <ChevronUp size={14} className="text-[#666]" />
                        ) : (
                          <ChevronDown size={14} className="text-[#666]" />
                        )}
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="border-t border-[#1f1f1f] p-4 bg-[#0a0a0a]">
                        {/* Checklist */}
                        <div className="mb-6">
                          <h4 className="text-[10px] uppercase tracking-widest text-[#666] mb-3 flex items-center gap-2">
                            <CheckCircle2 size={12} />
                            Application Checklist
                          </h4>
                          <div className="space-y-2">
                            {['documents', 'tests', 'application', 'funding'].map((category) => {
                              const items = uni.checklist.filter(item => item.category === category);
                              if (items.length === 0) return null;
                              
                              return (
                                <div key={category}>
                                  <div className="text-[9px] text-[#444] uppercase tracking-wider mb-2">
                                    {category}
                                  </div>
                                  {items.map((item) => (
                                    <ChecklistItemRow key={item.id} item={item} />
                                  ))}
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Scholarships */}
                        {uni.scholarships.length > 0 && (
                          <div className="mb-6">
                            <h4 className="text-[10px] uppercase tracking-widest text-[#666] mb-3 flex items-center gap-2">
                              <Award size={12} />
                              Scholarships
                            </h4>
                            {uni.scholarships.map((scholarship, idx) => {
                              const schDays = getDaysUntil(scholarship.deadlineDate);
                              return (
                                <div key={idx} className="bg-[#0f0f0f] border border-[#1f1f1f] p-3 mb-2">
                                  <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs text-white font-medium">{scholarship.name}</span>
                                    <span 
                                      className="text-[9px] px-2 py-0.5 rounded"
                                      style={{ 
                                        backgroundColor: schDays < 30 ? '#f59e0b20' : '#22c55e20',
                                        color: schDays < 30 ? '#f59e0b' : '#22c55e'
                                      }}
                                    >
                                      {schDays < 0 ? 'CLOSED' : `${schDays}d`}
                                    </span>
                                  </div>
                                  <div className="text-[10px] text-[#888] mb-1">{scholarship.amount}</div>
                                  <div className="text-[9px] text-[#666]">Deadline: {scholarship.deadline}</div>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Notes */}
                        <div>
                          <h4 className="text-[10px] uppercase tracking-widest text-[#666] mb-3 flex items-center gap-2">
                            <FileText size={12} />
                            Notes
                          </h4>
                          <ul className="space-y-1">
                            {uni.notes.map((note, idx) => (
                              <li key={idx} className="text-[10px] text-[#888] flex items-start gap-2">
                                <span className="text-blue-500">→</span>
                                {note}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Timeline Tab */}
        {activeTab === 'timeline' && (
          <section>
            <div className="border border-[#1f1f1f] bg-[#0f0f0f] p-6">
              <h3 className="text-sm uppercase tracking-widest text-[#666] mb-8 flex items-center gap-2">
                <Clock size={14} />
                Application Timeline 2026-2027
              </h3>
              
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-4 top-0 bottom-0 w-px bg-[#1f1f1f]" />
                
                <div className="space-y-6">
                  {[
                    ...sortedUniversities.flatMap(u => [
                      { date: u.deadlineDate, type: 'deadline', uni: u, label: 'Application Deadline' },
                      ...u.scholarships.map(s => ({
                        date: s.deadlineDate,
                        type: 'scholarship' as const,
                        uni: u,
                        label: s.name,
                        amount: s.amount
                      }))
                    ]),
                  ]
                    .sort((a, b) => a.date.getTime() - b.date.getTime())
                    .map((event, idx) => {
                      const daysUntil = getDaysUntil(event.date);
                      const isPast = daysUntil < 0;
                      
                      return (
                        <div key={idx} className="relative flex items-start gap-4 pl-12">
                          {/* Timeline Dot */}
                          <div 
                            className={`absolute left-2 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              isPast 
                                ? 'bg-[#1f1f1f] border-[#333]' 
                                : daysUntil < 30 
                                  ? 'bg-[#f59e0b20] border-[#f59e0b]' 
                                  : 'bg-[#3b82f620] border-[#3b82f6]'
                            }`}
                          >
                            {event.type === 'deadline' ? (
                              <GraduationCap size={10} className={isPast ? '#666' : daysUntil < 30 ? '#f59e0b' : '#3b82f6'} />
                            ) : (
                              <Award size={10} className={isPast ? '#666' : daysUntil < 30 ? '#f59e0b' : '#3b82f6'} />
                            )}
                          </div>
                          
                          {/* Event Card */}
                          <div className={`flex-1 border p-3 ${
                            isPast 
                              ? 'border-[#1f1f1f] bg-[#0a0a0a] opacity-50' 
                              : daysUntil < 30 
                                ? 'border-[#f59e0b30] bg-[#f59e0b05]' 
                                : 'border-[#1f1f1f] bg-[#0f0f0f]'
                          }`}>
                            <div className="flex justify-between items-start mb-1">
                              <span className="text-xs text-white font-medium">{event.uni.name}</span>
                              <span className={`text-[9px] ${daysUntil < 30 && !isPast ? 'text-[#f59e0b]' : 'text-[#666]'}`}>
                                {event.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                              </span>
                            </div>
                            <div className="text-[10px] text-[#888]">{event.label}</div>
                            {'amount' in event && (
                              <div className="text-[9px] text-blue-500 mt-1">{event.amount}</div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Financial Tab */}
        {activeTab === 'financial' && (
          <section className="space-y-6">
            {/* Cost Comparison Table */}
            <div className="border border-[#1f1f1f] bg-[#0f0f0f] overflow-hidden">
              <div className="p-4 border-b border-[#1f1f1f]">
                <h3 className="text-sm uppercase tracking-widest text-[#666] flex items-center gap-2">
                  <DollarSign size={14} />
                  Cost Comparison (2-Year Total)
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-[11px]">
                  <thead>
                    <tr className="border-b border-[#1f1f1f] text-[#666] uppercase tracking-wider">
                      <th className="text-left p-4">University</th>
                      <th className="text-right p-4">Tuition</th>
                      <th className="text-right p-4">Living</th>
                      <th className="text-right p-4 text-white">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {universities
                      .sort((a, b) => {
                        const costA = parseInt(a.totalCost.replace(/[^0-9]/g, '')) || 0;
                        const costB = parseInt(b.totalCost.replace(/[^0-9]/g, '')) || 0;
                        return costA - costB;
                      })
                      .map((uni) => (
                        <tr key={uni.id} className="border-b border-[#1f1f1f] hover:bg-[#0a0a0a]">
                          <td className="p-4">
                            <div className="text-white font-medium">{uni.name}</div>
                            <div className="text-[#666]">{uni.location}</div>
                          </td>
                          <td className="text-right p-4 text-[#888]">{uni.tuitionTotal}</td>
                          <td className="text-right p-4 text-[#888]">{uni.livingCostTotal}</td>
                          <td className="text-right p-4 text-white font-bold">{uni.totalCost}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Scholarship Opportunities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-[#1f1f1f] bg-[#0f0f0f] p-4">
                <h3 className="text-[10px] uppercase tracking-widest text-[#666] mb-4 flex items-center gap-2">
                  <Award size={12} />
                  Top Scholarship Opportunities
                </h3>
                <div className="space-y-3">
                  {[
                    { name: 'ETH ESOP', value: 'Full funding', deadline: 'Nov 30, 2026' },
                    { name: 'TU Delft Excellence', value: 'Full funding', deadline: 'Dec 1, 2026' },
                    { name: 'MIT RA/TA', value: 'Full tuition + stipend', deadline: 'Dec 2026' },
                    { name: 'Knight-Hennessy', value: 'Full funding', deadline: 'Oct 2026' },
                    { name: 'DAAD Germany', value: '~€934/month', deadline: 'Varies' },
                  ].map((sch, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-[#1f1f1f] last:border-0">
                      <div>
                        <div className="text-xs text-white">{sch.name}</div>
                        <div className="text-[9px] text-[#666]">{sch.deadline}</div>
                      </div>
                      <div className="text-[10px] text-blue-500">{sch.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-[#1f1f1f] bg-[#0f0f0f] p-4">
                <h3 className="text-[10px] uppercase tracking-widest text-[#666] mb-4 flex items-center gap-2">
                  <MapPin size={12} />
                  Monthly Living Costs
                </h3>
                <div className="space-y-3">
                  {[
                    { city: 'Delft', cost: '€1,100-1,600', note: 'Most affordable' },
                    { city: 'Munich', cost: '€1,200-1,800', note: 'Tuition-free' },
                    { city: 'Zurich', cost: '€1,800-2,700', note: 'Highest in Europe' },
                    { city: 'Boston (MIT)', cost: '$2,500-3,600', note: '~€2,300-3,300' },
                    { city: 'Palo Alto', cost: '$3,000-4,600', note: '~€2,800-4,300' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-[#1f1f1f] last:border-0">
                      <div>
                        <div className="text-xs text-white">{item.city}</div>
                        <div className="text-[9px] text-[#666]">{item.note}</div>
                      </div>
                      <div className="text-[10px] text-[#888]">{item.cost}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Best Value Analysis */}
            <div className="border border-[#1f1f1f] bg-[#0f0f0f] p-4">
              <h3 className="text-[10px] uppercase tracking-widest text-[#666] mb-4 flex items-center gap-2">
                <TrendingUp size={12} />
                Strategic Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[11px]">
                <div className="bg-[#0a0a0a] border border-[#1f1f1f] p-3">
                  <div className="text-blue-500 font-bold mb-2">Best Value</div>
                  <p className="text-[#888]">
                    <strong className="text-white">TUM</strong> offers tuition-free education with Munich's robotics hub access. Total cost ~€36K over 2 years.
                  </p>
                </div>
                <div className="bg-[#0a0a0a] border border-[#1f1f1f] p-3">
                  <div className="text-blue-500 font-bold mb-2">Prestige Pick</div>
                  <p className="text-[#888]">
                    <strong className="text-white">ETH Zurich</strong> is Europe's MIT. Higher living costs (~€50K total) but exceptional reputation and industry connections.
                  </p>
                </div>
                <div className="bg-[#0a0a0a] border border-[#1f1f1f] p-3">
                  <div className="text-blue-500 font-bold mb-2">Wildcard</div>
                  <p className="text-[#888]">
                    <strong className="text-white">MIT/Stanford</strong> require RA/TA funding. ~$195-210K cost without aid. Apply strategically.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Footer Terminal */}
        <div className="mt-12 bg-[#050505] border border-[#1f1f1f] p-4 font-mono text-[10px]">
          <div className="flex justify-between items-center mb-3 border-b border-[#1f1f1f] pb-2 text-[#444]">
            <span>DASHBOARD_LOG: MASTERS_TRACKER_V1</span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              LIVE
            </span>
          </div>
          <div className="space-y-1 text-[#666]">
            <p>[INFO] Tracking 5 universities across 3 countries</p>
            <p>[INFO] Next deadline: ETH Zurich (Nov 30, 2026)</p>
            <p>[INFO] Total estimated budget range: €35K - $210K</p>
            <p className="text-blue-500">{`>`} MISSION: MASTERS_2027_ACQUISITION</p>
          </div>
        </div>
      </main>
    </div>
  );
}

function ChecklistItemRow({ item }: { item: ChecklistItem }) {
  const [checked, setChecked] = useState(item.completed);
  
  return (
    <label className="flex items-center gap-3 p-2 hover:bg-[#0f0f0f] cursor-pointer group">
      <div className={`w-4 h-4 border flex items-center justify-center transition-all ${
        checked 
          ? 'bg-blue-500 border-blue-500' 
          : 'border-[#333] group-hover:border-[#666]'
      }`}>
        {checked && <CheckCircle2 size={12} className="text-white" />}
      </div>
      <input 
        type="checkbox" 
        className="hidden" 
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
      <span className={`text-[11px] ${checked ? 'text-[#666] line-through' : 'text-[#888]'}`}>
        {item.label}
        {!item.required && (
          <span className="ml-2 text-[9px] text-[#444]">(optional)</span>
        )}
      </span>
    </label>
  );
}
