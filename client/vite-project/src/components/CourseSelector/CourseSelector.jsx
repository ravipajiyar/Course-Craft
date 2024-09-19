import axios from 'axios';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { InfinitySpin } from 'react-loader-spinner';
import { QuestionsContext, useQuestions } from '../../contexts/Questioncontext'; // Import the context

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
    <div className="flex items-center justify-center h-screen">
      {loading ? (
        <InfinitySpin visible={true} width="200" color="#4fa94d" />
      ) : (
        <div className="bg-white py-10 px-5 rounded-xl shadow-lg w-3/5 flex flex-col justify-center items-center space-y-6">
          <h1 className="text-black text-center font-bold text-3xl mb-4">
            What do you want to learn?
          </h1>
          <form
            onSubmit={handleSubmit}
            className="space-y-6 w-full text-center"
          >
            <label className="block text-purple-800 font-semibold text-lg">
              Enter the topic you wish to learn:
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="e.g., AI, Data Science, C++"
                className="mt-3 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-300"
              />
            </label>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className={`w-32 h-12 rounded-lg font-bold transform transition duration-300 ${
                  inputValue.trim()
                    ? 'bg-purple-700 text-white hover:bg-purple-600 hover:scale-105'
                    : 'bg-gray-400 text-white cursor-not-allowed'
                }`}
              >
                Next
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
