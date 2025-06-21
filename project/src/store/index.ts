import { create } from 'zustand';
import { User, StudentProgress } from '../types';

interface AppState {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  studentProgress: StudentProgress[];
  updateProgress: (progress: StudentProgress) => void;
}

export const useStore = create<AppState>((set) => ({
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
  studentProgress: [
    // Mock data for demonstration
    {
      userId: '1',
      topicProgress: {
        emotions: {
          completed: true,
          quizScore: 85
        },
        stress: {
          completed: true,
          quizScore: 92
        },
        bullying: {
          completed: false
        }
      },
      assessmentResults: {
        'dass-y': {
          completed: true,
          responses: [1, 0, 2, 1, 0, 1, 2, 1, 0, 1, 2, 1, 0, 1, 2, 1, 0, 1, 2, 1, 0],
          date: '2024-03-20T10:30:00Z',
          scores: {
            depression: 8,
            anxiety: 6,
            stress: 10
          }
        }
      }
    }
  ],
  updateProgress: (progress) =>
    set((state) => ({
      studentProgress: [
        ...state.studentProgress.filter((p) => p.userId !== progress.userId),
        progress,
      ],
    })),
}));