import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/landingPage';

import GenChatPage from './pages/GenChat';
import { ChatProvider } from './contexts/ChatAIcontext';
import CoursePage from './pages/CoursePage';

function App() {
  return (
    <div className=" bg-black h-screen text-white">
      <ChatProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/course" element={<CoursePage />} />{' '}
            <Route path="/genchat" element={<GenChatPage />} />{' '}
            {/* Chat AI Page */}
          </Routes>
        </BrowserRouter>
      </ChatProvider>
    </div>
  );
}

export default App;
