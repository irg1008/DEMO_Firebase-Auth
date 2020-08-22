import React from "react";

// React helment head mannager.
import { Helmet } from "react-helmet";

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

  return (
    <>
      <Helmet>
        <title>{"Silk&Rock - Unete"}</title>
        <meta
          name="description"
          content="Únete a Silk&Rock para aprovechar al máximo todas las ventajas y ha estar a la última en uniformes laborales."
        />
      </Helmet>
      {authIsPasswordless ? <SignUpWithEmail /> : <SignUpForm />}
    </>
  );
};

export default SignUpPage;
