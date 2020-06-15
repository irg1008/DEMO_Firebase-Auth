import React from "react";

// Styled-Components
import { radius, colors, mainTransition } from "../../../../style/style";
import styled from "styled-components";

// Props of functional component
interface IPRops {
  disabled?: boolean;
  loading?: boolean;
  text: string;
}

/**
 * Form button.
 *
 * @param {*} props Disabled + text.
 * @returns Form Button.
 */
const FormButton: React.SFC<IPRops> = (props: any) => {
  return (
    <FormButtonStyled
      isDisabled={props.disabled}
      isLoading={props.loading}
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
  isDisabled: boolean;
  isLoading: boolean;
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
