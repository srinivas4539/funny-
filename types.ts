
export interface Riddle {
  id: number;
  teluguQ: string;
  englishQ: string;
  teluguA: string;
  englishA: string;
  imageUrl: string;
}

export interface FunnySpinQuestion {
  id: number;
  question: string;
  answer: string;
  officePOV?: string;
}

export interface Hotspot {
  id: number;
  top: string; // percentage e.g. "10%"
  left: string; // percentage e.g. "20%"
  width: string;
  height: string;
}

export interface PictureChallengeItem {
  id: number;
  title: string;
  originalUrl: string;
  mistakeUrl: string;
  answer: string;
  hotspots: Hotspot[];
}

export type AppState = 'WELCOME' | 'TASK_1' | 'TASK_2' | 'TASK_3';
