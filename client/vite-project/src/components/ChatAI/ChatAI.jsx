import React, { useState } from 'react';

const ChatAI = () => {
  // Array of questions and answers
  const questions = [
    {
      question: 'What is the capital of France?',
      answer: 'The capital of France is Paris.',
    },
    {
      question: 'What is 2 + 2?',
      answer: '2 + 2 is 4.',
    },
    {
      question: 'What is the largest planet in our solar system?',
      answer: 'The largest planet is Jupiter.',
    },
  ];

  // State to keep track of the current question index
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState(
    Array(questions.length).fill('')
  );

  // Handle textarea input
  const handleInputChange = (e) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = e.target.value;
    setUserAnswers(newAnswers);
  };

  // Handler for the "Next" button
  const handleNext = () => {
    setCurrentQuestion((prev) => (prev + 1) % questions.length);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 text-center w-96 h-2/3 flex flex-col">
        <h1 className="text-black text-2xl mb-8">Answer The Following</h1>
        <h2 className="text-xl font-semibold mb-4 text-black">
          {questions[currentQuestion].question}
        </h2>

        <textarea
          id="message"
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-700 bg-white rounded-lg border border-gray-300 focus:ring-blue-400 focus:border-blue-400 placeholder-gray-500 mt-6"
          placeholder="Answer Here"
        ></textarea>

        <div className="flex flex-col h-full justify-end">
          <button
            onClick={handleNext}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-7"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatAI;
