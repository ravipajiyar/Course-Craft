import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import { useCourse } from '../contexts/courseContext';
import { InfinitySpin } from 'react-loader-spinner';
import axios from 'axios';
import { marked } from 'marked';

const Notes = ({ topic, setSelectedTopic }) => {
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState(null);
  console.log('topic', topic);
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
    if (topic) {
      fetch();
    }
  }, [topic]);

  const getMarkdownText = () => {
    const rawMarkup = marked(notes, { sanitize: true });
    return { __html: rawMarkup };
  };
  return loading || !topic || !notes ? (
    <div className="flex justify-center items-center">
      <InfinitySpin visible={true} width="200" color="#4fa94d" />
    </div>
  ) : (
    <div className="text-black">
      <div
        className="markdown-body"
        dangerouslySetInnerHTML={getMarkdownText()}
      />
    </div>
  );
};

const CourseContent = () => {
  const [selectedItem, setSelectedItem] = useState(1); // Default to "Control Flow Statements"
  const [selectedTopic, setSelectedTopic] = useState(null);
  const { course } = useCourse();

  console.log(course);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex bg-gray-200">
        <div className="w-1/4 bg-purple-700 text-white p-6">
          <h2 className="text-3xl font-bold mb-8">{course.title}</h2>
          <ul>
            {course.modules.map((module) => (
              <li key={module.moduleNumber} className="mb-4">
                <button
                  className={`text-left w-full p-2 rounded-lg transition-colors ${
                    selectedItem === module.moduleNumber
                      ? 'bg-white text-purple-800'
                      : 'bg-purple-800 text-white hover:bg-purple-400'
                  }`}
                  onClick={() => {
                    setSelectedItem(module.moduleNumber);
                    setSelectedTopic(null);
                  }}
                >
                  <span className="mr-2">{module.moduleNumber}.</span>
                  {module.moduleName}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-grow p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {
              course.modules.find(
                (module) => module.moduleNumber === selectedItem
              )?.moduleName
            }
          </h2>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            {course.modules[selectedItem - 1].contents.map((content, i) => (
              <h3
                onClick={() => setSelectedTopic(content)}
                key={i}
                className="text-xl font-semibold mb-4 text-gray-800 hover:text-gray-500 hover:cursor-pointer"
              >
                {content}
              </h3>
            ))}
          </div>

          {selectedTopic && (
            <div className="bg-white p-8 rounded-lg shadow-lg mt-10">
              <Notes
                setSelectedTopic={setSelectedTopic}
                topic={selectedTopic}
              />
            </div>
          )}

          {/* <p className="mb-6 text-gray-600">
            {selectedItem === course.modules.moduleNumber
              ? 'This chapter delves into conditional statements (if-else, switch), loops (for, while, do-while), and how to control the flow of execution in your C++ programs.'
              : 'Description of the selected content will go here.'}
          </p> */}

          {/* YouTube Video */}
          {/* <div className="mb-6">
            <iframe
              width="100%"
              height="450"
              className="rounded-lg shadow-lg"
              src="https://www.youtube.com/embed/qz7dLkYxsH8"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div> */}

          {/* Card Section */}
          {/* {selectedItem === 3 && (
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Control Flow Statements: Directing the Execution
              </h3>
              <div>
                <h4 className="text-lg font-semibold mb-2 text-gray-700">
                  if Statement
                </h4>
                <p className="text-gray-600 mb-4">
                  Use the if statement to specify a block of code to be executed
                  if a condition is true.
                </p>

                <h4 className="text-lg font-semibold mb-2 text-gray-700">
                  else if Statement
                </h4>
                <p className="text-gray-600">
                  Use the else if statement to specify a new condition if the
                  first condition is false.
                </p>
              </div>
            </div>
          )} */}
        </div>
      </div>
    </>
  );
};

export default CourseContent;
