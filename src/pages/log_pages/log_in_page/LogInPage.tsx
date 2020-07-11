import React from "react";

// Log in form.
import { LogInForm, LogInWithEmail } from "./components";

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
 * Log in page.
 *
 * @param {ILogInPageProps} {
 *   authContext,
 * }
 */
const LogInPage: React.FC<ILogInPageProps> = ({
  authContext,
}: ILogInPageProps) =>
  authContext.passwordlessAuth ? <LogInWithEmail /> : <LogInForm />;

export default withAuth(LogInPage);
