import { useNavigate } from 'react-router-dom';

export default function CourseSelector() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to Chat AI page after form submission
    navigate('/genchat');
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="bg-white py-10 px-5 rounded-xl shadow-lg w-3/5 h-full flex flex-col justify-center items-center space-y-6">
        <h1 className="text-black text-center font-bold text-3xl mb-4">
          What do you want to learn?
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6 w-full text-center">
          <label className="block text-gray-700 font-semibold text-lg">
            Enter the topic you wish to learn:
            <input
              type="text"
              placeholder="e.g., AI, Data Science, C++"
              className="mt-3 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-300"
            />
          </label>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-black text-white font-bold w-32 h-12 rounded-lg hover:bg-gray-800 transition duration-300 transform hover:scale-105"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
