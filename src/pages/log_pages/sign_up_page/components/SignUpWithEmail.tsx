import React, { FormEvent } from "react";

// Sign with email component.
import EmailSignPage from "../../components/email_sign";

const SignUpWithEmail: React.FC = () => {
  const onSubmit = (e: FormEvent): void => {
    e.preventDefault();
    console.log("únete submit");

    // TODO: Comprobar diferentes cosas y enviar por firebase y luego recoger por email.
    // Floating message.
  };

  return (
    <EmailSignPage
      title="únete con correo"
      otherOptionText="otras opciones de creación"
      onSubmit={onSubmit}
    />
  );
};

export default SignUpWithEmail;
