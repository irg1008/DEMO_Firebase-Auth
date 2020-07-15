import React, { createContext, useReducer, useContext } from "react";

// State types.
type IAuthState = {
  authIsPasswordless: boolean;
};

// Initial state.
const INITIAL_STATE: IAuthState = {
  authIsPasswordless: false,
};

// Actio type and payload values.
type Action = { type: "SET_AUTH_PASSWORDLESS"; authIsPasswordless: boolean };

// Context state.
type IAuthContext = {
  state: IAuthState;
  dispatch: (action: Action) => void;
};

// Initial context state.
const INITIAL_AUTH: IAuthContext = {
  state: INITIAL_STATE,
  dispatch: () => {},
};

/**
 * Reducer from useReducer hook.
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
      throw new Error();
  }
};

// CONTEXT
const AuthContext = createContext(INITIAL_AUTH);

// FUNCTIONAL CONSUMER
const useAuth = () => useContext(AuthContext);

// CLASS CONSUMER
const withAuth = (Component: any) => (props: any) => (
  <AuthContext.Consumer>
    {(authContext) => <Component {...props} authContext={authContext} />}
  </AuthContext.Consumer>
);

// PROVIDER
/**
 * Context provider.
 *
 * @param {*} { children }
 * @returns
 */
const AuthProvider: React.FC = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider, withAuth };
export type { IAuthContext };
