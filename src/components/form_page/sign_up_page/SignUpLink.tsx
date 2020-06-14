import React from "react";
import { Link } from "react-router-dom";

// Routes
import * as ROUTES from "../../../constants/routes";

// Link to SignUpPage text
const linkText = {
  noAccount: "¿No estás registrado?",
  register: "Regístrate aquí",
};

/**
 * Link to signup page.
 *
 * @returns Link to SignUpPage.
 */
const SignUpLink = () => {
  return (
    <p>
      {linkText.noAccount} <Link to={ROUTES.SIGN_UP}>{linkText.register}</Link>
    </p>
  );
};

export default SignUpLink;

// TODO: Styled-Components
