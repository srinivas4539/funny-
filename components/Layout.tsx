
import React from 'react';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
  activeTask: string;
  onNavigate: (task: 'TASK_1' | 'TASK_2' | 'TASK_3') => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTask, onNavigate }) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start bg-slate-950 overflow-x-hidden selection:bg-blue-500 selection:text-white">
      {/* Blurred Office Background */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000')`,
          filter: activeTask === 'WELCOME' ? 'blur(10px) brightness(0.4) contrast(1.1)' : 'blur(20px) brightness(0.3) grayscale(0.2)'
        }}
      />
      
      {/* CRT Scanline Effect */}
      <div className="fixed inset-0 z-10 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />

      {/* Task Progress Nav */}
      {activeTask !== 'WELCOME' && (
        <motion.nav 
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed top-0 left-0 w-full z-50 px-8 py-4 flex flex-col md:flex-row justify-between items-center backdrop-blur-2xl bg-slate-900/40 border-b border-white/5 gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black text-white italic text-xs shadow-lg shadow-blue-500/20">SG</div>
            <span className="text-white font-black text-sm tracking-tighter uppercase italic">9-to-5 Survival Guide</span>
          </div>
          
          <div className="flex gap-1 md:gap-3 bg-white/5 p-1 rounded-2xl border border-white/5">
            {[
              { id: 'TASK_1', label: '1. Riddles' },
              { id: 'TASK_2', label: '2. Movie Spins' },
              { id: 'TASK_3', label: '3. Audit Case' }
            ].map((task) => (
              <button 
                key={task.id}
                onClick={() => onNavigate(task.id as any)}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTask === task.id ? 'bg-white text-slate-900 shadow-xl' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
              >
                {task.label}
              </button>
            ))}
          </div>
        </motion.nav>
      )}

      {/* Content Area */}
      <main className="relative z-20 w-full max-w-6xl px-6 py-24 md:py-32 flex flex-col items-center min-h-screen">
        {children}
      </main>

      {/* Footer Disclaimer */}
      <footer className="relative z-20 w-full py-8 text-center border-t border-white/5 bg-slate-950/20 backdrop-blur-sm">
        <p className="text-[9px] font-mono text-white/20 uppercase tracking-[0.5em]">9-to-5 Survival Guide • Created for Friends & Colleagues • Enjoy Responsibility</p>
      </footer>
    </div>
  );
};