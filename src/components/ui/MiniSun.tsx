import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function MiniSun() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // SCENE
    const scene = new THREE.Scene();

    // CAMERA
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 11; // Pull back so particles fit in container

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(800, 800); // Massive canvas for wide sun
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // CORE GLOW & RAYS (Billboard)
    const glowGeometry = new THREE.PlaneGeometry(8, 8);
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
          
          // Angle for rays
          float angle = atan(centered.y, centered.x);
          
          // Multiple overlapping ray frequencies
          float rays = sin(angle * 15.0 + uTime * 0.5) * 0.5 + 0.5;
          rays *= sin(angle * 8.0 - uTime * 0.2) * 0.5 + 0.5;
          
          // Core glow + Breathing
          float pulse = sin(uTime * 1.5) * 0.05 + 0.95;
          
          float coreStrength = 1.0 - (dist * 2.5);
          coreStrength = pow(coreStrength, 2.5) * pulse;
          
          // Ray strength masking
          float rayStrength = rays * (1.0 - (dist * 1.5)) * 0.6 * pulse;
          
          float strength = coreStrength + rayStrength;
          if(strength < 0.01) discard;
          
          // Warm fiery color
          vec3 color = mix(vec3(0.96, 0.42, 0.04), vec3(1.0, 0.9, 0.5), coreStrength);
          
          gl_FragColor = vec4(color, strength);
        }
      `
    });
    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glowMesh);

    // ORBITING PARTICLES
    const particleCount = 1200;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    const colors = new Float32Array(particleCount * 3);
    const orbits = new Float32Array(particleCount * 3); // Axis of rotation
    const orbitParams = new Float32Array(particleCount * 3); // x: radius, y: speed, z: start angle

    const color1 = new THREE.Color('#ff0055'); // Magenta
    const color2 = new THREE.Color('#00f0ff'); // Cyan
    const color3 = new THREE.Color('#ffaa00'); // Gold

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // 5 Intersecting orbital rings
      const ringIndex = i % 5;
      
      const baseRadius = 1.5 + (ringIndex * 0.6); 
      const radius = baseRadius + (Math.random() - 0.5) * 0.4; // Thickness
      
      const speed = (Math.random() * 0.5 + 0.3) * (ringIndex % 2 === 0 ? 1 : -1);
      const angle = Math.random() * Math.PI * 2;
      
      // Axis tilt for each ring
      const axis = new THREE.Vector3(
        Math.sin(ringIndex * Math.PI / 2.5), 
        Math.cos(ringIndex * Math.PI / 2.5) * 0.5 + 0.2, 
        Math.sin(ringIndex)
      ).normalize();
      
      orbitParams[i3] = radius;
      orbitParams[i3 + 1] = speed;
      orbitParams[i3 + 2] = angle;
      
      orbits[i3] = axis.x;
      orbits[i3 + 1] = axis.y;
      orbits[i3 + 2] = axis.z;
      
      scales[i] = Math.random();

      // Distribution of colors
      let mixColor = color1.clone();
      if (ringIndex === 1 || ringIndex === 3) mixColor = color2.clone();
      if (ringIndex === 4) mixColor = color3.clone();
      
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
        
        // Quaternion rotation
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
          
          vec4 modelViewPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * modelViewPosition;
          
          float pulse = sin(uTime * 3.0 + angle) * 0.5 + 1.0;
          gl_PointSize = (12.0 * aScale * pulse) * (1.0 / -modelViewPosition.z);
          
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

    // ANIMATION LOOP & OBSERVER
    const clock = new THREE.Clock();
    let animationFrameId: number;
    let isVisible = false;

    const tick = () => {
      if (!isVisible) return; // Only run math/rendering if visible

      const elapsedTime = clock.getElapsedTime();

      // Update uniforms
      glowMaterial.uniforms.uTime.value = elapsedTime;
      particleMaterial.uniforms.uTime.value = elapsedTime;

      // Parallax easing
      targetX = mouseX * 2.0;
      targetY = mouseY * 1.5;
      scene.rotation.y += 0.05 * (targetX - scene.rotation.y);
      scene.rotation.x += 0.05 * (targetY - scene.rotation.x);

      renderer.render(scene, camera);
      animationFrameId = window.requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          clock.start();
          tick();
        } else {
          window.cancelAnimationFrame(animationFrameId);
        }
      },
      { threshold: 0.0 }
    );

    if (mountRef.current) {
      observer.observe(mountRef.current);
    }

    // CLEANUP
    return () => {
      observer.disconnect();
      document.removeEventListener('mousemove', onDocumentMouseMove);
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
    <div className="w-full h-[300px] flex justify-center items-end overflow-hidden pointer-events-none">
      <div ref={mountRef} className="w-[800px] h-[800px] translate-y-[50%]" />
    </div>
  );
}
