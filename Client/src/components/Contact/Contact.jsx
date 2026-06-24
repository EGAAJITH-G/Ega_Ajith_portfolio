import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Briefcase } from 'lucide-react';
import { playClickSound, playTypeSound } from '../../utils/soundUtils';
import styles from './Contact.module.css';

const GithubIcon = ({ size = 15, className, style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={{ flexShrink: 0, ...style }}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

const WhatsappIcon = ({ size = 15, className, style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={{ flexShrink: 0, ...style }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.705 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="currentColor" stroke="none"/>
  </svg>
);

const LinkedinIcon = ({ size = 15, className, style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={{ flexShrink: 0, ...style }}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  // Monitor resize for mobile-only LinkedIn button layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleInputChange = (e) => {
    playTypeSound();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'email') setEmailError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    playClickSound();
    setEmailError('');
    if (!formData.name || !formData.email || !formData.message) return;
    
    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setEmailError('[ ERROR ] Invalid email packet address.');
      return;
    }
    
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to establish connection.');
      }

      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setEmailError(`[ ERROR ] ${err.message}`);
    }
  };

  const leftPanelVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  };

  const rightPanelVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  };

  return (
    <section 
      id="contact" 
      className={styles.contactSection}
    >
      <div className={styles.contactContainer}>
        <div className="section-header">
          <span className="section-subtitle">Communications</span>
          <h2 className="section-title">Contact Command</h2>
        </div>

        <div className={styles.consoleGrid}>
          {/* Left Column - Communication Hub */}
          <motion.div 
            className={styles.hubPanel}
            variants={leftPanelVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <div>
              <h3 className={styles.hubTitle}>
                Let's Create Something Great Together
                <span className={styles.hubSubtitle}>Excited to bring my skills, dedication, and enthusiasm to your organization.</span>
              </h3>
            </div>

            <div className={styles.infoList}>
              <div className={`${styles.infoItem} interactive`}>
                <div className={styles.infoIcon}>
                  <Mail size={20} />
                </div>
                <div className={styles.infoDetails}>
                  <span className={styles.infoLabel}>Send Email</span>
                  <span className={styles.infoText}>egaajith4343@gmail.com</span>
                </div>
              </div>

              <div className={`${styles.infoItem} interactive`}>
                <div className={styles.infoIcon}>
                  <Phone size={20} />
                </div>
                <div className={styles.infoDetails}>
                  <span className={styles.infoLabel}>Call Direct</span>
                  <span className={styles.infoText}>+91 63802 59861</span>
                </div>
              </div>

              <div className={`${styles.infoItem} interactive`}>
                <div className={styles.infoIcon}>
                  <MapPin size={20} />
                </div>
                <div className={styles.infoDetails}>
                  <span className={styles.infoLabel}>Location</span>
                  <span className={styles.infoText}>Chennai, Tamil Nadu, India</span>
                </div>
              </div>
            </div>

            <div className={styles.meetingBtnGroup}>
              <a 
                href="https://wa.me/6380259861" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`${styles.meetBtn} ${styles.whatsappBtn} cyber-button`}
              >
                <WhatsappIcon size={14} style={{ marginRight: '6px' }} /> WhatsApp
              </a>
              {isMobile && (
                <a 
                  href="https://www.linkedin.com/in/ega-ajith-g2004/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`${styles.meetBtn} ${styles.linkedinBtn} cyber-button`}
                >
                  <LinkedinIcon size={14} style={{ marginRight: '6px' }} /> LinkedIn
                </a>
              )}
              <a 
                href="https://github.com/EGAAJITH-G" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`${styles.meetBtn} ${styles.githubBtn} cyber-button`}
              >
                <GithubIcon size={14} style={{ marginRight: '6px' }} /> GitHub
              </a>
              <button 
                className={`${styles.meetBtn} ${styles.hireBtn} cyber-button`}
                onClick={() => document.getElementById('contact-name')?.focus()}
              >
                <Briefcase size={14} style={{ marginRight: '6px' }} /> Hire Me
              </button>
            </div>
          </motion.div>

          {/* Right Column - Form Console */}
          <motion.div 
            className={styles.formPanel}
            variants={rightPanelVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel} htmlFor="contact-name">Name</label>
                  <input 
                    type="text" 
                    id="contact-name"
                    name="name"
                    className={styles.formInput} 
                    placeholder="Enter name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel} htmlFor="contact-email">Email</label>
                  <input 
                    type="email" 
                    id="contact-email"
                    name="email"
                    className={styles.formInput} 
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  {emailError && (
                    <span className={styles.errorText}>{emailError}</span>
                  )}
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel} htmlFor="contact-phone">Phone Number</label>
                  <input 
                    type="tel" 
                    id="contact-phone"
                    name="phone"
                    className={styles.formInput} 
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel} htmlFor="contact-message">Message</label>
                  <textarea 
                    id="contact-message"
                    name="message"
                    className={`${styles.formInput} ${styles.formTextarea}`} 
                    placeholder="Type message details"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <button type="submit" className={`${styles.submitBtn} cyber-button`}>
                  <Send size={14} style={{ marginRight: '8px' }} /> Send Message
                </button>
              </form>
            ) : (
              <motion.div 
                className={styles.thankYouPanel}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className={styles.successIconWrapper}>
                  <svg className={styles.successSvg} viewBox="0 0 52 52">
                    <circle className={styles.successCircle} cx="26" cy="26" r="25" fill="none"/>
                    <path className={styles.successCheck} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                  </svg>
                </div>
                
                <h3 className={styles.thankYouTitle}>THANK YOU!</h3>
                <span className={styles.thankYouSubtitle}>for contacting me <br />HAVE A GREAT DAY ... !</span>
                
                {/* <p className={styles.thankYouText}>
                  Your connection packet has been successfully routed. I've received your details and will establish contact shortly.
                </p> */}

                <div className={styles.successSeparator} />

                <button 
                  onClick={() => { playClickSound(); setIsSubmitted(false); }}
                  className={`${styles.resetBtn} cyber-button`}
                >
                  Send Another Message
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
