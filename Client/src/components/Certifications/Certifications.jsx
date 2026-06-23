import { useState, useEffect } from 'react';
import { Award, ExternalLink } from 'lucide-react';
import styles from './Certifications.module.css';

const Certifications = () => {
  const [certs, setCerts] = useState([]);

  useEffect(() => {
    fetch('/api/certifications')
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => {
        if (data.length > 0) setCerts(data);
      })
      .catch(() => {
        console.log('[CERTIFICATIONS] Using fallback static data.');
      });
  }, []);

  const fallbackCerts = [
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

  const certData = certs.length > 0 ? certs : fallbackCerts;

  const handleCardClick = (imageUrl) => {
    window.open(imageUrl, '_blank');
  };

  return (
    <section 
      id="certifications" 
      className={styles.certSection}
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
              onClick={() => handleCardClick(cert.link)}
            >
              {/* Top Image Preview Container */}
              <div className={styles.cardImageContainer}>
                <img 
                  src={cert.image} 
                  alt={cert.title} 
                  className={styles.certImage} 
                  onError={(e) => {
                    // Fallback image
                    // e.target.src = 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=600&q=80';
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
