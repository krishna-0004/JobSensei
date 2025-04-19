export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  tags?: string[];
}

export interface QuestionSet {
  id: string;
  name: string;
  description: string;
  questions: QuizQuestion[];
}

export interface QuizState {
  currentQuestionIndex: number;
  answers: { questionId: number; selectedOption: number }[];
  showResults: boolean;
  shuffledQuestions: QuizQuestion[];
  selectedQuestionSet: string;
  questionsPerQuiz: number;
  score?: number;
}

export interface QuizContextType {
  state: QuizState;
  questions: QuizQuestion[];
  handleAnswerClick: (optionIndex: number) => void;
  resetQuiz: () => void;
  selectQuestionSet: (setId: string) => void;
}
