import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function GalaxyBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // SCENE
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2('#050505', 0.02);

    // CAMERA
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    const baseCameraZ = 3;
    camera.position.set(3, 3, baseCameraZ);
    camera.lookAt(scene.position);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "high-performance" });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // GALAXY
    const parameters = {
      count: 60000,
      size: 0.02,
      radius: 6,
      branches: 4,
      spin: 1,
      randomness: 0.2,
      randomnessPower: 3,
      insideColor: '#ff9d5c',
      outsideColor: '#4a8dff'
    };

    let geometry: THREE.BufferGeometry | null = null;
    let material: THREE.ShaderMaterial | null = null;
    let points: THREE.Points | null = null;

    const generateGalaxy = () => {
      geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(parameters.count * 3);
      const colors = new Float32Array(parameters.count * 3);
      const scales = new Float32Array(parameters.count);
      const randomness = new Float32Array(parameters.count * 3);

      const colorInside = new THREE.Color(parameters.insideColor);
      const colorOutside = new THREE.Color(parameters.outsideColor);

      for (let i = 0; i < parameters.count; i++) {
        const i3 = i * 3;

        const radius = Math.random() * parameters.radius;
        const spinAngle = radius * parameters.spin;
        const branchAngle = ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

        const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
        const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
        const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;

        positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
        positions[i3 + 1] = randomY;
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

        randomness[i3] = randomX;
        randomness[i3 + 1] = randomY;
        randomness[i3 + 2] = randomZ;

        const mixedColor = colorInside.clone();
        mixedColor.lerp(colorOutside, radius / parameters.radius);

        colors[i3] = mixedColor.r;
        colors[i3 + 1] = mixedColor.g;
        colors[i3 + 2] = mixedColor.b;

        scales[i] = Math.random();
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
      geometry.setAttribute('aRandomness', new THREE.BufferAttribute(randomness, 3));

      material = new THREE.ShaderMaterial({
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
        transparent: true,
        uniforms: {
          uTime: { value: 0 },
          uVelocity: { value: 0 },
          uSize: { value: parameters.size * renderer.getPixelRatio() * 800.0 }
        },
        vertexShader: `
          uniform float uTime;
          uniform float uVelocity;
          uniform float uSize;
          attribute float aScale;
          attribute vec3 aRandomness;
          varying vec3 vColor;
          void main() {
              vec4 modelPosition = modelMatrix * vec4(position, 1.0);
              
              modelPosition.y += aRandomness.y * uVelocity * 1.5;
              modelPosition.x += aRandomness.x * uVelocity * 1.5;

              vec4 viewPosition = viewMatrix * modelPosition;
              vec4 projectedPosition = projectionMatrix * viewPosition;
              gl_Position = projectedPosition;

              // No escalar tanto para evitar lag (fill-rate)
              float velocityFactor = 1.0 + abs(uVelocity) * 2.0;
              gl_PointSize = uSize * aScale * velocityFactor * (1.0 / -viewPosition.z);
              
              vColor = color;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          uniform float uVelocity;
          void main() {
              float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
              float strength = 1.0 - (distanceToCenter * 2.0);
              strength = pow(strength, 3.0);
              
              if(strength < 0.01) discard;

              // Aumentar brillo ligeramente sin exagerar
              float intensity = min(abs(uVelocity) * 10.0, 0.4);
              vec3 finalColor = mix(vColor, vec3(1.0), intensity);

              gl_FragColor = vec4(finalColor, strength);
          }
        `
      });

      points = new THREE.Points(geometry, material);
      scene.add(points);
    };

    generateGalaxy();

    // SUNBEAMS OVERLAY
    const orthoCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const orthoScene = new THREE.Scene();
    const sunbeamsGeometry = new THREE.PlaneGeometry(2, 2);
    const sunbeamsMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uOpacity: { value: 1.0 },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
      },
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uOpacity;
        uniform vec2 uResolution;
        
        // Simplex 2D noise
        vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
        float snoise(vec2 v){
          const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
          vec2 i  = floor(v + dot(v, C.yy) );
          vec2 x0 = v -   i + dot(i, C.xx);
          vec2 i1;
          i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod(i, 289.0);
          vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
          vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
          m = m*m ;
          m = m*m ;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
          vec3 g;
          g.x  = a0.x  * x0.x  + h.x  * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }
        
        void main() {
            // Normalize coordinates 0 to 1 based on actual resolution
            vec2 uv = gl_FragCoord.xy / uResolution.xy;
            
            // Adjust for aspect ratio so beams aren't squished
            uv.x *= uResolution.x / uResolution.y;
            vec2 origin = vec2(uResolution.x / uResolution.y, 1.0); // Top right origin
            
            // Vector from origin to current pixel
            vec2 dir = uv - origin;
            
            // Distance from top right (0 at corner, increasing away)
            float dist = length(dir);
            
            // Angle of the ray
            float angle = atan(dir.y, dir.x);
            
            // Generate rays using noise based on angle and time
            // Add multiple frequencies for detail
            float noiseVal = snoise(vec2(angle * 5.0, uTime * 0.1)) * 0.5 + 0.5;
            noiseVal += snoise(vec2(angle * 20.0, uTime * 0.2)) * 0.25;
            
            // The beams should fade out as they get further from the corner (dist increases)
            // They should only occupy the top right half, so distance attenuation is strong
            float distMask = smoothstep(1.5, 0.0, dist);
            
            // Base warm color matching the galaxy (#ff9d5c to #4a8dff)
            vec3 beamColor = mix(vec3(1.0, 0.615, 0.36), vec3(0.29, 0.55, 1.0), dist * 0.8);
            
            // Calculate final intensity
            float intensity = noiseVal * distMask * 0.25 * uOpacity;
            
            gl_FragColor = vec4(beamColor, intensity);
        }
      `
    });
    const sunbeamsMesh = new THREE.Mesh(sunbeamsGeometry, sunbeamsMaterial);
    orthoScene.add(sunbeamsMesh);

    // RESIZE
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      if (material) {
        material.uniforms.uSize.value = parameters.size * renderer.getPixelRatio() * 800.0;
      }
      if (sunbeamsMaterial) {
        sunbeamsMaterial.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    // SCROLL INERTIA
    let currentScroll = window.scrollY;
    let targetScroll = window.scrollY;
    
    // ANIMATION
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();
      
      targetScroll = window.scrollY;
      const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
      
      currentScroll += (targetScroll - currentScroll) * 0.08;
      
      const scrollVelocity = (targetScroll - currentScroll) / maxScroll;
      const scrollProgress = currentScroll / maxScroll;

      if (points && material) {
        points.rotation.y = elapsedTime * 0.05 + scrollProgress * Math.PI * 2.0;
        points.rotation.z = scrollProgress * 0.3;

        material.uniforms.uTime.value = elapsedTime;
        material.uniforms.uVelocity.value = scrollVelocity;
      }

      camera.position.z = baseCameraZ - (scrollProgress * 2.0); 
      camera.position.y = 3 - (scrollProgress * 1.5); 
      camera.lookAt(scene.position);

      renderer.autoClear = true;
      renderer.render(scene, camera);

      // Render sunbeams
      sunbeamsMaterial.uniforms.uTime.value = elapsedTime;
      // Fade out linearly over the first 20% of scroll
      sunbeamsMaterial.uniforms.uOpacity.value = Math.max(0, 1.0 - (scrollProgress * 5.0));
      
      renderer.autoClear = false;
      renderer.render(orthoScene, orthoCamera);

      animationFrameId = window.requestAnimationFrame(tick);
    };

    tick();

    // CLEANUP
    return () => {
      window.removeEventListener('resize', handleResize);
      window.cancelAnimationFrame(animationFrameId);
      
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      geometry?.dispose();
      material?.dispose();
      sunbeamsGeometry.dispose();
      sunbeamsMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 z-0 opacity-70 mix-blend-screen pointer-events-none" 
      style={{ width: '100%', height: '100%', overflow: 'hidden' }}
    />
  );
}
