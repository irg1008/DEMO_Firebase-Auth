import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

// Sign up form.
import { SignUpForm, SignUpWithEmail } from "./components";

// Auth context consumer.
import { withAuth } from "../../../components/auth";

// Routes
import ROUTES from "../../../routes";

// Types of sign up page.
type ISignUpPageProps = {
  /**
   * Auth context to change the password method.
   *
   * @type {{
   *     passwordlessAuth: boolean;
   *     setPasswordlessAuth: any;
   *   }}
   */
  authContext: {
    /**
     * User of auth context.
     *
     * @type {*}
     */
    user: any;

    /**
     * Auth is loaded.
     *
     * @type {boolean}
     */
    authIsLoaded: boolean;

    /**
     * Passwordless boolean.
     *
     * @type {boolean}
     */
    passwordlessAuth: boolean;
  };
};

/**
 * Sign up page.
 *
 * @param {ILogInPageProps} {
 *   authContext,
 * }
 */
const SignUpPage: React.FC<ISignUpPageProps> = ({
  authContext,
}: ISignUpPageProps) => {
  // State to save when to load.
  const [pageIsLoaded, setPageIsLoaded] = useState(false);

  // We load page when auth finishes.
  useEffect(() => {
    // If auth finishes loading.
    if (authContext.authIsLoaded) {
      // Change page title if page loads.
      if (!authContext.user) document.title = "Silk&Rock - Unete";

      setPageIsLoaded(true);
    }
  }, [authContext.authIsLoaded]);

  if (pageIsLoaded) {
    return authContext.user ? (
      <Redirect to={ROUTES.LANDING.path} />
    ) : authContext.passwordlessAuth ? (
      <SignUpWithEmail />
    ) : (
      <SignUpForm />
    );
  } else {
    // While page wait for app to retrieve all data. Renders nothing. This is o issue because loading message is on top until full auth loading.
    return <></>;
  }
};

export default withAuth(SignUpPage);
