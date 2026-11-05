import { QuizQuestionData } from "../types/anatomy";

export const QUIZZES_DATA: QuizQuestionData[] = [
  {
    "topic_slug": "heart",
    "question_type": "multiple_choice",
    "difficulty": "beginner",
    "question": "Which chamber of the heart has the thickest muscular wall and generates the highest pressure?",
    "options": [
      "Right Atrium",
      "Right Ventricle",
      "Left Atrium",
      "Left Ventricle"
    ],
    "correct_index": 3,
    "explanation": "The left ventricle possesses a myocardium 3 times thicker than the right ventricle (12-15 mm vs 3-5 mm) to overcome high systemic vascular resistance and pump blood into the aorta.",
    "id": 1
  },
  {
    "topic_slug": "heart",
    "question_type": "multiple_choice",
    "difficulty": "intermediate",
    "question": "Which heart valve prevents backflow of blood from the pulmonary trunk into the right ventricle during diastole?",
    "options": [
      "Tricuspid Valve",
      "Mitral Valve",
      "Pulmonary Semilunar Valve",
      "Aortic Semilunar Valve"
    ],
    "correct_index": 2,
    "explanation": "The pulmonary semilunar valve closes at the onset of ventricular diastole when pressure in the pulmonary trunk exceeds that in the relaxing right ventricle.",
    "id": 2
  },
  {
    "topic_slug": "heart",
    "question_type": "multiple_choice",
    "difficulty": "advanced",
    "question": "What is the primary function of the chordae tendineae and papillary muscles?",
    "options": [
      "Actively pull open the atrioventricular valves during ventricular diastole",
      "Tense to prevent prolapse and eversion of AV valve cusps into the atria during systole",
      "Direct electrical conduction impulses from the AV node to Purkinje fibers",
      "Produce the second heart sound ('dub') during semilunar valve closure"
    ],
    "correct_index": 1,
    "explanation": "Papillary muscles contract prior to ventricular systole, pulling on the fibrous chordae tendineae to anchor the tricuspid and mitral valve leaflets against high intraventricular pressure.",
    "id": 3
  },
  {
    "topic_slug": "brain",
    "question_type": "multiple_choice",
    "difficulty": "beginner",
    "question": "Which cerebral lobe is primarily responsible for executive decision-making, voluntary motor commands, and personality?",
    "options": [
      "Frontal Lobe",
      "Parietal Lobe",
      "Occipital Lobe",
      "Temporal Lobe"
    ],
    "correct_index": 0,
    "explanation": "The frontal lobe houses the prefrontal cortex for executive functioning and planning, as well as the precentral gyrus (primary motor cortex).",
    "id": 4
  },
  {
    "topic_slug": "brain",
    "question_type": "multiple_choice",
    "difficulty": "intermediate",
    "question": "What massive white matter commissure connects the left and right cerebral hemispheres?",
    "options": [
      "Internal Capsule",
      "Corpus Callosum",
      "Fornix",
      "Corona Radiata"
    ],
    "correct_index": 1,
    "explanation": "The corpus callosum contains over 200 million myelinated axons transferring information between homologous areas of the bilateral cerebral hemispheres.",
    "id": 5
  },
  {
    "topic_slug": "skeletal",
    "question_type": "multiple_choice",
    "difficulty": "beginner",
    "question": "How many total bones are present in the typical adult human skeleton?",
    "options": [
      "186",
      "206",
      "248",
      "312"
    ],
    "correct_index": 1,
    "explanation": "The adult human skeleton consists of 206 bones (80 axial and 126 appendicular), having fused from approximately 270 bones present at birth.",
    "id": 6
  },
  {
    "topic_slug": "skeletal",
    "question_type": "multiple_choice",
    "difficulty": "intermediate",
    "question": "Which bone is the longest and strongest in the human skeleton?",
    "options": [
      "Tibia",
      "Humerus",
      "Femur",
      "Fibula"
    ],
    "correct_index": 2,
    "explanation": "The femur (thigh bone) is the longest, heaviest, and strongest bone, capable of supporting up to 30 times an adult's body weight during dynamic impacts.",
    "id": 7
  },
  {
    "topic_slug": "muscular",
    "question_type": "multiple_choice",
    "difficulty": "beginner",
    "question": "What muscle acts as the primary antagonist to the Biceps Brachii during elbow flexion and extension?",
    "options": [
      "Brachialis",
      "Triceps Brachii",
      "Deltoid",
      "Coracobrachialis"
    ],
    "correct_index": 1,
    "explanation": "The triceps brachii is the primary extensor of the elbow and functions as the direct physiological antagonist to the elbow-flexing biceps brachii.",
    "id": 8
  },
  {
    "topic_slug": "muscular",
    "question_type": "multiple_choice",
    "difficulty": "intermediate",
    "question": "Which nerve innervates the Deltoid muscle?",
    "options": [
      "Radial Nerve",
      "Musculocutaneous Nerve",
      "Axillary Nerve",
      "Median Nerve"
    ],
    "correct_index": 2,
    "explanation": "The axillary nerve (arising from posterior cord of brachial plexus, C5-C6) winds around the surgical neck of the humerus to innervate the deltoid and teres minor.",
    "id": 9
  },
  {
    "topic_slug": "respiratory",
    "question_type": "multiple_choice",
    "difficulty": "intermediate",
    "question": "What substance produced by Type II alveolar pneumocytes prevents alveolar collapse by lowering surface tension?",
    "options": [
      "Mucin",
      "Pulmonary Surfactant",
      "Carbonic Anhydrase",
      "Histamine"
    ],
    "correct_index": 1,
    "explanation": "Pulmonary surfactant (dipalmitoylphosphatidylcholine) disrupts hydrogen bonding between water molecules lining the alveoli, preventing atelectasis at end-expiration.",
    "id": 10
  }
];
