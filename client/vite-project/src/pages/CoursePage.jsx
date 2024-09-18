import { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import { FaArrowDown } from 'react-icons/fa6';
import { FaArrowUp } from 'react-icons/fa';

const CourseModule = ({ module }) => {
  const [clicked, setClicked] = useState(false);

  const showdec = () => {
    setClicked(!clicked);
  };

  return (
    <div className="bg-gray-100 shadow-sm rounded-md p-4 mb-4">
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-semibold text-purple-700 mb-1">
          {module.title}
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

      {clicked && (
        <div>
          <p className="text-gray-600 mb-2">{module.description}</p>
          <span className="text-sm text-gray-500">
            Duration: {module.duration}
          </span>
        </div>
      )}
    </div>
  );
};
const CourseCard = ({ course }) => {
  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-6 m-4  w-screen max-w-xl">
        <h3 className="text-xl font-bold text-purple-800 mb-4">
          {course.title}
        </h3>
        <p className="text-gray-700 mb-6">{course.description}</p>

        {/* Render Course Modules */}

        <div className="flex justify-between items-center mt-6">
          <span className="text-sm text-gray-500">
            Course Duration: {course.duration}
          </span>
        </div>
        <div className=" w-full flex flex-row justify-end">
          <button className=" bg-purple-900 text-white w-20  h-12  rounded hover:bg-purple-950">
            Enroll
          </button>
        </div>
      </div>
      <div className=" w-screen">
        {course.modules.map((module, index) => (
          <CourseModule key={index} module={module} />
        ))}
      </div>
    </>
  );
};

const CoursePage = () => {
  // Sample course data with modules
  const courses = [
    {
      title: 'Introduction to AI',
      description: 'Learn the fundamentals of Artificial Intelligence.',
      duration: '4 weeks',
      modules: [
        {
          title: 'Module 1: What is AI?',
          description: 'An overview of the history and development of AI.',
          duration: '1 week',
        },
        {
          title: 'Module 2: Machine Learning',
          description: 'Introduction to machine learning and its applications.',
          duration: '2 weeks',
        },
        {
          title: 'Module 3: Deep Learning',
          description: 'Exploring neural networks and deep learning concepts.',
          duration: '1 week',
        },
      ],
    },
  ];

  return (
    <div className="bg-white h-screen">
      <Navbar />
      <div className="flex flex-col items-center">
        <div className="m-4 text-2xl text-black">
          <h2 className="text-black">Course Layout</h2>
        </div>
        <div className="flex flex-wrap justify-center  w-10/12">
          {/* Loop through the courses and display each in a card */}
          {courses.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
