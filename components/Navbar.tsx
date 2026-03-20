
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Navbar: React.FC = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 px-6 py-4 flex justify-between items-center ${
        isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white">N</div>
        <span className="text-xl font-bold tracking-tight text-white">NexusScroll</span>
      </div>
      <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
        <a href="#inicio" className="hover:text-white transition-colors">Inicio</a>
        <a href="#caracteristicas" className="hover:text-white transition-colors">Características</a>
        <a href="#tecnologia" className="hover:text-white transition-colors">Tecnología</a>
        <a href="#contacto" className="hover:text-white transition-colors">Contacto</a>
      </div>
      <button className="bg-white text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-indigo-50 transition-colors">
        Explorar
      </button>
    </motion.nav>
  );
};

export default Navbar;
