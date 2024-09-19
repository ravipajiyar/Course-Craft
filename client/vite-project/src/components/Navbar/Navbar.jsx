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
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span
            className="text-xl font-bold text-black cursor-pointer"
            onClick={() => navigate('/')}
          >
            CourseCraft
          </span>
        </div>
        <div>
          {!isLoggedIn ? (
            <button
              className="bg-purple-700 text-white py-2 px-4 rounded hover:bg-purple-600 transition duration-300"
              onClick={() => setShowLogin(true)}
            >
              Login
            </button>
          ) : (
            <p className="text-black">Hi {username}</p>
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
