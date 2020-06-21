import React from "react";

// Error
import Error from "./components/Error";

// Styled-Components
import styled from "styled-components";
import { MainBGContainerStyled } from "../../style/style";

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
    <ErrorPageContainerStyled>
      <Error
        errorType={errorMessage.errorType}
        errorMessage={errorMessage.errorMessage}
      />
    </ErrorPageContainerStyled>
  );
};

export default ErrorPage;

// Styled-Component
// Error Page Container
const ErrorPageContainerStyled = styled(MainBGContainerStyled)`
  min-width: 100vw;
  width: auto;
  min-height: 100vh;
  height: auto;
`;
