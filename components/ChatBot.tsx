
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Loader2, Key } from 'lucide-react';
import { getGeminiResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

declare global {
  // Defining AIStudio interface to align with the expected global type name and shape
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }

  interface Window {
    // Using the named AIStudio interface ensures compatibility with existing global declarations
    aistudio: AIStudio;
  }
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: '¡Hola! Soy NexusAI. ¿Quieres saber cómo estas animaciones mejoran tu web?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleOpenKeySelector = async () => {
    // Triggering the pre-configured API key selection dialog
    if (window.aistudio?.openSelectKey) {
      await window.aistudio.openSelectKey();
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const context = "Sitio NexusScroll: enfocado en animaciones de scroll, React, Framer Motion y Tailwind. Buscamos asombrar al usuario con fluidez.";
    const response = await getGeminiResponse(userMsg, context);

    if (response === "ERROR_KEY_REQUIRED") {
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: "Parece que necesito una clave de API válida para responder. Por favor, selecciona una clave de un proyecto con facturación activa usando el icono de configuración." 
      }]);
      // Prompt user to select a key automatically if the previous request failed due to key issues
      handleOpenKeySelector();
    } else {
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-80 md:w-96 h-[500px] bg-zinc-900 border border-white/10 rounded-2xl flex flex-col shadow-2xl overflow-hidden backdrop-blur-xl"
          >
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-zinc-800/50">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="font-bold text-white">Nexus Assistant</span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleOpenKeySelector}
                  className="p-1.5 text-gray-400 hover:text-indigo-400 transition-colors"
                  title="Configurar API Key"
                >
                  <Key className="w-4 h-4" />
                </button>
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm ${
                    m.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white/10 text-gray-200'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 px-4 py-2 rounded-2xl">
                    <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Pregúntame algo..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading}
                  className="bg-indigo-600 p-2 rounded-xl text-white hover:bg-indigo-700 disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-[10px] text-gray-500 mt-2 text-center">
                Desarrollado con Gemini 3 Flash
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-indigo-600 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg shadow-indigo-600/30 hover:scale-110 transition-transform"
      >
        <MessageSquare className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ChatBot;
