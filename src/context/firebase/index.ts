// Firebase consumer and provider
import {
  FirebaseProvider,
  withFirebase,
  useFirebase,
} from "./context";

// Import firebase
import firebase from "./firebase"

// Type
import type { IFirebaseContext } from "./context";

export { FirebaseProvider, withFirebase, useFirebase, firebase };

export type { IFirebaseContext };
