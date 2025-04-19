import React from 'react';
import { QuizQuestion } from '../types/quiz';
import { useQuiz } from '../context/QuizContext';
import { Check, X, ChevronRight } from 'lucide-react';

interface QuestionProps {
  question: QuizQuestion;
  questionIndex: number;
}

const Question: React.FC<QuestionProps> = ({ question, questionIndex }) => {
  const { handleAnswerClick, state } = useQuiz();
  const { answers } = state;
  const selectedAnswer = answers[questionIndex];

  const isAnswered = selectedAnswer !== -1;
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="animate-slideIn">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Question {questionIndex + 1}
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">{question.question}</p>
      </div>

      <div className="space-y-4">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const optionIsCorrect = index === question.correctAnswer;
          
          let optionClass = "p-4 border-2 rounded-xl transition-all duration-300 flex items-center justify-between ";
          
          if (!isAnswered) {
            optionClass += "hover:bg-indigo-50 hover:border-indigo-300 cursor-pointer border-gray-200 transform hover:scale-102";
          } else if (isSelected) {
            optionClass += optionIsCorrect 
              ? "bg-green-50 border-green-500 shadow-green-100" 
              : "bg-red-50 border-red-500 shadow-red-100";
          } else if (optionIsCorrect && isAnswered) {
            optionClass += "bg-green-50 border-green-500 shadow-green-100";
          } else {
            optionClass += "border-gray-200 opacity-70";
          }

          return (
            <div
              key={index}
              className={optionClass}
              onClick={() => !isAnswered && handleAnswerClick(index)}
            >
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                  !isAnswered ? 'bg-gray-100' : 
                  (isSelected && optionIsCorrect) ? 'bg-green-100' :
                  (isSelected && !optionIsCorrect) ? 'bg-red-100' :
                  (!isSelected && optionIsCorrect && isAnswered) ? 'bg-green-100' :
                  'bg-gray-100'
                }`}>
                  {!isAnswered ? (
                    <span className="text-gray-600">{String.fromCharCode(65 + index)}</span>
                  ) : (
                    isSelected ? (
                      optionIsCorrect ? (
                        <Check className="w-5 h-5 text-green-600" />
                      ) : (
                        <X className="w-5 h-5 text-red-600" />
                      )
                    ) : (
                      optionIsCorrect && <Check className="w-5 h-5 text-green-600" />
                    )
                  )}
                </div>
                <span className="text-lg">{option}</span>
              </div>
              {!isAnswered && (
                <ChevronRight className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Question;