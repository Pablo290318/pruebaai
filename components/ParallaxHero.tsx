import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

const ParallaxHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Movimiento del ratón para el efecto de inclinación (tilt)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth) - 0.5;
    const y = (clientY / innerHeight) - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Suavizado de los movimientos
  const springConfig = { stiffness: 100, damping: 30 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Transformaciones de scroll para las capas (Paralaje)
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]); // Capa fondo
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]); // Capa media
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300]); // Capa frontal (texto)
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-[120vh] w-full overflow-hidden bg-[#050505] flex items-center justify-center"
      id="inicio"
    >
      {/* Capa 1: Fondo Lejano (Nebulosa/Estrellas) */}
      <motion.div 
        style={{ y: y1, scale, x: useTransform(smoothX, [ -0.5, 0.5], [20, -20]), y: useTransform(smoothY, [-0.5, 0.5], [20, -20]) }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 to-transparent opacity-50" />
        <img 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000" 
          alt="Space background"
          className="w-full h-full object-cover opacity-40 grayscale"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Capa 2: Elementos Geométricos Flotantes */}
      <motion.div 
        style={{ 
          y: y2,
          rotateX: useTransform(smoothY, [-0.5, 0.5], [10, -10]),
          rotateY: useTransform(smoothX, [-0.5, 0.5], [-10, 10]),
        }}
        className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center"
      >
        <div className="relative w-full h-full max-w-7xl">
          <motion.div 
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"
          />
        </div>
      </motion.div>

      {/* Capa 3: Contenido Principal (Texto) */}
      <motion.div 
        style={{ 
          y: y3, 
          opacity,
          x: useTransform(smoothX, [-0.5, 0.5], [-30, 30]),
          y: useTransform(smoothY, [-0.5, 0.5], [-30, 30])
        }}
        className="relative z-20 text-center px-6"
      >
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block text-indigo-500 font-mono text-sm tracking-[0.3em] uppercase mb-6"
        >
          Bienvenido al Futuro Digital
        </motion.span>
        
        <h1 className="text-7xl md:text-9xl font-black text-white leading-none tracking-tighter mb-8">
          NEXUS<span className="text-indigo-600">.</span>SCROLL
        </h1>
        
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
          Diseñamos experiencias que trascienden la pantalla. <br />
          Capas de profundidad, interacciones fluidas y tecnología de vanguardia.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-indigo-500 hover:text-white transition-colors shadow-2xl shadow-white/5"
          >
            Explorar Proyecto
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            className="px-8 py-4 border border-white/10 text-white font-bold rounded-full hover:bg-white/5 transition-colors"
          >
            Ver Demo 3D
          </motion.button>
        </div>
      </motion.div>

      {/* Capa 4: Elemento Frontal (Overlay de luz) */}
      <div className="absolute inset-0 z-30 pointer-events-none bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
      
      {/* Indicador de Scroll */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-indigo-600 to-transparent" />
        <span className="text-[10px] text-gray-500 uppercase tracking-widest">Scroll</span>
      </motion.div>
    </section>
  );
};

export default ParallaxHero;
