
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Riddle } from '../types';
import { playReveal, playSelect } from '../utils/audio';

interface QuestionDisplayProps {
  riddle: Riddle;
  onNext: () => void;
}

export const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ riddle, onNext }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleReveal = () => {
    if (!isRevealed) {
      playReveal();
      setIsRevealed(true);
    }
  };

  const handleNext = () => {
    playSelect();
    setIsRevealed(false);
    onNext();
  };

  return (
    <div className="w-full max-w-2xl flex flex-col items-center gap-8">
      <motion.div 
        key={riddle.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="w-full bg-stone-900/60 backdrop-blur-2xl border border-amber-500/30 p-8 md:p-14 rounded-[2.5rem] shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-500" />
        
        {/* Dynamic Background Flash */}
        <AnimatePresence>
          {isRevealed && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.4, 0] }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-amber-400 z-0 pointer-events-none"
            />
          )}
        </AnimatePresence>

        <div className="mb-10 text-center relative z-10">
          <span className="text-amber-500 font-mono text-xs uppercase tracking-[0.4em] block mb-6 font-bold">Riddle #{riddle.id}</span>
          
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight telugu-text">
            {riddle.teluguQ}
          </h2>
          
          <p className="text-stone-400 text-lg italic font-light max-w-md mx-auto">
            "{riddle.englishQ}"
          </p>
        </div>

        <div className="min-h-[140px] flex items-center justify-center relative z-10">
          <AnimatePresence mode="wait">
            {!isRevealed ? (
              <motion.button
                key="reveal-btn"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReveal}
                className="px-10 py-4 bg-amber-500 text-stone-900 font-black rounded-xl shadow-lg hover:bg-amber-400 transition-all telugu-text text-xl"
              >
                జవాబు చూపించు (Show Answer)
              </motion.button>
            ) : (
              <motion.div 
                key="answer"
                initial={{ opacity: 0, scale: 1.5, rotateX: 45 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  rotateX: 0,
                  transition: { 
                    type: "spring", 
                    stiffness: 500, 
                    damping: 15,
                    mass: 0.8
                  }
                }}
                className="w-full text-center space-y-4 p-8 bg-amber-500/10 rounded-2xl border-2 border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.2)]"
              >
                <motion.div 
                  initial={{ x: -2, filter: 'blur(2px)' }}
                  animate={{ x: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.1, repeat: 3 }}
                  className="text-amber-400 font-mono text-[10px] uppercase tracking-widest font-bold"
                >
                  DECRYPTION SUCCESSFUL
                </motion.div>
                <h3 className="text-4xl md:text-5xl font-black text-amber-400 telugu-text drop-shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                  {riddle.teluguA}
                </h3>
                <p className="text-stone-300 text-xl font-medium border-t border-amber-500/20 pt-4">
                  {riddle.englishA}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.button
        whileHover={{ x: 5 }}
        onClick={handleNext}
        className="flex items-center gap-4 text-white/40 hover:text-amber-400 transition-all uppercase tracking-widest font-black text-sm group"
      >
        Next Riddle
        <div className="p-3 bg-white/5 rounded-full border border-white/10 group-hover:border-amber-500/50 group-hover:bg-amber-500/10">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </motion.button>
    </div>
  );
};
