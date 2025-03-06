import React, { useState } from 'react';
import { useQuestions } from '../../contexts/Questioncontext';
import { useCourse } from '../../contexts/courseContext';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { InfinitySpin } from 'react-loader-spinner';

const ChatAI = () => {
  const [loading, setLoading] = useState(false);
  const { questions: qsn, topic } = useQuestions();
  const { setCourse } = useCourse();
  console.log(qsn);
  const navigate = useNavigate();

  // State to keep track of the current question index
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(qsn.length).fill(''));
  const [progress, setProgress] = useState(((currentQuestion + 1) / qsn.length) * 100);

  // Update progress when current question changes
  React.useEffect(() => {
    setProgress(((currentQuestion + 1) / qsn.length) * 100);
  }, [currentQuestion, qsn.length]);

  // Handle textarea input
  const handleInputChange = (e) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = e.target.value;
    setUserAnswers(newAnswers);
  };

  // Handler for the "Next" button
  const handleNext = () => {
    if (currentQuestion < qsn.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  // Handler for the "Previous" button
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  // Handler for the "Submit" button
  const handleSubmit = async () => {
    console.log('User Answers:', userAnswers);

    setLoading(true);

    try {
      const response = await axios.post(
        'http://127.0.0.1:3000/api/user/generate-module',
        { questions: qsn, answers: userAnswers, topic }
      );

      console.log('generated course', response.data.course);
      setCourse(response.data.course);

      navigate('/course');
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-transparent">
      {loading ? (
        <div className="text-center">
          <InfinitySpin visible={true} width="200" color="#ffffff" />
          <p className="text-white mt-4 text-xl">Crafting your personalized learning journey...</p>
        </div>
      ) : (
        <div className="w-full max-w-6xl px-4 mt-12">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-white text-4xl font-bold mb-3">Customize Your Learning Path</h1>
            <p className="text-purple-200 text-lg">
              Help us understand your needs for <span className="font-bold">{topic || "your course"}</span>
            </p>
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-purple-900 rounded-full h-3 mb-6">
            <div 
              className="bg-purple-300 h-3 rounded-full transition-all duration-500 ease-in-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div className="text-white text-base mb-2 text-right">
            Question {currentQuestion + 1} of {qsn.length}
          </div>

          {/* Question card */}
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-10 w-full border border-purple-300 border-opacity-20 shadow-xl">
            <h2 className="text-2xl font-semibold mb-6 text-white">
              {qsn[currentQuestion]}
            </h2>

            <textarea
              id="message"
              rows="6"
              value={userAnswers[currentQuestion]}
              onChange={handleInputChange}
              className="block p-5 w-full text-lg text-white bg-purple-900 bg-opacity-30 rounded-xl border border-purple-400 border-opacity-30 focus:ring-purple-500 focus:border-purple-500 placeholder-purple-300"
              placeholder="Share your thoughts here..."
            ></textarea>

            {/* Navigation buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 text-lg ${
                  currentQuestion === 0
                    ? 'bg-purple-800 text-purple-300 opacity-50 cursor-not-allowed'
                    : 'bg-purple-700 text-white hover:bg-purple-600'
                }`}
              >
                Previous
              </button>

              {currentQuestion < qsn.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-500 transition-all duration-300 text-lg"
                >
                  Next Question
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-medium hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 text-lg"
                >
                  Generate My Course
                </button>
              )}
            </div>
          </div>
          
          {/* Tips */}
          <div className="mt-8 bg-purple-900 bg-opacity-40 p-6 rounded-xl text-purple-200">
            <h3 className="font-bold text-white mb-3 text-lg">Tips for better results:</h3>
            <ul className="list-disc pl-6 space-y-2 text-base">
              <li>Be specific about your current knowledge level</li>
              <li>Mention any particular areas of interest within this topic</li>
              <li>Share your learning goals and how you plan to apply this knowledge</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatAI;