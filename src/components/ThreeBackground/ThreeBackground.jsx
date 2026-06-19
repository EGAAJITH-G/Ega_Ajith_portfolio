import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from './ThreeBackground.module.css';

const ThreeBackground = () => {
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dimensions
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene setup
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
    camera.position.z = 400;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particle geometry
    const particleCount = 180;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);

    const cyanColor = new THREE.Color('#00F5FF');
    const violetColor = new THREE.Color('#8B5CF6');
    const pinkColor = new THREE.Color('#FF4D8D');

    for (let i = 0; i < particleCount; i++) {
      // Position spread
      positions[i * 3] = (Math.random() - 0.5) * 800;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 800;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 800;

      // Color selection (gradient between Cyan, Violet, Pink)
      let col = cyanColor;
      const rand = Math.random();
      if (rand > 0.66) {
        col = violetColor;
      } else if (rand > 0.33) {
        col = pinkColor;
      }

      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;

      // Random vertical drift speeds
      speeds[i] = 0.2 + Math.random() * 0.5;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Custom circle texture for particles
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 16, 16);
    const texture = new THREE.CanvasTexture(canvas);

    // Material
    const material = new THREE.PointsMaterial({
      size: 4,
      map: texture,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    // Points system
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Mouse movement track
    const handleMouseMove = (event) => {
      mouseRef.current.targetX = (event.clientX - window.innerWidth / 2) * 0.15;
      mouseRef.current.targetY = (event.clientY - window.innerHeight / 2) * 0.15;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize handler
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Slow drift particles
      const positionsArr = points.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        // Vertical drift
        positionsArr[i * 3 + 1] += speeds[i];
        
        // Loop back when top boundary reached
        if (positionsArr[i * 3 + 1] > 400) {
          positionsArr[i * 3 + 1] = -400;
        }

        // Horizontal drift
        positionsArr[i * 3] += Math.sin(positionsArr[i * 3 + 1] * 0.01 + i) * 0.1;
      }
      points.geometry.attributes.position.needsUpdate = true;

      // Slow overall rotation
      points.rotation.y += 0.0008;
      points.rotation.x += 0.0003;

      // Smooth mouse interpolation (Damping)
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      camera.position.x = mouseRef.current.x;
      camera.position.y = -mouseRef.current.y;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      
      if (renderer && renderer.domElement && container) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className={styles.canvasContainer} />;
};

export default ThreeBackground;
