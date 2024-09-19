import { createContext, useContext, useState } from 'react';

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [course, setCourse] = useState(null);

  return (
    <CourseContext.Provider value={{ course, setCourse }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = function () {
  const state = useContext(CourseContext);
  if (!state) {
    throw new Error('Used Outside the Context');
  } else {
    return state;
  }
};
