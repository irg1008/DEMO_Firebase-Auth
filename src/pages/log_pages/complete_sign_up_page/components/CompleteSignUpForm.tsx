import React, {
  ChangeEvent,
  FormEvent,
  useState,
  useRef,
  useEffect,
} from "react";

// Firebase consumer
import firebase from "../../../../context/firebase";

// Form creator and input validations
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
import {
  INITIAL_GENERIC_FORM_STATE,
  IGenericFormState,
} from "../../../../components/form/Form";

type ICompleteForm = IGenericFormState & {
  username: IInputState;
};

const INITIAL_COMPLETE_STATE: ICompleteForm = {
  ...INITIAL_GENERIC_FORM_STATE,
  username: INITIAL_INPUT_STATE,
};

const CompleteSignUpForm: React.FC = () => {
  const [state, setState] = useState(INITIAL_COMPLETE_STATE);

  const { username, isLoading, isValidForm } = state;

  const firstRender = useRef(true);

  const onSubmit = (event: FormEvent) => {
    // Prevent default behaviour.
    event.preventDefault();

    // Submit is loading.
    setState({ ...state, isLoading: true });

    // Update user name.
    firebase.doUpdateProfile(username.value).then(() => {
      // Submit stops loading.
      setState({ ...state, isLoading: false });
    });
  };

  /**
   * On input change.
   *
   * @memberof CompleteSignUpForm
   */
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const { name, value } = e.target;

    firstRender.current = false;

    setState({ ...state, [name]: { value } });
  };

  useEffect(() => {
    if (!firstRender.current) {
      setState((oldState) => {
        return { ...oldState, isValidForm: username.isValid };
      });
    }
  }, [username.isValid]);

  useEffect(() => {
    if (!firstRender.current) {
      setState((oldState) => {
        return {
          ...oldState,
          email: setInput(
            oldState.username,
            inputValidation.errorUsername(username.value)
          ),
        };
      });
    }
  }, [username.value]);

  // Form Content
  const formContent = (
    <>
      <FormInput
        label="Nombre"
        name="username"
        value={username.value}
        onChange={onChange}
        type="text"
        isValid={isValidForm}
        errorMessage={username.error}
        required
      />
      <FormButton
        disabled={!isValidForm}
        loading={isLoading}
        text={
          isLoading ? "Finalizando registro..." : "Finalizar creación de cuenta"
        }
      />
    </>
  );

  return (
    <FormCreator
      onSubmit={onSubmit}
      content={formContent}
      title="completa el registro"
    />
  );
};

export default CompleteSignUpForm;
