import React from "react";

// Sign with email component.
import EmailSignPage from "../../components/email_sign";

const LogInWithEmail: React.FC = () => {
  const onFormSubmit = (email: string) => {
    console.log("inicia sesión submit");
  };

  return (
    <EmailSignPage
      title="inicia con correo"
      otherOptionText="otras opciones de inicio"
      {...{ onFormSubmit }}
    />
  );
};

export default LogInWithEmail;
