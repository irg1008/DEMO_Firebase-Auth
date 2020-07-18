import React from "react";
import { useHistory } from "react-router-dom";

// Firebase consumer.
import { firebase } from "../../context/firebase";

// Styled-Components.
import { HoverableButton } from "../../style/main_style";

// Routes
import { ROUTES } from "../../routes";

/**
 * Sign out button.
 *
 * @returns
 */
const SignOutButton: React.FC = () => {
  // History
  const history = useHistory();

  // On sign out button click
  const onClick = (): void => {
    // Sign out in firebase.
    firebase.doSignOut();

    // Push to landing on sign out.
    history.push(ROUTES.LANDING.path);
  };

  // Sign out button text.
  const signOutText = "cerrar sesión";

  return (
    <HoverableButton type="button" onClick={onClick}>
      {signOutText}
    </HoverableButton>
  );
};

export default SignOutButton;
