import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

// Log in form.
import { LogInForm, LogInWithEmail } from "./components";

// Auth context consumer.
import { withAuth } from "../../../components/auth";

// Routes
import ROUTES from "../../../routes";

// Types of log in page.
type ILogInPageProps = {
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

    /**
     * Passwordless setter.
     *
     * @type {*}
     */
    setPasswordlessAuth: any;
  };
};

/**
 * Log in page.
 *
 * @param {ILogInPageProps} {
 *   authContext,
 * }
 */
const LogInPage: React.FC<ILogInPageProps> = ({
  authContext,
}: ILogInPageProps) => {
  // State to save when to load.
  const [pageIsLoaded, setPageIsLoaded] = useState(false);

  // We load page when auth finishes.
  useEffect(() => {
    // If auth finishes loading.
    if (authContext.authIsLoaded) {
      // Change page title if page loads.
      if (!authContext.user) document.title = "Silk&Rock - Inicia Sesión";

      // Load page.
      setPageIsLoaded(true);
    }
  }, [authContext]);

  if (pageIsLoaded) {
    return authContext.user ? (
      <Redirect to={ROUTES.LANDING.path} />
    ) : authContext.passwordlessAuth ? (
      <LogInWithEmail />
    ) : (
      <LogInForm />
    );
  } else {
    // While page wait for app to retrieve all data. Renders nothing. This is o issue because loading message is on top until full auth loading.
    return <></>;
  }
};

export default withAuth(LogInPage);
