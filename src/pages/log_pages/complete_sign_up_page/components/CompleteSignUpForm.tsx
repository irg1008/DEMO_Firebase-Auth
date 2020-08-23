import React, {
  ChangeEvent,
  FormEvent,
  useState,
  useRef,
  useEffect,
} from "react";

// Firebase consumer.
import firebase from "../../../../context/firebase";

// History context from react router dom.
import { useHistory } from "react-router-dom";

// Routes constant, to acces and navigate between paths.
import { ROUTES } from "../../../../routes";

// Form input and input types.
import FormInput, {
  IInputState,
  INITIAL_INPUT_STATE,
  setInput,
} from "../../../../components/form/form_elements/FormInput";

// Form input validations.
import inputValidation from "../../../../components/form/utils";

// Form elements.
import { FormButton } from "../../../../components/form/form_elements";

// Form creator utility and generic form initial state.
import FormCreator, {
  INITIAL_GENERIC_FORM_STATE,
  IGenericFormState,
} from "../../../../components/form/Form";

// Complete form state = generic + username.
type ICompleteForm = IGenericFormState & {
  /**
   * Username to update user with.
   *
   * @type {IInputState}
   */
  username: IInputState;
};

// Initial state.
const INITIAL_COMPLETE_STATE: ICompleteForm = {
  ...INITIAL_GENERIC_FORM_STATE,
  username: INITIAL_INPUT_STATE,
};

/**
 *Form to complete user username.
 *
 * @returns
 */
const CompleteSignUpForm: React.FC = () => {
  // State.
  const [state, setState] = useState(INITIAL_COMPLETE_STATE);

  // State decostruction.
  const { username, isLoading, isValidForm } = state;

  // History context.
  const history = useHistory();

  // First render reference.
  const firstRender = useRef(true);

  /**
   * On input change, change the value of the changed input and recheck validation.
   *
   * @param {ChangeEvent<HTMLInputElement>} e
   */
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Prevent default behaviour.
    e.preventDefault();

    // Get the name of the input and the current value inside it.
    const { name, value } = e.target;

    // Check that the first render is not true.
    firstRender.current = false;

    // Change the state with the new value for the changed input.
    setState({ ...state, [name]: { value } });
  };

  /**
   * On form submit.
   *
   * @param {FormEvent} event
   */
  const onSubmit = (event: FormEvent) => {
    // Prevent default behaviour.
    event.preventDefault();

    // Form is loading.
    setState({ ...state, isLoading: true });

    // Update user name.
    firebase.doCreateProfile(username.value);

    // Stop loading form.
    setState({ ...state, isLoading: false });

    // Push to landing.
    history.push(ROUTES.LANDING.path);

    // Reload to update name.
    window.location.reload(false);
  };

  // When email or password validation value is changed => Check the entire form validation.
  useEffect(() => {
    // Only check if not first render.
    if (!firstRender.current) {
      // Set the form validation to email and password both valid.
      setState((oldState) => {
        return { ...oldState, isValidForm: username.isValid };
      });
    }
  }, [username.isValid]);

  // On username change => Check username validation.
  useEffect(() => {
    if (!firstRender.current) {
      setState((oldState) => {
        return {
          ...oldState,
          username: setInput(
            oldState.username,
            inputValidation.errorUsername(username.value)
          ),
        };
      });
    }
  }, [username.value]);

  // Form Content
  const content = (
    <>
      <FormInput
        label="Nombre"
        name="username"
        value={username.value}
        {...{ onChange }}
        type="text"
        isValid={username.isValid}
        errorMessage={username.error}
        required
      />
      <FormButton
        disabled={!isValidForm}
        loading={isLoading}
        text="Finalizar creación de cuenta"
      />
    </>
  );

  // Form title.
  const title = "completa el registro";

  return <FormCreator {...{ onSubmit, content, title }} />;
};

export default CompleteSignUpForm;
