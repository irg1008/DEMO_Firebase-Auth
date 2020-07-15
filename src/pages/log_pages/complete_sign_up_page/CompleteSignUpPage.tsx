import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

// Complete form
import CompleteSignUpForm from "./components/CompleteSignUpForm";

// Firebase context consumer.
import { useFirebase } from "../../../components/firebase";

// Routes
import { ROUTES } from "../../../routes";

/**
 * Complete sign up page.
 *
 * @returns
 */
const CompleteSignUpPage: React.FC = () => {
  // Auth context
  const { authHasLoaded, authUser } = useFirebase().state;

  // We load page when auth finishes.
  useEffect(() => {
    // Change page title if page loads if user is not null and name is not null.
    if (authUser && !authUser.displayName)
      document.title = "Silk&Rock - Completa Cuenta";
  }, [authUser, authHasLoaded]);

  return authUser ? (
    authUser.displayName ? (
      <Redirect to={ROUTES.LANDING.path} />
    ) : (
      <CompleteSignUpForm />
    )
  ) : (
    <Redirect to={ROUTES.SIGN_UP.path} />
  );
};

export default CompleteSignUpPage;
