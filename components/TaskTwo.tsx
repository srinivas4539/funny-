
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FunnySpinQuestion } from '../types';
import { playTick, playDing, playReveal, playSelect } from '../utils/audio';

interface TaskTwoProps {
  questions: FunnySpinQuestion[];
  onComplete: () => void;
}

export const TaskTwo: React.FC<TaskTwoProps> = ({ questions, onComplete }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedQuestion, setSelectedQuestion] = useState<FunnySpinQuestion | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isPOVRevealed, setIsPOVRevealed] = useState(false);
  const lastTickAngle = useRef(0);

  const startSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSelectedQuestion(null);
    setIsRevealed(false);
    setIsPOVRevealed(false);
    
    // 2-second spin duration
    const extraRotations = 5 + Math.floor(Math.random() * 5);
    const randomDegrees = Math.floor(Math.random() * 360);
    const totalNewRotation = rotation + (extraRotations * 360) + randomDegrees;
    
    lastTickAngle.current = rotation;
    setRotation(totalNewRotation);

    setTimeout(() => {
      setIsSpinning(false);
      playDing();
      const normalizedRotation = totalNewRotation % 360;
      const segmentSize = 360 / questions.length;
      const index = Math.floor((360 - (normalizedRotation % 360)) / segmentSize) % questions.length;
      const finalIndex = index < 0 ? index + questions.length : index;
      
      setSelectedQuestion(questions[finalIndex]);
    }, 2000); 
  };

  const handleUpdate = (latest: any) => {
    if (!isSpinning) return;
    const currentRotation = latest.rotate;
    const segmentSize = 360 / questions.length;
    if (Math.abs(currentRotation - lastTickAngle.current) >= segmentSize) {
      playTick();
      lastTickAngle.current = currentRotation;
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[80vh]">
      {/* Background Image with Blur */}
      <div 
        className="fixed inset-0 z-[-1] bg-cover bg-center pointer-events-none transition-all duration-1000"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&q=80&w=1600')`,
          filter: 'blur(10px) brightness(0.4)'
        }}
      />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl bg-white/10 backdrop-blur-md border border-white/20 p-8 md:p-16 rounded-[4rem] shadow-2xl flex flex-col items-center gap-10"
      >
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter mb-2 drop-shadow-lg">
            Brahmanandam & <span className="text-yellow-400">Office Roulette</span>
          </h2>
          <p className="text-white/60 font-mono text-xs uppercase tracking-[0.4em]">Spin for Dialogues & Corporate Reality</p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 w-full justify-center">
          {/* Visual Spinner Wheel */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 shrink-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-30">
               <div className="w-6 h-10 bg-yellow-400 rounded-b-full shadow-lg border-2 border-white" />
            </div>

            <motion.div 
              animate={{ rotate: rotation }}
              onUpdate={handleUpdate}
              transition={{ duration: 2, ease: [0.12, 0, 0.39, 0] }}
              className="relative w-full h-full rounded-full border-[10px] border-white/20 overflow-hidden bg-slate-900/80 shadow-2xl"
            >
              {questions.map((q, i) => {
                const segmentAngle = 360 / questions.length;
                return (
                  <div 
                    key={q.id}
                    className="absolute w-full h-full"
                    style={{ 
                      transform: `rotate(${i * segmentAngle}deg)`,
                      clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 50%)',
                      transformOrigin: 'center center'
                    }}
                  >
                    <div 
                      className={`absolute top-0 left-1/2 w-1/2 h-1/2 origin-bottom-left -translate-x-full transition-colors ${i % 2 === 0 ? 'bg-white/5' : 'bg-white/10'}`}
                      style={{ transform: `rotate(${segmentAngle}deg)` }}
                    />
                  </div>
                );
              })}
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                 <span className="text-white font-black text-4xl italic">SPIN</span>
              </div>
            </motion.div>

            <button 
              onClick={startSpin}
              disabled={isSpinning}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-20 h-20 rounded-full flex flex-col items-center justify-center font-black text-white transition-all transform active:scale-90 shadow-2xl border-4 border-white/30 ${isSpinning ? 'bg-slate-700 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-400'}`}
            >
              <span className="text-2xl">SPIN</span>
            </button>
          </div>

          {/* Reveal Panel */}
          <div className="flex-1 w-full min-h-[400px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {selectedQuestion ? (
                <motion.div 
                  key={`res-${selectedQuestion.id}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="w-full text-center space-y-6"
                >
                  <div className="p-1 px-4 py-2 bg-yellow-500/20 rounded-full border border-yellow-500/30 text-[10px] font-black uppercase text-yellow-400 inline-block mb-4">
                    Dialogue Decrypted
                  </div>
                  
                  <h3 className="text-3xl md:text-5xl font-black text-white italic leading-tight telugu-text drop-shadow-xl">
                    "{selectedQuestion.question}"
                  </h3>
                  
                  <div className="pt-4 flex flex-col gap-4 items-center">
                    <AnimatePresence mode="wait">
                       {!isRevealed ? (
                         <motion.button 
                           key="ye-cinema"
                           onClick={() => { playReveal(); setIsRevealed(true); }}
                           whileHover={{ scale: 1.05 }}
                           whileTap={{ scale: 0.95 }}
                           className="px-10 py-5 bg-white text-slate-950 font-black rounded-2xl uppercase tracking-[0.2em] text-sm shadow-xl hover:bg-yellow-400 transition-colors w-full"
                         >
                           Ye Cinema? (Which Movie?)
                         </motion.button>
                       ) : (
                         <motion.div 
                           key="reveal-sequence"
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           className="w-full space-y-6"
                         >
                            <div className="p-6 bg-green-500/20 border-2 border-green-500/40 rounded-3xl">
                               <p className="text-white/60 font-mono text-xs uppercase mb-2">The Truth / Movie:</p>
                               <p className="text-3xl font-black text-white italic mb-2">Tada! 🎉</p>
                               <p className="text-2xl font-black text-green-400">{selectedQuestion.answer}</p>
                            </div>

                            <AnimatePresence>
                              {!isPOVRevealed ? (
                                <motion.button
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  onClick={() => { playReveal(); setIsPOVRevealed(true); }}
                                  className="w-full py-4 bg-blue-500 text-white font-black rounded-2xl uppercase tracking-[0.1em] text-xs shadow-lg hover:bg-blue-400 transition-all active:scale-95"
                                >
                                  But what's the Office Reality? 🤔
                                </motion.button>
                              ) : (
                                <motion.div 
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="p-6 bg-blue-600/30 border-2 border-blue-400/50 rounded-3xl shadow-xl"
                                >
                                   <p className="text-blue-300 font-mono text-[10px] uppercase mb-2 tracking-[0.4em] font-black">Office Point of View:</p>
                                   <p className="text-xl md:text-2xl font-black text-white italic leading-relaxed">
                                      "{selectedQuestion.officePOV}"
                                   </p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                            
                            {isPOVRevealed && (
                              <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
                              >
                                 <button 
                                   onClick={startSpin}
                                   className="px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-black rounded-xl text-xs uppercase tracking-widest border border-white/10 transition-all flex items-center justify-center gap-2"
                                 >
                                   <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                   </svg>
                                   Next Dialogue
                                 </button>
                                 <button 
                                   onClick={() => { playSelect(); onComplete(); }}
                                   className="px-6 py-4 bg-yellow-500 text-slate-950 font-black rounded-xl text-xs uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2"
                                 >
                                   Final Audit Case
                                   <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                   </svg>
                                 </button>
                              </motion.div>
                            )}
                         </motion.div>
                       )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ) : (
                <div className="text-center opacity-40">
                   <p className="text-white font-mono text-xl uppercase tracking-[0.4em] italic leading-relaxed">
                     {isSpinning ? 'SPINNING ARCHIVE...' : 'Awaiting Spin...'}
                   </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
