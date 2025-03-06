import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import { FaArrowDown, FaArrowUp, FaChevronLeft, FaClock, FaBookOpen, FaLaptop, FaCertificate } from 'react-icons/fa';
import { useCourse } from '../contexts/courseContext';
import axios from 'axios';
import { InfinitySpin } from 'react-loader-spinner';
import { marked } from 'marked';
import { useNavigate } from 'react-router';

const CourseModule = ({ module, setSelectedTopic }) => {
  const [clicked, setClicked] = useState(false);
  
  const toggleModule = () => {
    setClicked(!clicked);
  };

  return (
    <div className="bg-white bg-opacity-15 backdrop-blur-sm border border-purple-300 border-opacity-30 shadow-lg rounded-xl p-6 mb-5 transition-all duration-300 hover:shadow-xl hover:bg-opacity-20 w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h4 className="text-xl font-bold text-white mb-1">
          Module {module.moduleNumber}: {module.moduleName}
        </h4>
        <button 
          onClick={toggleModule}
          className={`bg-purple-600 p-3 rounded-full cursor-pointer transition-all hover:bg-purple-500 ${clicked ? 'bg-opacity-100' : 'bg-opacity-80'}`}
        >
          {!clicked ? (
            <FaArrowDown className="text-white text-sm" />
          ) : (
            <FaArrowUp className="text-white text-sm" />
          )}
        </button>
      </div>

      {clicked && (
        <div className="mt-4 space-y-3 pl-4 border-l-3 border-purple-400 border-opacity-60">
          {module.contents.map((content, index) => (
            <div
              className="py-3 px-4 rounded-lg transition-all duration-200 bg-purple-800 bg-opacity-20 hover:bg-opacity-40 cursor-pointer flex items-center"
              key={index}
              onClick={() => {
                setSelectedTopic(content);
              }}
            >
              <div className="w-2 h-2 rounded-full bg-indigo-400 mr-3"></div>
              <p className="text-indigo-100 font-medium">{content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const CourseIntroCard = ({ course, navigate }) => {
  const totalTopics = course.modules.reduce((acc, module) => acc + module.contents.length, 0);

  return (
    <div className="flex flex-col lg:flex-row gap-8 bg-white bg-opacity-15 backdrop-blur-sm border border-purple-300 border-opacity-30 shadow-lg rounded-xl p-8 mb-8 w-full max-w-7xl mx-auto">
      <div className="flex-1">
        <h3 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent">
          {course.title}
        </h3>
        
        <div className="bg-purple-900 bg-opacity-30 rounded-xl p-6 mb-6 border-l-4 border-purple-400">
          <p className="text-lg text-purple-100 font-light leading-relaxed">
            Dive into your customized learning journey with interactive modules designed just for you. This course provides hands-on experience with cutting-edge concepts, practical examples, and expert guidance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center space-x-3 bg-purple-800 bg-opacity-30 px-4 py-3 rounded-xl">
            <FaClock className="text-purple-300 text-xl" />
            <div>
              <p className="text-purple-200 text-sm">Duration</p>
              <p className="text-white font-medium">
                {course.modules.length} {course.modules.length === 1 ? 'week' : 'weeks'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 bg-indigo-800 bg-opacity-30 px-4 py-3 rounded-xl">
            <FaBookOpen className="text-indigo-300 text-xl" />
            <div>
              <p className="text-indigo-200 text-sm">Coverage</p>
              <p className="text-white font-medium">
                {totalTopics} learning topics
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 bg-violet-800 bg-opacity-30 px-4 py-3 rounded-xl">
            <FaLaptop className="text-violet-300 text-xl" />
            <div>
              <p className="text-violet-200 text-sm">Format</p>
              <p className="text-white font-medium">
                Interactive lessons
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 bg-fuchsia-800 bg-opacity-30 px-4 py-3 rounded-xl">
            <FaCertificate className="text-fuchsia-300 text-xl" />
            <div>
              <p className="text-fuchsia-200 text-sm">Achievement</p>
              <p className="text-white font-medium">
                Course certificate
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col justify-center lg:w-1/3 bg-gradient-to-b from-purple-800 to-indigo-900 rounded-xl p-8 text-center">
        <h4 className="text-2xl font-bold text-white mb-6">Ready to Begin?</h4>
        <p className="text-purple-100 mb-8">Start your learning journey today and master new skills at your own pace</p>
        <button
          className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-400 hover:to-indigo-400 transition-all duration-300 shadow-xl"
          onClick={() => {
            navigate('/coursecontent');
          }}
        >
          Enroll Now
        </button>
        <p className="text-purple-200 text-sm mt-4">No credit card required</p>
      </div>
    </div>
  );
};

const CourseCard = ({ course, setSelectedTopic }) => {
  const navigate = useNavigate();
  
  return (
    <>
      <CourseIntroCard course={course} navigate={navigate} />
      <div className="w-full max-w-7xl mx-auto">
        {course.modules.map((module, index) => (
          <CourseModule
            key={index}
            module={module}
            setSelectedTopic={setSelectedTopic}
          />
        ))}
      </div>
    </>
  );
};

const Notes = ({ topic, setSelectedTopic }) => {
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState(null);
  
  useEffect(() => {
    const fetch = async function () {
      try {
        setLoading(true);
        const response = await axios.post(
          'http://127.0.0.1:3000/api/user/get-notes',
          {
            topic,
          }
        );
        setNotes(response.data.notes.note);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [topic]);

  const getMarkdownText = () => {
    const rawMarkup = marked(notes, { sanitize: true });
    return { __html: rawMarkup };
  };
  
  return loading || notes == null ? (
    <div className="flex flex-col items-center justify-center h-80 w-full">
      <InfinitySpin visible={true} width="150" color="#ffffff" />
      <p className="text-white mt-4 text-lg">Loading content...</p>
    </div>
  ) : (
    <div className="bg-white bg-opacity-15 backdrop-blur-sm border border-purple-300 border-opacity-30 shadow-lg rounded-xl p-8 w-full max-w-6xl mx-auto">
      <button 
        onClick={() => setSelectedTopic(null)}
        className="flex items-center space-x-2 text-purple-100 mb-8 bg-purple-800 bg-opacity-40 px-5 py-3 rounded-lg hover:bg-opacity-60 transition-all"
      >
        <FaChevronLeft size={16} />
        <span className="font-medium">Back to Course</span>
      </button>
      
      <div
        className="markdown-body bg-purple-900 bg-opacity-40 p-6 rounded-xl text-purple-50 prose prose-invert prose-lg max-w-none overflow-auto shadow-inner"
        dangerouslySetInnerHTML={getMarkdownText()}
      />
    </div>
  );
};

const CoursePage = () => {
  const { course } = useCourse();
  const [selectedTopic, setSelectedTopic] = useState(null);
  const navigate = useNavigate();

  if (!course) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 text-white">
        <p className="text-xl mb-4">No course data available</p>
        <button 
          className="bg-purple-600 text-white px-6 py-3 rounded-lg"
          onClick={() => navigate('/')}
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 text-white overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-4000"></div>
      </div>
      
      <Navbar />
      
      <div className="container mx-auto py-12 px-4 mt-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-white mb-3 bg-gradient-to-r from-purple-200 to-indigo-200 bg-clip-text text-transparent">
            Explore Your Personalized Course
          </h2>
        </div>
        
        <div className="flex flex-col items-center w-full mb-16">
          {!selectedTopic ? (
            <CourseCard course={course} setSelectedTopic={setSelectedTopic} />
          ) : (
            <Notes topic={selectedTopic} setSelectedTopic={setSelectedTopic} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;