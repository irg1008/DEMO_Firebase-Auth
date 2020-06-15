import React from "react";
import { Link } from "react-router-dom";

// Styled-Components
import styled from "styled-components";
import { colors, MainBGContainerStyled, media } from "../../style/style";

/**
 * Error of error page.
 *
 * @returns Error.
 */
const Error = (props: any) => {
  return (
    <ErrorContainerStyled>
      <ErrorTypeStyled>{props.errorType}</ErrorTypeStyled>
      <Link to="/">
        <ErrorMessageStyled>{props.errorMessage}</ErrorMessageStyled>
      </Link>
    </ErrorContainerStyled>
  );
};

export default Error;

/* Styled-Components */
// Error Page Container
const ErrorContainerStyled = styled(MainBGContainerStyled)`
  min-width: 100vw;
  width: auto;
  min-height: 100vh;
  height: auto;
  color: ${colors.mainBlack};
  & a {
    text-decoration: none;
    color: ${colors.mainBlack};
  }
`;

// Error Type
const ErrorTypeStyled = styled.h1`
  font-size: 20em;
  margin: 0;
  font-weight: lighter;
  @media (max-width: ${media.mediumSize}) {
    font-size: 12em;
  }
`;

// Error Message
const ErrorMessageStyled = styled.p`
  font-size: 2em;
  text-decoration: none;
  @media (max-width: ${media.mediumSize}) {
    font-size: 1.4em;
  }
`;
