import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float, Line } from '@react-three/drei';
import * as THREE from 'three';
import { useThemeStore } from '../store';

// --- Scene Components ---

function HeroScene({ color, mode }: { color: string, mode: string }) {
  const ref = useRef<THREE.Points>(null!);
  
  const sphere = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      const r = 10;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta / 10;
      ref.current.rotation.x += delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={mode === 'light' ? '#334155' : color}
          opacity={mode === 'light' ? 0.4 : 0.8}
          size={0.04}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

function AboutScene({ color, mode }: { color: string, mode: string }) {
  // A structured grid representing order/logic
  const count = 10;
  const separation = 1.5;
  
  return (
    <group rotation={[Math.PI / 6, Math.PI / 6, 0]}>
      {Array.from({ length: count }).map((_, i) => (
        Array.from({ length: count }).map((_, j) => (
          <Float key={`${i}-${j}`} speed={2} rotationIntensity={0.5} floatIntensity={0.5} position={[
            (i - count / 2) * separation,
            (j - count / 2) * separation,
            0
          ]}>
            <mesh>
              <boxGeometry args={[0.1, 0.1, 0.1]} />
              <meshBasicMaterial color={color} transparent opacity={0.4} />
            </mesh>
          </Float>
        ))
      ))}
    </group>
  );
}

function SkillsScene({ color, mode }: { color: string, mode: string }) {
  // Connecting lines network
  const count = 30;
  const lines = useMemo(() => {
    return Array.from({ length: count }).map(() => {
      const start = [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 5
      ] as [number, number, number];
      const end = [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 5
      ] as [number, number, number];
      return { start, end };
    });
  }, []);

  return (
    <group>
      {lines.map((line, i) => (
        <Line
          key={i}
          points={[line.start, line.end]}
          color={color}
          lineWidth={1}
          transparent
          opacity={0.2}
        />
      ))}
      {lines.map((line, i) => (
        <Float key={`p-${i}`} speed={1} position={line.start}>
           <mesh>
             <sphereGeometry args={[0.05]} />
             <meshBasicMaterial color={color} />
           </mesh>
        </Float>
      ))}
    </group>
  );
}

function ProjectsScene({ color, mode }: { color: string, mode: string }) {
  // Floating geometric shapes (building blocks)
  return (
    <group>
      {Array.from({ length: 15 }).map((_, i) => (
        <Float 
          key={i} 
          speed={1 + Math.random()} 
          rotationIntensity={2} 
          floatIntensity={2} 
          position={[
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 10
          ]}
        >
          <mesh>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial 
              color={color} 
              wireframe 
              transparent 
              opacity={mode === 'light' ? 0.3 : 0.15} 
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function ExperienceScene({ color, mode }: { color: string, mode: string }) {
  // Flowing tunnel/stream effect
  const ref = useRef<THREE.Group>(null!);
  
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.z += delta / 5;
    }
  });

  return (
    <group ref={ref}>
      {Array.from({ length: 40 }).map((_, i) => {
        const angle = (i / 40) * Math.PI * 2;
        const radius = 6;
        return (
          <Float key={i} speed={3} floatIntensity={1} position={[
            Math.cos(angle) * radius,
            Math.sin(angle) * radius,
            (Math.random() - 0.5) * 20
          ]}>
             <mesh rotation={[0, 0, angle]}>
               <planeGeometry args={[0.1, 2]} />
               <meshBasicMaterial color={color} transparent opacity={0.3} side={THREE.DoubleSide} />
             </mesh>
          </Float>
        );
      })}
    </group>
  );
}

function ContactScene({ color, mode }: { color: string, mode: string }) {
  // Peaceful starfield/converging
  const ref = useRef<THREE.Points>(null!);
  
  const stars = useMemo(() => {
    const positions = new Float32Array(1000 * 3);
    for (let i = 0; i < 1000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <Points ref={ref} positions={stars}>
      <PointMaterial
        transparent
        color={color}
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

function AILabScene({ color, mode }: { color: string, mode: string }) {
  // Neural Pulse / Data Swarm
  const count = 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  return (
    <group>
      <Float speed={5} rotationIntensity={2} floatIntensity={2}>
        <Points positions={positions} stride={3}>
          <PointMaterial
            transparent
            color={color}
            size={0.1}
            sizeAttenuation={true}
            depthWrite={false}
            opacity={0.8}
          />
        </Points>
        {/* Connecting lines for "neural" feel */}
        <Line
          points={[[0,0,0], [2,2,2], [-2,-2,-2], [2,-2,2], [-2,2,-2]]}
          color={color}
          lineWidth={1}
          transparent
          opacity={0.5}
        />
         <Line
          points={[[-2,0,0], [2,0,0], [0,2,0], [0,-2,0]]}
          color={mode === 'light' ? '#000' : '#fff'}
          lineWidth={0.5}
          transparent
          opacity={0.2}
        />
      </Float>
    </group>
  );
}

// --- Main Component ---

export default function ThreeBackground() {
  const mode = useThemeStore((state) => state.mode);
  const theme = useThemeStore((state) => state.theme);
  const activeSection = useThemeStore((state) => state.activeSection);
  
  const color = useMemo(() => {
    switch (theme) {
      case 'emerald': return '#10b981';
      case 'purple': return '#a855f7';
      case 'ember': return '#f97316';
      default: return '#00f2ff';
    }
  }, [theme]);

  // Dynamic background gradient
  const bgGradient = useMemo(() => {
    if (mode === 'light') {
      switch (theme) {
        case 'cyan': return 'radial-gradient(circle at 50% 50%, #e0f2fe 0%, #f0f9ff 100%)';
        case 'emerald': return 'radial-gradient(circle at 50% 50%, #dcfce7 0%, #f0fdf4 100%)';
        case 'purple': return 'radial-gradient(circle at 50% 50%, #f3e8ff 0%, #faf5ff 100%)';
        case 'ember': return 'radial-gradient(circle at 50% 50%, #ffedd5 0%, #fff7ed 100%)';
      }
    } else {
      switch (theme) {
        case 'cyan': return 'radial-gradient(circle at 50% 50%, #0c1214 0%, #000000 100%)';
        case 'emerald': return 'radial-gradient(circle at 50% 50%, #05100a 0%, #000000 100%)';
        case 'purple': return 'radial-gradient(circle at 50% 50%, #100510 0%, #000000 100%)';
        case 'ember': return 'radial-gradient(circle at 50% 50%, #100a05 0%, #000000 100%)';
      }
    }
  }, [theme, mode]);

  return (
    <div 
      className="fixed inset-0 -z-10 transition-all duration-1000"
      style={{ background: bgGradient }}
    >
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        
        {/* Render scene based on active section */}
        {activeSection === 'hero' && <HeroScene color={color} mode={mode} />}
        {activeSection === 'about' && <AboutScene color={color} mode={mode} />}
        {activeSection === 'skills' && <SkillsScene color={color} mode={mode} />}
        {activeSection === 'ai-lab' && <AILabScene color={color} mode={mode} />}
        {activeSection === 'projects' && <ProjectsScene color={color} mode={mode} />}
        {activeSection === 'experience' && <ExperienceScene color={color} mode={mode} />}
        {activeSection === 'contact' && <ContactScene color={color} mode={mode} />}
        
      </Canvas>
    </div>
  );
}
