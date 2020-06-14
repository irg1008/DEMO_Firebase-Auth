import React from "react";

// Firebase Context
const FirebaseContext = React.createContext<any | null>(null);

/**
 *   Capsulate passed component with firebase. Creates context for consumer.
 *
 * @param {*} Component
 */
export const withFirebase = (Component: any) => (props: any) => (
  <FirebaseContext.Consumer>
    {(firebase) => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);

export default FirebaseContext;

