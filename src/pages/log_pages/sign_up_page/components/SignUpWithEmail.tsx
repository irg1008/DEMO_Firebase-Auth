import React, { FormEvent } from "react";

// Sign with email component.
import EmailSignPage from "../../components/email_sign";

const SignUpWithEmail: React.FC = () => {
  const onSubmit = (event: FormEvent): void => {
    // Prevent default behaviour.
    event.preventDefault();

    console.log("únete submit");
    // TODO: Comprobar diferentes cosas y enviar por firebase y luego recoger por email.
  };

  return (
    <EmailSignPage
      title="únete por correo"
      otherOptionText="otras opciones de creación"
      onSubmit={onSubmit}
    />
  );
};

export default SignUpWithEmail;
