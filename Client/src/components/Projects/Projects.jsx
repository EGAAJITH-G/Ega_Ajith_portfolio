import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, Star, GitFork, Globe, AlertTriangle } from 'lucide-react';
import { playClickSound } from '../../utils/soundUtils';
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
  const [selectedRepoName, setSelectedRepoName] = useState('');
  const [projectsList, setProjectsList] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [apiError, setApiError] = useState(false);

  // Track window resize to toggle between repo viewer and normal cards on mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 765);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch projects from backend
  useEffect(() => {
    fetch('/api/projects')
      .then(res => {
        if (!res.ok) throw new Error('API offline');
        return res.json();
      })
      .then(data => {
        setProjectsList(data);
        setApiError(false);
        // Set the first active project as the default selected repo if exists
        const activeDbProjects = data.filter(p => p.active);
        if (activeDbProjects.length > 0) {
          setSelectedRepoName(activeDbProjects[0].title);
        }
      })
      .catch(err => {
        console.error('[PROJECTS] Error loading projects.', err);
        setApiError(true);
      });
  }, []);

  const mapped = useMemo(() => {
    if (projectsList.length === 0) {
      return {
        all: [],
        frontend: [],
        fullstack: []
      };
    }

    const activeDbProjects = projectsList.filter(p => p.active);

    const allMapped = activeDbProjects.map(p => ({
      name: p.title,
      subtitle: p.subtitle || `${p.title.replace(/\s+/g, '-').toLowerCase()} / README.md`,
      stars: p.stars || 0,
      forks: p.forks || 0,
      language: p.language || "JavaScript 100%",
      header: p.header || p.title,
      desc: p.desc,
      image: p.image || "/images/image.png",
      tech: p.tags,
      demoLink: p.live || "#",
      gitLink: p.github || "#",
      appType: p.appType || "",
      workingStatus: p.workingStatus || "",
      imageAlign: p.imageAlign || "top"
    }));

    const frontendMapped = activeDbProjects
      .filter(p => p.category.toLowerCase() === 'frontend')
      .map((p, idx) => ({
        title: p.title,
        desc: p.desc,
        image: p.image || "/images/image.png",
        tech: p.tags,
        glow: idx % 3 === 0 ? styles.cardCyan : idx % 3 === 1 ? styles.cardViolet : styles.cardPink,
        demoLink: p.live || "#",
        gitLink: p.github || "#",
        appType: p.appType || "",
        workingStatus: p.workingStatus || "",
        imageAlign: p.imageAlign || "top"
      }));

    const fullstackMapped = activeDbProjects
      .filter(p => p.category.toLowerCase() === 'fullstack')
      .map((p, idx) => ({
        title: p.title,
        desc: p.desc,
        image: p.image || "/images/image.png",
        tech: p.tags,
        glow: idx % 3 === 0 ? styles.cardCyan : idx % 3 === 1 ? styles.cardViolet : styles.cardPink,
        demoLink: p.live || "#",
        gitLink: p.github || "#",
        appType: p.appType || "",
        workingStatus: p.workingStatus || "",
        imageAlign: p.imageAlign || "top"
      }));

    return {
      all: allMapped,
      frontend: frontendMapped,
      fullstack: fullstackMapped
    };
  }, [projectsList]);

  const allProjects = mapped.all;
  const frontendProjects = mapped.frontend;
  const fullstackProjects = mapped.fullstack;

  const currentRepo = useMemo(() => {
    return allProjects.find(p => p.name === selectedRepoName) || allProjects[0] || { tech: [] };
  }, [allProjects, selectedRepoName]);

  const handleFilterTabChange = (filter) => {
    playClickSound();
    setActiveFilter(filter);
  };

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
    >
      <div className={styles.projectsContainer}>
        {/* Section Header */}
        <div className="section-header">
          <span className="section-subtitle">Showcase</span>
          <h2 className="section-title">Projects Console</h2>
        </div>

        {apiError ? (
          <div className={styles.apiOfflineMessage}>
            <AlertTriangle size={32} className={styles.errorIcon} />
            <span className={styles.errorTitle}>[ SYSTEM LINK ERROR: OFFLINE DIRECTORY TELEMETRY ]</span>
            <p className={styles.errorDescription}>
              Failed to connect to the portfolio API gateway server. Please ensure the backend services are actively running.
            </p>
          </div>
        ) : (
          <>
            {/* Filter Navigation Tabs */}
        <div className={styles.filterTabs}>
          <button
            className={`${styles.tabBtn} ${activeFilter === 'all' ? styles.activeTab : ''}`}
            onClick={() => handleFilterTabChange('all')}
          >
            All Projects
          </button>
          <button
            className={`${styles.tabBtn} ${activeFilter === 'frontend' ? styles.activeTab : ''}`}
            onClick={() => handleFilterTabChange('frontend')}
          >
            Frontend Projects
          </button>
          <button
            className={`${styles.tabBtn} ${activeFilter === 'fullstack' ? styles.activeTab : ''}`}
            onClick={() => handleFilterTabChange('fullstack')}
          >
            Fullstack Projects
          </button>
        </div>

        {/* Dynamic Display Area */}
        <div className={styles.displayArea}>
          <AnimatePresence mode="wait">
            {activeFilter === 'all' && !isMobile ? (
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
                    {allProjects.map((repo) => (
                      <button
                        key={repo.name}
                        className={`${styles.repoItemBtn} ${currentRepo.name === repo.name ? styles.activeRepoItem : ''}`}
                        onClick={() => { playClickSound(); setSelectedRepoName(repo.name); }}
                      >
                        <div className={styles.repoItemLeft}>
                          <Folder size={16} className={styles.itemFolderIcon} />
                          <span className={styles.repoItemName}>{repo.name}</span>
                        </div>
                        <span className={styles.repoItemBadge}>Public</span>
                      </button>
                    ))}
                    {allProjects.length === 0 && (
                      <div className={styles.noResultsText}>
                        [ NO MATCHING REPOSITORIES ]
                      </div>
                    )}
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
                        <span className={styles.languageText}>{currentRepo.appType || currentRepo.language}</span>
                      </div>
                    </div>

                    {/* Readme Card Main Content */}
                    <div className={styles.readmeContent}>
                      <h2 className={styles.readmeHeaderTitle}>
                        {currentRepo.header}
                        {currentRepo.workingStatus && (
                          <span className={`${styles.statusBadge} ${
                            currentRepo.workingStatus === 'Live Project' ? styles.statusLive :
                            currentRepo.workingStatus === 'Current Project' ? styles.statusCurrent :
                            styles.statusFinished
                          }`}>
                            {currentRepo.workingStatus}
                          </span>
                        )}
                      </h2>
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
                        {(currentRepo.tech || []).map((tag, tIdx) => (
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
                          onClick={playClickSound}
                        >
                          <Globe size={15} />
                          <span>Live View</span>
                        </a>
                        <a
                          href={currentRepo.gitLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.githubBtn}
                          onClick={playClickSound}
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
              /* Modern Grid Card Layout for Frontend, Fullstack, and Mobile 'All' View */
              <motion.div
                key={activeFilter}
                className={styles.cardsGrid}
                variants={gridVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {(activeFilter === 'all'
                  ? allProjects
                  : (activeFilter === 'frontend' ? frontendProjects : fullstackProjects)
                ).map((project, index) => (
                  <motion.div
                    key={index}
                    className={`${styles.premiumProjectCard} ${project.glow || (index % 3 === 0 ? styles.cardCyan : index % 3 === 1 ? styles.cardViolet : styles.cardPink)}`}
                    variants={cardVariants}
                    whileHover={{ y: -6 }}
                  >
                    {/* Top Image Preview */}
                    <div className={styles.cardImageWrapper}>
                      <div className={styles.cardImageOverlay} />
                      <img
                        src={project.image}
                        alt={project.title || project.name}
                        className={styles.cardProjectImage}
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                      {project.workingStatus && (
                        <span className={`${styles.statusBadge} ${styles.imageStatusBadge} ${
                          project.workingStatus === 'Live Project' ? styles.statusLive :
                          project.workingStatus === 'Current Project' ? styles.statusCurrent :
                          styles.statusFinished
                        }`}>
                          {project.workingStatus}
                        </span>
                      )}
                    </div>

                    {/* Card Content Details */}
                    <div className={styles.cardDetails}>
                      <h3 className={styles.cardProjectTitle}>
                        {project.title || project.name}
                        {project.appType && <span className={styles.appTypeBadge}>{project.appType}</span>}
                      </h3>
                      <p className={styles.cardProjectDesc}>{project.desc}</p>

                      {/* Tech Tags */}
                      <div className={styles.cardTechStack}>
                        {(project.tech || []).map((tag, idx) => (
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
                          onClick={playClickSound}
                        >
                          <Globe size={14} />
                          <span>Live View</span>
                        </a>
                        <a
                          href={project.gitLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.cardGitLink}
                          onClick={playClickSound}
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
          {((activeFilter === 'all' && isMobile && allProjects.length === 0) ||
            (activeFilter !== 'all' && (activeFilter === 'frontend' ? frontendProjects : fullstackProjects).length === 0)) && (
            <div className={styles.noResultsTextGrid}>
              [ NO MATCHING PROJECTS IN THIS VIEW ]
            </div>
          )}
        </div>
      </>
    )}
      </div>
    </section>
  );
};

export default Projects;
