const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src="/path-to-your-logo.png" alt="Logo" className="h-8 w-8" />
          <span className="text-xl font-bold text-black">CourseCraft</span>
        </div>

        <div>
          <button className="bg-gradient-black text-white py-2 px-4 rounded hover:bg-purple-700 transition duration-300">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
