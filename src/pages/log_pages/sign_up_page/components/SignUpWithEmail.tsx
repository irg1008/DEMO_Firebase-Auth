import React from "react";

// Sign with email component.
import EmailSignPage from "../../components/email_sign";

// Firebase.
import firebase from "../../../../context/firebase";

// Floating message context, to display aditional info in form on little floating messages.
//import { useFloatingMsg } from "../../../../context/floating_message";

/**
 * Sign up with email directly.
 *
 * @returns
 */
const SignUpWithEmail: React.FC = () => {
  /**
   * On sign up with direct link submit.
   *
   * @param {FormEvent} e
   */
  const onFormSubmit = (email: string) => {
    // Try send link.
    try {
      // Send log in email.
      firebase.doSendSignInLinkToEmail(email);
    } catch (error) {
      // If error.
      console.error(error);
    }
  };

  return (
    <EmailSignPage
      title="únete con correo"
      otherOptionText="otras opciones de creación"
      {...{ onFormSubmit }}
    />
  );
};

export default SignUpWithEmail;
