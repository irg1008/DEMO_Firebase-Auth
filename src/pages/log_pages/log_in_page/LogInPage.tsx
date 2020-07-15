import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

// Log in form.
import { LogInForm, LogInWithEmail } from "./components";

// Auth context consumer.
import { useAuth } from "../../../components/auth";

// Firebase context
import { useFirebase } from "../../../components/firebase";

// Routes
import { ROUTES } from "../../../routes";

/**
 * Log in page.
 *
 * @param {ILogInPageProps} {
 *   authContext,
 * }
 */
const LogInPage: React.FC = () => {
  // Auth state decostruction
  const { authIsPasswordless } = useAuth().state;

  // Firebase context
  const { authUser } = useFirebase().state;

  // We load page when auth finishes.
  useEffect(() => {
    // Change page title if page loads.
    if (!authUser) document.title = "Silk&Rock - Inicia Sesión";
  }, [authUser]);

  return authUser ? (
    <Redirect to={ROUTES.LANDING.path} />
  ) : authIsPasswordless ? (
    <LogInWithEmail />
  ) : (
    <LogInForm />
  );
};

export default LogInPage;
