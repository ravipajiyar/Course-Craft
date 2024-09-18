import Navbar from '../components/Navbar/Navbar';
import CourseSelector from '../components/CourseSelector/CourseSelector';

export default function Landingpage() {
  return (
    <div className="landingpage w-full h-full flex flex-col gap-16 bg-gray-200">
      <Navbar />
      <CourseSelector />
    </div>
  );
}
