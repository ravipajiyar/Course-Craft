import React from 'react';
import Navbar from '../components/Navbar/Navbar';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-purple-800 text-white">
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <div className="container mx-auto pt-24 px-4 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
            About CourseCraft
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Revolutionizing education through personalized AI-driven learning experiences
          </p>
        </div>
        
        {/* About Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {/* Left Column */}
          <div className="glassmorphism rounded-xl p-8">
            <h2 className="text-2xl font-semibold mb-6 text-purple-300">Our Mission</h2>
            <p className="text-gray-200 mb-6">
              At CourseCraft, we believe that education should be tailored to each person's unique learning journey. 
              Our mission is to democratize access to high-quality, personalized education through cutting-edge AI technology.
            </p>
            <p className="text-gray-200 mb-6">
              We're dedicated to helping learners of all levels master new skills efficiently by creating 
              custom learning paths that adapt to your knowledge, pace, and goals.
            </p>
            
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 text-purple-300">Our Values</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mr-3 shrink-0">
                    <i className="fas fa-lightbulb text-white text-sm"></i>
                  </div>
                  <span>Innovation in education technology</span>
                </li>
                <li className="flex items-start">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mr-3 shrink-0">
                    <i className="fas fa-users text-white text-sm"></i>
                  </div>
                  <span>Accessibility for learners at all levels</span>
                </li>
                <li className="flex items-start">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mr-3 shrink-0">
                    <i className="fas fa-check-circle text-white text-sm"></i>
                  </div>
                  <span>Quality content guided by industry experts</span>
                </li>
                <li className="flex items-start">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mr-3 shrink-0">
                    <i className="fas fa-shield-alt text-white text-sm"></i>
                  </div>
                  <span>Ethical application of AI in education</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="flex flex-col space-y-8">
            <div className="glassmorphism rounded-xl p-8">
              <h2 className="text-2xl font-semibold mb-4 text-purple-300">Our Story</h2>
              <p className="text-gray-200">
                Founded in 2023 by a team of educators and AI specialists, CourseCraft was born from the realization 
                that traditional one-size-fits-all education fails many learners. We set out to create an adaptive 
                learning platform that personalizes educational content to match each individual's unique needs.
              </p>
              <p className="text-gray-200 mt-4">
                Today, we're proud to offer courses across dozens of subjects, each custom-tailored to help 
                you achieve mastery in the most efficient way possible.
              </p>
            </div>
            
            <div className="glassmorphism rounded-xl p-8">
              <h2 className="text-2xl font-semibold mb-4 text-purple-300">How We're Different</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full flex items-center justify-center mr-4 shrink-0">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Dynamic Assessment</h3>
                    <p className="text-gray-300 text-sm">We assess your knowledge in real-time as you learn</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full flex items-center justify-center mr-4 shrink-0">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-medium">AI-Generated Curriculum</h3>
                    <p className="text-gray-300 text-sm">Courses that adapt to your strengths and weaknesses</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full flex items-center justify-center mr-4 shrink-0">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Expert Oversight</h3>
                    <p className="text-gray-300 text-sm">AI algorithms guided by industry professionals</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Team Section */}
        {/* <div className="max-w-6xl mx-auto mt-16">
          <h2 className="text-2xl font-semibold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { name: "Alex Morgan", title: "CEO & Co-Founder", img: "/api/placeholder/150/150" },
              { name: "Jamie Chen", title: "CTO & AI Specialist", img: "/api/placeholder/150/150" },
              { name: "Sam Rodriguez", title: "Head of Education", img: "/api/placeholder/150/150" },
              { name: "Taylor Kim", title: "UX Designer", img: "/api/placeholder/150/150" }
            ].map((member, index) => (
              <div key={index} className="glassmorphism rounded-xl p-6 flex flex-col items-center text-center">
                <img src={member.img} alt={member.name} className="w-24 h-24 rounded-full mb-4 bg-gray-300" />
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-purple-300 text-sm">{member.title}</p>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default AboutPage;