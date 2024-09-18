import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/landingPage';
import { ChatProvider } from './contexts/ChatAIcontext';
import CoursePage from './pages/CoursePage';
import GenChatPage from './pages/GenChat';
import ViewCoursesPage from './pages/ViewCourses';
import CourseContent from './pages/CourseContent';

function App() {
  return (
    <div className=" bg-black  h-screen text-white">
      <ChatProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/course" element={<CoursePage />} />
            <Route path="/genchat" element={<GenChatPage />} />
            <Route path="/courselist" element={<ViewCoursesPage />} />
            <Route path="/coursecontent" element={<CourseContent />} />
          </Routes>
        </BrowserRouter>
      </ChatProvider>
    </div>
  );
}
export default App;
