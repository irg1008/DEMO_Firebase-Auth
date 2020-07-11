import React from "react";
import { Link } from "react-router-dom";

// Styled-Components
import styled from "styled-components";
import { ContainerStyled, colors } from "../../../style/main_style";

// Props interface
type IFormLinkProps = {
  /**
   * Optional info text.
   *
   * @type {string}
   */
  text?: string;

  /**
   * Link text.
   *
   * @type {string}
   */
  linkText: string;

  /**
   * Path to link.
   *
   * @type {string}
   */
  to: string;
};

/**
 * Link to form page.
 *
 * @returns Link to form passed.
 */
const FormLink: React.FC<IFormLinkProps> = ({
  text,
  linkText,
  to,
}: IFormLinkProps) => (
  <FormLinkContainerStyled>
    {text}
    <FormLinkStyled to={to}>{linkText}</FormLinkStyled>
  </FormLinkContainerStyled>
);

export default FormLink;

// Styled-Components
// Link container
const FormLinkContainerStyled = styled(ContainerStyled)`
  width: 100%;
  height: 2em;
  /* Flexbox */
  flex-direction: row;
  /* Font */
  font-size: 0.8em;
`;

// Sign Link
const FormLinkStyled = styled(Link)`
  /* Margin, Padding, Border */
  margin-left: 0.2em;
  /* Font */
  font-weight: bold;
  color: ${colors.mainBlack};
`;
