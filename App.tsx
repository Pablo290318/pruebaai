
import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import ParallaxHero from './components/ParallaxHero';
import FeatureCard from './components/FeatureCard';
import ChatBot from './components/ChatBot';
import { Feature } from './types';

const features: Feature[] = [
  {
    id: '1',
    title: 'Interacción Fluida',
    description: 'Navegación intuitiva que responde a cada píxel de desplazamiento con precisión milimétrica.',
    icon: 'sparkles',
    image: 'https://picsum.photos/seed/tech1/800/600'
  },
  {
    id: '2',
    title: 'Rendimiento Extremo',
    description: 'Optimización de hardware para mantener 60 FPS incluso con animaciones complejas y efectos visuales.',
    icon: 'zap',
    image: 'https://picsum.photos/seed/tech2/800/600'
  },
  {
    id: '3',
    title: 'Arquitectura Segura',
    description: 'Protocolos de última generación integrados directamente en el núcleo de nuestra experiencia digital.',
    icon: 'shield',
    image: 'https://picsum.photos/seed/tech3/800/600'
  },
  {
    id: '4',
    title: 'Inteligencia Nativa',
    description: 'Sistemas de IA que aprenden de la interacción del usuario para personalizar el contenido en tiempo real.',
    icon: 'cpu',
    image: 'https://picsum.photos/seed/tech4/800/600'
  }
];

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen bg-[#050505]">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-indigo-600 z-[60] origin-left"
        style={{ scaleX }}
      />

      <Navbar />

      <main>
        <ParallaxHero />

        {/* Features Section */}
        <section id="caracteristicas" className="py-24 bg-black/50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold mb-6 text-white"
              >
                Por qué elegir Nexus
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-gray-400 max-w-2xl mx-auto"
              >
                Combinamos arte y tecnología para crear interfaces que no solo se ven bien, sino que se sienten naturales.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, idx) => (
                <FeatureCard key={feature.id} feature={feature} index={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* Large Text Reveal Section */}
        <section className="py-40 flex flex-col items-center justify-center text-center overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="px-6"
          >
            <h2 className="text-7xl md:text-9xl font-black text-white/5 select-none leading-none mb-4">
              EXPERIENCIA
            </h2>
            <h2 className="text-7xl md:text-9xl font-black text-indigo-600/20 select-none leading-none mb-4">
              INMERSIVA
            </h2>
            <h2 className="text-7xl md:text-9xl font-black text-white/5 select-none leading-none">
              SIN LÍMITES
            </h2>
          </motion.div>
        </section>

        {/* Call to Action Section */}
        <section id="contacto" className="py-32 relative">
          <div className="container mx-auto px-6">
            <div className="bg-indigo-600 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
              {/* Decorative rings */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
              
              <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
                  ¿Listo para elevar <br /> tu presencia digital?
                </h2>
                <p className="text-white/80 text-lg mb-12 max-w-xl mx-auto">
                  Únete a cientos de marcas que ya están transformando la web con nuestras soluciones interactivas.
                </p>
                <button className="px-10 py-5 bg-white text-indigo-600 rounded-2xl font-black text-xl hover:scale-105 transition-transform shadow-2xl">
                  Contactar con Nosotros
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-white/5">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white/10 rounded flex items-center justify-center font-bold text-xs">N</div>
            <span className="font-bold text-gray-500">© 2024 NexusScroll Inc.</span>
          </div>
          <div className="flex gap-8 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
          <div className="flex gap-4">
            {['TW', 'IG', 'LI', 'GH'].map(social => (
              <a key={social} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-xs font-bold text-gray-500 hover:border-white/40 hover:text-white transition-all">
                {social}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* Floating Elements */}
      <ChatBot />
    </div>
  );
};

export default App;
