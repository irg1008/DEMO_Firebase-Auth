import React from "react";
import { withRouter } from "react-router-dom";

// Firebase consumer.
import Firebase, { withFirebase } from "../firebase";

// Styled-Components.
import { ButtonStyled } from "../../style/main_style";

// Routes
import ROUTES from "../../routes";

// Auth consumer.
import { withAuth } from "../../components/auth";

// sign out button props.
type SignOutButtonProps = {
  /**
   * Firebase consumer.
   *
   * @type {Firebase}
   */
  firebase: Firebase;

  /**
   * Router history.
   *
   * @type {*}
   */
  history: any;

  /**
   * Auth consumer.
   *
   * @type {*}
   */
  authContext: {
    /**
     * Set user function.
     *
     * @type {*}
     */
    setUser: any;
  };
};

/**
 * Sign out button.
 *
 * @returns
 */
const SignOutButton: React.FC<SignOutButtonProps> = ({
  firebase,
  authContext,
  history,
}: SignOutButtonProps) => {
  const onClick = (): void => {
    // Sign out in firebase.
    firebase.doSignOut();

    // Sign out the local user.
    authContext.setUser(null);

    // Push to landing on sign out.
    history.push(ROUTES.LANDING.path);
  };

  // Sign out button text.
  const signOutText = "cerrar sesión";

  return (
    <ButtonStyled type="button" onClick={onClick}>
      {signOutText}
    </ButtonStyled>
  );
};

export default withRouter(withAuth(withFirebase(SignOutButton)));
