import React from "react";

// Error
import Error from "../../components/error_page/Error";

// Error 404 message
const errorMessage = {
  errorType: 404,
  errorMessage: "Vuelve por donde has venido",
};

/**
 * Error page component.
 *
 * @returns Error page.
 */
const ErrorPage = () => {
  return (
    <>
      <Error
        errorType={errorMessage.errorType}
        errorMessage={errorMessage.errorMessage}
      />
    </>
  );
};

export default ErrorPage;

export { Error };
