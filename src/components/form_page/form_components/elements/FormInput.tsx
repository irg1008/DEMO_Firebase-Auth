import React from "react";

// Styled-Components
import {
  ContainerStyled,
  radius,
  colors,
  inset,
  border,
  animations,
} from "../../../../style/style";
import styled, { css } from "styled-components";

// Props of functional component
interface IProps {
  label: string;
  name: string;
  value: string;
  onChange: any;
  type: string;
  placeholder?: string;
  isValid?: boolean;
  errorMessage?: string;
  hiddenPass?: boolean;
}

const FormInput: React.SFC<IProps> = (props: any) => {
  const {
    label,
    name,
    value,
    onChange,
    type,
    placeholder,
    isValid,
    errorMessage,
    hiddenPass,
  } = props;

  return (
    <FormInputStyled>
      <FormLabelStyled>{label}</FormLabelStyled>
      <FormBoxContainerStyled>
        <FormBoxStyled
          name={name}
          value={value}
          onChange={onChange}
          type={type === "password" ? (hiddenPass ? "password" : "text") : type}
          placeholder={placeholder}
          hasError={isValid === false}
        />
      </FormBoxContainerStyled>
      {!isValid && (
        <FormErrorMessageStyled>{errorMessage}</FormErrorMessageStyled>
      )}
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

// Form box container
const FormBoxContainerStyled = styled.div`
  width: 100%;
  height: auto;
`;

// Form box
const FormBoxStyled = styled.input<{ hasError: boolean }>`
  width: inherit;
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
