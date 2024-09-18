import { useState, useEffect, useRef } from 'react';
import { useChat } from '../../contexts/ChatAIcontext';
import ChatAImessage from './ChatAImessage';

export default function ChatAI() {
  const { messages, sendMessage, joinRoom, userId } = useChat();
  const [input, setInput] = useState('');
  const hasJoined = useRef(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!hasJoined.current) {
      joinRoom('cosmic-lounge');
      hasJoined.current = true;
    }
  }, [joinRoom]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="w-full h-[90vh] flex items-center justify-center bg-gray-300 p-10">
      <div className="w-full max-w-6xl bg-white shadow-xl rounded-lg overflow-hidden">
        {' '}
        {/* Increase width with 'max-w-6xl' */}
        <div className="flex flex-col h-[500px]">
          {' '}
          {/* Reduce height here */}
          <div className="flex-grow overflow-y-auto p-4">
            {messages.map((item, i) => (
              <ChatAImessage
                key={i}
                senderId={item.senderId}
                userName={item.username}
                content={item.content}
                classs={item.senderId === userId ? 'right' : 'left'}
                currentUserId={userId}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSend} className="border-t border-gray-300 p-3">
            {' '}
            {/* Increased padding */}
            <div className="flex space-x-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow py-2 px-4 bg-white border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button
                type="submit"
                className="bg-purple-700 text-white rounded-lg px-6 py-2 font-medium hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
