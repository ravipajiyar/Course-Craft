import Navbar from '../components/Navbar/Navbar';

export default function Landingpage() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-r from-purple-300 via-blue-300 to-purple-300 h-screen p-4">
      <div className="bg-white p-10 rounded-xl shadow-2xl max-w-md w-3/5 h-3/4 flex flex-col justify-center items-center space-y-6">
        <h1 className="text-black text-center font-bold text-3xl mb-4">
          What do you want to learn?
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6 w-full text-center">
          <label className="block text-gray-700 font-semibold text-lg">
            Enter the topic you wish to learn:
            <input
              type="text"
              placeholder="e.g., AI, Data Science, C++"
              className="mt-3 w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300"
            />
          </label>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-purple-600 text-white font-bold w-32 h-12 rounded-lg hover:bg-purple-800 transition duration-300 transform hover:scale-105"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  return (
    <div>
      <Navbar />
    </div>
  );
}
