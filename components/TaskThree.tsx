
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PictureChallengeItem } from '../types';
import { playReveal, playSelect, playDing } from '../utils/audio';
import { GoogleGenAI } from "@google/genai";

interface TaskThreeProps {
  challenges: PictureChallengeItem[];
  onComplete: () => void;
}

export const TaskThree: React.FC<TaskThreeProps> = ({ challenges, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [blurLevel, setBlurLevel] = useState(30);
  const [aiHint, setAiHint] = useState<string | null>(null);
  const [isAiThinking, setIsAiThinking] = useState(false);
  
  const challenge = challenges[currentIndex];

  const setClarity = (percentage: number) => {
    playSelect();
    const newBlur = 30 * (1 - percentage / 100);
    setBlurLevel(newBlur);
    if (percentage === 100) {
      handleReveal();
    }
  };

  const handleEnhance = () => {
    if (blurLevel > 0) {
      playSelect();
      setBlurLevel(prev => Math.max(0, prev - 6));
    }
  };

  const handleReveal = () => {
    if (!isRevealed) {
      playReveal();
      setIsRevealed(true);
      setBlurLevel(0);
    }
  };

  const fetchAiHint = async () => {
    if (isAiThinking) return;
    setIsAiThinking(true);
    playSelect();

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
      const prompt = `You are a corporate AI auditor. Look at this image description: "${challenge.answer}". 
      The user is trying to guess what it is, but it's blurred. 
      Give a funny, sarcastic, and slightly cryptic "Corporate Audit Hint" in 20 words or less. 
      Do not directly reveal the answer, but be helpful in an annoying corporate way.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      setAiHint(response.text || "AI Error: Synergy levels too low to process hint.");
    } catch (error) {
      console.error("AI Hint Error:", error);
      setAiHint("Confidentiality error: HR has blocked this diagnostic.");
    } finally {
      setIsAiThinking(false);
    }
  };

  const handleNext = () => {
    playSelect();
    setIsRevealed(false);
    setBlurLevel(30);
    setAiHint(null);
    if (currentIndex < challenges.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete();
    }
  };

  const getStatusText = () => {
    if (blurLevel > 25) return "Status: Severe Eyestrain Detected";
    if (blurLevel > 15) return "Status: Coffee Withdrawal Vision";
    if (blurLevel > 5) return "Status: Squinting for Synergy";
    if (blurLevel > 0) return "Status: 99% Identified";
    return "Status: Case File Resolved";
  };

  useEffect(() => {
    if (blurLevel === 0 && !isRevealed) {
      setIsRevealed(true);
      playDing();
    }
  }, [blurLevel, isRevealed]);

  if (!challenge) return null;

  const currentClarityPct = Math.round((1 - blurLevel / 30) * 100);

  return (
    <div className="w-full flex flex-col items-center gap-8 min-h-[80vh]">
      <div 
        className="fixed inset-0 z-[-1] bg-cover bg-center pointer-events-none transition-all duration-1000"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&q=80&w=1600')`,
          filter: 'blur(30px) brightness(0.2)'
        }}
      />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          x: isRevealed ? [0, -4, 4, -2, 2, 0] : 0
        }}
        transition={{ x: { duration: 0.3 } }}
        className="w-full max-w-4xl bg-slate-900/60 backdrop-blur-3xl border border-white/10 p-8 md:p-12 rounded-[3.5rem] shadow-2xl flex flex-col items-center relative overflow-hidden"
      >
        {/* Flash Overlay */}
        <AnimatePresence>
          {isRevealed && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-white z-[60] pointer-events-none"
            />
          )}
        </AnimatePresence>

        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter mb-2">
            Task 3: <span className="text-purple-400">Blur Audit</span>
          </h2>
          <div className="flex items-center justify-center gap-2">
            <span className={`w-2 h-2 rounded-full ${blurLevel > 0 ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`} />
            <p className="text-white/60 font-mono text-xs uppercase tracking-[0.4em] font-bold">{getStatusText()}</p>
          </div>
        </div>

        {/* Clarity Selector */}
        <div className="w-full flex justify-center gap-3 mb-8">
          {[25, 50, 75, 100].map((pct) => {
            const labels: any = { 25: 'Squinting', 50: 'Post-Coffee', 75: 'High-Def', 100: 'Full Audit' };
            const isActive = currentClarityPct >= pct && currentClarityPct < pct + 25 || (pct === 100 && isRevealed);
            return (
              <button
                key={pct}
                onClick={() => setClarity(pct)}
                className={`flex-1 max-w-[120px] py-3 rounded-2xl border transition-all flex flex-col items-center justify-center gap-1 group ${
                  isActive 
                  ? 'bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-500/20' 
                  : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <span className="text-xs font-black uppercase tracking-widest">{pct}%</span>
                <span className="text-[8px] font-mono uppercase tracking-tighter opacity-60 group-hover:opacity-100">{labels[pct]}</span>
              </button>
            )
          })}
        </div>

        {/* Audit Stage */}
        <div className="relative w-full max-w-[640px] aspect-video rounded-[2.5rem] overflow-hidden border-4 border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-slate-950 group">
          <motion.div 
            className="absolute inset-0 bg-cover bg-center"
            animate={{ 
              filter: `blur(${blurLevel}px) brightness(${isRevealed ? 1.1 : 0.8})`,
              scale: isRevealed ? 1 : 1.1
            }}
            transition={{ duration: 0.5 }}
            style={{ backgroundImage: `url('${challenge.originalUrl}')` }}
          />
          
          {/* Diagnostic Overlay */}
          <div className="absolute inset-0 pointer-events-none p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
               <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 font-mono text-[10px] text-purple-400">
                  SCAN_ID: {challenge.id}
               </div>
               <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 font-mono text-[10px] text-white">
                  FOCUS: {currentClarityPct}%
               </div>
            </div>
            
            <AnimatePresence>
               {aiHint && (
                 <motion.div 
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: 20 }}
                   className="bg-purple-900/80 backdrop-blur-xl border border-purple-400/30 p-4 rounded-2xl max-w-[80%] pointer-events-auto shadow-2xl"
                 >
                    <p className="text-purple-300 font-mono text-[9px] uppercase tracking-widest mb-1 font-bold">Confidential Hint:</p>
                    <p className="text-white text-sm font-medium italic">"{aiHint}"</p>
                 </motion.div>
               )}
            </AnimatePresence>
          </div>

          {/* CRT lines */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />
        </div>

        {/* Controls */}
        <div className="w-full mt-10 space-y-6 flex flex-col items-center">
          <div className="flex flex-wrap justify-center gap-4">
            {!isRevealed ? (
              <>
                <button 
                  onClick={handleEnhance}
                  disabled={blurLevel === 0}
                  className="px-8 py-4 bg-white/10 border border-white/20 hover:bg-white/20 text-white font-black rounded-2xl uppercase tracking-widest text-xs transition-all active:scale-95 disabled:opacity-30 flex items-center gap-3"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                  Enhance Focus
                </button>

                <button 
                  onClick={fetchAiHint}
                  disabled={isAiThinking}
                  className="px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-black rounded-2xl uppercase tracking-widest text-xs shadow-lg transition-all active:scale-95 disabled:opacity-50 flex items-center gap-3"
                >
                  <div className={`w-2 h-2 rounded-full bg-white ${isAiThinking ? 'animate-ping' : ''}`} />
                  {isAiThinking ? 'AI Analyzing...' : 'Ask AI Diagnostic'}
                </button>

                <button 
                  onClick={handleReveal}
                  className="px-8 py-4 bg-red-600/20 border border-red-500/30 hover:bg-red-600/40 text-red-400 font-black rounded-2xl uppercase tracking-widest text-xs transition-all active:scale-95"
                >
                  Finalize Reveal
                </button>
              </>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  y: 0,
                  transition: { type: "spring", stiffness: 400, damping: 12 }
                }}
                className="text-center space-y-4"
              >
                <motion.div 
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.3, repeat: 1 }}
                  className="inline-block px-6 py-2 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-xs font-black uppercase tracking-widest mb-2"
                >
                   Case Solved
                </motion.div>
                <h3 className="text-2xl md:text-4xl font-black text-white leading-tight max-w-2xl px-4 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                  "{challenge.answer}"
                </h3>
              </motion.div>
            )}
          </div>
        </div>

        {/* Next Button */}
        <AnimatePresence>
          {isRevealed && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12"
            >
               <button 
                onClick={handleNext}
                className="px-12 py-5 bg-white text-slate-900 font-black rounded-2xl uppercase tracking-[0.3em] text-sm shadow-2xl hover:bg-purple-400 transition-all active:scale-95 flex items-center gap-4"
              >
                {currentIndex < challenges.length - 1 ? 'Next Audit File' : 'Complete Full Audit'}
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Footer Info */}
      <div className="text-white/10 font-mono text-[9px] uppercase tracking-[0.8em] py-4">
        Archive System v4.2 • Secure Connection 
      </div>
    </div>
  );
};
