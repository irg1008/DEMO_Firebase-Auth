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
 * Firebase provider.
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
    /**
     * Check if auth comes from redirect.
     *
     */
    const checkIsRedirect = async () => {
      // If the user is fetch from a redirect and the redirect is correct (credential exists).
      const redirectResult = await firebase.doGetRedirectResult();
      // Push to landing on page load.
      redirectResult.credential && history.push(ROUTES.LANDING.path);
    };

    /**
     * Check if auth comes from auth link.
     *
     */
    const checkIsLinkRedirect = async () => {
      // If no user is logged check if url is email link.
      const isLinkResult = await firebase.doIsSignInWithEmailLink();
      // If link result.
      if (isLinkResult && isLinkResult.user) {
        // User display name.
        const displayName = isLinkResult.user.displayName;

        // If user has name => Landing page.
        // If user has no name => Complete page.
        history.push(
          displayName ? ROUTES.LANDING.path : ROUTES.COMPLETE_SIGN.path
        );
      }
    };

    // Handler function.
    const asyncHandler = async (user: firebase.User | null) => {
      // Set the user only if user is valid and the user email is verified.
      const authUser = user && user.emailVerified ? user : null;

      // Check if auth comes from redirect.
      checkIsRedirect();

      // Check if auth comes from auth link.
      checkIsLinkRedirect();

      // Get firestore name for user.
      const userDoc = await firebase.doGetFirestoreUsername();
      // If user exists, has a document in "users" table and user displayName has been override.
      if (authUser && userDoc && authUser.displayName !== userDoc.fullname) {
        // Replace displayName iwth firestore buck up.
        await firebase.doUpdateProfile(userDoc.fullname);
      }

      // Set the user.
      dispatch({ type: "SET_USER", authUser });

      // Mark the auth has loaded.
      dispatch({ type: "SET_AUTH_LOADED", authHasLoaded: true });
    };

    // Wait to check if user sign with email and then  check on auth change.
    firebase.auth.onAuthStateChanged(asyncHandler);
  }, [history]);

  return (
    <FirebaseContext.Provider value={{ state, dispatch }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export { FirebaseProvider, useFirebase, firebase };
