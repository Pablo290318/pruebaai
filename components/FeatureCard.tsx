
import React from 'react';
import { motion } from 'framer-motion';
import { Feature } from '../types';
import { Sparkles, Zap, Shield, Cpu } from 'lucide-react';

const icons: Record<string, React.ReactNode> = {
  sparkles: <Sparkles className="w-6 h-6" />,
  zap: <Zap className="w-6 h-6" />,
  shield: <Shield className="w-6 h-6" />,
  cpu: <Cpu className="w-6 h-6" />,
};

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group relative bg-white/5 border border-white/10 rounded-3xl p-8 overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="w-14 h-14 bg-indigo-600/10 rounded-2xl flex items-center justify-center text-indigo-400 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
        {icons[feature.icon] || <Sparkles />}
      </div>
      
      <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
      <p className="text-gray-400 leading-relaxed mb-6">
        {feature.description}
      </p>

      <div className="relative h-48 rounded-2xl overflow-hidden mt-auto">
        <img 
          src={feature.image} 
          alt={feature.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
    </motion.div>
  );
};

export default FeatureCard;
