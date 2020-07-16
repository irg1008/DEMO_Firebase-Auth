import React from "react";

// Styled-Components
import { radius, colors, mainTransition } from "../../../style/main_style";
import styled from "styled-components";

// Props of form button.
type IButtonProps = {
  /**
   * Button is disabled.
   *
   * @type {boolean}
   */
  disabled?: boolean;

  /**
   * Button is loading form.
   *
   * @type {boolean}
   */
  loading?: boolean;

  /**
   * Text inside the button.
   *
   * @type {string}
   */
  text: string;
};

/**
 * Form button. Only submits when enabled
 *
 * @param {IButtonProps} props Disabled + text.
 * @returns Form Button.
 */
const FormButton: React.FC<IButtonProps> = ({
  disabled,
  loading,
  text,
}: IButtonProps) => (
  <FormButtonStyled
    isDisabled={disabled}
    isLoading={loading}
    type={!disabled && !loading ? "submit" : "button"}
  >
    {text}
  </FormButtonStyled>
);

export default FormButton;

/* Styled-Components */
// Form button
const FormButtonStyled = styled.button<{
  isDisabled?: boolean;
  isLoading?: boolean;
}>`
  width: 100%;
  height: 3em;
  /* Margin, Padding, Border */
  margin: 1em 0;
  border: none;
  border-radius: ${radius.mainRadius};
  /* Outline */
  outline: none;
  /* Cursor */
  cursor: ${(props) =>
    props.isDisabled || props.isLoading ? "default" : "pointer"};
  /* Font */
  font-family: inherit;
  text-transform: ${(props) => !props.isLoading && "capitalize"};
  font-size: 11pt;
  color: ${(props) => !props.isDisabled && colors.mainWhite};
  /* BG */
  background-color: ${(props) => !props.isDisabled && colors.blue};
  /* Transition */
  transition: ${mainTransition};
  /* Opacity */
  opacity: ${(props) => props.isLoading && "0.5"};
  /* Hover */
  &:hover {
    /* BG */
    background-color: ${(props) =>
      !props.isDisabled && !props.isLoading && colors.darkerBlue};
    /* Transition */
    transition: ${mainTransition};
  }
`;
