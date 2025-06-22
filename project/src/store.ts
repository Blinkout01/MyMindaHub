import create from 'zustand';
import { supabase } from './lib/supabaseClient';

export const useStore = create((set, get) => ({
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),

  studentProgress: [],
  setStudentProgress: (progress) => set({ studentProgress: progress }),

  fetchStudentProgress: async (userId) => {
    const { data, error } = await supabase
      .from('student_progress')
      .select('*')
      .eq('student_id', userId)
      .single();
    if (!error && data) {
      set({ studentProgress: [data] });
    }
  },

  updateStudentProgress: async (userId, topicProgress, assessmentResults) => {
    const { data, error } = await supabase
      .from('student_progress')
      .upsert([
        {
          student_id: userId,
          topic_progress: topicProgress,
          assessment_results: assessmentResults,
          updated_at: new Date().toISOString()
        }
      ], { onConflict: ['student_id'] })
      .select()
      .single();
    if (!error && data) {
      set({ studentProgress: [data] });
    }
  },
}));