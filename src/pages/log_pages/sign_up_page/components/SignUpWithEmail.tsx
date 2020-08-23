import React from "react";

// Sign with email component.
import EmailSignPage from "../../components/email_sign";

// Firebase.
import firebase from "../../../../context/firebase";
import inputValidation from "../../../../components/form/utils/inputValidation";

/**
 * Sign up with email directly.
 *
 * @returns
 */
const SignUpWithEmail: React.FC = () => {
  /**
   * On sign up with direct link submit.
   *
   * @param {string} email
   * @returns
   */
  const parentSubmit = async (email: string) => {
    // Check if email is disposable.
    const disposableResponse = await inputValidation.fetchEmailIsDisposable(
      email
    );
    // If email is disposable => Call disposable email error handler.
    // If email is not disposable => Try to sign up with firebase.
    if (disposableResponse.disposable) {
      return "El dominio de email no es válido";
    }

    // Fetch if email exists.
    const signMethods = await firebase.doFetchSignInMethodsForEmail(email);
    if (signMethods.length > 0) {
      return "El email ya está en uso. Inicia sesión";
    }

    // Send log in email.
    firebase.doSendSignInLinkToEmail(email);
    return null;
  };

  return (
    <EmailSignPage
      title="únete con correo"
      otherOptionText="otras opciones de creación"
      {...{ parentSubmit }}
    />
  );
};

export default SignUpWithEmail;
