import React from "react";

// Styled-Components
import {
  ContainerStyled,
  radius,
  colors,
  inset,
  border,
  animations,
} from "../../style/style";
import styled, { css } from "styled-components";

// Props of functional component
interface IPRops {
  label: string;
  name: string;
  value: string;
  onChange: any;
  type: string;
  placeholder?: string;
  isValid?: boolean;
  errorMessage?: string;
}

/**
 * Form Input.
 *
 * @param {*} props IProps.
 * @returns Form Input.
 */
const FormInput: React.SFC<IPRops> = (props: any) => {
  return (
    <FormInputStyled>
      <FormLabelStyled>{props.label}</FormLabelStyled>
      <FormBoxStyled
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        type={props.type}
        placeholder={props.placeholder}
        hasError={props.isValid === false}
      />
      <FormErrorMessageStyled>
        {!props.isValid && props.errorMessage}
      </FormErrorMessageStyled>
    </FormInputStyled>
  );
};

export default FormInput;

/* Styled-Components */
// Form Input
const FormInputStyled = styled(ContainerStyled)`
  width: 100%;
  height: auto;
  /* Margin, Padding, Border */
  margin-bottom: 0.8em;
`;

// Form label
const FormLabelStyled = styled.label`
  width: 100%;
  /* Font */
  font-size: 0.9em;
  font-weight: bold;
  color: ${colors.mainBlack};
  /* Margin, Padding, Border */
  margin: 0 0 0.5em 0;
`;

// Form box
const FormBoxStyled = styled.input<{ hasError: boolean }>`
  width: 100%;
  height: 3em;
  /* Margin, Padding, Border */
  padding: 0 0.6em;
  border-radius: ${radius.mainRadius};
  border: ${(props: any) =>
    props.hasError ? border.mainBorderError : border.mainBorder};
  /* Outline */
  outline-color: ${(props: any) => (props.hasError ? colors.red : colors.blue)};
  /* Font */
  font-family: inherit;
  /* BG */
  background-color: ${colors.mainWhite};
  /* Shadow */
  -moz-box-shadow: ${inset.perfectInset};
  -webkit-box-shadow: ${inset.perfectInset};
  box-shadow: ${inset.perfectInset};
  /* Animation */
  animation: ${(props: any) =>
    props.hasError &&
    css`
      ${animations.shakeAnimation} 0.5s;
    `};
  /* Focus */
  &:focus {
    /* Shadow */
    -moz-box-shadow: ${(props: any) =>
      props.hasError ? inset.focusInsetError : inset.focusInset};
    -webkit-box-shadow: ${(props: any) =>
      props.hasError ? inset.focusInsetError : inset.focusInset};
    box-shadow: ${(props: any) =>
      props.hasError ? inset.focusInsetError : inset.focusInset};
  }
`;

// Error message
const FormErrorMessageStyled = styled.p`
  width: 100%;
  /* Font */
  color: ${colors.red};
  font-size: 0.9em;
  text-align: left;
  /* Margin, Padding, Border */
  padding: 0;
  margin: 0;
  margin-top: 0.4em;
`;
