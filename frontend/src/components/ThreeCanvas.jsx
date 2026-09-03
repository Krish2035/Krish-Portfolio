import React, { useRef, useMemo, Component, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Error Boundary to safely catch WebGL / R3F Canvas errors
class CanvasErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('WebGL 3D Canvas Notice:', error);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

// Floating 3D Geometric Mesh
function FloatingShape({ position, color, shape = 'icosahedron', speed = 1.5, factor = 0.6 }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={1} floatIntensity={2} position={position}>
      <mesh ref={meshRef}>
        {shape === 'icosahedron' && <icosahedronGeometry args={[1, 1]} />}
        {shape === 'torus' && <torusKnotGeometry args={[0.8, 0.25, 100, 16]} />}
        {shape === 'octahedron' && <octahedronGeometry args={[1.2, 0]} />}
        <MeshWobbleMaterial
          color={color}
          factor={factor}
          speed={speed}
          wireframe={shape === 'octahedron'}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  );
}

// Particle Constellation Field
function ParticleField({ count = 200 }) {
  const pointsRef = useRef();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorPalette = ['#6366f1', '#8b5cf6', '#14b8a6', '#a855f7'];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;

      const c = new THREE.Color(colorPalette[Math.floor(Math.random() * colorPalette.length)]);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
      pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.02) * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

const ThreeCanvas = () => {
  const [showCanvas, setShowCanvas] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Hide 3D objects on the video screen (scrollY <= 200); show them when scrolling down
      if (window.scrollY > 200) {
        setShowCanvas(true);
      } else {
        setShowCanvas(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        opacity: showCanvas ? 1 : 0,
        transition: 'opacity 0.6s ease',
      }}
    >
      <CanvasErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 7], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1.2} />
          <pointLight position={[-10, -10, -5]} color="#6366f1" intensity={2} />

          {/* 3D Objects */}
          <FloatingShape position={[-3.5, 1.8, -2]} color="#6366f1" shape="icosahedron" speed={2} />
          <FloatingShape position={[3.8, -1.5, -1.5]} color="#8b5cf6" shape="torus" speed={1.5} />
          <FloatingShape position={[2.5, 2.2, -3]} color="#14b8a6" shape="octahedron" speed={1} />
          <FloatingShape position={[-2.8, -2.2, -2.5]} color="#a855f7" shape="icosahedron" speed={1.8} />

          {/* Dynamic Ambient Particle Field */}
          <ParticleField count={200} />
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
};

export default ThreeCanvas;
