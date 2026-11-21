import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface AIBlocksCanvasProps {
  colorTheme?: 'light' | 'dark';
}

export function AIBlocksCanvas({ colorTheme = 'light' }: AIBlocksCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 18);

    // Renderer with 100% transparent background
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // High-Contrast Green Palette for Light Pearl-Ash Background
    const deepForest = new THREE.Color('#093824');
    const richEmerald = new THREE.Color('#059669');
    const vibrantJade = new THREE.Color('#10B981');

    // =========================================================================
    // 1. SMALL 3D GREEN CUBES & WIREFRAME BOXES (CONFINED TO RIGHT SIDE: x >= 2.5)
    // ZERO OVERLAP WITH THE LEFT TEXT COLUMN
    // =========================================================================
    const cubeGroup = new THREE.Group();
    scene.add(cubeGroup);

    const blockCount = 5;
    const blocks: THREE.Group[] = [];
    const blockData: { origPos: THREE.Vector3; rotSpeed: THREE.Vector3 }[] = [];

    // Positions concentrated strictly on the right side - never across left text column
    const cubePositions = [
      new THREE.Vector3(4.8, 3.2, 0),     // Right top
      new THREE.Vector3(7.5, -0.8, 1.8),   // Far right center
      new THREE.Vector3(3.8, -4.2, -0.8),  // Right bottom
      new THREE.Vector3(8.8, 3.8, -2.5),   // Far right top accent
      new THREE.Vector3(6.5, -4.5, -3.0),  // Far right bottom
    ];

    const cubeScales = [1.1, 0.85, 1.25, 0.75, 0.95];

    for (let i = 0; i < blockCount; i++) {
      const scale = cubeScales[i];
      const boxGeo = new THREE.BoxGeometry(scale, scale, scale);

      // Semi-transparent faces
      const faceMat = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? vibrantJade : richEmerald,
        transparent: true,
        opacity: i % 2 === 0 ? 0.22 : 0.32,
        roughness: 0.3,
        metalness: 0.1,
      });
      const faceMesh = new THREE.Mesh(boxGeo, faceMat);

      // Wireframe edges
      const edgeGeo = new THREE.EdgesGeometry(boxGeo);
      const edgeMat = new THREE.LineBasicMaterial({
        color: i % 2 === 0 ? richEmerald : deepForest,
        linewidth: 1.5,
      });
      const wireframe = new THREE.LineSegments(edgeGeo, edgeMat);

      const singleCube = new THREE.Group();
      singleCube.add(faceMesh);
      singleCube.add(wireframe);

      const pos = cubePositions[i];
      singleCube.position.copy(pos);
      singleCube.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);

      cubeGroup.add(singleCube);
      blocks.push(singleCube);
      blockData.push({
        origPos: pos.clone(),
        rotSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.010,
          (Math.random() - 0.5) * 0.012,
          (Math.random() - 0.5) * 0.008
        ),
      });
    }

    // =========================================================================
    // 2. RIGHT-CONFINED "FALLING STARS" PARTICLE MATRIX (Subtle Depth, Right Quadrant)
    // =========================================================================
    
    // Layer 1: Deep Forest Stars (160 Particles - right hemisphere x in [1.5, 26])
    const countFar = 160;
    const geoFar = new THREE.BufferGeometry();
    const posFar = new Float32Array(countFar * 3);
    const speedFar = new Float32Array(countFar);

    for (let i = 0; i < countFar; i++) {
      posFar[i * 3] = 1.5 + Math.random() * 24; // strictly positive X
      posFar[i * 3 + 1] = (Math.random() - 0.5) * 32;
      posFar[i * 3 + 2] = -8 - Math.random() * 12;
      speedFar[i] = 0.014 + Math.random() * 0.010;
    }
    geoFar.setAttribute('position', new THREE.BufferAttribute(posFar, 3));
    const matFar = new THREE.PointsMaterial({
      color: deepForest,
      size: 0.11,
      transparent: true,
      opacity: 0.65,
    });
    const starsFar = new THREE.Points(geoFar, matFar);
    scene.add(starsFar);

    // Layer 2: Rich Emerald Stars (90 Particles - right hemisphere x in [2.0, 24])
    const countMid = 90;
    const geoMid = new THREE.BufferGeometry();
    const posMid = new Float32Array(countMid * 3);
    const speedMid = new Float32Array(countMid);

    for (let i = 0; i < countMid; i++) {
      posMid[i * 3] = 2.0 + Math.random() * 22; // strictly positive X
      posMid[i * 3 + 1] = (Math.random() - 0.5) * 32;
      posMid[i * 3 + 2] = -2 - Math.random() * 6;
      speedMid[i] = 0.028 + Math.random() * 0.018;
    }
    geoMid.setAttribute('position', new THREE.BufferAttribute(posMid, 3));
    const matMid = new THREE.PointsMaterial({
      color: richEmerald,
      size: 0.16,
      transparent: true,
      opacity: 0.75,
    });
    const starsMid = new THREE.Points(geoMid, matMid);
    scene.add(starsMid);

    // Layer 3: Vibrant Jade Foreground Stars (40 Particles - right hemisphere x in [2.5, 20])
    const countNear = 40;
    const geoNear = new THREE.BufferGeometry();
    const posNear = new Float32Array(countNear * 3);
    const speedNear = new Float32Array(countNear);

    for (let i = 0; i < countNear; i++) {
      posNear[i * 3] = 2.5 + Math.random() * 18; // strictly positive X
      posNear[i * 3 + 1] = (Math.random() - 0.5) * 32;
      posNear[i * 3 + 2] = 2 + Math.random() * 5;
      speedNear[i] = 0.05 + Math.random() * 0.025;
    }
    geoNear.setAttribute('position', new THREE.BufferAttribute(posNear, 3));
    const matNear = new THREE.PointsMaterial({
      color: vibrantJade,
      size: 0.22,
      transparent: true,
      opacity: 0.85,
    });
    const starsNear = new THREE.Points(geoNear, matNear);
    scene.add(starsNear);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(5, 10, 7);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(richEmerald, 1.8);
    dirLight2.position.set(10, -5, 5);
    scene.add(dirLight2);

    // Mouse movement parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX = (event.clientX / innerWidth - 0.5) * 2;
      mouseY = (event.clientY / innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      if (prefersReducedMotion) {
        // Render single static frame and do not schedule requestAnimationFrame
        renderer.render(scene, camera);
        return;
      }

      const elapsedTime = clock.getElapsedTime();

      // Camera parallax
      targetX += (mouseX * 0.8 - targetX) * 0.05;
      targetY += (mouseY * 0.8 - targetY) * 0.05;
      scene.rotation.y = targetX * 0.05;
      scene.rotation.x = -targetY * 0.05;

      // Rotate & float 3D green boxes
      blocks.forEach((block, index) => {
        const data = blockData[index];
        block.rotation.x += data.rotSpeed.x;
        block.rotation.y += data.rotSpeed.y;
        block.position.y = data.origPos.y + Math.sin(elapsedTime * 1.2 + index) * 0.22;
      });

      // -----------------------------------------------------------------------
      // FALLING STARS MOVEMENT & CONTINUOUS RESPAWN (RIGHT HEMISPHERE ONLY)
      // -----------------------------------------------------------------------

      // Layer 1: Far Stars
      const arrayFar = geoFar.attributes.position.array as Float32Array;
      for (let i = 0; i < countFar; i++) {
        arrayFar[i * 3 + 1] -= speedFar[i];
        if (arrayFar[i * 3 + 1] < -16) {
          arrayFar[i * 3 + 1] = 16;
          arrayFar[i * 3] = 1.5 + Math.random() * 24;
        }
      }
      geoFar.attributes.position.needsUpdate = true;

      // Layer 2: Mid Stars
      const arrayMid = geoMid.attributes.position.array as Float32Array;
      for (let i = 0; i < countMid; i++) {
        arrayMid[i * 3 + 1] -= speedMid[i];
        if (arrayMid[i * 3 + 1] < -16) {
          arrayMid[i * 3 + 1] = 16;
          arrayMid[i * 3] = 2.0 + Math.random() * 22;
        }
      }
      geoMid.attributes.position.needsUpdate = true;

      // Layer 3: Near Stars
      const arrayNear = geoNear.attributes.position.array as Float32Array;
      for (let i = 0; i < countNear; i++) {
        arrayNear[i * 3 + 1] -= speedNear[i];
        if (arrayNear[i * 3 + 1] < -16) {
          arrayNear[i * 3 + 1] = 16;
          arrayNear[i * 3] = 2.5 + Math.random() * 18;
        }
      }
      geoNear.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, [colorTheme]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full absolute inset-0 pointer-events-none"
      style={{ minHeight: '100%' }}
    />
  );
}

export default AIBlocksCanvas;
