// Firebase app
import firebase from "firebase/app";
// Firebase Authenticator
import "firebase/auth";

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
  private auth: any;

  /**
   * Google provider
   *
   * @private
   * @type {*}
   * @memberof Firebase
   */
  private provider: any;

  /**
   * Creates an instance of Firebase.
   *
   * @memberof Firebase
   */
  constructor() {
    // Initialices de Firebase app.
    firebase.initializeApp(config);

    // Initialices the firebase authentication.
    this.auth = firebase.auth();
    this.auth.useDeviceLanguage();

    // Initialices the Google provider
    this.provider = new firebase.auth.GoogleAuthProvider();
  }

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
  doPasswordUpdate = (password: string) =>
    this.auth.currentUser.updatePassword(password);

  /**
   * Send email to user to sign up passwordless.
   *
   * @memberof Firebase
   */
  doSendSignInLinkToEmail = (email: string) => {
    this.auth.sendSignInLinkToEmail(email);
  };

  /**
   * Sign with google popup.
   *
   * @memberof Firebase
   */
  doSignInWithGoogleWithPopup = () => {
    const provider = this.provider;
    return this.auth.signInWithPopup(provider);
  };

  /**
   * Sign with google redirect
   *
   * @memberof Firebase
   */
  doSignInWithGoogleWithRedirect = () => {
    const provider = this.provider;
    return this.auth.signInWithRedirect(provider);
  };

  /**
   * Gets the data after a redirect.
   *
   * @memberof Firebase
   */
  doGetRedirectResult = () => {
    return this.auth.getRedirectResult();
  };

  /**
   * Get the current user.
   *
   * @memberof Firebase
   */
  doGetCurrentUser = () => {
    return this.auth.currentUser;
  };
}

export default Firebase;