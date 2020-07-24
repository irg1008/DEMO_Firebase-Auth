import React, { createContext, useReducer, useContext } from "react";

// Auth context state.
type IAuthState = {
  /**
   * Auth is passwordless.
   *
   * @type {boolean}
   */
  authIsPasswordless: boolean;
};

// Initial auth context state.
const INITIAL_STATE: IAuthState = {
  authIsPasswordless: false,
};

// Context state.
type IAuthContext = {
  /**
   * Auth state.
   *
   * @type {IAuthState}
   */
  state: IAuthState;

  /**
   * Auth dispatch reducer.
   *
   */
  dispatch: (action: Action) => void;
};

// Initial context state.
const INITIAL_AUTH: IAuthContext = {
  state: INITIAL_STATE,
  dispatch: () => {},
};

// Action type and payload values.
type Action = {
  /**
   * Action to execute.
   *
   * @type {"SET_AUTH_PASSWORDLESS"}
   */
  type: "SET_AUTH_PASSWORDLESS";
  /**
   * Auth with password value on especific action.
   *
   * @type {boolean}
   */
  authIsPasswordless: boolean;
};

/**
 * Reducer for auth actions.
 *
 * @param {IAuthState} state
 * @param {Action} action
 * @returns
 */
const reducer = (state: IAuthState, action: Action) => {
  switch (action.type) {
    case "SET_AUTH_PASSWORDLESS": {
      const { authIsPasswordless } = action;
      return { ...state, authIsPasswordless };
    }
    default:
      throw new Error("No such action exists on auth context");
  }
};

// CONTEXT.
const AuthContext = createContext(INITIAL_AUTH);

// CONSUMER.
/**
 * Functional component auth consumer.
 *
 */
const useAuth = () => useContext(AuthContext);

// PROVIDER.
// Provider props.
type IProviderProps = {
  children: React.ReactNode;
};
/**
 * Context provider.
 *
 * @param {IProviderProps} {
 *   children,
 * }
 * @returns
 */
const AuthProvider: React.FC<IProviderProps> = ({
  children,
}: IProviderProps) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
