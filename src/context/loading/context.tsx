import React, { useContext, createContext, useReducer } from "react";

// Loading state.
type ILoadingState = {
  /**
   * Loading boolean value.
   *
   * @type {boolean}
   */
  loading: boolean;
};

// Initial state for loading state.
const INITIAL_STATE: ILoadingState = {
  loading: false,
};

type ILoadingContext = {
  state: ILoadingState;
  dispatch: (action: Action) => void;
};

const INTIIAL_LOADING: ILoadingContext = {
  state: INITIAL_STATE,
  dispatch: () => {},
};

// Action type and payload values.
type Action =
  | {
      /**
       * Show loading.
       *
       * @type {"SHOW_LOAD"}
       */
      type: "SHOW_LOAD";
    }
  | {
      /**
       * Hide loading.
       *
       * @type {"HIDE_LOAD"}
       */
      type: "HIDE_LOAD";
    };

/**
 * Loading context store.
 *
 * @param {ILoadingState} state
 * @param {Action} action
 * @returns
 */
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

// CONTEXT.
const LoadingContext = createContext(INTIIAL_LOADING);

// CONSUMER.
/**
 * Fucntional consumer.
 *
 */
const useLoading = () => useContext(LoadingContext);

// PROVIDER.
// Provider props.
type IProviderProps = {
  children: React.ReactNode;
};
/**
 * Loading provider.
 *
 * @param {*} { children }
 * @returns
 */
const LoadingProvider: React.FC<IProviderProps> = ({
  children,
}: IProviderProps) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <LoadingContext.Provider value={{ state, dispatch }}>
      {children}
    </LoadingContext.Provider>
  );
};

export { useLoading, LoadingProvider };
