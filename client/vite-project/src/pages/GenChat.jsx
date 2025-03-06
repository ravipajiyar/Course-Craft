import ChatAI from '../components/ChatAI/ChatAI';
import Navbar from '../components/Navbar/Navbar';

const GenChatPage = () => {
  return (
    <div className="chatpage w-full h-screen flex flex-col items-center justify-start bg-gradient-to-br from-purple-900 via-indigo-800 to-purple-800 text-white overflow-hidden relative">
       {/* Animated background elements */}
       <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      <Navbar />
      <ChatAI />
    </div>
  );
};

export default GenChatPage;
