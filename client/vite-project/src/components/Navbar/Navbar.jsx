// Navbar.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../Login/Login';

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleLogin = (loggedInUsername) => {
    setIsLoggedIn(true);
    setUsername(loggedInUsername);
    setShowLogin(false);
  };

  return (
    <nav className="backdrop-blur-md bg-black bg-opacity-20 py-4 px-6 fixed top-0 left-0 right-0 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span
            className="text-2xl font-bold text-white cursor-pointer flex items-center"
            onClick={() => navigate('/')}
          >
            <i className="fas fa-graduation-cap mr-2 text-purple-400"></i>
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">CourseCraft</span>
          </span>
        </div>
        <div className="space-x-8 flex items-center">
          <a href="/features" className="text-white hover:text-purple-300 transition-colors font-medium">Features</a>
          <a href="/about" className="text-white hover:text-purple-300 transition-colors font-medium">About</a>
          {!isLoggedIn ? (
            <button
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-6 rounded-full hover:from-purple-600 hover:to-pink-600 transition duration-300 font-medium shadow-lg transform hover:scale-105"
              onClick={() => setShowLogin(true)}
            >
              Login
            </button>
          ) : (
            <div className="bg-purple-900 bg-opacity-50 px-4 py-2 rounded-full text-white flex items-center">
              <i className="fas fa-user-circle mr-2"></i>
              <p>Hi {username}</p>
            </div>
          )}
        </div>
      </div>
      {showLogin && (
        <Login close={() => setShowLogin(false)} onLogin={handleLogin} />
      )}
    </nav>
  );
};

export default Navbar;