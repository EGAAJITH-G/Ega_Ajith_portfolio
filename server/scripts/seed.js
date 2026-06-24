import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../models/Admin.js';
import Project from '../models/Project.js';
import Certification from '../models/Certification.js';
import Skill from '../models/Skill.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ajith_portfolio';

const initialProjects = [
  {
    title: "Flower Shop",
    desc: "A full-stack flower retail platform built with React, Node.js, and Stripe integration. Features high-resolution asset management and real-time inventory tracking.",
    category: "fullstack",
    tags: ["React", "Node.js", "Stripe", "MongoDB"],
    github: "https://github.com/EGAAJITH-G",
    live: "https://drive.google.com",
    image: "/images/image.png",
    active: true,
    stars: 34,
    forks: 12,
    language: "TypeScript 82%",
    subtitle: "Flower Shop / README.md",
    header: "Premium Flower Shop E-commerce",
    appType: "Web Application"
  },
  {
    title: "Vetri Flex",
    desc: "A responsive streaming platform interface featuring advanced animations, custom carousels, and visual theme selection.",
    category: "frontend",
    tags: ["React", "Framer Motion", "Tailwind CSS"],
    github: "https://github.com/EGAAJITH-G",
    live: "https://drive.google.com",
    image: "/images/proj-ai-terminal.png",
    active: true,
    stars: 28,
    forks: 8,
    language: "JavaScript 95%",
    subtitle: "Vetri Flex / README.md",
    header: "Premium Streaming Platform Interface",
    appType: "Web Application"
  },
  {
    title: "MERN Ecommerce",
    desc: "Robust e-commerce store with user authentication, shopping cart state management, and administrative dashboard panel.",
    category: "fullstack",
    tags: ["MongoDB", "Express.js", "React", "Node.js"],
    github: "https://github.com/EGAAJITH-G",
    live: "https://drive.google.com",
    image: "/images/proj-dashboard.png",
    active: true,
    stars: 42,
    forks: 15,
    language: "JavaScript 76%",
    subtitle: "MERN Ecommerce / README.md",
    header: "Full Stack MERN Shopping App",
    appType: "Web Application"
  },
  {
    title: "AI Portfolio",
    desc: "Interactive developer portfolio with Three.js particles, custom shader overlays, and premium layout typography.",
    category: "frontend",
    tags: ["React", "Three.js", "GSAP"],
    github: "https://github.com/EGAAJITH-G",
    live: "https://drive.google.com",
    image: "/images/proj-nodes.png",
    active: true,
    stars: 50,
    forks: 18,
    language: "CSS 45%",
    subtitle: "AI Portfolio / README.md",
    header: "Cinematic Developer Portfolio",
    appType: "Web Application"
  },
  {
    title: "SaaS Landing Page",
    desc: "Clean, high-converting product page featuring interactive price toggles, testimonial carousels, and smooth scroll reveals.",
    category: "frontend",
    tags: ["React", "CSS Modules", "Framer Motion"],
    github: "https://github.com/EGAAJITH-G",
    live: "https://drive.google.com",
    image: "/images/proj-dashboard.png",
    active: true,
    stars: 12,
    forks: 2,
    language: "JavaScript 100%",
    subtitle: "SaaS Landing Page / README.md",
    header: "SaaS Landing Page Interface",
    appType: "Web Application"
  },
  {
    title: "Realtime Chat Console",
    desc: "WebSockets-powered instant messaging app featuring room configurations, active status signals, and message caching.",
    category: "fullstack",
    tags: ["React", "Node.js", "Socket.io", "MongoDB"],
    github: "https://github.com/EGAAJITH-G",
    live: "https://drive.google.com",
    image: "/images/proj-nodes.png",
    active: true,
    stars: 20,
    forks: 5,
    language: "JavaScript 88%",
    subtitle: "Realtime Chat Console / README.md",
    header: "WebSockets Instant Messaging App",
    appType: "Web Application"
  }
];

const initialCertifications = [
  {
    title: 'Diploma in computer application (DCA)',
    issuer: 'Computer Software College',
    date: 'Apr-01-2019 To Oct-01-2019',
    credId: '3389',
    image: '/images/Certifications_img/1.png',
    link: 'https://drive.google.com/file/d/1avQCGWbbYR6waymwyWQEzWeaCfHEm3KO/view?usp=sharing'
  },
  {
    title: 'Build a Word Jumble using Java Basics',
    issuer: 'Coursera',
    date: 'Mar-21-2024',
    credId: 'EV62SL6M9835',
    image: '/images/Certifications_img/2.png',
    link: 'https://drive.google.com/file/d/1m949YAJDrVD0Ys4lp1_bEOAt02iqMpa8/view?usp=sharing'
  },
  {
    title: 'Build an App in Android Studio using Resources',
    issuer: 'Coursera',
    date: 'Apr-16-2024',
    credId: 'ZSYXSW6DJBVA',
    image: '/images/Certifications_img/3.png',
    link: 'https://drive.google.com/file/d/1KfDqDshPo8xinRXxhLhT9Gb9tzz9slzh/view?usp=sharing'
  }
];

