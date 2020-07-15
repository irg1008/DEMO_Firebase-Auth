import React, { createContext, useContext, useReducer } from "react";

// Maybe themes and stuff in the future.
type IFloatingMsgState = {
  show: boolean;
  message: string;
  timeoutTime: number;
};

const INITIAL_STATE: IFloatingMsgState = {
  show: false,
  message: "",
  timeoutTime: 10000,
};

type Action =
  | { type: "SHOW_FLOATING"; message: string; timeoutTime?: number }
  | { type: "HIDE_FLOATING" };

type IFloatingMsgContext = {
  state: IFloatingMsgState;
  dispatch: (action: Action) => void;
};

const INITIAL_FLOATING_MSG: IFloatingMsgContext = {
  state: INITIAL_STATE,
  dispatch: () => {},
};

const reducer = (state: IFloatingMsgState, action: Action) => {
  switch (action.type) {
    case "SHOW_FLOATING": {
      const { message, timeoutTime } = action;
      return {
        ...state,
        message,
        show: true,
        timeoutTime: timeoutTime || INITIAL_STATE.timeoutTime,
      };
    }
    case "HIDE_FLOATING": {
      return { ...state, show: false };
    }
  }
};

const FloatingMsgContext = createContext(INITIAL_FLOATING_MSG);

const useFloatingMsg = () => useContext(FloatingMsgContext);

const withFloatingMsg = (Component: any) => (props: any) => (
  <FloatingMsgContext.Consumer>
    {(floatingMsgContext) => (
      <Component {...props} floatingMsgContext={floatingMsgContext} />
    )}
  </FloatingMsgContext.Consumer>
);

const FloatingMsgProvider: React.FC = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <FloatingMsgContext.Provider value={{ state, dispatch }}>
      {children}
    </FloatingMsgContext.Provider>
  );
};

export { useFloatingMsg, withFloatingMsg, FloatingMsgProvider };

export type { IFloatingMsgContext };
