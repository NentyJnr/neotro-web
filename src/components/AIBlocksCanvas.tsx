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
    // 1. SMALL 3D GREEN CUBES & WIREFRAME BOXES (5-7 SUBTLE FLOATING CUBES)
    // =========================================================================
    const cubeGroup = new THREE.Group();
    scene.add(cubeGroup);

    const blockCount = 6;
    const blocks: THREE.Group[] = [];
    const blockData: { origPos: THREE.Vector3; rotSpeed: THREE.Vector3 }[] = [];

    // Positions concentrated across center-right open space & background
    const cubePositions = [
      new THREE.Vector3(4.5, 2.5, 0),    // Center-right top
      new THREE.Vector3(7.0, -1.5, 2),   // Right middle
      new THREE.Vector3(3.2, -3.8, -1),  // Center-right bottom
      new THREE.Vector3(9.5, 3.8, -3),   // Far right top
      new THREE.Vector3(8.2, -5.2, -4),  // Far right bottom
      new THREE.Vector3(-6.5, 4.2, -5),  // Soft background left drift
    ];

    const cubeScales = [1.2, 0.9, 1.4, 0.8, 1.1, 0.75];

    for (let i = 0; i < blockCount; i++) {
      const scale = cubeScales[i];
      const boxGeo = new THREE.BoxGeometry(scale, scale, scale);

      // Semi-transparent faces
      const faceMat = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? vibrantJade : richEmerald,
        transparent: true,
        opacity: i % 2 === 0 ? 0.25 : 0.35,
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
          (Math.random() - 0.5) * 0.012,
          (Math.random() - 0.5) * 0.014,
          (Math.random() - 0.5) * 0.01
        ),
      });
    }

    // =========================================================================
    // 2. HIGH DENSITY "FALLING STARS" PARTICLE MATRIX (450 Particles in 3 Tone Layers)
    // =========================================================================
    
    // Layer 1: Deep Forest Stars (250 Particles - #093824)
    const countFar = 250;
    const geoFar = new THREE.BufferGeometry();
    const posFar = new Float32Array(countFar * 3);
    const speedFar = new Float32Array(countFar);

    for (let i = 0; i < countFar; i++) {
      posFar[i * 3] = (Math.random() - 0.5) * 55;
      posFar[i * 3 + 1] = (Math.random() - 0.5) * 32;
      posFar[i * 3 + 2] = -8 - Math.random() * 12;
      speedFar[i] = 0.018 + Math.random() * 0.012;
    }
    geoFar.setAttribute('position', new THREE.BufferAttribute(posFar, 3));
    const matFar = new THREE.PointsMaterial({
      color: deepForest,
      size: 0.12,
      transparent: true,
      opacity: 0.7,
    });
    const starsFar = new THREE.Points(geoFar, matFar);
    scene.add(starsFar);

    // Layer 2: Rich Emerald Stars (140 Particles - #059669)
    const countMid = 140;
    const geoMid = new THREE.BufferGeometry();
    const posMid = new Float32Array(countMid * 3);
    const speedMid = new Float32Array(countMid);

    for (let i = 0; i < countMid; i++) {
      posMid[i * 3] = (Math.random() - 0.5) * 50;
      posMid[i * 3 + 1] = (Math.random() - 0.5) * 32;
      posMid[i * 3 + 2] = -2 - Math.random() * 6;
      speedMid[i] = 0.038 + Math.random() * 0.022;
    }
    geoMid.setAttribute('position', new THREE.BufferAttribute(posMid, 3));
    const matMid = new THREE.PointsMaterial({
      color: richEmerald,
      size: 0.18,
      transparent: true,
      opacity: 0.85,
    });
    const starsMid = new THREE.Points(geoMid, matMid);
    scene.add(starsMid);

    // Layer 3: Vibrant Jade Foreground Stars (60 Particles - #10B981)
    const countNear = 60;
    const geoNear = new THREE.BufferGeometry();
    const posNear = new Float32Array(countNear * 3);
    const speedNear = new Float32Array(countNear);

    for (let i = 0; i < countNear; i++) {
      posNear[i * 3] = (Math.random() - 0.5) * 45;
      posNear[i * 3 + 1] = (Math.random() - 0.5) * 32;
      posNear[i * 3 + 2] = 2 + Math.random() * 6;
      speedNear[i] = 0.07 + Math.random() * 0.035;
    }
    geoNear.setAttribute('position', new THREE.BufferAttribute(posNear, 3));
    const matNear = new THREE.PointsMaterial({
      color: vibrantJade,
      size: 0.26,
      transparent: true,
      opacity: 0.9,
    });
    const starsNear = new THREE.Points(geoNear, matNear);
    scene.add(starsNear);

    // Lighting for 3D Cubes
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.position.set(10, 15, 10);
    scene.add(dirLight);

    // Mouse Parallax Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / container.clientWidth - 0.5) * 2;
      mouseY = -((e.clientY - rect.top) / container.clientHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Camera parallax
      targetX += (mouseX * 1.2 - targetX) * 0.05;
      targetY += (mouseY * 1.2 - targetY) * 0.05;
      scene.rotation.y = targetX * 0.08;
      scene.rotation.x = -targetY * 0.08;

      // Rotate & float 3D green boxes
      blocks.forEach((block, index) => {
        const data = blockData[index];
        block.rotation.x += data.rotSpeed.x;
        block.rotation.y += data.rotSpeed.y;
        block.position.y = data.origPos.y + Math.sin(elapsedTime * 1.2 + index) * 0.25;
      });

      // -----------------------------------------------------------------------
      // FALLING STARS MOVEMENT & CONTINUOUS RESPAWN
      // -----------------------------------------------------------------------

      // Layer 1: Far Stars
      const arrayFar = geoFar.attributes.position.array as Float32Array;
      for (let i = 0; i < countFar; i++) {
        arrayFar[i * 3 + 1] -= speedFar[i];
        arrayFar[i * 3] += 0.002;
        if (arrayFar[i * 3 + 1] < -16) {
          arrayFar[i * 3 + 1] = 16;
          arrayFar[i * 3] = (Math.random() - 0.5) * 55;
        }
      }
      geoFar.attributes.position.needsUpdate = true;

      // Layer 2: Mid Stars
      const arrayMid = geoMid.attributes.position.array as Float32Array;
      for (let i = 0; i < countMid; i++) {
        arrayMid[i * 3 + 1] -= speedMid[i];
        arrayMid[i * 3] += 0.003;
        if (arrayMid[i * 3 + 1] < -16) {
          arrayMid[i * 3 + 1] = 16;
          arrayMid[i * 3] = (Math.random() - 0.5) * 50;
        }
      }
      geoMid.attributes.position.needsUpdate = true;

      // Layer 3: Near Stars
      const arrayNear = geoNear.attributes.position.array as Float32Array;
      for (let i = 0; i < countNear; i++) {
        arrayNear[i * 3 + 1] -= speedNear[i];
        arrayNear[i * 3] += 0.004;
        if (arrayNear[i * 3 + 1] < -16) {
          arrayNear[i * 3 + 1] = 16;
          arrayNear[i * 3] = (Math.random() - 0.5) * 45;
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
