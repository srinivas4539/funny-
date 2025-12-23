
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TASK_3_PICTURES } from '../constants';
import { PictureChallengeItem } from '../types';
import { playReveal } from '../utils/audio';

interface PictureChallengeProps {
  onReset: () => void;
}

export const PictureChallenge: React.FC<PictureChallengeProps> = ({ onReset }) => {
  const [currentJoke, setCurrentJoke] = useState<PictureChallengeItem | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const random = TASK_3_PICTURES[Math.floor(Math.random() * TASK_3_PICTURES.length)];
    setCurrentJoke(random);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleReveal = () => {
    if (!isRevealed) {
      playReveal();
      setIsRevealed(true);
    }
  };

  if (!currentJoke) return null;

  return (
    <div className="w-full max-w-3xl flex flex-col items-center gap-8 pb-20">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-slate-900/40 backdrop-blur-3xl border border-white/10 p-6 md:p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[100px] -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] -ml-32 -mb-32" />

        <div className="relative z-10">
          <div className="flex justify-between items-center mb-10">
            <div className="px-4 py-1 bg-white/10 rounded-full border border-white/10 text-[10px] font-mono text-white/60 tracking-[0.3em] uppercase">
              Investigation #{currentJoke.id.toString().padStart(3, '0')}
            </div>
            <div className="flex gap-1">
              {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/20" />)}
            </div>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tighter leading-tight text-center italic">
            Visual <span className="text-purple-400 not-italic">Audit</span> Report
          </h2>

          <div className="mb-10 p-8 bg-gradient-to-br from-white/10 to-transparent rounded-3xl border border-white/10 shadow-xl relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1 h-full bg-purple-500" />
             <p className="text-xs font-mono text-purple-400 uppercase mb-4 tracking-[0.4em] font-bold">Query Subject:</p>
             <h3 className="text-xl md:text-2xl font-bold text-white leading-snug">
               "{currentJoke.title}"
             </h3>
          </div>

          <div className="relative group rounded-[2.5rem] overflow-hidden border-4 border-white/10 shadow-2xl mb-12">
            <motion.img 
              src={currentJoke.originalUrl}
              alt="Management Evidence"
              className="w-full aspect-video object-cover"
              initial={{ scale: 1.1 }}
              animate={{ 
                scale: isRevealed ? 1 : 1.05,
                filter: isRevealed ? 'brightness(1.1) contrast(1.1) blur(0px)' : 'brightness(0.6) contrast(1.2) blur(20px)',
                x: isRevealed ? [0, -2, 2, -1, 1, 0] : 0
              }}
              transition={{ 
                duration: isRevealed ? 0.4 : 0.8,
                x: { duration: 0.3 }
              }}
            />
            
            {/* Visual Scan HUD */}
            <div className={`absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-purple-500/20 to-transparent h-24 w-full ${!isRevealed ? 'animate-scan' : 'hidden'}`} />
            
            <AnimatePresence>
              {!isRevealed ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[1px]"
                >
                  <div className="px-8 py-4 bg-black/60 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
                    <span className="text-white font-mono text-xs uppercase tracking-[0.5em] font-bold">Awaiting Human Input...</span>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-white z-20 pointer-events-none shadow-[0_0_100px_white]"
                />
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-col items-center">
            <AnimatePresence mode="wait">
              {!isRevealed ? (
                <motion.button 
                  key="reveal-btn"
                  whileHover={{ scale: 1.05, y: -5, boxShadow: "0 25px 50px -12px rgba(255, 255, 255, 0.25)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReveal}
                  className="w-full max-w-sm py-6 bg-white text-slate-900 font-black rounded-3xl shadow-2xl transition-all uppercase tracking-[0.3em] text-sm hover:bg-slate-50 flex items-center justify-center gap-3"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Finalize Audit
                </motion.button>
              ) : (
                <motion.div 
                  key="answer-box"
                  initial={{ opacity: 0, scale: 0.3, y: 100, rotate: -15 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    y: 0, 
                    rotate: 0,
                    transition: { 
                      type: "spring",
                      stiffness: 600,
                      damping: 12,
                      mass: 1.2
                    }
                  }}
                  className="w-full text-center space-y-6"
                >
                  <div className="p-12 bg-gradient-to-br from-green-500/30 to-blue-500/30 border-2 border-green-500/40 rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(34,197,94,0.3)] relative overflow-hidden">
                    <motion.div 
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                      className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-green-400 to-blue-400 origin-left" 
                    />
                    <motion.span 
                      animate={{ x: [-1, 1, -1], opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 0.1, repeat: 10 }}
                      className="text-green-400 font-mono text-[10px] uppercase tracking-[0.5em] block mb-6 font-black"
                    >
                      CLASSIFICATION VERIFIED
                    </motion.span>
                    <p className="text-3xl md:text-5xl font-black text-white italic leading-tight tracking-tighter">
                      "{currentJoke.answer}"
                    </p>
                    <div className="mt-8 flex justify-center gap-2">
                      {[1, 2, 3].map(i => <div key={i} className="w-10 h-1 bg-green-500/20 rounded-full" />)}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      <motion.button 
        whileHover={{ x: -10 }}
        onClick={onReset}
        className="flex items-center text-white/30 hover:text-white transition-all text-sm font-mono gap-5 uppercase tracking-[0.4em] font-black group py-6"
      >
        <span className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:bg-white/20 transition-all group-hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </span>
        Exit Audit System
      </motion.button>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(-150%); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(450%); opacity: 0; }
        }
        .animate-scan {
          animation: scan 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
