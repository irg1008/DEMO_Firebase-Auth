import React from "react";

// React helment head mannager.
import { Helmet } from "react-helmet";

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

  return (
    <>
      <Helmet>
        <title>{"Silk&Rock - Inicia Sesión"}</title>
        <meta
          name="description"
          content="Inicia sesión para conseguir las mejores ventajas en Silk&Rock y enterarte de nuestras últimas colecciones"
        />
      </Helmet>
      {authIsPasswordless ? <LogInWithEmail /> : <LogInForm />}
    </>
  );
};

export default LogInPage;
