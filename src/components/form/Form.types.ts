// Form event.
import { FormEvent } from "react";

// GOOGLE SIGN.
// Google sign props.
export type GoogleSignProps = {
  /**
   * Text to show on google sign.
   *
   * @type {string}
   */
  text: string;
};

// SHOW PASSWORD.
// Toggle password props.
export type TogglePasswordProps = {
  /**
   * Passwor ds hidden.
   *
   * @type {boolean}
   */
  hiddenPass: boolean;

  /**
   * Toggle password function.
   *
   */
  toggleHiddenPass: (hiddenPass: boolean) => void;
};

// FORM OPTION.
// Option props.
export type OptionProps = {
  /**
   * Text of option.
   *
   * @type {string}
   */
  text: string;

  /**
   * On option clik.
   *
   */
  onClick: () => void;
};

// FORM ADDITIONAL FORMS.
// Aditional element for form props.
export type AdditionalFormsProps = {
  /**
   * First option to show.
   *
   * @type {OptionProps}
   */
  firstOption: OptionProps;

  /**
   * Second option to show.
   *
   * @type {OptionProps}
   */
  secondOption: OptionProps;

  /**
   * Tip text.
   *
   * @type {string}
   */
  separatorText: string;
};

// LINK ON FORM.
// Form link props.
export type LinkProps = {
  /**
   * Text of the link.
   *
   * @type {string}
   */
  linkText: string;

  /**
   * Actual link to go when clicking on link text.
   *
   * @type {string}
   */
  to: string;

  /**
   * Aditional info text.
   *
   * @type {string}
   */
  text?: string;
};

// BUTTON TYPES.
// Button state.
export type ButtonState = {
  /**
   * Button is disabled.
   *
   * @type {boolean}
   */
  disabled: boolean;

  /**
   * Button is loading.
   *
   * @type {boolean}
   */
  loading: boolean;
};

// Button props.
export type ButtonProps = ButtonState & {
  /**
   * Button text.
   *
   * @type {string}
   */
  text: string;
};

// INPUT TYPES.
// Input error.
type InputError = string | JSX.Element | null;

// Input values to handle outside input.
export type InputState = {
  /**
   * Value of input.
   *
   * @type {string}
   */
  value: string;

  /**
   * Error of input given the input or external info.
   *
   * @type {InputError}
   */
  errorMessage: InputError;
};

// Initial input state.
export const INITIAL_INPUT_STATE: InputState = {
  value: "",
  errorMessage: null,
};

// Input props = properties managed outside the input and simple props.
type BaseInputProps = InputState & {
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
   * Optional placeholder.
   *
   * @type {string}
   */
  placeHolder?: string;

  /**
   * Input is required.
   *
   * @type {boolean}
   */
  required?: boolean;
};

// Input propp added properties on different types.
export type InputProps = BaseInputProps &
  (
    | {
        /**
         * Type of input is text.
         *
         * @type {"text"}
         */
        type: "text";
      }
    | {
        /**
         * Type of input is password.
         *
         * @type {"password"}
         */
        type: "password";

        /**
         * Toggle password element attached to this password.
         *
         * @type {TogglePasswordProps}
         */
        togglePassword: TogglePasswordProps;
      }
  );

// FORM TYPES.
// Form elements.
type FormInputs = InputProps;
type FormElement = InputProps | ButtonProps | LinkProps;
type FormBottomElement = AdditionalFormsProps;

// Form props.
export type FormProps = {
  /**
   * Ttitle of form.
   *
   * @type {string}
   */
  title?: string;

  /**
   * Form inputs.
   *
   * @type {FormInputs[]}
   */
  inputs: FormInputs[];

  /**
   * Elements of form, check type FormElement.
   *
   * @type {FormElement[]}
   */
  elements?: FormElement[];

  /**
   * Bottom elements. Check bottom elements.
   *
   * @type {FormBottomElement}
   */
  bottomElement?: FormBottomElement;

  /**
   * On submit function.
   *
   */
  onSubmit?: (e: FormEvent) => void;
};
