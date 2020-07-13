import React, { useState } from "react";

// CONTEXT
const AuthContext = React.createContext<any>(null);

// CONSUMER
/**
 * Consumer of loading component. Not props passed to child.
 *
 * @param {*} Component
 */
const withAuth = (Component: any) => (props: any) => (
  <AuthContext.Consumer>
    {(authContext) => <Component {...props} authContext={authContext} />}
  </AuthContext.Consumer>
);

// PROVIDER
/**
 * Loading provider.
 *
 * @param {*} props
 * @returns
 */
const AuthProvider: React.FC = ({ children }: any) => {
  // Loading state.
  const [user, setUser] = useState(null);

  // Auth is loaded
  const [authIsLoaded, setAuthIsLoaded] = useState(false);

  // Auth passwordless
  const [passwordlessAuth, setPasswordlessAuth] = useState(false);

  // We pass the loading value and the handling functions to be used by consumers and passed to the loading child.
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        authIsLoaded,
        setAuthIsLoaded,
        passwordlessAuth,
        setPasswordlessAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Export consumer and provider
export { withAuth, AuthProvider };
