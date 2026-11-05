import { FlashcardData } from "../types/anatomy";

export const FLASHCARDS_DATA: FlashcardData[] = [
  {
    "topic_slug": "heart",
    "front_title": "Cardiac Valve Mechanism",
    "front_prompt": "What triggers the opening and closing of cardiac valves during the cardiac cycle?",
    "back_answer": "Passive pressure gradients! When upstream chamber pressure exceeds downstream pressure, valve leaflets are pushed open. When downstream arterial or ventricular pressure exceeds upstream, leaflets meet and seal tightly.",
    "category": "Physiology",
    "id": 1
  },
  {
    "topic_slug": "heart",
    "front_title": "Systemic vs Pulmonary Circulation",
    "front_prompt": "Compare the pressures and functions of the systemic vs pulmonary circuits.",
    "back_answer": "Systemic: High pressure (120/80 mmHg), driven by thick left ventricle, supplies oxygenated blood to all peripheral tissues. Pulmonary: Low pressure (25/10 mmHg), driven by crescent right ventricle, delivers blood to alveolar capillaries for gas exchange.",
    "category": "Anatomy",
    "id": 2
  },
  {
    "topic_slug": "brain",
    "front_title": "Primary Motor vs Somatosensory Cortex",
    "front_prompt": "Where are the primary motor and somatosensory cortices located relative to the central sulcus?",
    "back_answer": "Primary Motor Cortex (Brodmann area 4) is in the PRECENTRAL gyrus of the FRONTAL lobe. Primary Somatosensory Cortex (Brodmann areas 3, 1, 2) is in the POSTCENTRAL gyrus of the PARIETAL lobe.",
    "category": "Neuroanatomy",
    "id": 3
  },
  {
    "topic_slug": "skeletal",
    "front_title": "Axial vs Appendicular Skeleton",
    "front_prompt": "How is the human skeleton divided, and how many bones are in each division?",
    "back_answer": "Axial Skeleton: 80 bones along central longitudinal axis (Skull, Vertebral Column, Ribs, Sternum). Appendicular Skeleton: 126 bones of upper and lower limbs plus pectoral and pelvic girdles.",
    "category": "Skeletal Anatomy",
    "id": 4
  },
  {
    "topic_slug": "muscular",
    "front_title": "Sliding Filament Theory",
    "front_prompt": "Explain what occurs at the sarcomere level during muscle contraction.",
    "back_answer": "Calcium binds Troponin C, shifting Tropomyosin off Actin binding sites. Myosin heads hydrolyze ATP, bind Actin forming cross-bridges, execute a power stroke pulling thin filaments toward the M-line, and shorten the sarcomere.",
    "category": "Cellular Physiology",
    "id": 5
  }
];
