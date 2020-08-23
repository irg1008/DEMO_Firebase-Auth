import React from "react";

// Sign with email component.
import EmailSignPage from "../../components/email_sign";

// Firebase.
import firebase from "../../../../context/firebase";

const LogInWithEmail: React.FC = () => {
  /**
   * On log in with direct link submit.
   *
   * @param {string} email
   * @returns
   */
  const parentSubmit = async (email: string) => {
    // Fetch if email exists.
    const signMethods = await firebase.doFetchSignInMethodsForEmail(email);
    if (signMethods.length === 0) {
      return "No existe cuenta para este correo. Create una.";
    }

    // Send log in email.
    firebase.doSendSignInLinkToEmail(email);
    return null;
  };

  return (
    <EmailSignPage
      title="inicia con correo"
      otherOptionText="otras opciones de inicio"
      {...{ parentSubmit }}
    />
  );
};

export default LogInWithEmail;
