import {
  BodySystemData,
  OrganData,
  BoneStructureData,
  MuscleStructureData,
  QuizQuestionData,
  FlashcardData,
  SearchResultItem,
  StudentProgressRecord
} from '../types/anatomy';
import { SYSTEMS_DATA } from '../data/systemsData';
import { ORGANS_DATA } from '../data/organsData';
import { SKELETON_DATA } from '../data/skeletonData';
import { MUSCLES_DATA } from '../data/musclesData';
import { QUIZZES_DATA } from '../data/quizzesData';
import { FLASHCARDS_DATA } from '../data/flashcardsData';

const PROGRESS_STORAGE_KEY = 'anatomy_student_progress';

function getStoredProgress(): StudentProgressRecord[] {
  try {
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveStoredProgress(records: StudentProgressRecord[]) {
  try {
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(records));
  } catch (e) {
    console.warn('Failed to save progress to localStorage:', e);
  }
}

export const anatomyApi = {
  async getSystems(): Promise<BodySystemData[]> {
    return Promise.resolve(SYSTEMS_DATA);
  },

  async getSystem(slug: string): Promise<BodySystemData | null> {
    const system = SYSTEMS_DATA.find((s) => s.slug === slug) || null;
    return Promise.resolve(system);
  },

  async getOrgans(system?: string): Promise<OrganData[]> {
    if (!system) {
      return Promise.resolve(ORGANS_DATA);
    }
    const filtered = ORGANS_DATA.filter((o) => o.system_slug === system);
    return Promise.resolve(filtered);
  },

  async getOrgan(slug: string): Promise<OrganData | null> {
    const organ = ORGANS_DATA.find((o) => o.slug === slug) || null;
    return Promise.resolve(organ);
  },

  async getSkeleton(region?: string): Promise<BoneStructureData[]> {
    if (!region || region === 'all') {
      return Promise.resolve(SKELETON_DATA);
    }
    const filtered = SKELETON_DATA.filter((b) => b.region.toLowerCase() === region.toLowerCase());
    return Promise.resolve(filtered);
  },

  async getBone(slug: string): Promise<BoneStructureData | null> {
    const bone = SKELETON_DATA.find((b) => b.slug === slug) || null;
    return Promise.resolve(bone);
  },

  async getMuscles(layer?: string, region?: string): Promise<MuscleStructureData[]> {
    let result = MUSCLES_DATA;
    if (layer && layer !== 'all') {
      result = result.filter((m) => m.layer.toLowerCase() === layer.toLowerCase());
    }
    if (region && region !== 'all') {
      result = result.filter((m) => m.region.toLowerCase() === region.toLowerCase());
    }
    return Promise.resolve(result);
  },

  async getMuscle(slug: string): Promise<MuscleStructureData | null> {
    const muscle = MUSCLES_DATA.find((m) => m.slug === slug) || null;
    return Promise.resolve(muscle);
  },

  async search(query: string): Promise<SearchResultItem[]> {
    if (!query || query.trim().length === 0) return Promise.resolve([]);
    const q = query.toLowerCase().trim();
    const results: SearchResultItem[] = [];

    // 1. Search Organs
    for (const o of ORGANS_DATA) {
      const nameMatch = o.name.toLowerCase().includes(q);
      const latinMatch = o.latin_name?.toLowerCase().includes(q);
      const descMatch = o.description.toLowerCase().includes(q);

      if (nameMatch || latinMatch || descMatch) {
        results.push({
          id: `organ_${o.slug}`,
          title: o.name,
          subtitle: `${o.latin_name || ''} • ${o.system_slug.charAt(0).toUpperCase() + o.system_slug.slice(1)} System`,
          category: 'Organ',
          url: `/organs/${o.slug}`,
          system: o.system_slug
        });
      }

      // Also search subcomponents within organs
      for (const sub of o.subcomponents || []) {
        const subNameMatch = sub.name.toLowerCase().includes(q);
        const subDescMatch = sub.description.toLowerCase().includes(q);
        if (subNameMatch || subDescMatch) {
          results.push({
            id: `sub_${sub.id}`,
            title: `${sub.name} (${o.name})`,
            subtitle: `Anatomical structure of the ${o.name}`,
            category: 'Structure',
            url: `/organs/${o.slug}?highlight=${sub.id}`,
            system: o.system_slug
          });
        }
      }
    }

    // 2. Search Body Systems
    for (const s of SYSTEMS_DATA) {
      if (s.name.toLowerCase().includes(q) || s.short_desc.toLowerCase().includes(q)) {
        results.push({
          id: `sys_${s.slug}`,
          title: s.name,
          subtitle: s.latin_name || 'Body System',
          category: 'Body System',
          url: `/systems/${s.slug}`,
          system: s.slug
        });
      }
    }

    // 3. Search Bones
    for (const b of SKELETON_DATA) {
      const nameMatch = b.name.toLowerCase().includes(q) || b.latin_name?.toLowerCase().includes(q);
      const landmarkMatch = b.landmarks?.some((lm) => lm.toLowerCase().includes(q));
      if (nameMatch || landmarkMatch) {
        results.push({
          id: `bone_${b.slug}`,
          title: b.name,
          subtitle: `${b.region.charAt(0).toUpperCase() + b.region.slice(1)} Skeleton • ${b.category.charAt(0).toUpperCase() + b.category.slice(1)} Bone`,
          category: 'Bone',
          url: `/skeleton?bone=${b.slug}`,
          system: 'skeletal'
        });
      }
    }

    // 4. Search Muscles
    for (const m of MUSCLES_DATA) {
      if (m.name.toLowerCase().includes(q) || m.action.toLowerCase().includes(q)) {
        results.push({
          id: `muscle_${m.slug}`,
          title: m.name,
          subtitle: `${m.region.charAt(0).toUpperCase() + m.region.slice(1)} • ${m.layer.charAt(0).toUpperCase() + m.layer.slice(1)} layer`,
          category: 'Muscle',
          url: `/muscles?muscle=${m.slug}`,
          system: 'muscular'
        });
      }
    }

    return Promise.resolve(results.slice(0, 20));
  },

  async getQuizzes(topicSlug: string = 'all'): Promise<QuizQuestionData[]> {
    if (topicSlug === 'all') {
      return Promise.resolve(QUIZZES_DATA);
    }
    const filtered = QUIZZES_DATA.filter((q) => q.topic_slug === topicSlug);
    return Promise.resolve(filtered);
  },

  async submitQuiz(
    topic_slug: string,
    score: number,
    total_questions: number,
    _user_id = 'student_default'
  ): Promise<StudentProgressRecord | null> {
    const percentage = Math.round((score / Math.max(total_questions, 1)) * 100);
    const newRecord: StudentProgressRecord = {
      id: Date.now(),
      topic_slug,
      score,
      total_questions,
      percentage,
      completed_at: new Date().toISOString()
    };

    const existing = getStoredProgress();
    const updated = [newRecord, ...existing];
    saveStoredProgress(updated);

    return Promise.resolve(newRecord);
  },

  async getFlashcards(topicSlug: string = 'all'): Promise<FlashcardData[]> {
    if (topicSlug === 'all') {
      return Promise.resolve(FLASHCARDS_DATA);
    }
    const filtered = FLASHCARDS_DATA.filter((f) => f.topic_slug === topicSlug);
    return Promise.resolve(filtered);
  },

  async getProgress(): Promise<StudentProgressRecord[]> {
    return Promise.resolve(getStoredProgress());
  },

  async resetProgress(): Promise<{ message: string }> {
    saveStoredProgress([]);
    return Promise.resolve({ message: 'Progress reset successfully' });
  }
};
