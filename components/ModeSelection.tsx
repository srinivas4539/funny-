
import React from 'react';
import { motion } from 'framer-motion';
import { playSelect } from '../utils/audio';

interface ModeSelectionProps {
  onSelectMode: (mode: 'SPINNING' | 'PICTURE_CHALLENGE') => void;
}

export const ModeSelection: React.FC<ModeSelectionProps> = ({ onSelectMode }) => {
  const handleSelect = (mode: 'SPINNING' | 'PICTURE_CHALLENGE') => {
    playSelect();
    onSelectMode(mode);
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-white mb-2 italic">Select Your Protocol</h2>
        <p className="text-slate-400 font-mono text-sm uppercase tracking-[0.3em]">Compliance Required</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {/* Spin Mode */}
        <motion.button
          whileHover={{ scale: 1.05, translateY: -5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSelect('SPINNING')}
          className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl text-left group transition-all hover:bg-white/15"
        >
          <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-500/40 transition-colors">
            <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2 italic tracking-tighter">The Spin</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Test your luck with the Wheel of Despair. Random questions for random people.
          </p>
          <div className="mt-6 flex items-center text-blue-400 font-mono text-xs font-bold uppercase tracking-tighter">
            Enter Roulette Mode <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </motion.button>

        {/* Picture Mode */}
        <motion.button
          whileHover={{ scale: 1.05, translateY: -5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSelect('PICTURE_CHALLENGE')}
          className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl text-left group transition-all hover:bg-white/15"
        >
          <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-500/40 transition-colors">
            <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2 italic tracking-tighter">Visual Audit</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Examine the evidence of corporate life. Identify the target to win the approval of HR.
          </p>
          <div className="mt-6 flex items-center text-purple-400 font-mono text-xs font-bold uppercase tracking-tighter">
            Analyze Evidence <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </motion.button>
      </div>
    </div>
  );
};
