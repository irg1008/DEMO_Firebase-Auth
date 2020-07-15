import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

// Sign up form.
import { SignUpForm, SignUpWithEmail } from "./components";

// Auth context consumer.
import { useAuth } from "../../../components/auth";

// Firebase context
import { useFirebase } from "../../../components/firebase";

// Routes
import { ROUTES } from "../../../routes";

/**
 * Sign up page.
 *
 * @param {ILogInPageProps} {
 *   authContext,
 * }
 */
const SignUpPage: React.FC = () => {
  // Page is loaded
  const { authIsPasswordless } = useAuth().state;

  // Firebase context
  const { authUser } = useFirebase().state;

  // We load page when auth finishes.
  useEffect(() => {
    // Change page title if page loads.
    if (!authUser) document.title = "Silk&Rock - Unete";
  }, [authUser]);

  return authUser ? (
    <Redirect to={ROUTES.LANDING.path} />
  ) : authIsPasswordless ? (
    <SignUpWithEmail />
  ) : (
    <SignUpForm />
  );
};

export default SignUpPage;
