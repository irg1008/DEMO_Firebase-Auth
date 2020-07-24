import React from "react";

// Styled-Components.
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

// Error input types.
// string: normal error.
// JSX.Element: i.e.: List of errors or any type of html element to indicate error.
// null: no error passed.
type IInputError = string | JSX.Element | null;

// Exported state of input.
// This is the state of a normal input:
// * value: value of input.
// ? isValid: input is valid.
// ? errorMsg: errorMsg if input is not valid.
type IInputState = {
  value: string;
  isValid?: boolean;
  error: IInputError;
};

// Initial input state.
const INITIAL_INPUT_STATE: IInputState = {
  value: "",
  error: null,
};

//  Set input function.
// It maintains the value and set the error to error passed.
// Also isValid is changed depending on error.
const setInput = (input: IInputState, error: IInputError): IInputState => {
  return { ...input, error, isValid: error === null };
};

// Form input props.
type IFormInputProps = {
  /**
   * Label of input.
   *
   * @type {string}
   */
  label: string;

  /**
   * Name of input. Works as ID.
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
   * On input change event.
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
   * Input is valid.
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
   * Show/hide password.
   * Type must be password.
   *
   * @type {boolean}
   */
  hiddenPass?: boolean;

  /**
   * Input is required.
   * Use of "*" to indicate so.
   *
   * @type {boolean}
   */
  required?: boolean;

  /**
   * Max length of input.
   * Do not confuse with input validation.
   * This is only useful to not let the user type on input, does not alert him of wrong input.
   *
   * @type {number}
   */
  maxLength?: number;
};

/**
 * Form input component.
 *
 * @param {IFormInputProps} {
 *   label,
 *   name,
 *   value,
 *   onChange,
 *   type,
 *   placeholder,
 *   isValid,
 *   errorMessage,
 *   hiddenPass,
 *   required,
 *   maxLength,
 * }
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
  maxLength,
}: IFormInputProps) => (
  <InputContainer>
    <FormLabel htmlFor={name}>
      {label}
      {required && "*"}
    </FormLabel>
    <InputBox>
      <Input
        id={name}
        type={type === "password" ? (hiddenPass ? type : "text") : type}
        hasError={isValid === false}
        {...{ name, value, maxLength, onChange, placeholder }}
      />
    </InputBox>
    {!isValid && (
      <InputError hasError={isValid === false}>{errorMessage}</InputError>
    )}
  </InputContainer>
);

export default FormInput;
export type { IInputState, IInputError };
export { INITIAL_INPUT_STATE, setInput };

// Form Input.
const InputContainer = styled(ContainerStyled)`
  width: 100%;
  height: auto;
  /* Margin, Padding, Border */
  margin-bottom: 0.8em;
`;

// Form label.
const FormLabel = styled.label`
  width: 100%;
  /* Font */
  font-size: 0.9em;
  font-weight: bold;
  color: ${colors.mainBlack};
  /* Margin, Padding, Border */
  margin: 0 0 0.5em 0;
`;

// Form box container.
const InputBox = styled.div`
  width: 100%;
  height: auto;
`;

// Form box.
const Input = styled.input<{ hasError: boolean }>`
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

// Error message.
const InputError = styled.p<{ hasError: boolean }>`
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
