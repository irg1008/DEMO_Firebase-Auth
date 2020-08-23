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

  /**
   * Users collection. (Users database table).
   *
   * @private
   * @type {firestore.CollectionReference}
   * @memberof Firebase
   */
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

    // Initialices the Google provider.
    this.googleProvider = new firebaseApp.auth.GoogleAuthProvider();

    // Initialices the firebase database and firestore.
    this.firestore = firebaseApp.firestore();

    // Gets user collection from firestore.
    this.userCollection = this.firestore.collection("users");
  }

  /**
   * Change username of user document in users table.
   *
   * @memberof Firebase
   */
  doChangeFirestoreUsername = (fullname: string) => {
    // Logged user.
    const user = this.auth.currentUser;

    // If user exists.
    if (user) {
      // Change the document of the user with user.id and update fullName field.
      return this.userCollection.doc(user.uid).set({ fullname });
    }
  };

  /**
   * Get user's username from firestore database.
   *
   * @memberof Firebase
   */
  doGetFirestoreUsername = async () => {
    // Logged user.
    const user = this.auth.currentUser;

    // If user exists.
    if (user) {
      // Wait for the user document.
      const userDoc = await this.userCollection.doc(user.uid).get();

      // Return promise data with user document.
      return userDoc.data();
    }
  };

  /**
   * Creates a new user with email and password.
   *
   * @memberof Firebase
   */
  doCreateUserWithEmailAndPassword = (email: string, password: string) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  /**
   * Signs In a new user with email and password.
   *
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
   * @memberof Firebase
   */
  doPasswordReset = (email: string) => this.auth.sendPasswordResetEmail(email);

  /**
   * Update the password of user.
   *
   * @memberof Firebase
   */
  doPasswordUpdate = (password: string) => {
    // Logged user.
    const user = this.auth.currentUser;

    // If user exists.
    if (user) {
      // Send email verification.
      return user.updatePassword(password);
    }
  };

  /**
   * Send email to user to sign up passwordless.
   *
   * @memberof Firebase
   */
  doSendSignInLinkToEmail = async (email: string) => {
    // Action code settings.
    // url: URL to redirect on email link click.
    // - Domain of page.
    const actionCodeSettings: firebase.auth.ActionCodeSettings = {
      url: window.location.origin,
      handleCodeInApp: true,
    };

    // Send sign email to given email.
    await this.auth.sendSignInLinkToEmail(email, actionCodeSettings);

    // Save the email locally.
    window.localStorage.setItem("emailForSignIn", email);
  };

  /**
   * Check if url is signed with link url.
   *
   * @memberof Firebase
   */
  doIsSignInWithEmailLink = async () => {
    // Check if full url is direct link url.
    const isSignWithEmailLink = this.auth.isSignInWithEmailLink(
      window.location.href
    );

    // If sign in link.
    if (isSignWithEmailLink) {
      // Email to storage or promt the user.
      const email =
        window.localStorage.getItem("emailForSignIn") ||
        window.prompt(
          "Has entrado desde otro dispositivo. Inserta el correo para confirmar que eres tú:"
        );

      if (email) {
        try {
          // Sign with the given email.
          const signResult = await this.auth.signInWithEmailLink(
            email,
            window.location.href
          );

          // Remove local storage item if exists.
          window.localStorage.removeItem("emailForSignIn");

          return signResult;
        } catch (error) {
          // TODO: Send floating message errors. Maybe with a returned promise.
          // If sign with emails trhows invalid request error.
          if (error.code === "auth/invalid-action-code")
            console.error("This link has already been used.");
          // If the inserted email in the prompt does not link with the url => Error.
          else if (error.code === "auth/invalid-email")
            console.error(
              `The inserted email "${email}" is not correct. Try again.`
            );
        }
      }
    }
  };

  /**
   * Send email for verification.
   *
   * @memberof Firebase
   */
  doSendEmailVerification = (user: firebase.User) => {
    // If user exists.
    if (user) {
      // Send email verification.
      return user.sendEmailVerification();
    }
  };

  /**
   * Sign with google popup.
   *
   * @memberof Firebase
   */
  doSignInWithGoogleWithPopup = () =>
    this.auth.signInWithPopup(this.googleProvider);

  /**
   * Sign with google redirect.
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
    // Logged user.
    const user = this.auth.currentUser;

    // If user exists.
    if (user) {
      // Change user username from database.
      this.doChangeFirestoreUsername(displayName);

      // Update the profile with the new displayName and/or photoURL.
      this.doUpdateProfile(displayName, photoURL);
    }
  };

  /**
   * Update user profile.
   *
   * @memberof Firebase
   */
  doUpdateProfile = (displayName: string, photoURL?: string) => {
    return new Promise(async (resolve, reject) => {
      // Logged user.
      let user = this.auth.currentUser;

      // If user exists.
      if (user) {
        // Update profile.
        resolve(user.updateProfile({ displayName, photoURL }));
      }
      // If user does not exist.
      else {
        // Reject promise..
        reject(
          "There is not user for which we can change the displayName and/or photoURL"
        );
      }
    });
  };

  /**
   * Fetchs all sign in methods for email.
   *
   * @memberof Firebase
   */
  doFetchSignInMethodsForEmail = (email: string) =>
    this.auth.fetchSignInMethodsForEmail(email);
}

// Firebase initialized class.
const firebase = new Firebase();
export default firebase;
