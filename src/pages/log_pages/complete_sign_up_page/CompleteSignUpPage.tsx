import React from "react";

// React helment head mannager.
import { Helmet } from "react-helmet-async";

// Complete form.
import CompleteSignUpForm from "./components/CompleteSignUpForm";

/**
 * Complete sign up page.
 *
 */
const CompleteSignUpPage: React.FC = () => (
  <>
    <Helmet>
      <title>{"Silk&Rock - Completar Cuenta"}</title>
    </Helmet>
    <CompleteSignUpForm />
  </>
);

export default CompleteSignUpPage;
