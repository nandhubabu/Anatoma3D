export type ExplorationMode = 'external' | 'cut' | 'exploded';

export type CameraPreset = 'front' | 'back' | 'left' | 'right' | 'top' | 'bottom' | 'isometric';

export type CuttingAxis = 'x' | 'y' | 'z';

export interface CuttingPlaneConfig {
  active: boolean;
  axis: CuttingAxis;
  position: number; // e.g. -1.5 to 1.5
  invert: boolean;
}

export interface LayerVisibility {
  skin: boolean;
  muscular: boolean;
  skeletal: boolean;
  circulatory: boolean;
  nervous: boolean;
  organs: boolean;
}

export interface OrganSubcomponent {
  id: string;
  name: string;
  latinName?: string;
  description: string;
  function: string;
  explosionDir: [number, number, number];
  color?: string;
  internal?: boolean;
  histology?: string;
  bloodSupply?: string;
  innervation?: string;
  clinicalNote?: string;
  pinPos?: [number, number, number];
}

export interface InternalStructure {
  name: string;
  thickness: string;
  description: string;
  histology?: string;
}

export interface TerminologyItem {
  term: string;
  definition: string;
  etymology?: string;
}

export interface OrganData {
  id: number;
  slug: string;
  name: string;
  latin_name?: string;
  system_slug: string;
  description: string;
  location: string;
  primary_function: string;
  physiology: string;
  clinical_relevance: string;
  blood_supply?: string;
  innervation?: string;
  lymphatics?: string;
  weight_desc?: string;
  dimensions_desc?: string;
  cellular_makeup?: string;
  hemodynamics?: string;
  subcomponents: OrganSubcomponent[];
  internal_structures: InternalStructure[];
  terminology: TerminologyItem[];
  fun_facts: string[];
}

export interface BodySystemData {
  id: number;
  slug: string;
  name: string;
  latin_name?: string;
  icon?: string;
  short_desc: string;
  full_overview: string;
  key_functions: string[];
  main_organs: string[];
  interrelationships: { system: string; relationship: string }[];
  clinical_notes: string[];
  learning_objectives: string[];
}

export interface BoneStructureData {
  id: number;
  slug: string;
  name: string;
  latin_name?: string;
  category: string;
  region: string;
  description?: string;
  primary_function?: string;
  articulations: string[];
  landmarks: string[];
  clinical_importance?: string;
  clinical_notes?: string;
  hit_box_min?: [number, number, number];
  hit_box_max?: [number, number, number];
  color?: string;
}

export interface MuscleStructureData {
  id: number;
  slug: string;
  name: string;
  latin_name?: string;
  origin: string;
  insertion: string;
  action: string;
  innervation: string;
  blood_supply?: string;
  antagonist?: string;
  description?: string;
  layer: string;
  region: string;
  clinical_notes?: string;
}

export interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Organ' | 'Structure' | 'Body System' | 'Bone' | 'Muscle';
  url: string;
  system?: string;
}

export interface QuizQuestionData {
  id: number;
  topic_slug: string;
  question: string;
  options: string[];
  correct_index: number;
  explanation: string;
  difficulty: string;
  question_type?: string;
}

export interface FlashcardData {
  id: number;
  topic_slug: string;
  front?: string;
  back?: string;
  front_title?: string;
  front_prompt?: string;
  back_answer?: string;
  category: string;
}

export interface StudentProgressRecord {
  id: number;
  topic_slug: string;
  score: number;
  total_questions: number;
  percentage: number;
  completed_at: string;
}
