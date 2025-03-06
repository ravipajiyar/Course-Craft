// CourseSelector.jsx
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InfinitySpin } from 'react-loader-spinner';
import { useQuestions } from '../../contexts/Questioncontext';

export default function CourseSelector() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const { setQuestions, setTopic } = useQuestions();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const topic = inputValue.trim();
    if (!topic) return;
    setLoading(true);

    try {
      const response = await axios.post(
        'http://127.0.0.1:3000/api/user/generate-questions',
        { topic }
      );
      const res = [
        ...response.data.data.basic,
        ...response.data.data.intermediate,
        ...response.data.data.advanced,
      ];

      setQuestions(res);
      setTopic(inputValue);

      navigate('/genchat');
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex items-center justify-center h-full w-full">
      {loading ? (
        <div className="text-center">
          <InfinitySpin visible={true} width="200" color="#ffffff" />
          <p className="mt-4 text-lg text-white">Generating your learning experience...</p>
        </div>
      ) : (
        <div className="glassmorphism rounded-2xl shadow-2xl w-full md:w-3/4 flex flex-col justify-center items-center space-y-6 p-10">
          <h1 className="text-white text-center font-bold text-4xl mb-2">
            What do you want to learn?
          </h1>
          <p className="text-gray-200 text-center text-lg max-w-xl">
            Enter your desired topic and let our AI craft the perfect learning journey for you.
          </p>
          <form
            onSubmit={handleSubmit}
            className="space-y-6 w-full max-w-2xl"
          >
            <div className="relative w-full">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="e.g., AI, Data Science, C++"
                className="w-full p-5 pr-12 rounded-xl bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 text-lg"
              />
              <i className="fas fa-search absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300"></i>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className={`py-4 px-8 rounded-xl font-bold text-lg transform transition duration-300 shadow-lg
                  ${
                    inputValue.trim()
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-purple-500/50 hover:scale-105'
                      : 'bg-gray-700 bg-opacity-50 text-gray-400 cursor-not-allowed'
                  }`}
              >
                Start Learning
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}