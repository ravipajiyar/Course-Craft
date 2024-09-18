import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landingpage from './pages/landingpage';
import CoursePage from './pages/CoursePage';
import GenChatPage from './pages/GenChat';

function App() {
  return (
    <div className=" bg-black  h-screen text-white">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/course" element={<CoursePage />} />
          <Route path="/genchat" element={<GenChatPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
