import React, { createContext, useState, useContext } from 'react';

// Create context
const FetchContext = createContext();

// Create a provider component
export const FetchProvider = ({ children }) => {
  const [shouldFetch, setShouldFetch] = useState(false);

  const triggerFetch = () => setShouldFetch(prev => !prev);

  return (
    <FetchContext.Provider value={{ shouldFetch, triggerFetch }}>
      {children}
    </FetchContext.Provider>
  );
};

// Create a custom hook to use the context
export const useFetch = () => useContext(FetchContext);