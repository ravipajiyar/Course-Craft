// Landingpage.jsx
import Navbar from '../components/Navbar/Navbar';
import CourseSelector from '../components/CourseSelector/CourseSelector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUserGraduate, 
  faBrain, 
  faChartLine 
} from '@fortawesome/free-solid-svg-icons';

export default function Landingpage() {
  return (
    <div className="landing-page w-full h-screen flex flex-col items-center justify-start bg-gradient-to-br from-purple-900 via-indigo-800 to-purple-800 text-white overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Navbar */}
      <Navbar />
      
      {/* Main content container */}
      <div className="container mx-auto flex flex-col items-center justify-center h-screen pt-12">
        {/* Hero Section with Title */}
        <div className="text-center mb-12 pt-12">
          <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
            Transform Your Learning Journey
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            AI-powered personalized courses designed for your unique learning path
          </p>
        </div>
        
        {/* Feature Cards */}
<div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full">
  <div className="glassmorphism rounded-xl p-6 flex flex-col items-center text-center transform hover:scale-105 transition-all duration-300">
    <div className="text-5xl text-purple-300 mb-4">
      <FontAwesomeIcon icon={faUserGraduate} />
    </div>
    <h3 className="text-xl font-semibold mb-2">Personalized Learning</h3>
    <p className="text-gray-300">Courses tailored to your knowledge level, learning style, and goals</p>
  </div>
  
  <div className="glassmorphism rounded-xl p-6 flex flex-col items-center text-center transform hover:scale-105 transition-all duration-300">
    <div className="text-5xl text-pink-300 mb-4">
      <FontAwesomeIcon icon={faBrain} />
    </div>
    <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
    <p className="text-gray-300">Smart technology assesses your knowledge and creates optimal learning paths</p>
  </div>
  
  <div className="glassmorphism rounded-xl p-6 flex flex-col items-center text-center transform hover:scale-105 transition-all duration-300">
    <div className="text-5xl text-indigo-300 mb-4">
      <FontAwesomeIcon icon={faChartLine} />
    </div>
    <h3 className="text-xl font-semibold mb-2">Expert Guidance</h3>
    <p className="text-gray-300">Curriculum designed by industry professionals to maximize your success</p>
  </div>
</div>
        
        {/* Course Selector */}
        <div className="w-full">
          <CourseSelector />
        </div>
      </div>
    </div>
  );
}