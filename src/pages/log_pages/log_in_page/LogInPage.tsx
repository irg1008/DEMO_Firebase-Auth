import React, { useEffect } from "react";

// Log in form.
import { LogInForm, LogInWithEmail } from "./components";

// Auth context consumer.
import { useAuth } from "../../../context/auth";

/**
 * Log in page.
 *
 *
 * @returns
 */
const LogInPage: React.FC = () => {
  // Auth state decostruction.
  const { authIsPasswordless } = useAuth().state;

  // We load page when auth finishes.
  useEffect(() => {
    // Change page title if page loads.
    document.title = "Silk&Rock - Inicia Sesión";
  }, []);

  return authIsPasswordless ? <LogInWithEmail /> : <LogInForm />;
};

export default LogInPage;
