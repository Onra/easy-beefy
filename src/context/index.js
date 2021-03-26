import { useState, createContext } from "react";

const Context = createContext();

const ContextProvider = ({ ...otherProps }) => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState();

  return (
    <Context.Provider
      value={{
        isLoading,
        setLoading,
        data,
        setData
      }}
    >
      {otherProps.children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
