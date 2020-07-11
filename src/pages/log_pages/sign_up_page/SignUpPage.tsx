import React from "react";

// Sign up form.
import { SignUpForm, SignUpWithEmail } from "./components";

// Auth context consumer.
import { withAuth } from "../../../components/auth";

type ILogInPageProps = {
  /**
   * Auth context to change the password method.
   *
   * @type {{
   *     passwordlessAuth: boolean;
   *     setPasswordlessAuth: any;
   *   }}
   */
  authContext: {
    /**
     * Passwordless boolean.
     *
     * @type {boolean}
     */
    passwordlessAuth: boolean;

    /**
     * Passwordless setter.
     *
     * @type {*}
     */
    setPasswordlessAuth: any;
  };
};

/**
 * Sign up page.
 *
 * @param {ILogInPageProps} {
 *   authContext,
 * }
 */
const SignUpPage: React.FC<ILogInPageProps> = ({
  authContext,
}: ILogInPageProps) =>
  authContext.passwordlessAuth ? <SignUpWithEmail /> : <SignUpForm />;

export default withAuth(SignUpPage);
