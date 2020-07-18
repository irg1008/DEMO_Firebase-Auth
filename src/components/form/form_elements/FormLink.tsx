import React from "react";
import { Link } from "react-router-dom";

// Styled-Components.
import styled from "styled-components";
import { ContainerStyled, colors } from "../../../style/main_style";

// Form link props.
type IFormLinkProps = {
  /**
   * Link text.
   * i.e.: Click here.
   *
   * @type {string}
   */
  linkText: string;

  /**
   * Path to go on click.
   *
   * @type {string}
   */
  to: string;

  /**
   * Optional info text.
   * i.e.: Want more info?
   *
   * @type {string}
   */
  text?: string;
};

/**
 * Link to passed path.
 *
 * @param {IFormLinkProps} {
 *   text,
 *   linkText,
 *   to,
 * }
 */
const FormLink: React.FC<IFormLinkProps> = ({
  text,
  linkText,
  to,
}: IFormLinkProps) => (
  <LinkContainer>
    {text}
    <LinkStyled to={to}>{linkText}</LinkStyled>
  </LinkContainer>
);

export default FormLink;

/* Styled-Components */
// Link container.
const LinkContainer = styled(ContainerStyled)`
  width: 100%;
  height: 2em;
  /* Flexbox */
  flex-direction: row;
  /* Font */
  font-size: 0.8em;
`;

// Sign Link.
const LinkStyled = styled(Link)`
  /* Margin, Padding, Border */
  margin-left: 0.2em;
  /* Font */
  font-weight: bold;
  color: ${colors.mainBlack};
`;
