const ChatAImessage = ({
  senderId,
  userName,
  content,
  classs,
  currentUserId,
}) => {
  const isOwnMessage = senderId === currentUserId;

  const messageClass = isOwnMessage
    ? 'bg-black text-white self-end'
    : 'bg-gray-200 text-black self-start';

  const messageStyle = {
    borderRadius: '20px',
    maxWidth: '70%',
    width: 'auto',
    padding: '12px 16px',
  };

  const UserIcon = () => (
    <svg
      className="w-6 h-6"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <div className="flex items-end mb-4">
      {!isOwnMessage && (
        <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0 mr-2 flex items-center justify-center">
          <UserIcon />
        </div>
      )}
      <div className={`${messageClass}`} style={messageStyle}>
        <div className="overflow-y-auto max-h-32">
          <p>{content}</p>
        </div>
      </div>
      {isOwnMessage && (
        <div className="w-8 h-8 bg-black rounded-full flex-shrink-0 ml-2 flex items-center justify-center">
          <UserIcon />
        </div>
      )}
    </div>
  );
};

export default ChatAImessage;
