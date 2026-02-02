export interface University {
  id: string;
  name: string;
  program: string;
  location: string;
  deadline: string;
  deadlineDate: Date;
  tuitionYearly: string;
  tuitionTotal: string;
  livingCostMonthly: string;
  livingCostTotal: string;
  totalCost: string;
  duration: string;
  credits: number;
  status: 'not-started' | 'in-progress' | 'submitted' | 'accepted' | 'rejected';
  priority: number;
  greRequired: boolean;
  greWaived: boolean;
  languageTest: string;
  scholarships: Scholarship[];
  checklist: ChecklistItem[];
  notes: string[];
}

export interface Scholarship {
  name: string;
  amount: string;
  deadline: string;
  deadlineDate: Date;
  requirements: string;
  eligible: boolean;
}

export interface ChecklistItem {
  id: string;
  label: string;
  required: boolean;
  completed: boolean;
  category: 'documents' | 'tests' | 'application' | 'funding';
}

export const universities: University[] = [
  {
    id: 'eth-zurich',
    name: 'ETH Zurich',
    program: 'MSc Robotics, Systems and Control',
    location: 'Zurich, Switzerland',
    deadline: 'Nov 30, 2026',
    deadlineDate: new Date('2026-11-30'),
    tuitionYearly: '~CHF 1,500',
    tuitionTotal: '~CHF 2,250',
    livingCostMonthly: '€1,800-2,700',
    livingCostTotal: '~€50,000',
    totalCost: '~€52,000',
    duration: '1.5-2 years',
    credits: 90,
    status: 'not-started',
    priority: 1,
    greRequired: true,
    greWaived: true,
    languageTest: 'English (waived if BSc in English)',
    scholarships: [
      {
        name: 'ESOP (Excellence Scholarship)',
        amount: 'Full tuition + CHF 12,000/semester',
        deadline: 'Nov 30, 2026',
        deadlineDate: new Date('2026-11-30'),
        requirements: 'Top 10% of Bachelor\'s program, pre-proposal',
        eligible: true,
      },
    ],
    checklist: [
      { id: 'eth-cv', label: 'Curriculum Vitae', required: true, completed: false, category: 'documents' },
      { id: 'eth-transcript', label: 'Academic Transcripts', required: true, completed: false, category: 'documents' },
      { id: 'eth-lor1', label: 'Letter of Recommendation #1', required: true, completed: false, category: 'documents' },
      { id: 'eth-lor2', label: 'Letter of Recommendation #2', required: true, completed: false, category: 'documents' },
      { id: 'eth-sop', label: 'Statement of Purpose', required: true, completed: false, category: 'documents' },
      { id: 'eth-preproposal', label: 'ESOP Pre-proposal (500 words)', required: false, completed: false, category: 'funding' },
      { id: 'eth-esop-lor', label: 'ESOP Reference Letters (2)', required: false, completed: false, category: 'funding' },
      { id: 'eth-esop-motivation', label: 'ESOP Motivation Letter', required: false, completed: false, category: 'funding' },
    ],
    notes: [
      'Application window: Nov 1-30, 2026',
      'EU Bachelor\'s = GRE waived, but still need to apply in November window',
      'Decision notification by March 2027',
    ],
  },
  {
    id: 'tu-delft',
    name: 'TU Delft',
    program: 'MSc Robotics',
    location: 'Delft, Netherlands',
    deadline: 'April 1, 2027 (July 1 final)',
    deadlineDate: new Date('2027-04-01'),
    tuitionYearly: '~€2,530',
    tuitionTotal: '~€5,060',
    livingCostMonthly: '€1,100-1,600',
    livingCostTotal: '~€30,000',
    totalCost: '~€35,000',
    duration: '2 years',
    credits: 120,
    status: 'not-started',
    priority: 2,
    greRequired: false,
    greWaived: true,
    languageTest: 'TOEFL iBT 100+ or IELTS 7.0+',
    scholarships: [
      {
        name: 'Justus & Louise van Effen Excellence Scholarship',
        amount: 'Full tuition + living allowance',
        deadline: 'Dec 1, 2026',
        deadlineDate: new Date('2026-12-01'),
        requirements: 'Top 0.1% of applicants',
        eligible: true,
      },
    ],
    checklist: [
      { id: 'tud-cv', label: 'Curriculum Vitae', required: true, completed: false, category: 'documents' },
      { id: 'tud-transcript', label: 'Academic Transcripts', required: true, completed: false, category: 'documents' },
      { id: 'tud-lor1', label: 'Letter of Recommendation #1', required: true, completed: false, category: 'documents' },
      { id: 'tud-lor2', label: 'Letter of Recommendation #2', required: true, completed: false, category: 'documents' },
      { id: 'tud-sop', label: 'Statement of Purpose', required: true, completed: false, category: 'documents' },
      { id: 'tud-english', label: 'English Proficiency Test', required: true, completed: false, category: 'tests' },
      { id: 'tud-van-effen', label: 'Excellence Scholarship Application', required: false, completed: false, category: 'funding' },
    ],
    notes: [
      'Track options: AI/ML, Physical Design, Haptics',
      'EU deadline April 1 recommended (July 1 final)',
      'Non-EU deadline: Early Jan 2027',
    ],
  },
  {
    id: 'tum',
    name: 'TUM Munich',
    program: 'MSc Robotics, Cognition, Intelligence',
    location: 'Munich, Germany',
    deadline: 'May 31, 2027',
    deadlineDate: new Date('2027-05-31'),
    tuitionYearly: '~€0',
    tuitionTotal: '~€300',
    livingCostMonthly: '€1,200-1,800',
    livingCostTotal: '~€36,000',
    totalCost: '~€36,300',
    duration: '2 years',
    credits: 120,
    status: 'not-started',
    priority: 3,
    greRequired: false,
    greWaived: true,
    languageTest: 'IELTS 6.5+ or TOEFL 88+ (if BSc not in English)',
    scholarships: [
      {
        name: 'Deutschlandstipendium',
        amount: '€300/month',
        deadline: 'Varies',
        deadlineDate: new Date('2027-03-01'),
        requirements: 'High academic achievement',
        eligible: true,
      },
      {
        name: 'Bavarian State Scholarships',
        amount: 'One-time grant',
        deadline: 'Varies',
        deadlineDate: new Date('2027-04-01'),
        requirements: 'Merit or financial need',
        eligible: true,
      },
    ],
    checklist: [
      { id: 'tum-cv', label: 'Curriculum Vitae', required: true, completed: false, category: 'documents' },
      { id: 'tum-transcript', label: 'Academic Transcripts', required: true, completed: false, category: 'documents' },
      { id: 'tum-lor1', label: 'Letter of Recommendation #1', required: true, completed: false, category: 'documents' },
      { id: 'tum-lor2', label: 'Letter of Recommendation #2', required: true, completed: false, category: 'documents' },
      { id: 'tum-motivation', label: 'Letter of Motivation', required: true, completed: false, category: 'documents' },
      { id: 'tum-english', label: 'English Proficiency Test', required: true, completed: false, category: 'tests' },
    ],
    notes: [
      'Tuition-free for EU citizens (only ~€150/semester fee)',
      'Aptitude assessment: Stage 1 (GPA-based) or Stage 2 (interview)',
      'Munich robotics hub: BMW, Siemens, DLR, Franka Robotics',
    ],
  },
  {
    id: 'mit',
    name: 'MIT',
    program: 'MS Robotics & AI (EECS or MechE)',
    location: 'Cambridge, MA, USA',
    deadline: 'Dec 1-15, 2026',
    deadlineDate: new Date('2026-12-01'),
    tuitionYearly: '~$60,000',
    tuitionTotal: '~$120,000',
    livingCostMonthly: '$2,500-3,600',
    livingCostTotal: '~$75,000',
    totalCost: '~$195,000',
    duration: '2 years',
    credits: 66,
    status: 'not-started',
    priority: 4,
    greRequired: true,
    greWaived: false,
    languageTest: 'English proficiency (waived if BSc in English)',
    scholarships: [
      {
        name: 'Research Assistantship (RA)',
        amount: 'Full tuition + stipend',
        deadline: 'Apply with admission',
        deadlineDate: new Date('2026-12-01'),
        requirements: 'Research lab commitment',
        eligible: true,
      },
      {
        name: 'Teaching Assistantship (TA)',
        amount: 'Full tuition + stipend',
        deadline: 'Apply with admission',
        deadlineDate: new Date('2026-12-01'),
        requirements: 'Teaching commitment',
        eligible: true,
      },
    ],
    checklist: [
      { id: 'mit-cv', label: 'Curriculum Vitae', required: true, completed: false, category: 'documents' },
      { id: 'mit-transcript', label: 'Academic Transcripts', required: true, completed: false, category: 'documents' },
      { id: 'mit-lor1', label: 'Letter of Recommendation #1', required: true, completed: false, category: 'documents' },
      { id: 'mit-lor2', label: 'Letter of Recommendation #2', required: true, completed: false, category: 'documents' },
      { id: 'mit-lor3', label: 'Letter of Recommendation #3', required: true, completed: false, category: 'documents' },
      { id: 'mit-sop', label: 'Statement of Objectives', required: true, completed: false, category: 'documents' },
      { id: 'mit-gre', label: 'GRE Test (MechE) / Waived (EECS)', required: true, completed: false, category: 'tests' },
    ],
    notes: [
      'GRE: Required for MechE, NOT accepted for EECS',
      'Programs are thesis-based (SM degree)',
      'Funding primarily through RA/TA positions',
      'Portfolio weight is extremely high',
    ],
  },
  {
    id: 'stanford',
    name: 'Stanford',
    program: 'MS Computer Science or Mechanical Engineering',
    location: 'Palo Alto, CA, USA',
    deadline: 'Early Dec 2026',
    deadlineDate: new Date('2026-12-01'),
    tuitionYearly: '~$60,000',
    tuitionTotal: '~$120,000',
    livingCostMonthly: '$3,000-4,600',
    livingCostTotal: '~$90,000',
    totalCost: '~$210,000',
    duration: '2 years',
    credits: 45,
    status: 'not-started',
    priority: 5,
    greRequired: false,
    greWaived: true,
    languageTest: 'English proficiency',
    scholarships: [
      {
        name: 'Knight-Hennessy Scholars',
        amount: 'Full funding (tuition + living)',
        deadline: 'Oct 2026',
        deadlineDate: new Date('2026-10-01'),
        requirements: 'Leadership + academics',
        eligible: true,
      },
    ],
    checklist: [
      { id: 'stan-cv', label: 'Curriculum Vitae', required: true, completed: false, category: 'documents' },
      { id: 'stan-transcript', label: 'Academic Transcripts', required: true, completed: false, category: 'documents' },
      { id: 'stan-lor1', label: 'Letter of Recommendation #1', required: true, completed: false, category: 'documents' },
      { id: 'stan-lor2', label: 'Letter of Recommendation #2', required: true, completed: false, category: 'documents' },
      { id: 'stan-lor3', label: 'Letter of Recommendation #3', required: true, completed: false, category: 'documents' },
      { id: 'stan-sop', label: 'Statement of Purpose', required: true, completed: false, category: 'documents' },
      { id: 'stan-knight', label: 'Knight-Hennessy Application', required: false, completed: false, category: 'funding' },
    ],
    notes: [
      'GRE currently optional (check 2027 updates)',
      'Coursework-based degree (thesis optional)',
      'Knight-Hennessy deadline: October 2026',
    ],
  },
];

