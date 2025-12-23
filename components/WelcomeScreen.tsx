
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playSelect } from '../utils/audio';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleStart = () => {
    playSelect();
    setIsVisible(false);
    setTimeout(onStart, 500);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950 p-6"
        >
          {/* Animated background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-[120px] animate-pulse delay-700" />
          </div>

          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative z-10 w-full max-w-2xl bg-slate-900/60 backdrop-blur-3xl border border-white/10 p-12 md:p-20 rounded-[4rem] shadow-2xl text-center"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 mb-8 bg-red-500/20 text-red-400 border border-red-500/30 rounded-full text-xs font-black uppercase tracking-[0.3em]">
              <span className="flex h-2 w-2 rounded-full bg-red-500 animate-ping" />
              Critical Advisory
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-tight uppercase italic">
              Warning:<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400">
                High Dosage <br/>Of Comedy Ahead
              </span>
            </h1>
            
            <p className="text-slate-400 mb-12 text-lg font-medium leading-relaxed max-w-sm mx-auto">
              This session contains concentrated humor and office-related irony. Proceed only if your funny bone is calibrated.
            </p>

            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(239, 68, 68, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              className="group relative inline-flex items-center justify-center px-12 py-6 font-black text-white transition-all duration-300 bg-red-600 rounded-3xl shadow-2xl text-xl uppercase tracking-widest overflow-hidden"
            >
              <span className="relative z-10">Enter at your own risk</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
