import React from 'react';
import { useQuiz } from '../context/QuizContext';
import { Award, RotateCcw, CheckCircle, XCircle } from 'lucide-react';
import quizData from '../data/quizData';

const Results: React.FC = () => {
  const { state, questions, resetQuiz } = useQuiz();
  const { answers, selectedQuestionSet } = state;

  const currentSet = quizData.find(set => set.id === selectedQuestionSet);
  
  const correctAnswers = answers.reduce((count, answer, index) => {
    return answer === questions[index].correctAnswer ? count + 1 : count;
  }, 0);

  const percentage = Math.round((correctAnswers / questions.length) * 100);

  let feedback = "";
  let feedbackColor = "";
  let feedbackGradient = "";

  if (percentage >= 80) {
    feedback = "Outstanding! You've mastered this topic!";
    feedbackColor = "text-green-600";
    feedbackGradient = "from-green-500 to-emerald-500";
  } else if (percentage >= 60) {
    feedback = "Great job! You're making good progress!";
    feedbackColor = "text-blue-600";
    feedbackGradient = "from-blue-500 to-indigo-500";
  } else if (percentage >= 40) {
    feedback = "Good effort! Keep practicing to improve.";
    feedbackColor = "text-yellow-600";
    feedbackGradient = "from-yellow-500 to-orange-500";
  } else {
    feedback = "Keep learning! Every attempt makes you stronger.";
    feedbackColor = "text-red-600";
    feedbackGradient = "from-red-500 to-pink-500";
  }

  return (
    <div className="animate-fadeIn">
      <div className="text-center mb-8">
        <div className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-r ${feedbackGradient} p-1 mb-6`}>
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
            <Award className={`w-12 h-12 ${feedbackColor}`} />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-3">Quiz Results</h2>
        <p className={`text-xl font-semibold ${feedbackColor} mb-4`}>{feedback}</p>
        <div className="inline-block bg-gray-50 rounded-xl p-4 mb-6">
          <div className="text-4xl font-bold">
            <span className={feedbackColor}>{correctAnswers}</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-700">{questions.length}</span>
          </div>
          <div className="text-xl text-gray-500 mt-1">{percentage}% Score</div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          {currentSet?.name} Quiz Summary
        </h3>
        <div className="space-y-4">
          {questions.map((question, index) => {
            const userAnswerIndex = answers[index];
            const isCorrect = userAnswerIndex === question.correctAnswer;

            return (
              <div 
                key={index} 
                className={`p-4 rounded-xl ${
                  isCorrect ? 'bg-green-50' : 'bg-red-50'
                }`}
              >
                <div className="flex items-start">
                  {isCorrect ? (
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-500 mt-1 mr-3 flex-shrink-0" />
                  )}
                  <div>
                    <p className="font-medium text-gray-800 mb-2">
                      {question.question}
                    </p>
                    <p className={`text-sm ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                      Your answer: {question.options[userAnswerIndex]}
                    </p>
                    {!isCorrect && (
                      <p className="text-sm text-green-600 mt-1">
                        Correct answer: {question.options[question.correctAnswer]}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="text-center">
        <button 
          onClick={resetQuiz}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Try Again
        </button>
      </div>
    </div>
  );
};

export default Results;