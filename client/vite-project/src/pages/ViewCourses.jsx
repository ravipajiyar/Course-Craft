import { useState } from 'react';

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 m-4 w-72 hover:shadow-2xl hover:scale-105 transform transition-all duration-300">
      <div className="bg-gradient-to-r from-purple-400 to-indigo-500 h-36 mb-4 rounded-lg flex items-center justify-center text-white">
        {/* Placeholder for course image */}
        <span className="text-2xl font-semibold">{course.title.charAt(0)}</span>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {course.title}
      </h3>
      <p className="text-gray-600 mb-2">Chapters: {course.chapters}</p>
      <p className="text-gray-500">Level: {course.level}</p>
    </div>
  );
};

const ViewCoursesPage = () => {
  const courses = [
    { title: 'Introduction to AI', chapters: '4', level: 'Basic' },
    {
      title: 'Machine Learning Fundamentals',
      chapters: '6',
      level: 'Intermediate',
    },
    { title: 'Deep Learning Concepts', chapters: '5', level: 'Advanced' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <header className="mb-12 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Welcome, User</h2>
        <p className="text-lg text-gray-600">
          Explore your courses and manage your learning journey.
        </p>
        <button className="mt-6 bg-purple-600 text-white px-6 py-2 rounded-full shadow-lg hover:bg-purple-700 transition duration-300">
          + Add Course
        </button>
      </header>

      {/* Course cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {courses.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
    </div>
  );
};

export default ViewCoursesPage;
