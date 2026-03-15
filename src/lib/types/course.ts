export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface QuizResult {
  questionId: string;
  selectedAnswer: number;
  isCorrect: boolean;
}

export interface QuizSubmission {
  courseId: string;
  answers: Record<string, number>;
}

export interface QuizScore {
  courseId: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  results: QuizResult[];
  attemptsToday: number;
}

export interface CourseMedia {
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  alt?: string;
  caption?: string;
  position: 'header' | 'inline';
  sectionId?: string;
}

export interface CourseWithExtras {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  order_index: number;
  duration_minutes: number;
  quiz?: QuizQuestion[];
  media?: CourseMedia[];
  created_at: string;
}

export const QUIZ_PASSING_THRESHOLD = 70;
export const MAX_DAILY_ATTEMPTS = 3;