const initialSkills = [
  // Frontend row
  { name: 'HTML5', level: 95, category: 'frontend', color: '#E34F26', desc: 'Building semantic and accessible web structures.' },
  { name: 'CSS3', level: 90, category: 'frontend', color: '#1572B6', desc: 'Creating responsive and modern user interfaces.' },
  { name: 'JavaScript', level: 90, category: 'frontend', color: '#F7DF1E', desc: 'Developing dynamic and interactive web experiences.' },
  { name: 'React.js', level: 88, category: 'frontend', color: '#61DAFB', desc: 'Building scalable component-based applications.' },
  { name: 'Bootstrap', level: 92, category: 'frontend', color: '#7952B3', desc: 'Rapid development of responsive layouts.' },

  // Backend row
  { name: 'Node.js', level: 85, category: 'backend', color: '#339933', desc: 'Developing scalable server-side applications.' },
  { name: 'Express.js', level: 85, category: 'backend', color: '#828282', desc: 'Building RESTful APIs and backend services.' },
  { name: 'MongoDB', level: 82, category: 'backend', color: '#47A248', desc: 'Managing NoSQL databases efficiently.' },
  { name: 'Mongoose', level: 80, category: 'backend', color: '#880000', desc: 'Simplifying MongoDB data modeling.' },
  { name: 'JWT Authentication', level: 85, category: 'backend', color: '#d63aff', desc: 'Implementing secure user authentication.' },
  { name: 'REST API', level: 88, category: 'backend', color: '#00b4d8', desc: 'Designing structured communication between systems.' },

  // Tools row
  { name: 'Git', level: 90, category: 'tools', color: '#F05032', desc: 'Version control and collaboration.' },
  { name: 'GitHub', level: 92, category: 'tools', color: '#ffffff', desc: 'Managing repositories and team workflows.' },
  { name: 'VS Code', level: 95, category: 'tools', color: '#007ACC', desc: 'Primary development environment.' },
  { name: 'Figma', level: 75, category: 'tools', color: '#F24E1E', desc: 'UI/UX collaboration and design.' },
  { name: 'Netlify / Vercel', level: 85, category: 'tools', color: '#00F5FF', desc: 'Deployment and hosting platforms.' },

  // Others row
  { name: 'S3 Bucket', level: 80, category: 'others', color: '#FF9900', desc: 'Amazon Simple Storage Service (S3) for cloud object storage.' }
];

const seedDB = async () => {
  console.log('[SEEDER] Connecting to MongoDB...');
  await mongoose.connect(MONGO_URI);
  console.log('[SEEDER] MongoDB connected.');

  // Clear existing data
  console.log('[SEEDER] Cleaning collections...');
  await Admin.deleteMany({});
  await Project.deleteMany({});
  await Certification.deleteMany({});
  await Skill.deleteMany({});
  console.log('[SEEDER] Collections cleaned.');

  // Seed Admin Account
  console.log('[SEEDER] Creating default admin account...');
  const defaultAdmin = new Admin({
    username: 'admin_ajith',
    password: 'ajith_aji_2004' // Will be hashed automatically by pre-save hook
  });
  await defaultAdmin.save();
  console.log(`[SEEDER] Admin account created. Username: admin_ajith, Password: ajith_aji_2004`);

  // Seed Projects
  console.log('[SEEDER] Seeding projects...');
  await Project.insertMany(initialProjects);
  console.log(`[SEEDER] ${initialProjects.length} projects seeded.`);

  // Seed Certifications
  console.log('[SEEDER] Seeding certifications...');
  await Certification.insertMany(initialCertifications);
  console.log(`[SEEDER] ${initialCertifications.length} certifications seeded.`);

  // Seed Skills
  console.log('[SEEDER] Seeding skills matrix...');
  await Skill.insertMany(initialSkills);
  console.log(`[SEEDER] ${initialSkills.length} skill nodes seeded.`);

  console.log('[SEEDER] Database seeding completed successfully.');
};

seedDB()
  .then(() => {
    mongoose.connection.close();
    process.exit(0);
  })
  .catch((err) => {
    console.error('[SEEDER ERROR]', err);
    process.exit(1);
  });