export const getDaysUntil = (date: Date): number => {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

export const getUrgencyColor = (days: number): string => {
  if (days < 0) return '#ef4444'; // red - overdue
  if (days < 30) return '#f59e0b'; // amber - urgent
  if (days < 90) return '#3b82f6'; // blue - approaching
  return '#22c55e'; // green - plenty of time
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'accepted': return '#22c55e';
    case 'submitted': return '#3b82f6';
    case 'in-progress': return '#f59e0b';
    case 'rejected': return '#ef4444';
    default: return '#444';
  }
};

export const getStatusLabel = (status: string): string => {
  switch (status) {
    case 'not-started': return 'Not Started';
    case 'in-progress': return 'In Progress';
    case 'submitted': return 'Submitted';
    case 'accepted': return 'Accepted';
    case 'rejected': return 'Rejected';
    default: return status;
  }
};

export const getCompletedCount = (uni: University): number => {
  return uni.checklist.filter(item => item.completed).length;
};

export const getTotalRequired = (uni: University): number => {
  return uni.checklist.filter(item => item.required).length;
};

export const getOverallProgress = (): number => {
  const totalItems = universities.reduce((sum, uni) => sum + uni.checklist.length, 0);
  const completedItems = universities.reduce((sum, uni) => sum + getCompletedCount(uni), 0);
  return Math.round((completedItems / totalItems) * 100);
};
