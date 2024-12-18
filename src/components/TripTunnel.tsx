import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

const TripTunnel = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create tunnel geometry
    const tunnelGeometry = new THREE.CylinderGeometry(5, 5, 50, 32, 32, true);
    const tunnelMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color('#ff00ff') },
        color2: { value: new THREE.Color('#00ffff') }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        varying vec2 vUv;
        
        void main() {
          vec2 position = vUv * 2.0 - 1.0;
          float dist = length(position);
          float wave = sin(dist * 10.0 - time * 2.0) * 0.5 + 0.5;
          vec3 color = mix(color1, color2, wave);
          gl_FragColor = vec4(color, 1.0);
        }
      `,
      side: THREE.BackSide
    });

    const tunnel = new THREE.Mesh(tunnelGeometry, tunnelMaterial);
    scene.add(tunnel);

    camera.position.z = 5;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      tunnel.rotation.z += 0.005;
      (tunnelMaterial.uniforms.time.value) += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10" />;
};

export default TripTunnel;