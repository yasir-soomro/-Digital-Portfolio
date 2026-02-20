import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html, Icosahedron, MeshDistortMaterial } from '@react-three/drei';
import { motion } from 'motion/react';
import { SKILLS } from '../lib/data';
import { useThemeStore } from '../store';
import * as THREE from 'three';

function SkillItem({ position, skill, index }: { position: [number, number, number], skill: any, index: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<any>(null!);
  const theme = useThemeStore((state) => state.theme);
  const mode = useThemeStore((state) => state.mode);
  
  const colorString = useMemo(() => {
    switch (theme) {
      case 'emerald': return '#10b981';
      case 'purple': return '#a855f7';
      case 'ember': return '#f97316';
      default: return '#00f2ff';
    }
  }, [theme]);

  const targetColor = useMemo(() => new THREE.Color(colorString), [colorString]);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle rotation
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3 + index) * 0.2;
      meshRef.current.rotation.y += 0.01;
      
      // Pulsation effect (Subtle)
      const scale = 1 + Math.sin(state.clock.elapsedTime * 1.5 + index) * 0.08;
      meshRef.current.scale.set(scale, scale, scale);
    }

    if (materialRef.current) {
      // Smooth color transition
      materialRef.current.color.lerp(targetColor, 0.05);
      materialRef.current.emissive.lerp(targetColor, 0.05);
    }
  });

  return (
    <Float 
      speed={2} 
      rotationIntensity={1.5} 
      floatIntensity={2} 
      position={position}
    >
      <mesh ref={meshRef}>
        <Icosahedron args={[0.8, 1]}>
          <MeshDistortMaterial
            ref={materialRef}
            color={targetColor}
            emissive={targetColor}
            emissiveIntensity={mode === 'light' ? 0.5 : 2}
            wireframe={mode === 'dark'}
            transparent
            opacity={mode === 'light' ? 0.8 : 0.4}
            distort={0.3}
            speed={2}
          />
        </Icosahedron>
        <Html center transform distanceFactor={6} style={{ pointerEvents: 'none' }}>
          <div className={`
            px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl whitespace-nowrap text-xs sm:text-sm font-bold border
            ${mode === 'light' 
              ? 'bg-white/90 border-slate-200 text-slate-800 shadow-xl' 
              : 'bg-black/60 border-white/10 text-white shadow-[0_0_15px_rgba(0,0,0,0.5)]'
            }
            backdrop-blur-md flex items-center gap-2 transition-colors duration-300
          `}>
            <span style={{ color: colorString, textShadow: `0 0 10px ${colorString}` }}>●</span> {skill.name}
          </div>
        </Html>
      </mesh>
    </Float>
  );
}

export default function Skills() {
  const mode = useThemeStore((state) => state.mode);

  return (
    <section id="skills" className="py-20 sm:py-32 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto mb-8 sm:mb-12 text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold mb-4">
          Skills & <span className="text-[var(--accent)] neon-text">Tools</span>
        </h2>
        <p className="text-base sm:text-xl opacity-60 max-w-2xl mx-auto">
          My technical arsenal for building digital masterpieces.
        </p>
      </div>

      <div className="h-[50vh] sm:h-[60vh] w-full relative -my-10">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }} dpr={[1, 2]}>
          <ambientLight intensity={mode === 'light' ? 1.5 : 0.5} />
          <pointLight position={[10, 10, 10]} intensity={mode === 'light' ? 1 : 2} color={mode === 'light' ? "#ffffff" : "#444444"} />
          <spotLight position={[-10, -10, -10]} intensity={0.5} />
          
          {SKILLS.map((skill, i) => {
            // Spiral distribution
            const angle = (i / SKILLS.length) * Math.PI * 2;
            const radius = 4;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius * 0.5 + (Math.random() - 0.5) * 2;
            const z = (Math.random() - 0.5) * 3;
            
            return <SkillItem key={skill.name} position={[x, y, z]} skill={skill} index={i} />;
          })}
        </Canvas>
      </div>

      <div className="max-w-7xl mx-auto mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
        {SKILLS.map((skill, i) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="glass-card p-4 sm:p-5 flex flex-col gap-3 group"
          >
            <div className="flex justify-between items-center">
              <span className="font-bold text-base sm:text-lg group-hover:text-[var(--accent)] transition-colors">{skill.name}</span>
              <span className="text-xs font-mono opacity-50">{skill.level}%</span>
            </div>
            <div className="w-full h-1.5 bg-[var(--text-primary)]/10 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                className="h-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
