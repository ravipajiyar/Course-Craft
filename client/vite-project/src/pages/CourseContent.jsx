import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import { useCourse } from '../contexts/courseContext';
import { InfinitySpin } from 'react-loader-spinner';
import axios from 'axios';
import { marked } from 'marked';

const Notes = ({ topic, setSelectedTopic }) => {
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    const fetchNotes = async function () {
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
    if (topic) {
      fetchNotes();
    }
  }, [topic]);

  const getMarkdownText = () => {
    const rawMarkup = marked(notes, { sanitize: true });
    return { __html: rawMarkup };
  };

  return loading || !topic || !notes ? (
    <div className="flex justify-center items-center h-64">
      <InfinitySpin width="200" color="#8b5cf6" />
    </div>
  ) : (
    <div className="bg-gradient-to-r from-violet-900/80 to-indigo-900/80 backdrop-blur-lg rounded-xl p-6 shadow-2xl border-l-4 border-violet-400 transition-all duration-300">
      <div className="flex justify-between items-center mb-6 border-b border-violet-400/30 pb-4">
        <h2 className="text-2xl font-bold text-violet-100 bg-gradient-to-r from-violet-200 to-indigo-200 bg-clip-text text-transparent">{topic}</h2>
        <button
          onClick={() => setSelectedTopic(null)}
          className="bg-violet-700/60 hover:bg-violet-600 text-violet-100 font-medium px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Topics
        </button>
      </div>
      <div
        className="prose prose-invert max-w-none text-violet-50 prose-headings:text-violet-200 prose-a:text-indigo-300 prose-strong:text-white prose-code:bg-violet-900/50 prose-code:text-violet-200 prose-pre:bg-violet-900/50 prose-pre:border prose-pre:border-violet-700/50 rounded-lg p-4 bg-violet-800/20 shadow-inner"
        dangerouslySetInnerHTML={getMarkdownText()}
      ></div>
    </div>
  );
};
const CourseContent = () => {
  const [activeModule, setActiveModule] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const { course } = useCourse();

  const toggleModule = (moduleNumber) => {
    setActiveModule(activeModule === moduleNumber ? null : moduleNumber);
    setSelectedTopic(null); // Clear selected topic when changing modules
  };

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-indigo-900 via-purple-800 to-violet-700 text-white overflow-hidden">
      <Navbar />
      <div className="container mx-auto px-6 py-8 mt-16 w-full max-w-full xl:w-10/12">
        <div className="w-full mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">
            Explore Your Course Content
          </h1>

          {/* Course title and description */}
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-8 shadow-xl mb-8 border border-white border-opacity-20">
            <h2 className="text-3xl font-bold text-white mb-4">{course.title}</h2>
            <p className="text-white opacity-90">
              Dive into your customized learning journey with interactive modules designed
              just for you. This course provides hands-on experience with cutting-edge
              concepts, practical examples, and expert guidance.
            </p>
          </div>

          {/* Side navigation and content area */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <div className="w-full lg:w-1/4 space-y-3">
              {course.modules.map((module) => (
                <div 
                  key={module.moduleNumber}
                  className={`rounded-xl overflow-hidden shadow-lg transition-all duration-300 transform hover:scale-102 ${
                    activeModule === module.moduleNumber 
                      ? 'bg-gradient-to-r from-violet-600 to-indigo-600 border-l-4 border-white' 
                      : 'bg-white bg-opacity-10 backdrop-blur-sm hover:bg-opacity-20'
                  }`}
                >
                  <button
                    onClick={() => toggleModule(module.moduleNumber)}
                    className="w-full flex justify-between items-center p-5 text-left text-white"
                  >
                    <span className="text-lg font-semibold">
                      Module {module.moduleNumber}: {module.moduleName}
                    </span>
                    <span className={`text-xl transition-transform duration-300 ${
                      activeModule === module.moduleNumber ? 'rotate-180' : ''
                    }`}>
                      ▼
                    </span>
                  </button>
                </div>
              ))}
            </div>

            {/* Main content area */}
            <div className="w-full lg:w-3/4">
              {activeModule && course.modules.map((module) => (
                <div key={module.moduleNumber} className="mb-4">
                  {activeModule === module.moduleNumber && (
                    <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 shadow-xl border border-white border-opacity-20 animate-fadeIn">
                      <h3 className="text-2xl font-bold text-white mb-6 border-b border-white border-opacity-20 pb-4">
                        Topics for Module {module.moduleNumber}
                      </h3>
                      <ul className="space-y-3">
                        {module.contents.map((content, i) => (
                          <li key={i} className="relative">
                            <button
                              onClick={() => handleTopicSelect(content)}
                              className={`w-full text-left p-4 rounded-lg transition-all duration-200 flex items-center ${
                                selectedTopic === content 
                                ? 'bg-violet-600 text-white font-medium' 
                                : 'text-white hover:bg-white hover:bg-opacity-10'
                              }`}
                            >
                              <span className="text-violet-300 mr-2">•</span>
                              {content}
                            </button>
                            
                            {/* Show notes content directly below the selected topic */}
                            {selectedTopic === content && (
                              <div className="mt-3 mb-6 animate-fadeIn">
                                <Notes topic={selectedTopic} setSelectedTopic={setSelectedTopic} />
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
              
              {/* If no module is selected, show a CTA */}
              {!activeModule && (
                <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-8 text-center shadow-xl border border-white border-opacity-20">
                  <h3 className="text-2xl font-bold text-white mb-4">Ready to Begin?</h3>
                  <p className="text-white mb-6">
                    Select a module from the sidebar to start exploring topics
                    and master new skills at your own pace.
                  </p>
                  <button className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 shadow-lg">
                    Choose a Module
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;