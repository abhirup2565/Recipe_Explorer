import { createContext, useContext, useState } from "react";

const DisplayContext = createContext();

export const DisplayProvider = ({ children }) => {
  // keeps track of navigation states
  const [stack, setStack] = useState([{ type: "allCategory", value: "allCategory" }]);

  const currentState = stack[stack.length - 1];

  // forward: push new state
  const goForward = (newState) => {
    setStack((prev) => [...prev, newState]);
  };

  // go back one step
  const goBack = () => {
    setStack((prev) => {
      if (prev.length <= 1) return prev; // already at root
      const updated = prev.slice(0, -1);

      // if back to root, reset cleanly
      if (updated.length === 1 && updated[0].type === "allCategory") {
        return [{ type: "allCategory", value: "allCategory" }];
      }
      return updated;
    });
  };

  // reset completely to home
  const resetState = () => {
    setStack([{ type: "allCategory", value: "allCategory" }]);
  };

  return (
    <DisplayContext.Provider
      value={{
        stack,
        currentState,
        goForward,
        goBack,
        resetState,
      }}
    >
      {children}
    </DisplayContext.Provider>
  );
};

export const useDisplay = () => useContext(DisplayContext);
