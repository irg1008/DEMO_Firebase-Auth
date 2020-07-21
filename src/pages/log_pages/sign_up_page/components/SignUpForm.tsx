import React, {
  FormEvent,
  ChangeEvent,
  useState,
  useRef,
  useEffect,
} from "react";
import { useHistory } from "react-router-dom";

// Routes
import { ROUTES } from "../../../../routes";

// Form elements
import {
  FormButton,
  ShowPassword,
  FormOptions,
  FormLink,
  SignWithGoogle,
} from "../../../../components/form/form_elements";

import FormInput, {
  IInputState,
  INITIAL_INPUT_STATE,
  validateInput,
} from "../../../../components/form/form_elements/FormInput";

// Sign without password
import { SignWithoutPassword } from "../../components/email_sign";

// Floating Message
import { useFloatingMsg } from "../../../../context/floating_message";

// Form Wrapper. Optional, but helps us create a common structure between forms.
// Validation of form, useful when handling validation of inputs.
import FormCreator, {
  IGenericFormState,
  INITIAL_GENERIC_FORM_STATE,
} from "../../../../components/form/Form";
import inputValidation from "../../../../components/form/utils";

// Firebase
import { firebase } from "../../../../context/firebase";

type ISignUpState = IGenericFormState & {
  username: IInputState;
  email: IInputState;
  password: IInputState;
  confirmPassword: IInputState;
  hiddenPass: boolean;
};

const INITIAL_LOG_IN_STATE: ISignUpState = {
  ...INITIAL_GENERIC_FORM_STATE,
  username: INITIAL_INPUT_STATE,
  email: INITIAL_INPUT_STATE,
  password: INITIAL_INPUT_STATE,
  confirmPassword: INITIAL_INPUT_STATE,
  hiddenPass: true,
};

const SignUpForm: React.FC = () => {
  const [state, setState] = useState(INITIAL_LOG_IN_STATE);

  const {
    username,
    email,
    password,
    confirmPassword,
    hiddenPass,
    isLoading,
    isValidForm,
  } = state;

  const history = useHistory();

  const floatingMsgContext = useFloatingMsg();

  const firstRender = useRef(true);

  /**
   * On submit form.
   *
   * @param {FormEvent} event Form event.
   * @memberof SignUpForm
   */
  const onSubmit = async (event: FormEvent): Promise<void> => {
    // Prevent default behaviour.
    event.preventDefault();

    // Loading submit
    setState({ ...state, isLoading: true });

    // Email is disposable.
    const disposableResponse = await inputValidation.fetchEmailIsDisposable(
      email.value
    );
    if (disposableResponse.disposable) {
      emailIsDisposable();
    } else {
      signUpWithFirebase();
    }
  };

  /**
   *
   *
   * @memberof SignUpForm
   */
  const signUpWithFirebase = () => {
    firebase
      .doCreateUserWithEmailAndPassword(email.value, confirmPassword.value)
      .then(() => {
        // Update user username.
        firebase.doCreateProfile(username.value);

        // Send verification message.
        firebase.doSendEmailVerification().then(() => {
          // Set message
          floatingMsgContext.dispatch({
            type: "SHOW_FLOATING",
            message:
              'Te hemos enviado un correo a "' +
              email.value +
              '" para confirmar la cuenta y poder iniciar sesión',
          });
        });

        // Force sign and route to log in.
        firebase.doSignOut().then(() => {
          // Redirect to log in.
          history.push(ROUTES.LOG_IN.path);
        });
      })
      .catch((error: any) => {
        // Stop loading if error
        setState({ ...state, isLoading: false });
        // Note: This error code returns a 400 error to the console, exposing the app id or api key. This is not convinient but does not expose any data of the users. This happens because we manage the white domains that can access this data. Any other domain won't be able to acces users data even if they have de api key.
        if (error.code === "auth/email-already-in-use") emailAlreadyInUse();
      });
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();

    const { name, value } = e.target;

    firstRender.current = false;

    setState({ ...state, [name]: { value } });
  };

  useEffect(() => {
    if (!firstRender.current) {
      setState((oldState) => {
        return {
          ...oldState,
          isValidForm:
            username.isValid &&
            email.isValid &&
            password.isValid &&
            confirmPassword.isValid,
        };
      });
    }
  }, [
    username.isValid,
    email.isValid,
    password.isValid,
    confirmPassword.isValid,
  ]);

  useEffect(() => {
    if (!firstRender.current) {
      setState((oldState) => {
        return {
          ...oldState,
          username: validateInput(
            oldState.username,
            inputValidation.checkUsername(username.value).error
          ),
        };
      });
    }
  }, [username.value]);

  useEffect(() => {
    if (!firstRender.current) {
      setState((oldState) => {
        return {
          ...oldState,
          email: validateInput(
            oldState.email,
            inputValidation.checkEmail(email.value).error
          ),
        };
      });
    }
  }, [email.value]);

  const emailAlreadyInUse = (): void =>
    setState({
      ...state,
      email: validateInput(
        email,
        "Este correo ya está en uso, inicia sesión o prueba con otro"
      ),
    });

  useEffect(() => {
    if (!firstRender.current) {
      setState((oldState) => {
        return {
          ...oldState,
          password: validateInput(
            oldState.password,
            inputValidation.checkPassword(password.value).error
          ),
          confirmPassword: validateInput(
            oldState.confirmPassword,
            inputValidation.checkConfirmPassword(
              password.value,
              confirmPassword.value
            ).error
          ),
        };
      });
    }
  }, [password.value, confirmPassword.value]);

  const emailIsDisposable = (): void =>
    setState({
      ...state,
      isLoading: false,
      email: validateInput(email, "El dominio de email no es válido"),
    });

  /**
   * Toggles password visibility.
   *
   * @memberof SignUpForm
   */
  const togglePasswordVisibility = (): void =>
    setState({ ...state, hiddenPass: !hiddenPass });

  // Form Content
  const formContent = (
    <>
      <FormInput
        label="Nombre"
        name="username"
        value={username.value}
        onChange={onChange}
        type="text"
        isValid={username.isValid}
        errorMessage={username.error}
        required
      />
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
      <FormInput
        label="Contraseña"
        name="password"
        value={password.value}
        onChange={onChange}
        type="password"
        isValid={password.isValid}
        errorMessage={password.error}
        hiddenPass={hiddenPass}
        required
      />
      <FormInput
        label="Repite la contraseña"
        name="confirmPassword"
        value={confirmPassword.value}
        onChange={onChange}
        type="password"
        isValid={confirmPassword.isValid}
        errorMessage={confirmPassword.error}
        hiddenPass={hiddenPass}
        required
      />
      <ShowPassword
        hiddenPass={hiddenPass}
        onClick={togglePasswordVisibility}
      />
      <FormButton
        disabled={!isValidForm}
        loading={isLoading}
        text={
          isLoading ? "Comprobando que todo esté correcto..." : "Crear Cuenta"
        }
      />
      <FormLink
        text="¿Ya estás registrado?"
        linkText="Inicia sesión"
        to={ROUTES.LOG_IN.path}
      />
    </>
  );

  // Form bottom component
  const formBottomComponent = (
    <FormOptions
      firstOption={<SignWithGoogle text="Registro con Google" />}
      secondOption={<SignWithoutPassword text="Registro con link" />}
    />
  );

  // If user is logged push to landing.
  return (
    <FormCreator
      onSubmit={onSubmit}
      content={formContent}
      bottomComponent={formBottomComponent}
      title="únete"
    />
  );
};

export default SignUpForm;
