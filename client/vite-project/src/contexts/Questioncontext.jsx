import React, { createContext, useContext, useState } from 'react';

// Create the context
export const QuestionsContext = createContext();

// Provide the context to the rest of the app
export const QuestionsProvider = ({ children }) => {
  const [questions, setQuestions] = useState(undefined); // State to store questions
  const [topic, setTopic] = useState(''); // State to store questions

  return (
    <QuestionsContext.Provider
      value={{ questions, setQuestions, topic, setTopic }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};

export const useQuestions = function () {
  const state = useContext(QuestionsContext);
  if (!state) {
    throw new Error('Used Outside the Context');
  } else {
    return state;
  }
};
