import React, { createContext, useReducer, useContext, useEffect } from "react";
import firebase from "./firebase";

type IFirebaseState = {
  authUser: firebase.User | null;
  authHasLoaded: boolean;
};

const INITIAL_STATE: IFirebaseState = {
  authUser: null,
  authHasLoaded: false,
};

type Action =
  | { type: "SET_AUTH_LOADED"; authHasLoaded: boolean }
  | { type: "SET_USER"; authUser: firebase.User | null };

type IFirebaseContext = {
  state: IFirebaseState;
  dispatch: (action: Action) => void;
};

const INITIAL_FIREBASE: IFirebaseContext = {
  state: INITIAL_STATE,
  dispatch: () => {},
};

const reducer = (state: IFirebaseState, action: Action) => {
  switch (action.type) {
    case "SET_USER": {
      const { authUser } = action;
      return { ...state, authUser };
    }
    case "SET_AUTH_LOADED": {
      const { authHasLoaded } = action;
      return { ...state, authHasLoaded };
    }
    default:
      throw new Error();
  }
};

const FirebaseContext = createContext(INITIAL_FIREBASE);

const useFirebase = () => useContext(FirebaseContext);

const withFirebase = (Component: any) => (props: any) => (
  <FirebaseContext.Consumer>
    {(firebaseContext) => (
      <Component {...props} firebaseContext={firebaseContext} />
    )}
  </FirebaseContext.Consumer>
);

const FirebaseProvider: React.FC = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    firebase.auth.onAuthStateChanged((user: firebase.User | null) => {
      const authUser = user && user.emailVerified ? user : null;

      // Recheck if username has been change illegally. i.e Google provider has override displayname.
      // If so, restore previous username, save in database.
      firebase
        .doGetFirestoreUsername()
        .then((userDoc) => {
          if (user && userDoc && user.displayName !== userDoc.fullname) {
            firebase.doUpdateProfile(userDoc.fullname);
          }
        })
        .then(() => {
          dispatch({ type: "SET_USER", authUser });

          dispatch({ type: "SET_AUTH_LOADED", authHasLoaded: true });
        });
    });
  }, []);

  return (
    <FirebaseContext.Provider value={{ state, dispatch }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export { FirebaseProvider, withFirebase, useFirebase, firebase };
export type { IFirebaseContext };
