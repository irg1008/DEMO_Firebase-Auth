import React from "react";

// Firebase class
import Firebase from ".";

// CONTEXT
const FirebaseContext = React.createContext<any>(null);

/**
 * Firebase Consumer.
 *
 * @param {*} Component
 * @param {*} Props
 */
const withFirebase = (Component: any) => (props: any) => (
  <FirebaseContext.Consumer>
    {(firebase) => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);

/**
 * Firebase provider.
 *
 * @returns
 */
const FirebaseProvider: React.FC = ({ children }: any) => (
  <FirebaseContext.Provider value={new Firebase()}>
    {children}
  </FirebaseContext.Provider>
);

export { withFirebase, FirebaseProvider };
