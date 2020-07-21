// Firebase app.
import firebaseApp, { firestore } from "firebase/app";
// Firebase Authenticator.
import "firebase/auth";
// Firebase database.
import "firebase/firestore";

// Config, .env constants.
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

/**
 * Firbase class with multiple firebase functions.
 *
 * @class Firebase
 */
class Firebase {
  /**
   * Firebase authenticator.
   *
   * @private
   * @type {*}
   * @memberof Firebase
   */
  public auth: firebase.auth.Auth;

  /**
   * Google provider
   *
   * @private
   * @type {*}
   * @memberof Firebase
   */
  private googleProvider: firebase.auth.GoogleAuthProvider;

  /**
   * Firebase firestore.
   *
   * @private
   * @type {firebase.firestore.Firestore}
   * @memberof Firebase
   */
  private firestore: firebase.firestore.Firestore;

  private userCollection: firestore.CollectionReference;

  /**
   * Creates an instance of Firebase.
   *
   * @memberof Firebase
   */
  constructor() {
    // Initialices de Firebase app.
    firebaseApp.initializeApp(config);

    // Initialices the firebase authentication.
    this.auth = firebaseApp.auth();
    this.auth.useDeviceLanguage();
    this.auth.setPersistence(firebaseApp.auth.Auth.Persistence.LOCAL);

    // Initialices the Google provider
    this.googleProvider = new firebaseApp.auth.GoogleAuthProvider();

    // Initialices the firebase database and  firestore.
    this.firestore = firebaseApp.firestore();

    // User collection
    this.userCollection = this.firestore.collection("users");
  }

  doChangeFirestoreUsername = (fullname: string) => {
    const user = this.auth.currentUser;
    if (user)
      this.userCollection.doc(user.uid).set({
        fullname,
      });
  };

  doGetFirestoreUsername = async () => {
    const user = this.auth.currentUser;
    if (user) {
      const userDoc = await this.userCollection.doc(user.uid).get();
      return userDoc.data();
    }
  };

  // Auth API.
  /**
   * Creates a new user with email and password.
   *
   * @param {string} email Email to create account.
   * @param {string} password Password to create account.
   * @memberof Firebase
   */
  doCreateUserWithEmailAndPassword = (email: string, password: string) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  /**
   * Signs In a new user with email and password.
   *
   * @param {string} email Email to sign in.
   * @param {string} password Password to sign in.
   * @memberof Firebase
   */
  doSignInWithEmailAndPassword = (email: string, password: string) =>
    this.auth.signInWithEmailAndPassword(email, password);

  /**
   * Sign Out of account.
   *
   * @memberof Firebase
   */
  doSignOut = () => this.auth.signOut();

  /**
   * Password reset of given mail.
   *
   * @param {string} email Email to reset password of.
   * @memberof Firebase
   */
  doPasswordReset = (email: string) => this.auth.sendPasswordResetEmail(email);

  /**
   * Update the password of user.
   *
   * @param {string} password New password.
   * @memberof Firebase
   */
  doPasswordUpdate = (password: string) => {
    if (this.auth.currentUser)
      return this.auth.currentUser.updatePassword(password);
    return new Promise(() => {});
  };

  /**
   * Send email to user to sign up passwordless.
   *
   * @memberof Firebase
   */
  doSendSignInLinkToEmail = (email: string) => {
    const actionCodeSettings: firebase.auth.ActionCodeSettings = {
      ...{ url: "silkandrock.com" },
    };

    return this.auth.sendSignInLinkToEmail(email, actionCodeSettings);
  };

  doSendEmailVerification = (user?: firebase.User) => {
    if (!user && this.auth.currentUser)
      return this.auth.currentUser.sendEmailVerification();
    else if (user) return user.sendEmailVerification();
    else return new Promise(() => {});
  };

  /**
   * Sign with google popup.
   *
   * @memberof Firebase
   */
  doSignInWithGoogleWithPopup = () =>
    this.auth.signInWithPopup(this.googleProvider);

  /**
   * Sign with google redirect
   *
   * @memberof Firebase
   */
  doSignInWithGoogleWithRedirect = () =>
    this.auth.signInWithRedirect(this.googleProvider);

  /**
   * Gets the data after a redirect.
   *
   * @memberof Firebase
   */
  doGetRedirectResult = () => this.auth.getRedirectResult();

  /**
   * Update user profile.
   *
   * @memberof Firebase
   */
  doCreateProfile = (displayName: string, photoURL?: string) => {
    if (this.auth.currentUser) {
      this.doChangeFirestoreUsername(displayName);
      this.doUpdateProfile(displayName, photoURL);
    }

    return new Promise(() => {});
  };

  doUpdateProfile = (displayName: string, photoURL?: string) => {
    if (this.auth.currentUser) {
      return this.auth.currentUser.updateProfile({ displayName, photoURL });
    }

    return new Promise(() => {});
  };

  /**
   * Fetchs all sign in methods for email.
   *
   * @memberof Firebase
   */
  doFetchSignInMethodsForEmail = (email: string) =>
    this.auth.fetchSignInMethodsForEmail(email);
}

const firebase = new Firebase();
export default firebase;
