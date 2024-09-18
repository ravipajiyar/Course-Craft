import ChatAI from '../components/ChatAI/ChatAI';
import Navbar from '../components/Navbar/Navbar';

const GenChatPage = () => {
  return (
    <div className="chagpage flex flex-col gap-2 bg-gray-200">
      <Navbar />
      <ChatAI />
    </div>
  );
};

export default GenChatPage;
