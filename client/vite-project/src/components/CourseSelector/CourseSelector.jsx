import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InfinitySpin } from 'react-loader-spinner';

export default function CourseSelector() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState(''); // State to store input value
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const topic = inputValue;
    setLoading(true);

    try {
      const response = await axios.post(
        'http://127.0.0.1:3000/api/user/generate-questions',
        { topic }
      );
      console.log(response);
      // Navigate to Chat AI page after form submission
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
      navigate('/genchat');
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Update state when input changes
  };

  return (
    <div className="flex items-center justify-center h-screen">
      {loading ? (
        <InfinitySpin
          visible={true}
          width="200"
          color="#7e22ce"
          ariaLabel="infinity-spin-loading"
        />
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
                value={inputValue} // Bind the input value to state
                onChange={handleInputChange} // Call the change handler on input change
                placeholder="e.g., AI, Data Science, C++"
                className="mt-3 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-300"
              />
            </label>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!inputValue.trim()} // Disable button if input is empty
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
