import React from "react";
import { useHistory } from "react-router-dom";

// Firebase class with firebase methods like sign in or out.
import firebase from "../../context/firebase";

// Styled-Components.
import { HoverableButton } from "../../style/main_style";

// Routes.
import { ROUTES } from "../../routes";

/**
 * Sign out button.
 *
 * @returns
 */
const SignOutButton: React.FC = () => {
  // History.
  const history = useHistory();

  // On button click => Sign out.
  const onClick = (): void => {
    // Sign out of firebase.
    firebase.doSignOut();

    // Push to landing.
    history.push(ROUTES.LANDING.path);
  };

  // Sign out button text.
  const signOutText = "cerrar sesión";

  return (
    <HoverableButton type="button" {...{ onClick }}>
      {signOutText}
    </HoverableButton>
  );
};

export default SignOutButton;
