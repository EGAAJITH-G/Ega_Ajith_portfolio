import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, Star, GitFork, ExternalLink, Globe, Sparkles } from 'lucide-react';
import styles from './Projects.module.css';

// Custom GitHub Icon Component to avoid package export incompatibilities
const GithubIcon = ({ size = 15, className }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.875 8.167 6.84 9.49.5.09.68-.22.68-.48 0-.23-.01-.86-.01-1.69-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85 0 1.34-.01 2.41-.01 2.74 0 .27.18.57.69.48C19.13 20.16 22 16.42 22 12A10 10 0 0012 2z" />
  </svg>
);

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedRepoIndex, setSelectedRepoIndex] = useState(0);

  // All projects listed in the Repository Layout
  const allProjects = [
    {
      name: "Flower Shop",
      subtitle: "Flower Shop / README.md",
      stars: 34,
      forks: 12,
      language: "TypeScript 82%",
      header: "Premium Flower Shop E-commerce",
      desc: "A full-stack flower retail platform built with React, Node.js, and Stripe integration. Features high-resolution asset management and real-time inventory tracking.",
      image: "/images/image.png",
      tech: ["React", "Node.js", "Stripe", "MongoDB"],
      demoLink: "#",
      gitLink: "#"
    },
    {
      name: "Vetri Flex",
      subtitle: "Vetri Flex / README.md",
      stars: 28,
      forks: 8,
      language: "JavaScript 95%",
      header: "Premium Streaming Platform Interface",
      desc: "A responsive streaming platform interface featuring advanced animations, custom carousels, and visual theme selection.",
      image: "/images/proj-ai-terminal.png",
      tech: ["React", "Framer Motion", "Tailwind CSS"],
      demoLink: "#",
      gitLink: "#"
    },
    {
      name: "MERN Ecommerce",
      subtitle: "MERN Ecommerce / README.md",
      stars: 42,
      forks: 15,
      language: "JavaScript 76%",
      header: "Full Stack MERN Shopping App",
      desc: "Robust e-commerce store with user authentication, shopping cart state management, and administrative dashboard panel.",
      image: "/images/proj-dashboard.png",
      tech: ["MongoDB", "Express.js", "React", "Node.js"],
      demoLink: "#",
      gitLink: "#"
    },
    {
      name: "AI Portfolio",
      subtitle: "AI Portfolio / README.md",
      stars: 50,
      forks: 18,
      language: "CSS 45%",
      header: "Cinematic Developer Portfolio",
      desc: "Interactive developer portfolio with Three.js particles, custom shader overlays, and premium layout typography.",
      image: "/images/proj-nodes.png",
      tech: ["React", "Three.js", "GSAP"],
      demoLink: "#",
      gitLink: "#"
    }
  ];

  // Frontend specific projects (modern grid card design)
  const frontendProjects = [
    {
      title: "Vetri Flex",
      desc: "A responsive streaming platform interface featuring advanced animations, custom carousels, and visual theme selection.",
      image: "/images/proj-ai-terminal.png",
      tech: ["React", "Framer Motion", "Tailwind CSS"],
      glow: styles.cardCyan,
      demoLink: "#",
      gitLink: "#"
    },
    {
      title: "AI Portfolio",
      desc: "Interactive developer portfolio with Three.js particles, custom shader overlays, and premium layout typography.",
      image: "/images/proj-nodes.png",
      tech: ["React", "Three.js", "GSAP"],
      glow: styles.cardViolet,
      demoLink: "#",
      gitLink: "#"
    },
    {
      title: "SaaS Landing Page",
      desc: "Clean, high-converting product page featuring interactive price toggles, testimonial carousels, and smooth scroll reveals.",
      image: "/images/proj-dashboard.png",
      tech: ["React", "CSS Modules", "Framer Motion"],
      glow: styles.cardPink,
      demoLink: "#",
      gitLink: "#"
    }
  ];

  // Fullstack specific projects (modern grid card design)
  const fullstackProjects = [
    {
      title: "Flower Shop",
      desc: "A full-stack flower retail platform built with React, Node.js, and Stripe integration. Features high-resolution asset management and real-time inventory tracking.",
      image: "/images/image.png",
      tech: ["React", "Node.js", "Stripe", "MongoDB"],
      glow: styles.cardCyan,
      demoLink: "#",
      gitLink: "#"
    },
    {
      title: "MERN Ecommerce",
      desc: "Robust e-commerce store with user authentication, shopping cart state management, and administrative dashboard panel.",
      image: "/images/proj-dashboard.png",
      tech: ["MongoDB", "Express.js", "React", "Node.js"],
      glow: styles.cardViolet,
      demoLink: "#",
      gitLink: "#"
    },
    {
      title: "Realtime Chat Console",
      desc: "WebSockets-powered instant messaging app featuring room configurations, active status signals, and message caching.",
      image: "/images/proj-nodes.png",
      tech: ["React", "Node.js", "Socket.io", "MongoDB"],
      glow: styles.cardPink,
      demoLink: "#",
      gitLink: "#"
    }
  ];

  const currentRepo = allProjects[selectedRepoIndex] || allProjects[0];

  const gridVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section
      id="projects"
      className={styles.projectsSection}
      style={{ backgroundImage: 'url("/images/projects-bg.png")' }}
    >
      <div className={styles.projectsContainer}>
        {/* Section Header */}
        <div className="section-header">
          <span className="section-subtitle">Showcase</span>
          <h2 className="section-title">Projects Console</h2>
        </div>

        {/* Filter Navigation Tabs */}
        <div className={styles.filterTabs}>
          <button
            className={`${styles.tabBtn} ${activeFilter === 'all' ? styles.activeTab : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Projects
          </button>
          <button
            className={`${styles.tabBtn} ${activeFilter === 'frontend' ? styles.activeTab : ''}`}
            onClick={() => setActiveFilter('frontend')}
          >
            Frontend Projects
          </button>
          <button
            className={`${styles.tabBtn} ${activeFilter === 'fullstack' ? styles.activeTab : ''}`}
            onClick={() => setActiveFilter('fullstack')}
          >
            Fullstack Projects
          </button>
        </div>

        {/* Dynamic Display Area */}
        <div className={styles.displayArea}>
          <AnimatePresence mode="wait">
            {activeFilter === 'all' ? (
              /* GitHub-Style Repository Viewer Layout */
              <motion.div
                key="repo-viewer"
                className={styles.repoLayout}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Left Side: Repositories List */}
                <div className={styles.repoListColumn}>
                  <div className={styles.columnHeader}>
                    <Folder size={18} className={styles.folderIcon} />
                    <h3 className={styles.repoTitleText}>Repositories</h3>
                  </div>
                  <div className={styles.repoItemsContainer}>
                    {allProjects.map((repo, idx) => (
                      <button
                        key={idx}
                        className={`${styles.repoItemBtn} ${selectedRepoIndex === idx ? styles.activeRepoItem : ''}`}
                        onClick={() => setSelectedRepoIndex(idx)}
                      >
                        <div className={styles.repoItemLeft}>
                          <Folder size={16} className={styles.itemFolderIcon} />
                          <span className={styles.repoItemName}>{repo.name}</span>
                        </div>
                        <span className={styles.repoItemBadge}>Public</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right Side: README Detail Panel */}
                <div className={styles.readmePanelColumn}>
                  <div className={styles.readmeCard}>
                    {/* Readme Card Top Bar */}
                    <div className={styles.readmeTopBar}>
                      <span className={styles.readmePath}>{currentRepo.subtitle}</span>
                      <div className={styles.readmeMeta}>
                        <div className={styles.metaBadge}>
                          <Star size={14} fill="#FFD700" stroke="#FFD700" />
                          <span>{currentRepo.stars}</span>
                        </div>
                        <div className={styles.metaBadge}>
                          <GitFork size={14} className={styles.forkIcon} />
                          <span>{currentRepo.forks}</span>
                        </div>
                        <span className={styles.languageText}>{currentRepo.language}</span>
                      </div>
                    </div>

                    {/* Readme Card Main Content */}
                    <div className={styles.readmeContent}>
                      <h2 className={styles.readmeHeaderTitle}>{currentRepo.header}</h2>
                      <p className={styles.readmeDescription}>{currentRepo.desc}</p>

                      {/* Image Viewer */}
                      <div className={styles.readmeImageContainer}>
                        <img
                          src={currentRepo.image}
                          alt={currentRepo.name}
                          className={styles.readmeImage}
                          onError={(e) => {
                            // Fallback image in case the file doesn't load
                            e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80';
                          }}
                        />
                      </div>

                      {/* Tech Tags */}
                      <div className={styles.readmeTechRow}>
                        {currentRepo.tech.map((tag, tIdx) => (
                          <span key={tIdx} className={styles.readmeTechTag}>
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Action Links */}
                      <div className={styles.readmeActionButtons}>
                        <a
                          href={currentRepo.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.liveViewBtn}
                        >
                          <Globe size={15} />
                          <span>Live View</span>
                        </a>
                        <a
                          href={currentRepo.gitLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.githubBtn}
                        >
                          <GithubIcon size={15} />
                          <span>GitHub</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Modern Grid Card Layout for Frontend & Fullstack */
              <motion.div
                key={activeFilter}
                className={styles.cardsGrid}
                variants={gridVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {(activeFilter === 'frontend' ? frontendProjects : fullstackProjects).map((project, index) => (
                  <motion.div
                    key={index}
                    className={`${styles.premiumProjectCard} ${project.glow}`}
                    variants={cardVariants}
                    whileHover={{ y: -6 }}
                  >
                    {/* Top Image Preview */}
                    <div className={styles.cardImageWrapper}>
                      <div className={styles.cardImageOverlay} />
                      <img
                        src={project.image}
                        alt={project.title}
                        className={styles.cardProjectImage}
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                    </div>

                    {/* Card Content Details */}
                    <div className={styles.cardDetails}>
                      <h3 className={styles.cardProjectTitle}>{project.title}</h3>
                      <p className={styles.cardProjectDesc}>{project.desc}</p>

                      {/* Tech Tags */}
                      <div className={styles.cardTechStack}>
                        {project.tech.map((tag, idx) => (
                          <span key={idx} className={styles.cardTechTag}>
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className={styles.cardActionRow}>
                        <a
                          href={project.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.cardLiveLink}
                        >
                          <Globe size={14} />
                          <span>Live View</span>
                        </a>
                        <a
                          href={project.gitLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.cardGitLink}
                        >
                          <GithubIcon size={14} />
                          <span>GitHub</span>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Projects;
