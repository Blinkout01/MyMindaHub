export interface Topic {
  id: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
}

export interface Quiz {
  id: string;
  topicId: string;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface Assessment {
  id: string;
  title: string;
  questions: AssessmentQuestion[];
}

export interface AssessmentQuestion {
  id: string;
  text: string;
  options: string[];
}

export interface User {
  id: string;
  name: string;
  email?: string;
  role: 'student' | 'counselor';
  class: string;
  gender?: string;
}

export interface StudentProgress {
  userId: string;
  topicProgress: {
    [topicId: string]: {
      completed: boolean;
      quizScore?: number;
    };
  };
  assessmentResults: {
    [assessmentId: string]: {
      completed: boolean;
      responses: number[];
      date: string;
      scores?: {
        depression: number;
        anxiety: number;
        stress: number;
      };
    };
  };
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
}