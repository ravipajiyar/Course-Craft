import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Login from '../Login/Login'; // Make sure to import the Login component

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          {/* Make the text clickable */}
          <span
            className="text-xl font-bold text-black cursor-pointer"
            onClick={() => navigate('/')} // Navigate to LandingPage on click
          >
            CourseCraft
          </span>
        </div>

        <div>
          <button
            className="bg-purple-700 text-white py-2 px-4 rounded hover:bg-purple-600 transition duration-300"
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>
        </div>
      </div>
      {showLogin && <Login close={() => setShowLogin(false)} />}
    </nav>
  );
};

export default Navbar;
