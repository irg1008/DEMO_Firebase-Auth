import React from "react";

// Styled-Components
import { radius, colors, mainTransition } from "../../style/style";
import styled from "styled-components";

/**
 * Form button.
 *
 * @param {*} props Disabled + text.
 * @returns Form Button.
 */
const FormButton = (props: any) => {
  return (
    <FormButtonStyled
      disabled={props.disabled}
      loading={props.loading}
      type="submit"
    >
      {props.text}
    </FormButtonStyled>
  );
};

export default FormButton;

/* Styled-Components */
// Form button
export const FormButtonStyled = styled.button<{
  disabled: boolean;
  loading: boolean;
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
    props.disabled || props.loading ? "default" : "pointer"};
  /* Font */
  font-family: inherit;
  font-size: 11pt;
  color: ${(props) => !props.disabled && colors.mainWhite};
  /* BG */
  background-color: ${(props) => !props.disabled && colors.blue};
  /* Transition */
  transition: ${mainTransition};
  /* Opacity */
  opacity: ${(props) => props.loading && "0.5"};
  /* Hover */
  &:hover {
    /* BG */
    background-color: ${(props) =>
      !props.disabled && !props.loading && colors.darkerBlue};
    /* Transition */
    transition: ${mainTransition};
  }
`;
