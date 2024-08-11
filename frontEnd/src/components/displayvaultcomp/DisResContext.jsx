import { createContext, useState } from "react";

const DisResContext = createContext();

export function DisResProvider({ children }) {
  const [dispRes1, setDispRes] = useState({});

  const fetchedvaultorg = (res) => {
    setDispRes(res);
  };

  return (
    <DisResContext.Provider value={{ dispRes1, setDispRes, fetchedvaultorg }}>
      {children}
    </DisResContext.Provider>
  );
}

export default DisResContext;
