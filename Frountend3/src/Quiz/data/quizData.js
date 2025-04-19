import { QuestionSet } from '../../types/quiz';

const quizData: QuestionSet[] = [
  {
    id: 'logical-reasoning',
    name: 'Logical Reasoning',
    description: 'Test your logical thinking and problem-solving abilities',
    questions: [
      {
        id: 1,
        question: "What comes next in the series: 2, 6, 12, 20, 30, ?",
        options: ["40", "41", "42", "44"],
        correctAnswer: 2
      },
      {
        id: 2,
        question: "All roses are flowers. Some flowers fade quickly. Can we conclude: 'Some roses fade quickly'?",
        options: ["Yes, definitely", "No, can't be concluded", "Maybe", "Not enough information"],
        correctAnswer: 1
      },
      {
        id: 3,
        question: "If TABLE is coded as UDCMF, how is CHAIR coded?",
        options: ["DIBJS", "CHBJS", "DIHBR", "CHBAR"],
        correctAnswer: 0
      },
      {
        id: 4,
        question: "A is taller than B, B is taller than C, C is taller than D. Who is the shortest?",
        options: ["A", "B", "C", "D"],
        correctAnswer: 3
      },
      {
        id: 5,
        question: "Find the odd one out: 121, 144, 169, 196, 225, 242",
        options: ["121", "196", "225", "242"],
        correctAnswer: 3
      },
      {
        id: 6,
        question: "If 'MANGO' is coded as 13114515, then 'APPLE' is?",
        options: ["11616125", "11615125", "11716125", "11616225"],
        correctAnswer: 0
      }
    ]
  },
  {
    id: 'aptitude-math',
    name: 'Aptitude Math',
    description: 'Challenge your mathematical and analytical skills',
    questions: [
      {
        id: 7,
        question: "A train 120 m long passes a pole in 6 seconds. Find its speed.",
        options: ["18 m/s", "20 m/s", "22 m/s", "24 m/s"],
        correctAnswer: 1
      },
      {
        id: 8,
        question: "If the price of a pen is ₹45 after a 10% discount, what was the original price?",
        options: ["₹48", "₹49", "₹50", "₹51"],
        correctAnswer: 2
      },
      {
        id: 9,
        question: "A man can do a job in 10 days. His friend can do it in 15 days. Working together, in how many days will they finish it?",
        options: ["5 days", "6 days", "7 days", "8 days"],
        correctAnswer: 1
      },
      {
        id: 10,
        question: "Simple interest on ₹1200 at 6% per annum for 2 years?",
        options: ["₹140", "₹142", "₹144", "₹146"],
        correctAnswer: 2
      },
      {
        id: 11,
        question: "What is the LCM of 18, 24, and 30?",
        options: ["320", "340", "360", "380"],
        correctAnswer: 2
      },
      {
        id: 12,
        question: "Find the next number in the series: 3, 9, 27, 81, ?",
        options: ["223", "233", "243", "253"],
        correctAnswer: 2
      },
      {
        id: 13,
        question: "A rectangle has length 10 cm and width 4 cm. What is its diagonal length?",
        options: ["10.57 cm", "10.67 cm", "10.77 cm", "10.87 cm"],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 'basic-coding',
    name: 'Basic Coding',
    description: 'Test your programming knowledge and concepts',
    questions: [
      {
        id: 14,
        question: "What will be the output of print(2 ** 3) in Python?",
        options: ["6", "7", "8", "9"],
        correctAnswer: 2
      },
      {
        id: 15,
        question: "In C, what is the value of 5 / 2?",
        options: ["2.5", "2", "3", "2.0"],
        correctAnswer: 1
      },
      {
        id: 16,
        question: "Which of the following is a valid variable name in Python?",
        options: ["2value", "value_2", "value-2", "2_value"],
        correctAnswer: 1
      },
      {
        id: 17,
        question: "What is the time complexity of binary search?",
        options: ["O(n)", "O(n log n)", "O(log n)", "O(n²)"],
        correctAnswer: 2
      },
      {
        id: 18,
        question: "What will len('Hello\\nWorld') return in Python?",
        options: ["10", "11", "12", "9"],
        correctAnswer: 1
      },
      {
        id: 19,
        question: "Which sorting algorithm is the fastest on average for large data sets?",
        options: ["Bubble Sort", "Insertion Sort", "Quick Sort", "Selection Sort"],
        correctAnswer: 2
      },
      {
        id: 20,
        question: "What is the output of: x = [1, 2, 3]; print(x[::-1])?",
        options: ["[1, 2, 3]", "[3, 2, 1]", "[1, 3, 2]", "Error"],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 'advanced-coding',
    name: 'Advanced Coding',
    description: 'Challenge yourself with complex programming concepts',
    questions: [
      {
        id: 21,
        question: "What is the output of: console.log(typeof typeof 1)?",
        options: ["'number'", "'string'", "'undefined'", "'object'"],
        correctAnswer: 1
      },
      {
        id: 22,
        question: "In JavaScript, what does Promise.all() do if any of the promises rejects?",
        options: [
          "Continues with the successful promises",
          "Rejects immediately with the first rejection",
          "Waits for all promises to complete",
          "Returns undefined"
        ],
        correctAnswer: 1
      },
      {
        id: 23,
        question: "What is the time complexity of inserting an element at the beginning of an array?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        correctAnswer: 1
      },
      {
        id: 24,
        question: "Which of these is NOT a valid way to create a new array in JavaScript?",
        options: [
          "Array.from('hello')",
          "[...new Set([1,2,3])]",
          "Array.create([1,2,3])",
          "new Array(3).fill(0)"
        ],
        correctAnswer: 2
      },
      {
        id: 25,
        question: "What is the output of: [1,2,3].map(num => num * 2).filter(num => num > 4)?",
        options: ["[4,6]", "[6]", "[2,4,6]", "[4]"],
        correctAnswer: 1
      },
      {
        id: 26,
        question: "In React, what is the correct way to update state based on previous state?",
        options: [
          "setState(state + 1)",
          "setState(prevState => prevState + 1)",
          "setState({...state, count: count + 1})",
          "state = state + 1"
        ],
        correctAnswer: 1
      },
      {
        id: 27,
        question: "What is a closure in JavaScript?",
        options: [
          "A way to close browser windows",
          "A function that has access to variables in its outer scope",
          "A method to end a loop",
          "A way to close database connections"
        ],
        correctAnswer: 1
      },
      {
        id: 28,
        question: "What is the output of: console.log(0.1 + 0.2 === 0.3)?",
        options: ["true", "false", "undefined", "NaN"],
        correctAnswer: 1
      },
      {
        id: 29,
        question: "Which HTTP status code indicates a successful DELETE operation?",
        options: ["200 OK", "204 No Content", "202 Accepted", "201 Created"],
        correctAnswer: 1
      },
      {
        id: 30,
        question: "What is the purpose of the 'use strict' directive in JavaScript?",
        options: [
          "To enable new JavaScript features",
          "To catch common coding mistakes and prevent unsafe actions",
          "To make the code run faster",
          "To disable certain JavaScript features"
        ],
        correctAnswer: 1
      }
    ]
  }
];

export default quizData;