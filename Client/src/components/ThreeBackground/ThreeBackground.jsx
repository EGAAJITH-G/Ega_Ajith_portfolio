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

    // Node structure
    const nodes = [];
    const numSpokes = 10;
    const numRings = 8;
    const ringSpacing = 75;

    // Central center node
    nodes.push({
      id: 0,
      basePos: new THREE.Vector3(0, 0, 10),
      pos: new THREE.Vector3(0, 0, 10),
      phase: Math.random() * Math.PI * 2,
      speed: 0.8 + Math.random() * 0.5,
      neighbors: [],
      isWeb: true
    });

    // Create concentric spider web nodes
    let nodeId = 1;
    for (let ring = 0; ring < numRings; ring++) {
      const r = (ring + 1) * ringSpacing;
      for (let spoke = 0; spoke < numSpokes; spoke++) {
        const angle = (spoke / numSpokes) * Math.PI * 2;
        // Cone depth effect
        const z = -r * 0.15;
        const x = r * Math.cos(angle);
        const y = r * Math.sin(angle);

        nodes.push({
          id: nodeId++,
          basePos: new THREE.Vector3(x, y, z),
          pos: new THREE.Vector3(x, y, z),
          phase: Math.random() * Math.PI * 2,
          speed: 0.5 + Math.random() * 0.8,
          neighbors: [],
          isWeb: true
        });
      }
    }

    // Floating neural network nodes (outer bounds / depth layers)
    const numRandomNodes = 40;
    for (let i = 0; i < numRandomNodes; i++) {
      const r = 200 + Math.random() * 300;
      const angle = Math.random() * Math.PI * 2;
      const x = r * Math.cos(angle);
      const y = r * Math.sin(angle);
      const z = -200 + Math.random() * 150;

      nodes.push({
        id: nodeId++,
        basePos: new THREE.Vector3(x, y, z),
        pos: new THREE.Vector3(x, y, z),
        phase: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.5,
        neighbors: [],
        isWeb: false
      });
    }

    // Set up web connections
    // Connect center node to innermost ring
    for (let spoke = 0; spoke < numSpokes; spoke++) {
      // Node index on innermost ring is spoke + 1
      const innerNodeId = spoke + 1;
      nodes[0].neighbors.push(innerNodeId);
      nodes[innerNodeId].neighbors.push(0);
    }

    // Connect rings and radials
    for (let ring = 0; ring < numRings; ring++) {
      const ringStartId = 1 + ring * numSpokes;
      for (let spoke = 0; spoke < numSpokes; spoke++) {
        const currentId = ringStartId + spoke;

        // 1. Concentric Ring connections: connect current to next spoke in same ring
        const nextSpokeId = ringStartId + ((spoke + 1) % numSpokes);
        if (!nodes[currentId].neighbors.includes(nextSpokeId)) {
          nodes[currentId].neighbors.push(nextSpokeId);
        }
        if (!nodes[nextSpokeId].neighbors.includes(currentId)) {
          nodes[nextSpokeId].neighbors.push(currentId);
        }

        // 2. Radial Spoke connections: connect current to outer ring spoke
        if (ring < numRings - 1) {
          const outerId = currentId + numSpokes;
          if (!nodes[currentId].neighbors.includes(outerId)) {
            nodes[currentId].neighbors.push(outerId);
          }
          if (!nodes[outerId].neighbors.includes(currentId)) {
            nodes[outerId].neighbors.push(currentId);
          }
        }
      }
    }

    // Connect random nodes to nearest neighbors
    const totalNodesCount = nodes.length;
    for (let i = nodeId - numRandomNodes; i < totalNodesCount; i++) {
      const current = nodes[i];
      // Find two nearest nodes (can be web nodes or random nodes)
      const distances = [];
      for (let j = 0; j < totalNodesCount; j++) {
        if (i === j) continue;
        const d = current.basePos.distanceTo(nodes[j].basePos);
        distances.push({ id: j, dist: d });
      }
      distances.sort((a, b) => a.dist - b.dist);

      // Connect to nearest 2 nodes
      for (let k = 0; k < 2; k++) {
        const targetId = distances[k].id;
        if (!current.neighbors.includes(targetId)) {
          current.neighbors.push(targetId);
        }
        if (!nodes[targetId].neighbors.includes(i)) {
          nodes[targetId].neighbors.push(i);
        }
      }
    }

    // Create unique connection pairs list for line segments
    const connections = [];
    const connectionSet = new Set();
    nodes.forEach(node => {
      node.neighbors.forEach(neighborId => {
        const key = node.id < neighborId ? `${node.id}-${neighborId}` : `${neighborId}-${node.id}`;
        if (!connectionSet.has(key)) {
          connectionSet.add(key);
          connections.push({ from: node.id, to: neighborId });
        }
      });
    });

    // 1. Line Segments for Web Strands
    const linePositions = new Float32Array(connections.length * 2 * 3);
    const lineColors = new Float32Array(connections.length * 2 * 3);

    // Setup lines attributes (thin red glowing lines)
    const baseLineColor = new THREE.Color('#ffffffff');
    const darkLineColor = new THREE.Color('#330000');

    connections.forEach((conn, index) => {
      // Set line colors
      const isFromWeb = nodes[conn.from].isWeb && nodes[conn.to].isWeb;
      const col = isFromWeb ? baseLineColor : darkLineColor;

      lineColors[index * 6] = col.r;
      lineColors[index * 6 + 1] = col.g;
      lineColors[index * 6 + 2] = col.b;

      lineColors[index * 6 + 3] = col.r;
      lineColors[index * 6 + 4] = col.g;
      lineColors[index * 6 + 5] = col.b;
    });

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineSegments);

    // 2. Points for Node Intersections
    const pointPositions = new Float32Array(nodes.length * 3);
    const pointColors = new Float32Array(nodes.length * 3);

    const nodeWebColor = new THREE.Color('#ff3333');
    const nodeRandColor = new THREE.Color('#ff0000');

    nodes.forEach((node, index) => {
      pointPositions[index * 3] = node.pos.x;
      pointPositions[index * 3 + 1] = node.pos.y;
      pointPositions[index * 3 + 2] = node.pos.z;

      const col = node.isWeb ? nodeWebColor : nodeRandColor;
      pointColors[index * 3] = col.r;
      pointColors[index * 3 + 1] = col.g;
      pointColors[index * 3 + 2] = col.b;
    });

    // Custom circle glowing texture
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    gradient.addColorStop(0, 'rgba(255, 26, 26, 1)');
    gradient.addColorStop(0.3, 'rgba(255, 26, 26, 0.8)');
    gradient.addColorStop(0.6, 'rgba(255, 26, 26, 0.2)');
    gradient.addColorStop(1, 'rgba(255, 26, 26, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 16, 16);
    const nodeTexture = new THREE.CanvasTexture(canvas);

    const pointGeometry = new THREE.BufferGeometry();
    pointGeometry.setAttribute('position', new THREE.BufferAttribute(pointPositions, 3));
    pointGeometry.setAttribute('color', new THREE.BufferAttribute(pointColors, 3));

    const pointMaterial = new THREE.PointsMaterial({
      size: 10,
      map: nodeTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const nodePoints = new THREE.Points(pointGeometry, pointMaterial);
    scene.add(nodePoints);

    // 3. Energy Pulses Traversing Paths
    const numPulses = 22;
    const pulses = [];
    for (let i = 0; i < numPulses; i++) {
      // Pick random start node
      const startId = Math.floor(Math.random() * nodes.length);
      const startNode = nodes[startId];
      // Pick random neighbor
      const neighborId = startNode.neighbors.length > 0 ? startNode.neighbors[Math.floor(Math.random() * startNode.neighbors.length)] : startId;

      pulses.push({
        currentNode: startId,
        targetNode: neighborId,
        progress: Math.random(), // Randomize starting progress for organic flow
        speed: 0.008 + Math.random() * 0.015,
        pos: new THREE.Vector3()
      });
    }

    const pulsePositions = new Float32Array(numPulses * 3);
    const pulseGeometry = new THREE.BufferGeometry();
    pulseGeometry.setAttribute('position', new THREE.BufferAttribute(pulsePositions, 3));

    // Custom pulse glow texture (bright center)
    const pulseCanvas = document.createElement('canvas');
    pulseCanvas.width = 16;
    pulseCanvas.height = 16;
    const pulseCtx = pulseCanvas.getContext('2d');
    const pulseGrad = pulseCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
    pulseGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    pulseGrad.addColorStop(0.2, 'rgba(255, 51, 51, 1)');
    pulseGrad.addColorStop(0.5, 'rgba(255, 26, 26, 0.4)');
    pulseGrad.addColorStop(1, 'rgba(255, 26, 26, 0)');
    pulseCtx.fillStyle = pulseGrad;
    pulseCtx.fillRect(0, 0, 16, 16);
    const pulseTexture = new THREE.CanvasTexture(pulseCanvas);

    const pulseMaterial = new THREE.PointsMaterial({
      size: 15,
      map: pulseTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const pulsePoints = new THREE.Points(pulseGeometry, pulseMaterial);
    scene.add(pulsePoints);

    // Mouse movement track
    const handleMouseMove = (event) => {
      // Standard camera rotation
      mouseRef.current.targetX = (event.clientX - window.innerWidth / 2) * 0.1;
      mouseRef.current.targetY = (event.clientY - window.innerHeight / 2) * 0.1;

      // Project mouse client coordinates into scene coordinate bounds for node ripple
      const mx = (event.clientX / window.innerWidth) * 2 - 1;
      const my = -(event.clientY / window.innerHeight) * 2 + 1;

      mouseRef.current.ndcX = mx;
      mouseRef.current.ndcY = my;
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

    // Web draw-in opacity animation on load
    let drawInOpacity = 0;

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();

      // Slowly fade lines in when loaded
      if (drawInOpacity < 1) {
        drawInOpacity += 0.008;
        lineMaterial.opacity = drawInOpacity * 0.28;
        pointMaterial.opacity = drawInOpacity;
        pulseMaterial.opacity = drawInOpacity;
      }

      // Calculate mouse 3D projection for displacement ripple
      const mouseVec = new THREE.Vector3();
      if (mouseRef.current.ndcX !== undefined) {
        // Project NDC mouse onto Z coordinate plane
        // Quick scaling to match screen units:
        mouseVec.set(
          mouseRef.current.ndcX * (window.innerWidth / 2) * 0.7,
          mouseRef.current.ndcY * (window.innerHeight / 2) * 0.7,
          0
        );
      }

      // 1. Update nodes float + mouse displacement
      nodes.forEach((node) => {
        // Float drift offset
        const dx = Math.sin(time * node.speed + node.phase) * 6;
        const dy = Math.cos(time * node.speed + node.phase) * 6;
        const dz = Math.sin(time * node.speed * 0.5 + node.phase) * 4;

        const targetPos = node.basePos.clone().add(new THREE.Vector3(dx, dy, dz));

        // Mouse ripple displacement push
        if (mouseRef.current.ndcX !== undefined) {
          const distToMouse = targetPos.distanceTo(mouseVec);
          if (distToMouse < 180) {
            // Push direction
            const pushDir = targetPos.clone().sub(mouseVec).normalize();
            // Push strength inversely proportional to distance
            const strength = (180 - distToMouse) * 0.24;
            targetPos.add(pushDir.multiplyScalar(strength));
          }
        }

        // Smoothly interpolate current position towards target
        node.pos.lerp(targetPos, 0.08);
      });

      // 2. Update line segments buffer attributes
      const linePositionsArr = lineGeometry.attributes.position.array;
      connections.forEach((conn, index) => {
        const fromNode = nodes[conn.from];
        const toNode = nodes[conn.to];

        linePositionsArr[index * 6] = fromNode.pos.x;
        linePositionsArr[index * 6 + 1] = fromNode.pos.y;
        linePositionsArr[index * 6 + 2] = fromNode.pos.z;

        linePositionsArr[index * 6 + 3] = toNode.pos.x;
        linePositionsArr[index * 6 + 4] = toNode.pos.y;
        linePositionsArr[index * 6 + 5] = toNode.pos.z;
      });
      lineGeometry.attributes.position.needsUpdate = true;

      // 3. Update nodes point positions
      const pointPositionsArr = pointGeometry.attributes.position.array;
      nodes.forEach((node, index) => {
        pointPositionsArr[index * 3] = node.pos.x;
        pointPositionsArr[index * 3 + 1] = node.pos.y;
        pointPositionsArr[index * 3 + 2] = node.pos.z;
      });
      pointGeometry.attributes.position.needsUpdate = true;

      // 4. Update energy pulses along connection paths
      const pulsePositionsArr = pulseGeometry.attributes.position.array;
      pulses.forEach((pulse, index) => {
        // Increment progress
        pulse.progress += pulse.speed;

        const fromNode = nodes[pulse.currentNode];
        const toNode = nodes[pulse.targetNode];

        if (fromNode && toNode) {
          // Linear interpolation along connection line
          pulse.pos.copy(fromNode.pos).lerp(toNode.pos, pulse.progress);
        }

        // If path complete, select new target index
        if (pulse.progress >= 1) {
          pulse.currentNode = pulse.targetNode;
          pulse.progress = 0;

          const current = nodes[pulse.currentNode];
          if (current && current.neighbors.length > 0) {
            pulse.targetNode = current.neighbors[Math.floor(Math.random() * current.neighbors.length)];
          }
        }

        pulsePositionsArr[index * 3] = pulse.pos.x;
        pulsePositionsArr[index * 3 + 1] = pulse.pos.y;
        pulsePositionsArr[index * 3 + 2] = pulse.pos.z;
      });
      pulseGeometry.attributes.position.needsUpdate = true;

      // Smooth camera interpolation damping (depth parallax)
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
      lineGeometry.dispose();
      lineMaterial.dispose();
      pointGeometry.dispose();
      pointMaterial.dispose();
      pulseGeometry.dispose();
      pulseMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className={styles.canvasContainer} />;
};

export default ThreeBackground;
