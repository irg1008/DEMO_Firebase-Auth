import React, { useEffect } from "react";

// Sign up form.
import { SignUpForm, SignUpWithEmail } from "./components";

// Auth context consumer.
import { useAuth } from "../../../context/auth";

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

  // We load page when auth finishes.
  useEffect(() => {
    document.title = "Silk&Rock - Unete";
  }, []);

  return authIsPasswordless ? <SignUpWithEmail /> : <SignUpForm />;
};

export default SignUpPage;
