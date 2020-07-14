import React from "react";

// Styled-Components
import {
  ContainerStyled,
  radius,
  colors,
  shadows,
  border,
  animations,
  mainTransition,
} from "../../../style/main_style";
import styled, { css } from "styled-components";

// Interface of input used on every form states.
// TODO: In next version use the prop interface and get all form inputs as json and then render all form with same component with map.
export type IInputState = {
  /**
   * Value of input.
   *
   * @type {string}
   */
  value: string;

  /**
   * Validity of input.
   *
   * @type {boolean}
   */
  isValid?: boolean;

  /**
   * Error mesg on input is no valid.
   *
   * @type {any}
   */
  errorMsg?: any;
};

// Initial input state.
export const INITIAL_INPUT_STATE: IInputState = {
  value: "",
};

// Types of input component props.
type IFormInputProps = {
  /**
   * Label of input.
   *
   * @type {string}
   */
  label: string;

  /**
   * Name of input.
   *
   * @type {string}
   */
  name: string;

  /**
   * Value inside input.
   *
   * @type {string}
   */
  value: string;

  /**
   * On change event.
   *
   * @type {*}
   */
  onChange: any;

  /**
   * Type of input.
   *
   * @type {string}
   */
  type: string;

  /**
   * Placeholder of input.
   *
   * @type {string}
   */
  placeholder?: string;

  /**
   * Value is valid.
   *
   * @type {boolean}
   */
  isValid?: boolean;

  /**
   * Error on value not valid.
   *
   * @type {string}
   */
  errorMessage?: any;

  /**
   * If type is password, temporal state of hidden/shown.
   *
   * @type {boolean}
   */
  hiddenPass?: boolean;

  /**
   * Input is required => *
   *
   * @type {boolean}
   */
  required?: boolean;
};

/**
 * Form input component.
 *
 * @param {IFormInputProps} props
 * @returns
 */
const FormInput: React.FC<IFormInputProps> = ({
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
}: IFormInputProps) => (
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
      <FormErrorMessageStyled hasError={isValid === false}>
        {errorMessage}
      </FormErrorMessageStyled>
    )}
  </FormInputStyled>
);

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
  /* Transition */
  transition: ${mainTransition};
  /* Focus */
  &:focus {
    /* Shadow */
    -moz-box-shadow: ${(props: any) =>
      props.hasError ? shadows.focusInsetError : shadows.focusInset};
    -webkit-box-shadow: ${(props: any) =>
      props.hasError ? shadows.focusInsetError : shadows.focusInset};
    box-shadow: ${(props: any) =>
      props.hasError ? shadows.focusInsetError : shadows.focusInset};
    /* Transition */
    transition: ${mainTransition};
  }
`;

// Error message
const FormErrorMessageStyled = styled.p<{ hasError: boolean }>`
  width: 100%;
  /* Font */
  color: ${colors.red};
  font-size: 0.9em;
  text-align: left;
  /* Margin, Padding, Border */
  padding: 0;
  margin: 0;
  margin-top: 0.4em;
  /* Animation */
  animation: ${(props) =>
      props.hasError && animations.moveBottomFromTopAndFadeInAnimation}
    0.2s;
`;
