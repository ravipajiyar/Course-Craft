import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { io } from 'socket.io-client';

const ChatContext = createContext(null);

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}

export function ChatProvider({ children }) {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentRoom, setCurrentRoom] = useState('cosmic-lounge');
  const [userId, setUserId] = useState(null);

  const socket = useMemo(() => io('http://localhost:8001'), []);

  const sendMessage = useCallback(
    (content) => {
      if (content.trim()) {
        const newMessage = {
          senderId: userId,
          username: 'You', // You might want to replace this with the actual username
          content,
          roomId: currentRoom,
        };
        socket.emit('send-message', newMessage);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    },
    [socket, currentRoom, userId]
  );

  const joinRoom = useCallback(
    (roomId) => {
      socket.emit('join-room', { roomId });
      setCurrentRoom(roomId);
    },
    [socket]
  );

  useEffect(() => {
    const onConnect = () => {
      console.log('Connected to the cosmic network');
      setUserId(socket.id); // Set the userId to the socket id
    };

    const onDisconnect = () => {
      console.log('Disconnected from the cosmic network');
    };

    const onReceiveMessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    const onUserJoined = (user) => {
      setUsers((prevUsers) => [...prevUsers, user]);
    };

    const onUserLeft = (userId) => {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('receive-message', onReceiveMessage);
    socket.on('user-joined', onUserJoined);
    socket.on('user-left', onUserLeft);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('receive-message', onReceiveMessage);
      socket.off('user-joined', onUserJoined);
      socket.off('user-left', onUserLeft);
    };
  }, [socket]);

  const value = useMemo(
    () => ({
      messages,
      users,
      currentRoom,
      sendMessage,
      joinRoom,
      userId,
    }),
    [messages, users, currentRoom, sendMessage, joinRoom, userId]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}
