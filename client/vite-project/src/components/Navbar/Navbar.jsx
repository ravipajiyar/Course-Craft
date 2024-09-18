import { useState } from 'react';
import Login from '../Login/Login'; // Make sure to import the Login component

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src="/api/placeholder/32/32" alt="Logo" className="h-8 w-8" />
          <span className="text-xl font-bold text-black">CourseCraft</span>
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
