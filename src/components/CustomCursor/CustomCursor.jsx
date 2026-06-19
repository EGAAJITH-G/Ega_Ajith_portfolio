import { useState, useEffect } from 'react';
import styles from './CustomCursor.module.css';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Inner dot immediately follows the mouse, outer ring trails with a delay
  useEffect(() => {
    let animationFrameId;
    
    const updateTrail = () => {
      setTrail((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        // Interpolate trail position (adjust 0.15 for speed/delay)
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15,
        };
      });
      animationFrameId = requestAnimationFrame(updateTrail);
    };

    animationFrameId = requestAnimationFrame(updateTrail);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position]);

  // Hook hover states on interactive classes
  useEffect(() => {
    const addHover = () => setIsHovered(true);
    const removeHover = () => setIsHovered(false);

    const refreshListeners = () => {
      const targets = document.querySelectorAll('a, button, .interactive, input, textarea');
      targets.forEach((target) => {
        target.removeEventListener('mouseenter', addHover);
        target.removeEventListener('mouseleave', removeHover);
        target.addEventListener('mouseenter', addHover);
        target.addEventListener('mouseleave', removeHover);
      });
    };

    refreshListeners();

    // Set up a MutationObserver to watch for DOM updates and re-attach hover listeners
    const observer = new MutationObserver(refreshListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Inner Dot */}
      <div 
        className={`${styles.cursorDot} ${isClicked ? styles.dotClicked : ''}`}
        style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)` }}
      />
      {/* Outer Ring */}
      <div 
        className={`${styles.cursorRing} ${isHovered ? styles.ringHovered : ''} ${isClicked ? styles.ringClicked : ''}`}
        style={{ transform: `translate3d(${trail.x}px, ${trail.y}px, 0) translate(-50%, -50%)` }}
      />
    </>
  );
};

export default CustomCursor;
