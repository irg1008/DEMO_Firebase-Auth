import React from "react";

// Styled-Components.
import styled from "styled-components";
import { colors, ContainerStyled, media } from "../../../style/main_style";

// Type of recieved props.
type IErrorProps = {
  /**
   * Number of error. i.e.: 404, 400, 200.
   * Can also be an illustration representing said error, like an image or svg.
   *
   * @type {number}
   */
  errorType: number;

  /**
   * Error Message.
   *
   * @type {(string | JSX.Element)}
   */
  errorMessage: string | JSX.Element;
};

/**
 * Error of error page.
 *
 * @param {IErrorProps} {
 *   errorType,
 *   errorIllustration,
 *   errorMessage,
 * }
 */
const Error: React.FC<IErrorProps> = ({
  errorType,
  errorMessage,
}: IErrorProps) => (
  <ErrorContainer>
    <ErrorType>{errorType}</ErrorType>
    <ErrorMessage>{errorMessage}</ErrorMessage>
  </ErrorContainer>
);

export default Error;

// Error page container.
const ErrorContainer = styled(ContainerStyled)`
  width: 100%;
  height: 30em;
  /* Flexbox */
  justify-content: space-around;
  /* Font */
  color: ${colors.mainBlack};
  /* Links */
  & a {
    /* Font */
    text-decoration: none;
    color: ${colors.mainBlack};
  }
`;

// Error type.
const ErrorType = styled.h1`
  /* Flexbox */
  flex: 2;
  /* Margin, Padding, Border */
  margin: 0;
  /* Font */
  font-size: 20em;
  font-weight: lighter;
  /* Media medium size */
  @media (max-width: ${media.mediumSize}) {
    /* Font */
    font-size: 12em;
  }
  /* Media small size */
  @media (max-width: ${media.smallSize}) {
    /* Font */
    font-size: 8em;
  }
`;

// Error message.
const ErrorMessage = styled.div`
  /* Flexbox */
  flex: 1;
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
