import robotArmImage from './assets/RobotArm.png'
import robomopImage from './assets/Robomop.png'
import embeddingsClusteringImage from './assets/Embeddings.png'

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
    title: 'Embeddings Clustering',
    description:
      'Clustering embeddings for semantic similarity and characteristics extraction.',
    image: embeddingsClusteringImage,
    tags: ['React', 'PyTorch', 'Clustering', 'Embeddings'],
    href: 'https://github.com/papalino456/Embeddings-Clustering',
  },
  {
    id: '04',
    title: 'AGV Robot',
    description:
      'Automatic Guided Vehicle with Raspberry Pi, IR line following, and PID control for industrial logistics.',
    image: '/portfolio-2026/projects/agv.png',
    tags: ['Python', 'Raspberry Pi', 'PID'],
    href: 'https://github.com/papalino456/AGV',
  },
];

export const TIMELINE = [
  {
    period: '2025 — Present',
    title: 'AI R&D Engineer',
    company: 'Siemens, Munich',
    description:
      'Building ML pipelines for assembly planning and YOLO-based digitization achieving >98% accuracy. Developing novel Fourier-based inverse kinematics methods.',
    active: true,
  },
  {
    period: '2021 — 2025',
    title: 'BSc. Mechatronics Engineering',
    company: 'ITESM, Mexico',
    description:
      'Scholarship holder specializing in Robotics and Industrial Automation. International exchange semester at TU Dresden, Germany.',
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
