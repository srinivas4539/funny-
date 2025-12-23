
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Fixed: Using the correct constant name from constants.ts
import { TASK_2_QUESTIONS } from '../constants';
// Fixed: Using the correct type name from types.ts
import { FunnySpinQuestion } from '../types';
import { playTick, playDing } from '../utils/audio';

interface SpinMechanicProps {
  onSelected: (question: FunnySpinQuestion) => void;
}

export const SpinMechanic: React.FC<SpinMechanicProps> = ({ onSelected }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const lastTickAngle = useRef(0);

  const handleUpdate = (latest: any) => {
    if (!isSpinning) return;
    const currentRotation = latest.rotate;
    const segmentSize = 360 / TASK_2_QUESTIONS.length;
    
    // Play a tick sound every time the wheel crosses a segment boundary
    if (Math.abs(currentRotation - lastTickAngle.current) >= segmentSize) {
      playTick();
      lastTickAngle.current = currentRotation;
    }
  };

  const startSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    
    const extraRotations = 5 + Math.floor(Math.random() * 5);
    const randomDegrees = Math.floor(Math.random() * 360);
    const totalNewRotation = rotation + (extraRotations * 360) + randomDegrees;
    
    lastTickAngle.current = rotation;
    setRotation(totalNewRotation);

    setTimeout(() => {
      setIsSpinning(false);
      playDing(); // Success sound!
      const normalizedRotation = totalNewRotation % 360;
      const segmentSize = 360 / TASK_2_QUESTIONS.length;
      const index = Math.floor((360 - normalizedRotation) / segmentSize) % TASK_2_QUESTIONS.length;
      const finalIndex = index < 0 ? index + TASK_2_QUESTIONS.length : index;
      
      onSelected(TASK_2_QUESTIONS[finalIndex]);
    }, 3000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center"
    >
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-2 italic">The Wheel of Despair</h2>
        <p className="text-slate-400 text-sm font-mono uppercase tracking-widest">Select your corporate destiny</p>
      </div>

      <div className="relative w-80 h-80 md:w-96 md:h-96">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-30 drop-shadow-lg">
          <div className="w-8 h-10 bg-red-500 rounded-b-full shadow-lg border-2 border-white" />
        </div>

        <motion.div 
          animate={{ rotate: rotation }}
          onUpdate={handleUpdate}
          transition={{ duration: 3, ease: [0.12, 0, 0.39, 0] }}
          className="relative w-full h-full rounded-full border-8 border-slate-700 overflow-hidden bg-slate-800 shadow-2xl shadow-black/50"
        >
          {TASK_2_QUESTIONS.map((q, i) => {
            const segmentAngle = 360 / TASK_2_QUESTIONS.length;
            const rotationAngle = i * segmentAngle;
            return (
              <div 
                key={q.id}
                className="absolute w-full h-full"
                style={{ 
                  transform: `rotate(${rotationAngle}deg)`,
                  clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 50%)',
                  transformOrigin: 'center center'
                }}
              >
                <div 
                  className={`absolute top-0 left-1/2 w-1/2 h-1/2 origin-bottom-left -translate-x-full transition-colors duration-500 ${i % 2 === 0 ? 'bg-slate-700' : 'bg-slate-800'} border-l border-white/10`}
                  style={{ transform: `rotate(${segmentAngle}deg)` }}
                />
                <div 
                  className="absolute top-12 left-1/2 -translate-x-1/2 text-white font-bold text-lg pointer-events-none select-none"
                  style={{ transform: `rotate(${segmentAngle / 2}deg)` }}
                >
                  {q.id}
                </div>
              </div>
            );
          })}
          
          <div className="absolute inset-1/4 rounded-full bg-slate-900 border-4 border-slate-600 flex items-center justify-center shadow-inner">
             <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                <span className="text-white font-black text-2xl tracking-tighter opacity-20 uppercase font-mono italic">9:5</span>
             </div>
          </div>
        </motion.div>

        <button 
          onClick={startSpin}
          disabled={isSpinning}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-24 h-24 rounded-full flex flex-col items-center justify-center font-bold text-white transition-all transform active:scale-95 ${isSpinning ? 'bg-slate-600 cursor-not-allowed opacity-80' : 'bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/50'}`}
        >
          <span className="text-xs uppercase tracking-tighter">Click to</span>
          <span className="text-xl">SPIN</span>
        </button>
      </div>
      
      <p className="mt-8 text-white/30 text-[10px] font-mono animate-pulse uppercase tracking-[0.2em]">
        {isSpinning ? 'SYNERGY LOADING...' : 'AWAITING CORPORATE INPUT'}
      </p>
    </motion.div>
  );
};
