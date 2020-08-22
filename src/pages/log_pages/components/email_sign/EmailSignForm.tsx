import React, {
  ChangeEvent,
  useEffect,
  useRef,
  useState,
  FormEvent,
} from "react";

// Form creator and input validations.
import FormCreator from "../../../../components/form";
import inputValidation from "../../../../components/form/utils";

// Form elements. In this case we are ansering for the user, so not password, let just import an input an a submit button.
import {
  FormInput,
  FormButton,
} from "../../../../components/form/form_elements";

// Input needed information.
import {
  IInputState,
  INITIAL_INPUT_STATE,
  setInput,
} from "../../../../components/form/form_elements/FormInput";

// Auth context.
import { useAuth } from "../../../../context/auth";

// Styled-components.
import styled from "styled-components";
import { ContainerStyled } from "../../../../style/main_style";

// Arrow icon.
import ArrowIcon from "@material-ui/icons/ArrowBackIos";
import {
  IGenericFormState,
  INITIAL_GENERIC_FORM_STATE,
} from "../../../../components/form/Form";

// Complete sign props.
type IEmailSignProps = {
  /**
   * On submit, call parent submit and pass email.
   *
   */
  onFormSubmit: (email: string) => void;

  /**
   * Set title of sign with email form.
   *
   * @type {string}
   */
  title: string;

  /**
   * Set the other option text.
   *
   * @type {string}
   */
  otherOptionText: string;
};

// State of email sign.
type IEmailSignState = IGenericFormState & {
  /**
   * Email to send link.
   *
   * @type {IInputState}
   */
  email: IInputState;
};

// Initial state.
const INITIAL_EMAIL_SIGN_STATE: IEmailSignState = {
  ...INITIAL_GENERIC_FORM_STATE,
  email: INITIAL_INPUT_STATE,
};

/**
 * Complete sign up class.
 *
 * @param {*} {
 *   onSubmit,
 *   title,
 *   otherOptionText,
 * }
 * @returns
 */
const EmailSignForm: React.FC<IEmailSignProps> = ({
  onFormSubmit,
  title,
  otherOptionText,
}) => {
  // State.
  const [state, setState] = useState(INITIAL_EMAIL_SIGN_STATE);

  // State decostruction.
  const { email, isLoading, isValidForm } = state;

  // Auth context.
  const authContext = useAuth();

  // First render.
  const firstRender = useRef(true);

  /**
   * On submit, prevent default and call parent submit.
   *
   * @param {FormEvent} e
   */
  const onSubmit = (e: FormEvent) => {
    // Prevent default behaviour.
    e.preventDefault();

    // Call parent on submit.
    onFormSubmit(email.value);
  };

  /**
   * On input change.
   *
   *
   * @param {ChangeEvent<HTMLInputElement>} e
   */
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Prevent default behaviour.
    e.preventDefault();

    // Get name and value from target input.
    const { name, value } = e.target;

    // Set the first render to false.
    firstRender.current = false;

    // Update the state for the target input with the new value.
    setState({ ...state, [name]: { value } });
  };

  // On component dismount => Set to normal auth.
  useEffect(() => {
    // On component dismount.
    return () =>
      authContext.dispatch({
        type: "SET_AUTH_PASSWORDLESS",
        authIsPasswordless: false,
      });
  }, [authContext]);

  // On email valid change => Check entire form.
  useEffect(() => {
    // If not first render.
    if (!firstRender.current) {
      setState((oldState) => {
        return { ...oldState, isValidForm: email.isValid };
      });
    }
  }, [email.isValid]);

  // On email value change => Check the email validation.
  useEffect(() => {
    // If not first render.
    if (!firstRender.current) {
      setState((oldState) => {
        return {
          ...oldState,
          email: setInput(
            oldState.email,
            inputValidation.errorEmail(email.value)
          ),
        };
      });
    }
  }, [email.value]);

  /**
   * Set auth method to email + password => Remove direct sign auth.
   *
   */
  const removePasswordlessAuth = () =>
    authContext.dispatch({
      type: "SET_AUTH_PASSWORDLESS",
      authIsPasswordless: false,
    });

  // Form content.
  const content = (
    <>
      <FormInput
        label="Email"
        name="email"
        value={email.value}
        onChange={onChange}
        type="email"
        isValid={email.isValid}
        errorMessage={email.error}
        required
      />
      <FormButton
        disabled={!isValidForm}
        loading={isLoading}
        text={isLoading ? "Enviando link..." : "Enviar link"}
      />
      <OtherOptions onClick={removePasswordlessAuth}>
        <ArrowIcon fontSize="inherit" />
        <OtheOptionsText>{otherOptionText}</OtheOptionsText>
      </OtherOptions>
    </>
  );

  return <FormCreator {...{ onSubmit, content, title }} />;
};

export default EmailSignForm;

// Other options container.
const OtherOptions = styled(ContainerStyled)`
  /* Flexbox */
  flex-direction: row;
  /* Font */
  text-align: center;
  font-size: 0.8em;
  /* Cursor */
  cursor: pointer;
`;

// Other options text.
const OtheOptionsText = styled.p`
  /* Margin, Padding, Border */
  padding: 0;
  margin: 0;
  /* Font */
  font-size: inherit;
  ::first-letter {
    /* Font */
    text-transform: uppercase;
  }
  /* Hover */
  :hover {
    /* Font */
    text-decoration: underline;
  }
`;
