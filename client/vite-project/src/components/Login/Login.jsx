import { useState } from 'react';
import axios from 'axios';
import { useUser } from '../../contexts/Usercontext'; // Import the context to use login function

const Login = ({ close }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useUser(); // Get the login function from UserContext

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the login request to the backend
      console.log({
        email,
        password,
      });
      const response = await axios.post(
        'http://127.0.0.1:3000/api/user/login',
        {
          email,
          password,
        }
      );

      // If successful, store the token in localStorage
      const token = response.data.token;
      localStorage.setItem('token', token);

      // Get user data from the token and store it in context
      await login(response.data.user);

      // Close the login modal
      close();
    } catch (err) {
      console.log(err);
      setError('Invalid login credentials. Please try again.');
    }
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
              className="w-full p-3 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition duration-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              className="w-full p-3 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition duration-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 mb-4">{error}</p>}

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-purple-700 text-white w-full py-3 rounded-lg font-semibold text-lg hover:bg-purple-600 transition duration-300"
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
