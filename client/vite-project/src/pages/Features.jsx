import React from 'react';
import Navbar from '../components/Navbar/Navbar';

const FeaturesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-purple-800 text-white">
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <div className="container mx-auto pt-24 px-4 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
            CourseCraft Features
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Discover the powerful tools and technologies that make your learning experience exceptional
          </p>
        </div>
        
        {/* Key Features Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "fas fa-brain",
                title: "AI-Powered Learning",
                description: "Our algorithms analyze your responses in real-time to create a custom learning experience tailored to your needs.",
                color: "from-purple-400 to-purple-600"
              },
              {
                icon: "fas fa-fingerprint",
                title: "Personalized Content",
                description: "No two learners see the same course. Content adapts to your prior knowledge, learning style, and goals.",
                color: "from-pink-400 to-pink-600"
              },
              {
                icon: "fas fa-chart-line",
                title: "Progress Tracking",
                description: "Detailed analytics show your growth, mastery of topics, and areas that need additional focus.",
                color: "from-indigo-400 to-indigo-600"
              },
            ].map((feature, index) => (
              <div key={index} className="glassmorphism rounded-xl p-8 flex flex-col items-center text-center transform hover:scale-105 transition-all duration-300">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-full flex items-center justify-center mb-5 shadow-lg`}>
                  <i className={`${feature.icon} text-white text-xl`}></i>
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Feature Details */}
        <div className="max-w-6xl mx-auto">
          {/* Feature 1 */}
          <div className="glassmorphism rounded-xl p-8 mb-10 overflow-hidden relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-semibold mb-4 text-purple-300">Smart Assessment System</h2>
                <p className="text-gray-200 mb-4">
                  Our intelligent assessment platform gauges your current knowledge level through targeted questions.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <i className="fas fa-check-circle text-green-400 mr-2"></i>
                    <span>Adaptive questioning based on your responses</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check-circle text-green-400 mr-2"></i>
                    <span>Knowledge gap identification</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check-circle text-green-400 mr-2"></i>
                    <span>Difficulty calibration for optimal challenge</span>
                  </li>
                </ul>
              </div>
              <div className="bg-indigo-900 bg-opacity-40 p-6 rounded-xl">
                {/* Mock assessment UI */}
                <div className="border border-indigo-300 border-opacity-30 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-300 mb-2">Topic: Artificial Intelligence</p>
                  <p className="font-medium mb-3">What is the difference between supervised and unsupervised learning?</p>
                  <div className="space-y-2 text-sm">
                    <div className="p-2 rounded bg-white bg-opacity-10 hover:bg-opacity-20 cursor-pointer transition-all">Supervised learning requires labeled training data</div>
                    <div className="p-2 rounded bg-white bg-opacity-10 hover:bg-opacity-20 cursor-pointer transition-all">Unsupervised learning works with unlabeled data</div>
                    <div className="p-2 rounded bg-white bg-opacity-10 hover:bg-opacity-20 cursor-pointer transition-all">They are the same thing</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs">Question 3 of 10</span>
                  <button className="px-3 py-1 bg-purple-500 rounded-md text-sm">Next</button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Feature 2 */}
          <div className="glassmorphism rounded-xl p-8 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                {/* Course curriculum visualization */}
                <div className="bg-indigo-900 bg-opacity-40 p-6 rounded-xl">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium">Your AI Generated Curriculum</h4>
                    <span className="text-xs bg-green-500 px-2 py-1 rounded">Personalized</span>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 rounded bg-purple-600 bg-opacity-40 border-l-4 border-purple-400">
                      <div className="flex justify-between">
                        <span>Module 1: Introduction</span>
                        <span className="text-xs">100% Complete</span>
                      </div>
                    </div>
                    <div className="p-3 rounded bg-white bg-opacity-10 border-l-4 border-blue-400">
                      <div className="flex justify-between">
                        <span>Module 2: Core Concepts</span>
                        <span className="text-xs">In Progress</span>
                      </div>
                    </div>
                    <div className="p-3 rounded bg-white bg-opacity-5 border-l-4 border-gray-400">
                      <div className="flex justify-between">
                        <span>Module 3: Advanced Topics</span>
                        <span className="text-xs">Upcoming</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-2xl font-semibold mb-4 text-purple-300">Dynamic Course Generation</h2>
                <p className="text-gray-200 mb-4">
                  Based on your assessment, our AI crafts a unique learning path that evolves as you progress.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <i className="fas fa-check-circle text-green-400 mr-2"></i>
                    <span>Custom module creation based on your needs</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check-circle text-green-400 mr-2"></i>
                    <span>Real-time adjustment of content difficulty</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check-circle text-green-400 mr-2"></i>
                    <span>Topic prioritization based on your goals</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Feature 3 */}
          <div className="glassmorphism rounded-xl p-8">
            <h2 className="text-2xl font-semibold mb-6 text-center text-purple-300">Interactive Learning Experience</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white bg-opacity-10 p-6 rounded-xl hover:bg-opacity-15 transition-all">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center mr-3">
                    <i className="fas fa-comments text-white"></i>
                  </div>
                  <h3 className="font-medium">AI Tutor Assistance</h3>
                </div>
                <p className="text-gray-300 text-sm">
                  Get help and explanations from our AI tutor whenever you're stuck or need clarification.
                </p>
              </div>
              
              <div className="bg-white bg-opacity-10 p-6 rounded-xl hover:bg-opacity-15 transition-all">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center mr-3">
                    <i className="fas fa-tasks text-white"></i>
                  </div>
                  <h3 className="font-medium">Hands-on Projects</h3>
                </div>
                <p className="text-gray-300 text-sm">
                  Apply what you've learned with practical exercises and real-world projects tailored to your level.
                </p>
              </div>
              
              <div className="bg-white bg-opacity-10 p-6 rounded-xl hover:bg-opacity-15 transition-all">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center mr-3">
                    <i className="fas fa-medal text-white"></i>
                  </div>
                  <h3 className="font-medium">Achievement System</h3>
                </div>
                <p className="text-gray-300 text-sm">
                  Stay motivated with achievements, progress milestones, and skill certifications as you learn.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="max-w-4xl mx-auto mt-16 text-center glassmorphism rounded-xl p-8">
          <h2 className="text-2xl font-semibold mb-4">Ready to Experience Personalized Learning?</h2>
          <p className="text-gray-200 mb-6">
            Start your journey today with CourseCraft's AI-powered education platform
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-medium hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105">
            Start Learning Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;