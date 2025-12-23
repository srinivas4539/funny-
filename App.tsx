
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Layout } from './components/Layout';
import { WelcomeScreen } from './components/WelcomeScreen';
import { TaskOne } from './components/TaskOne';
import { TaskTwo } from './components/TaskTwo';
import { TaskThree } from './components/TaskThree';
import { TASK_1_RIDDLES, TASK_2_QUESTIONS, TASK_3_PICTURES } from './constants';
import { AppState } from './types';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<AppState>('WELCOME');

  const handleNavigate = (task: 'TASK_1' | 'TASK_2' | 'TASK_3') => {
    setGameState(task);
  };

  return (
    <Layout activeTask={gameState} onNavigate={handleNavigate}>
      <AnimatePresence mode="wait">
        {gameState === 'WELCOME' && (
          <WelcomeScreen key="welcome" onStart={() => setGameState('TASK_1')} />
        )}

        {gameState === 'TASK_1' && (
          <TaskOne 
            key="task1" 
            riddles={TASK_1_RIDDLES} 
            onComplete={() => setGameState('TASK_2')} 
          />
        )}

        {gameState === 'TASK_2' && (
          <TaskTwo 
            key="task2" 
            questions={TASK_2_QUESTIONS} 
            onComplete={() => setGameState('TASK_3')} 
          />
        )}

        {gameState === 'TASK_3' && (
          <TaskThree 
            key="task3" 
            challenges={TASK_3_PICTURES} 
            onComplete={() => setGameState('WELCOME')} 
          />
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default App;
