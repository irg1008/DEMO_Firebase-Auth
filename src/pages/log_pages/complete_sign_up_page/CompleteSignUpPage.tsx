import React, { useEffect } from "react";

// Complete form
import CompleteSignUpForm from "./components/CompleteSignUpForm";

/**
 * Complete sign up page.
 *
 * @returns
 */
const CompleteSignUpPage: React.FC = () => {
  useEffect(() => {
    document.title = "Silk&Rock - Completa con tu nombre";
  });

  return <CompleteSignUpForm />;
};

export default CompleteSignUpPage;
