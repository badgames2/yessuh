import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

const Text3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const meshRef = useRef<THREE.Mesh>();
  
  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
    containerRef.current.appendChild(renderer.domElement);

    const loader = new FontLoader();
    
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
      const textGeometry = new TextGeometry('TRIPPY', {
        font: font,
        size: 0.5,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5
      });

      const material = new THREE.MeshPhongMaterial({ 
        color: 0xff00ff,
        specular: 0xffffff,
        shininess: 100
      });

      const mesh = new THREE.Mesh(textGeometry, material);
      meshRef.current = mesh;
      
      textGeometry.center();
      scene.add(mesh);

      // Add lights
      const light1 = new THREE.PointLight(0xff00ff, 10);
      light1.position.set(2, 2, 2);
      scene.add(light1);

      const light2 = new THREE.PointLight(0x00ffff, 10);
      light2.position.set(-2, -2, 2);
      scene.add(light2);
    });

    camera.position.z = 2;

    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseDown = (event: MouseEvent) => {
      isDragging = true;
      previousMousePosition = {
        x: event.clientX,
        y: event.clientY
      };
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging || !meshRef.current) return;

      const deltaMove = {
        x: event.clientX - previousMousePosition.x,
        y: event.clientY - previousMousePosition.y
      };

      meshRef.current.rotation.y += deltaMove.x * 0.01;
      meshRef.current.rotation.x += deltaMove.y * 0.01;

      previousMousePosition = {
        x: event.clientX,
        y: event.clientY
      };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    const animate = () => {
      requestAnimationFrame(animate);
      if (meshRef.current && !isDragging) {
        meshRef.current.rotation.y += 0.005;
      }
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.domElement.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
  );
};

export default Text3D;