import React, { createContext, useContext, useState } from 'react';
import './index.css'

interface GlobalLoadingContextType {
  setLoading: (loading: boolean) => void;
}

const GlobalLoadingContext = createContext<GlobalLoadingContextType | undefined>(undefined);

export const GlobalLoadingProvider: React.FC<any> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const setLoadingState = (isLoading: boolean) => {
    setLoading(isLoading);
  };

  return (
    <GlobalLoadingContext.Provider value={{ setLoading: setLoadingState }}>
      {children}
      {loading && (
        <div className="global-loading-overlay">
          <div className="spinner">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div></div>
        </div>
      )}
    </GlobalLoadingContext.Provider>
  );
};

export const useGlobalLoading = () => {
  const context = useContext(GlobalLoadingContext);
  if (!context) {
    throw new Error('useGlobalLoading must be used within a GlobalLoadingProvider');
  }
  return context;
};
