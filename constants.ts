
import { Riddle, FunnySpinQuestion, PictureChallengeItem } from './types';

export const TASK_1_RIDDLES: Riddle[] = [
  {
    id: 1,
    teluguQ: "తోకలేని పిట్ట తొంబై ఆమడలు ఎగురుతుంది.",
    englishQ: "A bird with no tail that flies for 90 miles.",
    teluguA: "ఉత్తరం (జాబు)",
    englishA: "A Letter / Postcard",
    imageUrl: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    teluguQ: "కాళ్ళు లేవు కానీ నడుస్తుంది, కళ్ళు లేవు కానీ ఏడుస్తుంది.",
    englishQ: "It has no legs but walks; it has no eyes but cries.",
    teluguA: "మేఘం",
    englishA: "A Cloud",
    imageUrl: "https://images.unsplash.com/photo-1534088568595-a066f77c3ed2?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    teluguQ: "అడవిలో పుట్టింది, అడవిలో పెరిగింది, వంటి నిండా గాట్లు, నోరంతా పాటలు.",
    englishQ: "Born in the forest, grew in the forest, has marks all over its body, and mouth full of songs.",
    teluguA: "పిల్లనగ్రోవి",
    englishA: "A Flute",
    imageUrl: "https://images.unsplash.com/photo-1582213708533-31f089856976?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    teluguQ: "ఇద్దరు అన్నదమ్ములు, ఒకే రంగు, ఒకే రూపం, కానీ ఒకరినొకరు చూసుకోలేరు.",
    englishQ: "Two brothers, same color, same shape, but they can't see each other.",
    teluguA: "కళ్ళు",
    englishA: "Eyes",
    imageUrl: "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 5,
    teluguQ: "నడుస్తుంది కానీ కాళ్ళు లేవు, చెబుతుంది కానీ నోరు లేదు.",
    englishQ: "It walks but has no legs, it tells time but has no mouth.",
    teluguA: "గడియారం",
    englishA: "A Clock",
    imageUrl: "https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 6,
    teluguQ: "ముక్కు మీద ఉంటాను, చెవులు పట్టుకుంటాను. నేనెవరిని?",
    englishQ: "I sit on your nose, but I hold onto your ears. Who am I?",
    teluguA: "కళ్ళద్దాలు",
    englishA: "Spectacles / Glasses",
    imageUrl: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=800"
  }
];

export const TASK_2_QUESTIONS: FunnySpinQuestion[] = [
  { id: 1, question: "Evadu kodithe dhimma thirigi mind block avuthundo...", answer: "Pokiri", officePOV: "That one colleague who accidentally hits 'Reply All' on a sensitive email thread." },
  { id: 2, question: "Nenu okkasari commit aithe naa maata nene vinanu.", answer: "Pokiri", officePOV: "Leaving exactly at 5:00 PM regardless of how many 'urgent' emails are coming in." },
  { id: 3, question: "Don't trouble the trouble, if you trouble the trouble...", answer: "Srimanthudu", officePOV: "Trying to open a massive Excel file on a 4GB RAM laptop on a Monday morning." },
  { id: 4, question: "Amma thodu... addamga narikestha!", answer: "Aadi", officePOV: "Internal reaction when someone adds a meeting at 4:55 PM on a Friday." },
  { id: 5, question: "Okkasari chepthe vandasarlu cheppinattu.", answer: "Baasha", officePOV: "Explaining the same project requirements to the same client for the 100th time." },
  { id: 6, question: "Naku konchem thikka undi, kani daniko lekkundi.", answer: "Gabbar Singh", officePOV: "The project manager's logic for scheduling a 1 PM meeting during lunch hour." },
  { id: 7, question: "Sivaji! Gundu kottestha!", answer: "Sivaji", officePOV: "The state of your sanity after spending 8 hours debugging a missing semicolon." }
];

export const TASK_3_PICTURES: PictureChallengeItem[] = [
  {
    id: 1,
    title: "The Ultimate Performance Review",
    originalUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=1200",
    mistakeUrl: "",
    answer: "A judgmental office cat. He's tracking your mouse movement for KPIs.",
    hotspots: []
  },
  {
    id: 2,
    title: "IT Support Diagnostic Tool",
    originalUrl: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=1200",
    mistakeUrl: "",
    answer: "A computer keyboard that's definitely seen better days. Have you tried turning it off?",
    hotspots: []
  },
  {
    id: 3,
    title: "Liquid Motivation Depletion",
    originalUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1200",
    mistakeUrl: "",
    answer: "The shared coffee machine. The only reason anyone actually shows up at 9:00 AM.",
    hotspots: []
  },
  {
    id: 4,
    title: "The 'Infinite' To-Do List",
    originalUrl: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=1200",
    mistakeUrl: "",
    answer: "A mountain of sticky notes. Also known as a 'modern organizational system'.",
    hotspots: []
  },
  {
    id: 5,
    title: "The Heart of the System",
    originalUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=1200",
    mistakeUrl: "",
    answer: "Blue ethernet cables. This is the spaghetti that runs our lives.",
    hotspots: []
  },
  {
    id: 6,
    title: "The Paper Trail",
    originalUrl: "https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?auto=format&fit=crop&q=80&w=1200",
    mistakeUrl: "",
    answer: "Stacks of paper from the 'Paperless Office' era.",
    hotspots: []
  },
  {
    id: 7,
    title: "Hardware Upgrade Pending",
    originalUrl: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80&w=1200",
    mistakeUrl: "",
    answer: "The office printer. It smells your fear and runs out of toner when you're late.",
    hotspots: []
  },
  {
    id: 8,
    title: "Collaborative Synergy Space",
    originalUrl: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&q=80&w=1200",
    mistakeUrl: "",
    answer: "An empty meeting room. Legend says a project was once finished here.",
    hotspots: []
  },
  {
    id: 9,
    title: "The Legacy Workstation",
    originalUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
    mistakeUrl: "",
    answer: "A retro computer. Still faster than the laptop IT gave you.",
    hotspots: []
  },
  {
    id: 10,
    title: "The Corporate Benefit Package",
    originalUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=1200",
    mistakeUrl: "",
    answer: "A glazed donut. The only reason to attend the 8 AM standup.",
    hotspots: []
  },
  {
    id: 11,
    title: "Digital Fatigue Indicator",
    originalUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1200",
    mistakeUrl: "",
    answer: "A laptop with too many tabs. This is what 'Multitasking' feels like.",
    hotspots: []
  },
  {
    id: 12,
    title: "The Escape Hatch",
    originalUrl: "https://images.unsplash.com/photo-1530103043960-ef38714abb15?auto=format&fit=crop&q=80&w=1200",
    mistakeUrl: "",
    answer: "The elevator at 5:01 PM. The most productive place in the building.",
    hotspots: []
  }
];
