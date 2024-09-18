import ChatAI from '../components/ChatAI/ChatAI';
import Navbar from '../components/Navbar/Navbar';

const GenChatPage = () => {
  return (
    <div className="chagpage flex flex-col  bg-gray-300">
      <Navbar />
      <ChatAI />
    </div>
  );
};

export default GenChatPage;
