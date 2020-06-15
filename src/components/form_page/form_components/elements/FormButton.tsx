import React from "react";

// Styled-Components
import { radius, colors, mainTransition } from "../../../../style/style";
import styled from "styled-components";

/**
 * Props of form button.
 *
 * @interface IButtonProps
 */
interface IButtonProps {
  /**
   * Button is disabled.
   *
   * @type {boolean}
   * @memberof IButtonProps
   */
  disabled?: boolean;

  /**
   * Button is loading form.
   *
   * @type {boolean}
   * @memberof IButtonProps
   */
  loading?: boolean;

  /**
   * Text inside the button.
   *
   * @type {string}
   * @memberof IButtonProps
   */
  text: string;
}

/**
 * Form button.
 *
 * @param {IButtonProps} props Disabled + text.
 * @returns Form Button.
 */
const FormButton = (props: IButtonProps) => {
  const { disabled, loading, text } = props;
  return (
    <FormButtonStyled isDisabled={disabled} isLoading={loading} type="submit">
      {text}
    </FormButtonStyled>
  );
};

export default FormButton;

/* Styled-Components */
// Form button
export const FormButtonStyled = styled.button<{
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
