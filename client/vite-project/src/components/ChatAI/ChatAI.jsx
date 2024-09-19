import React, { useState } from 'react';
import { useQuestions } from '../../contexts/Questioncontext';
import { useCourse } from '../../contexts/courseContext';
import { useNavigate } from 'react-router';
import CoursePage from '../../pages/CoursePage';
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

    navigate('/course');

    // Add submission logic here (e.g., send answers to a server)
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-300">
      {loading ? (
        <InfinitySpin visible={true} width="200" color="#4fa94d" />
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6 text-center w-2/4 h-2/3 flex flex-col">
          <h1 className="text-black text-2xl mb-8">Answer The Following</h1>
          <h2 className="text-xl font-semibold mb-4 text-purple-700">
            {qsn[currentQuestion]}
          </h2>

          <textarea
            id="message"
            rows="15"
            value={userAnswers[currentQuestion]} // Set value based on current answer
            onChange={handleInputChange} // Handle input changes
            className="block p-2.5 w-full text-sm text-gray-700 bg-white rounded-lg border border-gray-300 focus:ring-blue-400 focus:border-blue-400 placeholder-gray-500 mt-6"
            placeholder="Answer Here"
          ></textarea>

          <div className="flex flex-col h-full justify-end">
            {currentQuestion < qsn.length - 1 ? (
              <button
                onClick={handleNext}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-7"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-600 mb-7"
              >
                Generate Course Module
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatAI;
