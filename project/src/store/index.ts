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
  studentProgress: [],
  updateProgress: (progress) =>
    set((state) => ({
      studentProgress: [
        ...state.studentProgress.filter((p) => p.userId !== progress.userId),
        progress,
      ],
    })),
}));