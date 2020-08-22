import React from "react";

// React helment head mannager.
import { Helmet } from "react-helmet-async";

// Sign up form.
import { SignUpForm, SignUpWithEmail } from "./components";

// Auth context consumer.
import { useAuth } from "../../../context/auth";

/**
 * Sign up page.
 *
 *
 * @returns
 */
const SignUpPage: React.FC = () => {
  // Auth state decostruction.
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
