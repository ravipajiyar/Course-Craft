const Login = ({ close }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your custom authentication logic here
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-lg max-w-sm w-full relative">
        {/* Close Button */}
        <div className="absolute top-2 right-2">
          <button className="text-black font-semibold" onClick={close}>
            X
          </button>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-black mb-6 text-center">
          Login
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* E-mail Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              E-mail
            </label>
            <input
              type="email"
              placeholder="example@email.com"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition duration-300"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition duration-300"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-black text-white w-full py-3 rounded-lg font-semibold text-lg hover:bg-gray-800 transition duration-300"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
