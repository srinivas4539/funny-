
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Riddle } from '../types';
import { playReveal, playSelect } from '../utils/audio';

interface TaskOneProps {
  riddles: Riddle[];
  onComplete: () => void;
}

export const TaskOne: React.FC<TaskOneProps> = ({ riddles, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const riddle = riddles[currentIndex];

  const handleReveal = () => {
    if (!isRevealed) {
      playReveal();
      setIsRevealed(true);
    }
  };

  const handleNext = () => {
    playSelect();
    setIsRevealed(false);
    if (currentIndex < riddles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-10">
      <div className="text-center mb-4">
        <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter mb-2">Task 1: Podupu Kathalu</h2>
        <p className="text-blue-400 font-mono text-xs uppercase tracking-[0.4em]">Ancient Metaphor Protocol</p>
      </div>

      <motion.div 
        key={riddle.id}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          x: isRevealed ? [0, -2, 2, -1, 1, 0] : 0
        }}
        transition={{ x: { duration: 0.3 } }}
        className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 bg-slate-900/40 backdrop-blur-3xl border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl relative"
      >
        {/* Flash Effect on Reveal */}
        <AnimatePresence>
          {isRevealed && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-white z-50 pointer-events-none"
            />
          )}
        </AnimatePresence>

        <div className="relative aspect-video lg:aspect-auto overflow-hidden">
          <motion.img 
            src={riddle.imageUrl} 
            alt="Riddle context" 
            animate={{ 
              scale: isRevealed ? 1 : 1.1,
              filter: isRevealed ? 'grayscale(0) contrast(1)' : 'grayscale(1) contrast(1.2) blur(5px)'
            }}
            className="w-full h-full object-cover grayscale opacity-60 contrast-125 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 to-transparent lg:hidden" />
          <div className="absolute top-4 left-4 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-[10px] text-white font-mono uppercase tracking-widest">
            Visual Inquiry #{riddle.id}
          </div>
        </div>

        <div className="p-10 flex flex-col justify-center">
          <div className="mb-8">
             <h3 className="text-3xl md:text-4xl font-bold text-white telugu-text leading-tight mb-4">{riddle.teluguQ}</h3>
             <p className="text-white/50 text-lg italic">"{riddle.englishQ}"</p>
          </div>

          <div className="min-h-[140px] flex items-center">
            <AnimatePresence mode="wait">
              {!isRevealed ? (
                <motion.button 
                  key="reveal"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleReveal}
                  className="w-full py-5 bg-white text-slate-900 font-black rounded-2xl shadow-xl uppercase tracking-widest text-sm"
                >
                  Show Answer (జవాబు)
                </motion.button>
              ) : (
                <motion.div 
                  key="answer"
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    y: 0,
                    transition: { 
                      type: "spring",
                      stiffness: 500,
                      damping: 15
                    }
                  }}
                  className="w-full p-8 bg-blue-600/20 rounded-2xl border-2 border-blue-400/40 shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                >
                  <motion.p 
                    animate={{ x: [-1, 1, -1] }}
                    transition={{ duration: 0.1, repeat: 5 }}
                    className="text-blue-400 font-mono text-[10px] uppercase mb-2 tracking-widest font-bold"
                  >
                    DECRYPTED SOLUTION:
                  </motion.p>
                  <p className="text-3xl font-black text-white telugu-text mb-1">{riddle.teluguA}</p>
                  <p className="text-xl text-white/70 italic">{riddle.englishA}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      <motion.button 
        whileHover={{ x: 10 }}
        onClick={handleNext}
        className="flex items-center gap-4 text-white/40 hover:text-white transition-all uppercase tracking-widest font-black text-xs"
      >
        {currentIndex < riddles.length - 1 ? 'Next Riddle' : 'Proceed to Task 2'}
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </motion.button>
    </div>
  );
};
