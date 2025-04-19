import React, { createContext, useContext, useState } from 'react';
import { QuizContextType, QuizQuestion, QuizState, QuestionSet } from '../types/quiz';
import quizData from '../Component/data/quizData';

const QuizContext = createContext<QuizContextType | undefined>(undefined);

const QUESTIONS_PER_QUIZ = 5;

// Fisher-Yates shuffle algorithm
const shuffleQuestions = (questions: QuizQuestion[]): QuizQuestion[] => {
  const shuffled = [...questions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, QUESTIONS_PER_QUIZ);
};

const getQuestionsForSet = (setId: string): QuizQuestion[] => {
  const set = quizData.find(s => s.id === setId);
  return set ? set.questions : [];
};

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<QuizState>({
    currentQuestionIndex: 0,
    answers: Array(QUESTIONS_PER_QUIZ).fill(-1),
    showResults: false,
    shuffledQuestions: shuffleQuestions(quizData[0].questions),
    selectedQuestionSet: quizData[0].id,
    questionsPerQuiz: QUESTIONS_PER_QUIZ
  });

  const handleAnswerClick = (optionIndex: number) => {
    const updatedAnswers = [...state.answers];
    updatedAnswers[state.currentQuestionIndex] = optionIndex;

    setState({ ...state, answers: updatedAnswers });

    setTimeout(() => {
      if (state.currentQuestionIndex < state.questionsPerQuiz - 1) {
        setState({
          ...state,
          answers: updatedAnswers,
          currentQuestionIndex: state.currentQuestionIndex + 1,
        });
      } else {
        setState({
          ...state,
          answers: updatedAnswers,
          showResults: true,
        });
      }
    }, 750);
  };

  const selectQuestionSet = (setId: string) => {
    const questions = getQuestionsForSet(setId);
    setState({
      currentQuestionIndex: 0,
      answers: Array(QUESTIONS_PER_QUIZ).fill(-1),
      showResults: false,
      shuffledQuestions: shuffleQuestions(questions),
      selectedQuestionSet: setId,
      questionsPerQuiz: QUESTIONS_PER_QUIZ
    });
  };

  const resetQuiz = () => {
    const questions = getQuestionsForSet(state.selectedQuestionSet);
    setState({
      currentQuestionIndex: 0,
      answers: Array(QUESTIONS_PER_QUIZ).fill(-1),
      showResults: false,
      shuffledQuestions: shuffleQuestions(questions),
      selectedQuestionSet: state.selectedQuestionSet,
      questionsPerQuiz: QUESTIONS_PER_QUIZ
    });
  };

  return (
    <QuizContext.Provider
      value={{
        state,
        questions: state.shuffledQuestions,
        handleAnswerClick,
        resetQuiz,
        selectQuestionSet
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = (): QuizContextType => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};