import React, { useEffect } from "react";

// Error
import Error from "./components/Error";

// Styled-Components
import styled from "styled-components";
import { MainBGContainerStyled } from "../../style/main_style";

/**
 * Error page component.
 *
 * @returns Error page.
 */
const ErrorPage: React.FC = () => {
  useEffect(() => {
    document.title = "Silk&Rock - Error";
  });

  return (
    <ErrorPageContainerStyled>
      <Error errorType={404} errorMessage="Vuelve por donde has venido" />
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
  /* Margin, Padding, Border */
  padding-top: 5em;
`;
