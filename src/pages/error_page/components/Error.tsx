import React from "react";
import { Link } from "react-router-dom";

// Styled-Components
import styled from "styled-components";
import { colors, ContainerStyled, media } from "../../../style/main_style";

// Landing route
import ROUTES from "../../../routes";

// Type of recieved props
type IErrorProps = {
  /**
   * Number of error. i.e 404, 400, 200.
   *
   * @type {number}
   */
  errorType: number;

  /**
   * Error Message.
   *
   * @type {string}
   */
  errorMessage: string;
};

/**
 * Error of error page. Returns to main page.
 *
 * @param {IErrorProps} props
 * @returns Error Component.
 */
const Error: React.FC<IErrorProps> = ({
  errorType,
  errorMessage,
}: IErrorProps) => (
  <ErrorContainerStyled>
    <ErrorTypeStyled>{errorType}</ErrorTypeStyled>
    <Link to={ROUTES.LANDING.path}>
      <ErrorMessageStyled>{errorMessage}</ErrorMessageStyled>
    </Link>
  </ErrorContainerStyled>
);

export default Error;

/* Styled-Components */
// Error Page Container
const ErrorContainerStyled = styled(ContainerStyled)`
  width: auto;
  height: auto;
  /* Font */
  color: ${colors.mainBlack};
  /* Links */
  & a {
    /* Font */
    text-decoration: none;
    color: ${colors.mainBlack};
  }
`;

// Error Type
const ErrorTypeStyled = styled.h1`
  /* Margin, Padding, Border */
  margin: 0;
  /* Font */
  font-size: 20em;
  font-weight: lighter;
  /* Media medium size */
  @media (max-width: ${media.mediumSize}) {
    font-size: 12em;
  }
  /* Media small size */
  @media (max-width: ${media.smallSize}) {
    font-size: 8em;
  }
`;

// Error Message
const ErrorMessageStyled = styled.p`
  /* Font */
  font-size: 2em;
  text-decoration: none;
  text-align: center;
  /* Media medium size */
  @media (max-width: ${media.mediumSize}) {
    /* Font */
    font-size: 1.4em;
  }
  /* Media small size */
  @media (max-width: ${media.smallSize}) {
    font-size: 1.2em;
  }
`;
