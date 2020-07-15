import React, { useContext, createContext, useReducer } from "react";

type ILoadingState = {
  loading: boolean;
};

const INITIAL_STATE: ILoadingState = {
  loading: false,
};

type Action = { type: "SHOW_LOAD" } | { type: "HIDE_LOAD" };

type ILoadingContext = {
  state: ILoadingState;
  dispatch: (action: Action) => void;
};

const INTIIAL_LOADING: ILoadingContext = {
  state: INITIAL_STATE,
  dispatch: () => {},
};

const reducer = (state: ILoadingState, action: Action) => {
  switch (action.type) {
    case "SHOW_LOAD": {
      return { ...state, loading: true };
    }
    case "HIDE_LOAD": {
      return { ...state, loading: false };
    }
    default: {
      throw new Error();
    }
  }
};

const LoadingContext = createContext(INTIIAL_LOADING);

const useLoading = () => useContext(LoadingContext);

const withLoading = (Component: any) => (props: any) => (
  <LoadingContext.Consumer>
    {(loadingContext) => (
      <Component {...props} loadingContext={loadingContext} />
    )}
  </LoadingContext.Consumer>
);

const LoadingProvider: React.FC = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <LoadingContext.Provider value={{ state, dispatch }}>
      {children}
    </LoadingContext.Provider>
  );
};

export { useLoading, withLoading, LoadingProvider };

export type { ILoadingContext };
