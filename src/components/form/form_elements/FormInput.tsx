import React from "react";

// Styled-Components
import {
  ContainerStyled,
  radius,
  colors,
  shadows,
  border,
  animations,
} from "../../../style/style";
import styled, { css } from "styled-components";

// Props of functional component
/**
 * Interface of input component.
 *
 * @interface IFormInputProps
 */
interface IFormInputProps {
  /**
   * Label of input.
   *
   * @type {string}
   * @memberof IFormInputProps
   */
  label: string;

  /**
   * Name of input.
   *
   * @type {string}
   * @memberof IFormInputProps
   */
  name: string;

  /**
   * Value inside input.
   *
   * @type {string}
   * @memberof IFormInputProps
   */
  value: string;

  /**
   * On change event.
   *
   * @type {*}
   * @memberof IFormInputProps
   */
  onChange: any;

  /**
   * Type of input.
   *
   * @type {string}
   * @memberof IFormInputProps
   */
  type: string;

  /**
   * Placeholder of input.
   *
   * @type {string}
   * @memberof IFormInputProps
   */
  placeholder?: string;

  /**
   * Value is valid.
   *
   * @type {boolean}
   * @memberof IFormInputProps
   */
  isValid?: boolean;

  /**
   * Error on value not valid.
   *
   * @type {string}
   * @memberof IFormInputProps
   */
  errorMessage?: string;

  /**
   * If type is password, temporal state of hidden/shown.
   *
   * @type {boolean}
   * @memberof IFormInputProps
   */
  hiddenPass?: boolean;

  /**
   * Input is required => *
   *
   * @type {boolean}
   * @memberof IFormInputProps
   */
  required?: boolean;
}

/**
 * Form input component.
 *
 * @param {IFormInputProps} props
 * @returns
 */
const FormInput = (props: IFormInputProps) => {
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
    required,
  } = props;

  return (
    <FormInputStyled>
      <FormLabelStyled>
        {label}
        {required && "*"}
      </FormLabelStyled>
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
  -moz-box-shadow: ${shadows.perfectInset};
  -webkit-box-shadow: ${shadows.perfectInset};
  box-shadow: ${shadows.perfectInset};
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
      props.hasError ? shadows.focusInsetError : shadows.focusInset};
    -webkit-box-shadow: ${(props: any) =>
      props.hasError ? shadows.focusInsetError : shadows.focusInset};
    box-shadow: ${(props: any) =>
      props.hasError ? shadows.focusInsetError : shadows.focusInset};
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

// TODO: Animate input error
