import React from "react";

// React helment head mannager.
import { Helmet } from "react-helmet";

// Complete form.
import CompleteSignUpForm from "./components/CompleteSignUpForm";

/**
 * Complete sign up page.
 *
 * @returns
 */
const CompleteSignUpPage: React.FC = () => (
  <>
    <Helmet>
      <title>{"Silk&Rock - Completa Cuenta"}</title>
    </Helmet>
    <CompleteSignUpForm />
  </>
);

export default CompleteSignUpPage;
