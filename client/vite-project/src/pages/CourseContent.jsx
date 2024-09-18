import React, { useState } from 'react';

const CourseContent = () => {
  const [selectedItem, setSelectedItem] = useState(3); // Default to "Control Flow Statements"

  const sidebarItems = [
    { id: 1, title: 'Introduction to C++', time: '15 minutes' },
    { id: 2, title: 'Basic Syntax and Data Types', time: '25 minutes' },
    { id: 3, title: 'Control Flow Statements', time: '20 minutes' },
    { id: 4, title: 'Functions and Arrays', time: '15 minutes' },
    {
      id: 5,
      title: 'Introduction to Object-Oriented Programming',
      time: '15 minutes',
    },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div className="w-1/4 bg-purple-700 text-white p-6">
        <h2 className="text-3xl font-bold mb-8">
          C++ Programming for Beginners
        </h2>
        <ul>
          {sidebarItems.map((item) => (
            <li key={item.id} className="mb-4">
              <button
                className={`text-left w-full p-2 rounded-lg transition-colors ${
                  selectedItem === item.id
                    ? 'bg-white text-purple-800'
                    : 'bg-purple-800 text-white hover:bg-purple-400'
                }`}
                onClick={() => setSelectedItem(item.id)}
              >
                <span className="mr-2">{item.id}.</span>
                {item.title}
                <span className="block text-sm text-gray-300">{item.time}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          {sidebarItems.find((item) => item.id === selectedItem)?.title}
        </h2>
        <p className="mb-6 text-gray-600">
          {selectedItem === 3
            ? 'This chapter delves into conditional statements (if-else, switch), loops (for, while, do-while), and how to control the flow of execution in your C++ programs.'
            : 'Description of the selected content will go here.'}
        </p>

        {/* YouTube Video */}
        <div className="mb-6">
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
        </div>

        {/* Card Section */}
        {selectedItem === 3 && (
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
        )}
      </div>
    </div>
  );
};

export default CourseContent;
