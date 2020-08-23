import React, {
  ChangeEvent,
  useEffect,
  useRef,
  useState,
  FormEvent,
} from "react";

// Form creator.
import FormCreator from "../../../../components/form";

// Form elements. In this case we are ansering for the user, so not password, let just import an input an a submit button.
import {
  FormInput,
  FormButton,
  OtherOptions,
} from "../../../../components/form/form_elements";

// Form input validations.
import inputValidation from "../../../../components/form/utils";

// Input needed information.
import {
  IInputState,
  INITIAL_INPUT_STATE,
  setInput,
} from "../../../../components/form/form_elements/FormInput";

// Auth context.
import { useAuth } from "../../../../context/auth";

// Form state.
import {
  IGenericFormState,
  INITIAL_GENERIC_FORM_STATE,
} from "../../../../components/form/Form";

// Full page message.
import FullPageMessage from "../../../../components/full_page_message";

// Complete sign props.
type IEmailSignProps = {
  /**
   * On submit, call parent submit and pass email.
   *
   */
  parentSubmit: (email: string) => Promise<string | null>;

  /**
   * Set title of sign with email form.
   *
   * @type {string}
   */
  title: string;

  /**
   * Other option text for auth change.
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
  parentSubmit,
  title,
  otherOptionText,
}: IEmailSignProps) => {
  // State.
  const [state, setState] = useState(INITIAL_EMAIL_SIGN_STATE);

  // State decostruction.
  const { email, isLoading, isValidForm } = state;

  // Submited.
  const [completed, setCompleted] = useState(false);

  // Auth context.
  const authContext = useAuth();

  // First render.
  const firstRender = useRef(true);

  /**
   * On submit, prevent default and call parent submit.
   *
   * @param {FormEvent} e
   */
  const onSubmit = async (e: FormEvent) => {
    // Prevent default behaviour.
    e.preventDefault();

    // Get errors from parent submit.
    const parentError = await parentSubmit(email.value);

    // If parent submit success.
    if (!parentError) {
      // Set to email send.
      setCompleted(true);

      // Set the form to invalid.
      setState({ ...state, isValidForm: false });
    } else {
      // Set parent errors.
      parentSubmitError(parentError);
    }
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
   * On parent submir errors => Dsiplay here.
   *
   * @param {string} error
   */
  const parentSubmitError = (error: string | null) =>
    setState({
      ...state,
      isLoading: false,
      email: setInput(email, error),
    });

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
        {...{ onChange }}
        type="email"
        isValid={email.isValid}
        errorMessage={email.error}
        required
      />
      <FormButton
        disabled={!isValidForm}
        loading={isLoading}
        text="Enviar link"
      />
      <OtherOptions {...{ otherOptionText }} onClick={removePasswordlessAuth} />
    </>
  );

  return completed ? (
    <FullPageMessage
      message="Revisa la bandeja de tu correo."
      subMessage="Ya puedes cerrar esta pestaña."
    />
  ) : (
    <FormCreator {...{ onSubmit, content, title }} />
  );
};

export default EmailSignForm;
