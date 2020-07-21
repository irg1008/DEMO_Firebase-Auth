import React, { FormEvent } from "react";

// Sign with email component.
import EmailSignPage from "../../components/email_sign";

const LogInWithEmail: React.FC = () => {
  const onSubmit = (e: FormEvent): void => {
    // Prevent default behaviour.
    e.preventDefault();

    console.log("inicia sesión submit");
  };

  return (
    <EmailSignPage
      title="inicia con correo"
      otherOptionText="otras opciones de inicio"
      onSubmit={onSubmit}
    />
  );
};

export default LogInWithEmail;
