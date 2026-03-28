import robotArmImage from './assets/RobotArm.png'
import robomopImage from './assets/Robomop.png'
import embeddingsClusteringImage from './assets/Embeddings.png'
import mechatronicsModelImage from './assets/mechatronicsModel.png'

export const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Activity', href: '#activity' },
  { label: 'Contact', href: '#contact' },
];

export const PROJECTS = [
  {
    id: '01',
    title: 'RobotArm',
    description:
      'Computer vision enabled servo robot arm with a real-time OpenCV pipeline for precise pick-and-place operations.',
    image: robotArmImage,
    tags: ['C++', 'Python', 'OpenCV', 'ESP32'],
    href: 'https://github.com/papalino456/RobotArm',
  },
  {
    id: '02',
    title: 'RoboMop',
    description:
      'Autonomous cleaning robot featuring SLAM navigation, path planning, and a React-based monitoring dashboard.',
    image: robomopImage,
    tags: ['Python', 'React', 'SLAM', 'ROS 2'],
    href: 'https://github.com/papalino456/RoboMop',
  },
  {
    id: '03',
    title: 'Data Harmonization and Knowledge Extraction',
    description:
      'Data harmonization and knowledge extraction from heterogeneous sources using embeddings, clustering and LLMs.',
    image: embeddingsClusteringImage,
    tags: ['React', 'PyTorch', 'Clustering', 'LLMs'],
    href: 'https://github.com/papalino456/Embeddings-Clustering',
  },
  {
    id: '04',
    title: 'Mechatronics Embeddings Model',
    description:
      'End-to-end machine learning pipeline to train domain-specific sentence embeddings for mechatronics from scratch using low-data techniques',
    image: mechatronicsModelImage,
    tags: ['Embeddings', 'PyTorch', 'Machine Learning', 'Low-Data'],
    href: 'https://github.com/papalino456/CienciaDeDatos',
  },
];

export const TIMELINE = [
  {
    period: '2025',
    title: 'AI R&D Engineer',
    company: 'Siemens, Munich',
    description:
      'Built ML pipelines for assembly planning, LLM-based data harmonization and extraction, YOLO-based digitization achieving >98% accuracy and developed novel Fourier-based inverse kinematics methods.',
    active: true,
    hideCurrentBadge: true,
  },
  {
    period: '2021 — 2025',
    title: 'BSc. Mechatronics Engineering',
    company: 'ITESM, Mexico',
    description:
      'Entrepreneurial and Academic Scholarship holder. National CENEVAL Award winner (Top 1.75% in Mexico). Specializing in Robotics and Industrial Automation. International exchange semester at TU Dresden, Germany.',
    active: false,
  },
  {
    period: '2023',
    title: 'Front-End Developer',
    company: 'La Brujula, Mexico City',
    description:
      'Built design systems, CI/CD pipelines, and API integrations for real-time translation and workflow automation.',
    active: false,
  },
  
];

export const SKILLS = [
  { category: 'Languages', items: ['Python', 'C++', 'TypeScript', 'MATLAB'] },
  { category: 'ML / AI', items: ['PyTorch', 'YOLO', 'OpenCV', 'Scikit-learn'] },
  { category: 'Robotics', items: ['ROS 2', 'SLAM', 'PID', 'Kinematics'] },
  { category: 'Hardware', items: ['ESP32', 'Raspberry Pi', 'Arduino', 'PCB Design'] },
  { category: 'Web', items: ['React', 'Next.js', 'Node.js', 'Vite'] },
  { category: 'Tools', items: ['Git', 'Docker', 'Linux', 'CI/CD'] },
];

export const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/papalino456',
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/sebastian-barrio/',
    icon: 'linkedin',
  },
  {
    label: 'Gmail',
    href: 'mailto:sebastian.barrio.b@gmail.com',
    icon: 'mail',
  },
];
