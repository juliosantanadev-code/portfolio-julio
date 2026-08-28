import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function ContactBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // SCENE
    const scene = new THREE.Scene();

    // CAMERA
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    // Position camera so the orb is somewhat to the right
    camera.position.z = 10;
    camera.position.x = -2; // Move camera left to push orb to the right

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // CORE GLOW (Billboard)
    const glowGeometry = new THREE.PlaneGeometry(12, 12);
    const glowMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform float uTime;
        void main() {
          vec2 centered = vUv - 0.5;
          float dist = length(centered);
          
          float pulse = sin(uTime * 1.2) * 0.1 + 0.9;
          float coreStrength = 1.0 - (dist * 2.0);
          coreStrength = pow(coreStrength, 3.0) * pulse;
          
          if(coreStrength < 0.01) discard;
          
          // Warm fiery color
          vec3 color = mix(vec3(0.96, 0.22, 0.04), vec3(1.0, 0.8, 0.3), coreStrength);
          
          gl_FragColor = vec4(color, coreStrength * 0.8);
        }
      `
    });
    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glowMesh);

    // ORBITING PARTICLES
    const particleCount = 6000;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    const colors = new Float32Array(particleCount * 3);
    const orbits = new Float32Array(particleCount * 3);
    const orbitParams = new Float32Array(particleCount * 3); // x: radius, y: speed, z: start angle

    const color1 = new THREE.Color('#ff0055'); // Pink
    const color2 = new THREE.Color('#00f0ff'); // Cyan
    const color3 = new THREE.Color('#ffaa00'); // Gold

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      const ringIndex = i % 7; // More complexity for the main orb
      const baseRadius = 0.5 + (ringIndex * 0.6); 
      const radius = baseRadius + (Math.random() - 0.5) * 0.5;
      
      const speed = (Math.random() * 0.4 + 0.1) * (ringIndex % 2 === 0 ? 1 : -1);
      const angle = Math.random() * Math.PI * 2;
      
      const axis = new THREE.Vector3(
        Math.sin(ringIndex * Math.PI / 3.5 + Math.random() * 0.2), 
        Math.cos(ringIndex * Math.PI / 3.5) * 0.5 + (Math.random() - 0.5), 
        Math.sin(ringIndex + Math.random())
      ).normalize();
      
      orbitParams[i3] = radius;
      orbitParams[i3 + 1] = speed;
      orbitParams[i3 + 2] = angle;
      
      orbits[i3] = axis.x;
      orbits[i3 + 1] = axis.y;
      orbits[i3 + 2] = axis.z;
      
      scales[i] = Math.random();

      let mixColor = color1.clone();
      if (Math.random() > 0.4) mixColor = color2.clone();
      if (Math.random() > 0.8) mixColor = color3.clone();
      
      colors[i3] = mixColor.r;
      colors[i3 + 1] = mixColor.g;
      colors[i3 + 2] = mixColor.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particleGeometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
    particleGeometry.setAttribute('aOrbitAxis', new THREE.BufferAttribute(orbits, 3));
    particleGeometry.setAttribute('aOrbitParams', new THREE.BufferAttribute(orbitParams, 3));

    const particleMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader: `
        uniform float uTime;
        attribute float aScale;
        attribute vec3 aOrbitAxis;
        attribute vec3 aOrbitParams;
        varying vec3 vColor;
        
        vec3 rotateAroundAxis(vec3 p, vec3 axis, float angle) {
            float s = sin(angle);
            float c = cos(angle);
            float ic = 1.0 - c;
            return p * c + cross(axis, p) * s + axis * dot(axis, p) * ic;
        }
        
        void main() {
          float radius = aOrbitParams.x;
          float speed = aOrbitParams.y;
          float angle = aOrbitParams.z + uTime * speed;
          
          vec3 orth = vec3(1.0, 0.0, 0.0);
          if (abs(aOrbitAxis.x) > 0.9) orth = vec3(0.0, 1.0, 0.0);
          vec3 startPos = normalize(cross(aOrbitAxis, orth)) * radius;
          
          vec3 pos = rotateAroundAxis(startPos, aOrbitAxis, angle);
          
          // Add some chaotic noise to position based on time
          pos.x += sin(uTime * 2.0 + aOrbitParams.z) * 0.1;
          pos.y += cos(uTime * 1.5 + aOrbitParams.z) * 0.1;
          
          vec4 modelViewPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * modelViewPosition;
          
          float pulse = sin(uTime * 2.0 + angle) * 0.5 + 1.0;
          gl_PointSize = (10.0 * aScale * pulse) * (1.0 / -modelViewPosition.z);
          
          vColor = color;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float dist = distance(gl_PointCoord, vec2(0.5));
          if(dist > 0.5) discard;
          float strength = (0.5 - dist) * 2.0;
          gl_FragColor = vec4(vColor, strength * 0.8);
        }
      `
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // MOUSE PARALLAX
    let targetX = 0;
    let targetY = 0;
    let mouseX = 0;
    let mouseY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onDocumentMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - windowHalfX) * 0.001;
      mouseY = (event.clientY - windowHalfY) * 0.001;
    };
    document.addEventListener('mousemove', onDocumentMouseMove);

    // RESIZE HANDLER
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onWindowResize);

    // ANIMATION LOOP
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      glowMaterial.uniforms.uTime.value = elapsedTime;
      particleMaterial.uniforms.uTime.value = elapsedTime;

      targetX = mouseX * 2.0;
      targetY = mouseY * 1.5;
      scene.rotation.y += 0.02 * (targetX - scene.rotation.y);
      scene.rotation.x += 0.02 * (targetY - scene.rotation.x);

      // Slow continuous rotation
      scene.rotation.z += 0.001;

      renderer.render(scene, camera);
      animationFrameId = window.requestAnimationFrame(tick);
    };

    clock.start();
    tick();

    // CLEANUP
    return () => {
      document.removeEventListener('mousemove', onDocumentMouseMove);
      window.removeEventListener('resize', onWindowResize);
      window.cancelAnimationFrame(animationFrameId);
      
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      glowGeometry.dispose();
      glowMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 z-0 pointer-events-none" 
      style={{ background: 'black' }}
    />
  );
}
