import React, { createContext, useReducer, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

// ROUTES.
import { ROUTES } from "../../routes";

// Firebase class.
import firebase from "./firebase";

// Firebase context state.
type IFirebaseState = {
  /**
   * Auth user.
   *
   * @type {(firebase.User | null)}
   */
  authUser: firebase.User | null;

  /**
   * Auth has loaded.
   *
   * @type {boolean}
   */
  authHasLoaded: boolean;
};

// Initial firebase context state.
const INITIAL_STATE: IFirebaseState = {
  authUser: null,
  authHasLoaded: false,
};

// Firebase context.
type IFirebaseContext = {
  /**
   * Context state.
   *
   * @type {IFirebaseState}
   */
  state: IFirebaseState;

  /**
   * Context reducer.
   *
   */
  dispatch: (action: Action) => void;
};

// Initial firebase context.
const INITIAL_FIREBASE: IFirebaseContext = {
  state: INITIAL_STATE,
  dispatch: () => {},
};

// Action type and payload values.
type Action =
  | {
      /**
       * Type of action.
       *
       * @type {"SET_AUTH_LOADED"}
       */
      type: "SET_AUTH_LOADED";

      /**
       * Auth user has loaded.
       *
       * @type {boolean}
       */
      authHasLoaded: boolean;
    }
  | {
      /**
       * Type of action.
       *
       * @type {"SET_USER"}
       */
      type: "SET_USER";

      /**
       * Auth user to load.
       *
       * @type {(firebase.User | null)}
       */
      authUser: firebase.User | null;
    };

/**
 * Firebase context reducer.
 *
 * @param {IFirebaseState} state
 * @param {Action} action
 * @returns
 */
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
      throw new Error("No such action exists on firebase context");
  }
};

// CONTEXT.
const FirebaseContext = createContext(INITIAL_FIREBASE);

// CONSUMER.
/**
 * Functional component firebase consumer.
 *
 */
const useFirebase = () => useContext(FirebaseContext);

// PROVIDER.
// Provider props.
type IProviderProps = {
  children: React.ReactNode;
};
/**
 *
 *
 * @param {*} { children }
 * @returns
 */
const FirebaseProvider: React.FC<IProviderProps> = ({
  children,
}: IProviderProps) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  // History.
  const history = useHistory();

  // On component mount, use history => Get user from firebase.
  useEffect(() => {
    // On firebase auth state changed.
    firebase.auth.onAuthStateChanged((user: firebase.User | null) => {
      // Set the user only if user is valid and the user email is verified.
      const authUser = user && user.emailVerified ? user : null;

      // If the user is fetch from a redirect and the redirect is correct (credential exists) => Push to landing on page load.
      firebase
        .doGetRedirectResult()
        .then(
          (result) => result.credential && history.push(ROUTES.LANDING.path)
        );

      // Recheck if displayName has been changed between providers.
      // We need to check this because of the scenario where the user signs with email and then does with Google.
      // In that moment the user displayName will be changed to Google displayName.
      // (This is default behaviour in case user is not verified).
      // In case the displayName has been override => We recover previous from users database.
      firebase
        .doGetFirestoreUsername()
        .then((userDoc) => {
          // If user exists, has a document in "users" table and user displayName has been override.
          if (user && userDoc && user.displayName !== userDoc.fullname) {
            // Update displayName with previous name from database.
            firebase.doUpdateProfile(userDoc.fullname);
          }
        })
        .then(() => {
          // Set the user of app.
          dispatch({ type: "SET_USER", authUser });

          // Mark the auth has loaded.
          dispatch({ type: "SET_AUTH_LOADED", authHasLoaded: true });
        });
    });
  }, [history]);

  return (
    <FirebaseContext.Provider value={{ state, dispatch }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export { FirebaseProvider, useFirebase, firebase };
