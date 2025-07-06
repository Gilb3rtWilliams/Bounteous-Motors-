import { createContext, useState } from 'react';

const ViewContext = createContext();

export const ViewProvider = ({ children }) => {
  const [activeView, setActiveView] = useState('home');
  const [previousView, setPreviousView] = useState('home');

  const changeView = (newView) => {
    setPreviousView(activeView);
    setActiveView(newView);
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    setActiveView(previousView);
    window.scrollTo(0, 0);
  };

  return (
    <ViewContext.Provider value={{ activeView, changeView, goBack }}>
      {children}
    </ViewContext.Provider>
  );
};

export default ViewContext;
