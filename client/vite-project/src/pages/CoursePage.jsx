import { isValidElement, useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import { FaArrowDown } from 'react-icons/fa6';
import { FaArrowUp } from 'react-icons/fa';
import { useCourse } from '../contexts/courseContext';
import axios from 'axios';
import { InfinitySpin } from 'react-loader-spinner';
import { marked } from 'marked';
import { useNavigate } from 'react-router';

const CourseModule = ({ module, setSelectedTopic }) => {
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();

  const showdec = () => {
    setClicked(!clicked);
  };

  return (
    <div className="bg-gray-300 shadow-sm rounded-md p-4 mb-4">
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-semibold text-purple-700 mb-1">
          Module {module.moduleNumber}: {module.moduleName}
        </h4>
        {/* Toggle arrow icons at the end */}
        {!clicked ? (
          <FaArrowDown
            className="text-black cursor-pointer"
            onClick={showdec}
          />
        ) : (
          <FaArrowUp className="text-black cursor-pointer" onClick={showdec} />
        )}
      </div>

      {clicked &&
        module.contents.map((content, index) => (
          <div
            className="hover:cursor-pointer hover:text-white"
            key={index}
            onClick={() => {
              setSelectedTopic(content);
            }}
          >
            <p className="text-gray-600 mb-2">{content}</p>
          </div>
        ))}
    </div>
  );
};
const CourseCard = ({ course, setSelectedTopic }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-6 m-4  w-screen max-w-xl">
        <h3 className="text-xl font-bold text-purple-800 mb-4">
          {course.title}
        </h3>
        <p className="text-gray-700 mb-6">Learning about {course.title}</p>

        {/* Render Course Modules */}

        <div className="flex justify-between items-center mt-6">
          <span className="text-sm text-gray-500">
            Course Duration: {course.modules.length} week
          </span>
        </div>
        <div className=" w-full flex flex-row justify-end">
          <button
            className=" bg-purple-900 text-white w-20  h-12  rounded hover:bg-purple-950 "
            onClick={() => {
              navigate('/coursecontent');
            }}
          >
            Enroll
          </button>
        </div>
      </div>
      <div className=" w-screen">
        {course.modules.map((module, index) => (
          <CourseModule
            set
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
    <InfinitySpin visible={true} width="200" color="#4fa94d" />
  ) : (
    <div className="text-black">
      <div
        className="hover:cursor-pointer"
        onClick={() => setSelectedTopic(null)}
      >
        back
      </div>
      <div
        className="markdown-body"
        dangerouslySetInnerHTML={getMarkdownText()}
      />
    </div>
  );
};
const CoursePage = () => {
  const { course } = useCourse();
  // Sample course data with modules
  const [selectedTopic, setSelectedTopic] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="bg-white h-screen">
      <Navbar />
      <div className="flex flex-col items-center">
        <div className="m-4 text-2xl text-black">
          <h2 className="text-black">Course Layout</h2>
        </div>
        <div className="flex flex-wrap justify-center  w-10/12">
          {!selectedTopic ? (
            <CourseCard course={course} setSelectedTopic={setSelectedTopic} />
          ) : (
            <Notes topic={selectedTopic} setSelectedTopic={setSelectedTopic} />
          )}
        </div>
        <div>Hello</div>
      </div>
    </div>
  );
};

export default CoursePage;
