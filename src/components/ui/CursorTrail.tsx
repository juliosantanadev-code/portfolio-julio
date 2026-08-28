import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function CursorTrail() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      window.innerWidth / -2, window.innerWidth / 2,
      window.innerHeight / 2, window.innerHeight / -2,
      1, 1000
    );
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    const maxParticles = 500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(maxParticles * 3);
    const sizes = new Float32Array(maxParticles);
    const opacities = new Float32Array(maxParticles);
    const colors = new Float32Array(maxParticles * 3);
    const life = new Float32Array(maxParticles);
    
    for(let i=0; i<maxParticles; i++){
      positions[i*3] = 0; positions[i*3+1] = 0; positions[i*3+2] = 0;
      sizes[i] = 0;
      opacities[i] = 0;
      colors[i*3] = 1; colors[i*3+1] = 1; colors[i*3+2] = 1; // Default white
      life[i] = 0;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('aOpacity', new THREE.BufferAttribute(opacities, 1));
    geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.ShaderMaterial({
      vertexShader: `
        attribute float aSize;
        attribute float aOpacity;
        attribute vec3 aColor;
        varying float vOpacity;
        varying vec3 vColor;
        void main() {
          vOpacity = aOpacity;
          vColor = aColor;
          gl_PointSize = aSize;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying float vOpacity;
        varying vec3 vColor;
        void main() {
          float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
          float glow = 0.05 / distanceToCenter - 0.1;
          glow = clamp(glow, 0.0, 1.0);
          
          // White core for the star effect
          float core = 0.01 / distanceToCenter - 0.05;
          core = clamp(core, 0.0, 1.0);
          
          // Boost base color and mix with white center
          vec3 colorWithCore = mix(vColor * 1.5, vec3(1.0), core * 1.5);
          
          gl_FragColor = vec4(colorWithCore, glow * vOpacity);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    let currentIndex = 0;
    let isMouseMoving = false;
    let mouseTimeout: number;

    const colorInside = new THREE.Color('#ff9d5c'); // Brighter orange
    const colorOutside = new THREE.Color('#4a8dff'); // Brighter blue

    const onMouseMove = (event: MouseEvent) => {
      if (!mountRef.current) return;
      const rect = mountRef.current.getBoundingClientRect();
      
      // Only spawn if mouse is inside the container
      if (
        event.clientX < rect.left || event.clientX > rect.right ||
        event.clientY < rect.top || event.clientY > rect.bottom
      ) {
        return;
      }

      const x = (event.clientX - rect.left) - rect.width / 2;
      const y = -((event.clientY - rect.top) - rect.height / 2);
      
      isMouseMoving = true;
      clearTimeout(mouseTimeout);
      mouseTimeout = window.setTimeout(() => {
        isMouseMoving = false;
      }, 50);

      for(let i=0; i<4; i++) {
        currentIndex = (currentIndex + 1) % maxParticles;
        const offset = currentIndex * 3;
        
        positions[offset] = x + (Math.random() - 0.5) * 15;
        positions[offset + 1] = y + (Math.random() - 0.5) * 15;
        positions[offset + 2] = 0;
        
        const mixedColor = colorInside.clone().lerp(colorOutside, Math.random());
        colors[offset] = mixedColor.r;
        colors[offset + 1] = mixedColor.g;
        colors[offset + 2] = mixedColor.b;

        sizes[currentIndex] = Math.random() * 20 + 10;
        opacities[currentIndex] = 1.0;
        life[currentIndex] = 1.0; 
      }
    };

    window.addEventListener('mousemove', onMouseMove);

    const handleResize = () => {
      if (!mountRef.current) return;
      const rect = mountRef.current.getBoundingClientRect();
      const width = rect.width || window.innerWidth;
      const height = rect.height || window.innerHeight;

      camera.left = width / -2;
      camera.right = width / 2;
      camera.top = height / 2;
      camera.bottom = height / -2;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    // Initial size calculation
    setTimeout(handleResize, 0);

    const clock = new THREE.Clock();
    let animationFrameId: number;

    const tick = () => {
      const delta = clock.getDelta();
      
      const posAttribute = geometry.attributes.position as THREE.BufferAttribute;
      const sizeAttribute = geometry.attributes.aSize as THREE.BufferAttribute;
      const opacityAttribute = geometry.attributes.aOpacity as THREE.BufferAttribute;
      const colorAttribute = geometry.attributes.aColor as THREE.BufferAttribute;

      let needsUpdate = false;

      for(let i=0; i<maxParticles; i++) {
        if (life[i] > 0) {
          life[i] -= delta * (isMouseMoving ? 1.5 : 3.0); 
          
          if (life[i] <= 0) {
            life[i] = 0;
            opacities[i] = 0;
          } else {
            opacities[i] = life[i];
            
            posAttribute.array[i * 3 + 1] += delta * 15; 
            posAttribute.array[i * 3] += (Math.random() - 0.5) * delta * 5;
            sizeAttribute.array[i] = Math.max(0, sizeAttribute.array[i] - delta * 10);
          }
          needsUpdate = true;
        }
      }

      if (needsUpdate) {
        posAttribute.needsUpdate = true;
        sizeAttribute.needsUpdate = true;
        opacityAttribute.needsUpdate = true;
        colorAttribute.needsUpdate = true;
      }

      renderer.render(scene, camera);
      animationFrameId = window.requestAnimationFrame(tick);
    };
    tick();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      clearTimeout(mouseTimeout);
      window.cancelAnimationFrame(animationFrameId);
      
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 z-50 pointer-events-none" 
      style={{ width: '100%', height: '100%', overflow: 'hidden' }}
    />
  );
}
