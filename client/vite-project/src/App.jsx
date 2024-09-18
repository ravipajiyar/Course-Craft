import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landingpage from './pages/landingpage';
import CoursePage from './pages/CoursePage';
import GenChatPage from './pages/GenChat';
import ViewCoursesPage from './pages/ViewCourses';
import CourseContent from './pages/CourseContent';

function App() {
  return (
    <div className=" bg-black  h-screen text-white">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/course" element={<CoursePage />} />
          <Route path="/genchat" element={<GenChatPage />} />
          <Route path="/courselist" element={<ViewCoursesPage />} />
          <Route path="/coursecontent" element={<CourseContent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
