import { Award, ExternalLink } from 'lucide-react';
import styles from './Certifications.module.css';

const Certifications = () => {
  const certData = [
    {
      title: 'AWS Certified Developer',
      issuer: 'Amazon Web Services',
      date: 'Jan 2025',
      credId: 'AWS-DEC-84920',
      image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Professional Cloud Developer',
      issuer: 'Google Cloud Platform',
      date: 'Nov 2025',
      credId: 'GCP-PCD-92014',
      image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Front-End Developer Professional',
      issuer: 'Meta / Coursera',
      date: 'Feb 2024',
      credId: 'META-FED-84921',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const handleCardClick = (imageUrl) => {
    window.open(imageUrl, '_blank');
  };

  return (
    <section 
      id="certifications" 
      className={styles.certSection}
      style={{ backgroundImage: 'url("/images/certifications-bg.png")' }}
    >
      <div className={styles.certContainer}>
        {/* Section Header */}
        <div className="section-header">
          <span className="section-subtitle">Credentials</span>
          <h2 className="section-title">Certifications Console</h2>
        </div>

        {/* 3-Card Grid */}
        <div className={styles.certGrid}>
          {certData.map((cert, idx) => (
            <div 
              key={idx} 
              className={`${styles.certCard} interactive`}
              onClick={() => handleCardClick(cert.image)}
            >
              {/* Top Image Preview Container */}
              <div className={styles.cardImageContainer}>
                <img 
                  src={cert.image} 
                  alt={cert.title} 
                  className={styles.certImage} 
                  onError={(e) => {
                    // Fallback image
                    e.target.src = 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=600&q=80';
                  }}
                />
                {/* Hover Actions Overlay */}
                <div className={styles.imageOverlay}>
                  <div className={styles.viewBadge}>
                    <ExternalLink size={14} />
                    <span>View Credential</span>
                  </div>
                </div>
              </div>

              {/* Bottom Information Column */}
              <div className={styles.cardDetails}>
                <div className={styles.cardTitleRow}>
                  <div className={styles.iconCircle}>
                    <Award size={18} />
                  </div>
                  <span className={styles.issuerName}>{cert.issuer}</span>
                </div>

                <h3 className={styles.certTitle}>{cert.title}</h3>
                
                <div className={styles.divider} />
                
                <div className={styles.metaRow}>
                  <span className={styles.dateLabel}>{cert.date}</span>
                  <span className={styles.credIdText}>ID: {cert.credId}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
