import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';

const AnimatedGeometry = () => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 100, 100]} scale={2.2}>
      <MeshDistortMaterial
        color="#888888"
        attach="material"
        distort={0.5}
        speed={1.5}
        roughness={0.1}
        metalness={0.8}
      />
    </Sphere>
  );
};

export default function Hero3D() {
  return (
    <div className="w-full h-[400px] lg:h-[600px] flex items-center justify-center">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#444444" />
        <pointLight position={[0, 5, 0]} intensity={1} color="#aaaaaa" />
        <AnimatedGeometry />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
      </Canvas>
    </div>
  );
}
