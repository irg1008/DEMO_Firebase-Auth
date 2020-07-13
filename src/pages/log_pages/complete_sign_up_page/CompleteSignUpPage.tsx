import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

// Complete form
import CompleteSignUpForm from "./components/CompleteSignUpForm";

// Auth context consumer.
import { withAuth } from "../../../components/auth";

// Routes
import ROUTES from "../../../routes";

type ICompleteSignProps = {
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
  };
};

/**
 * Complete sign up page.
 *
 * @returns
 */
const CompleteSignUpPage: React.FC<ICompleteSignProps> = ({
  authContext,
}: ICompleteSignProps) => {
  // State to save when to load.
  const [pageIsLoaded, setPageIsLoaded] = useState(false);

  // We load page when auth finishes.
  useEffect(() => {
    // If auth finishes loading.
    if (authContext.authIsLoaded) {
      // Change page title if page loads if user is not null and name is not null.
      if (authContext.user && !authContext.user.displayName)
        document.title = "Silk&Rock - Completa Cuenta";

      setPageIsLoaded(true);
    }
  }, [authContext.authIsLoaded]);

  if (pageIsLoaded) {
    return authContext.user ? (
      authContext.user.displayName ? (
        <Redirect to={ROUTES.LANDING.path} />
      ) : (
        <CompleteSignUpForm />
      )
    ) : (
      <Redirect to={ROUTES.SIGN_UP.path} />
    );
  } else {
    // While page wait for app to retrieve all data. Renders nothing. This is o issue because loading message is on top until full auth loading.
    return <></>;
  }
};

export default withAuth(CompleteSignUpPage);
