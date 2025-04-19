import React from 'react';
import { useQuiz } from '../context/QuizContext';
import Question from './Question';
import Results from './Results';
import ProgressBar from './ProgressBar';
import { Medal, Brain, Calculator, Code, Terminal } from 'lucide-react';
import quizData from '../data/quizData';

const getSetIcon = (setId: string) => {
  switch (setId) {
    case 'logical-reasoning':
      return <Brain className="w-5 h-5" />;
    case 'aptitude-math':
      return <Calculator className="w-5 h-5" />;
    case 'basic-coding':
      return <Code className="w-5 h-5" />;
    case 'advanced-coding':
      return <Terminal className="w-5 h-5" />;
    default:
      return null;
  }
};

const QuizContainer: React.FC = () => {
  const { state, questions, selectQuestionSet } = useQuiz();
  const { currentQuestionIndex, showResults, selectedQuestionSet } = state;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 sm:p-8">
          <div className="flex items-center justify-center mb-4">
          <img 
                src="https://i.vgy.me/1pbuHY.png" 
                alt="Logo" 
                className="h-20 w-20 animate-pulse drop-shadow-[0_0_8px_#3b82f6]" 
              />
            <h1 className="text-3xl sm:text-4xl font-bold">Quiz Portal</h1>
          </div>
          <p className="text-indigo-100 text-center">Challenge yourself with our interactive quizzes!</p>
        </header>

        <div className="p-6 sm:p-8">
          {!showResults && (
            <div className="mb-8 animate-fadeIn">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Quiz Category</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {quizData.map((set) => (
                  <button
                    key={set.id}
                    onClick={() => selectQuestionSet(set.id)}
                    className={`p-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                      selectedQuestionSet === set.id
                        ? 'bg-indigo-600 text-white shadow-lg'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-800'
                    }`}
                  >
                    <div className="flex items-center justify-center mb-2">
                      {getSetIcon(set.id)}
                    </div>
                    <h3 className="font-semibold mb-2">{set.name}</h3>
                    <p className="text-sm opacity-80 line-clamp-2">{set.description}</p>
                  </button>
                ))}
              </div>
              <ProgressBar 
                current={currentQuestionIndex + 1} 
                total={questions.length} 
              />
            </div>
          )}

          <div className="mt-6 transition-all duration-300 ease-in-out">
            {!showResults ? (
              <Question 
                question={questions[currentQuestionIndex]} 
                questionIndex={currentQuestionIndex}
              />
            ) : (
              <Results />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizContainer;