import React, {
  FormEvent,
  ChangeEvent,
  useState,
  useRef,
  useEffect,
} from "react";

// Firebase.
import firebase from "../../../../context/firebase";

// History context from react router dom.
import { useHistory } from "react-router-dom";

// Floating message context, to display aditional info in form on little floating messages.
import { useFloatingMsg } from "../../../../context/floating_message";

// Routes.
import { ROUTES } from "../../../../routes";

// Form input.
import FormInput, {
  IInputState,
  INITIAL_INPUT_STATE,
  setInput,
} from "../../../../components/form/form_elements/FormInput";

// Form input validations.
import inputValidation from "../../../../components/form/utils";

// Form elements.
import {
  FormButton,
  ShowPassword,
  FormOptions,
  FormLink,
  SignWithGoogle,
} from "../../../../components/form/form_elements";

// Form creator utility and generic form initial state.
import FormCreator, {
  IGenericFormState,
  INITIAL_GENERIC_FORM_STATE,
} from "../../../../components/form/Form";

// Sign without password.
import { SignWithoutPassword } from "../../components/email_sign";

// Sign up state = generic state + email + username + password and hiddenPassword state.
type ISignUpState = IGenericFormState & {
  /**
   * Usernam eto save with new user.
   *
   * @type {IInputState}
   */
  username: IInputState;

  /**
   * Email to sign up with.
   *
   * @type {IInputState}
   */
  email: IInputState;

  /**
   * Password to match with the new user.
   *
   * @type {IInputState}
   */
  password: IInputState;

  /**
   * Password confirmation.
   *
   * @type {IInputState}
   */
  confirmPassword: IInputState;

  /**
   * Password is hidden, user interface value to show or hide value on form input.
   *
   * @type {boolean}
   */
  hiddenPass: boolean;
};

// Initial sign up state.
const INITIAL_LOG_IN_STATE: ISignUpState = {
  ...INITIAL_GENERIC_FORM_STATE,
  username: INITIAL_INPUT_STATE,
  email: INITIAL_INPUT_STATE,
  password: INITIAL_INPUT_STATE,
  confirmPassword: INITIAL_INPUT_STATE,
  hiddenPass: true,
};

/**
 * Sign up form.
 *
 * @returns
 */
const SignUpForm: React.FC = () => {
  // Sign up state.
  const [state, setState] = useState(INITIAL_LOG_IN_STATE);

  // State decostruction.
  const {
    username,
    email,
    password,
    confirmPassword,
    hiddenPass,
    isLoading,
    isValidForm,
  } = state;

  // History context.
  const history = useHistory();

  // Floating msg context.
  const floatingMsg = useFloatingMsg();

  // First render is true. Change this on first input change.
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
   * On sign up form submit.
   *
   * @param {FormEvent} e
   */
  const onSubmit = async (e: FormEvent) => {
    // Prevent default behaviour.
    e.preventDefault();

    // Set the form to loading, so it can display some user interface to let the user know.
    setState({ ...state, isLoading: true });

    // Check if email is disposable.
    const disposableResponse = await inputValidation.fetchEmailIsDisposable(
      email.value
    );

    // If email is disposable => Call disposable email error handler.
    // If email is not disposable => Try to sign up with firebase.
    disposableResponse.disposable ? emailIsDisposable() : signUpWithFirebase();
  };

  /**
   *
   *
   * @memberof SignUpForm
   */
  const signUpWithFirebase = async () => {
    try {
      // Try sign up with firebase.
      const signUpResult = await firebase.doCreateUserWithEmailAndPassword(
        email.value,
        password.value
      );

      // Get the user resulted from the sign up.
      const { user } = signUpResult;

      // Create user profile.
      firebase.doCreateProfile(username.value);

      // If user correct from result.
      if (user) {
        // Send verification message.
        await firebase.doSendEmailVerification(user);

        // Set message.
        floatingMsg.dispatch({
          type: "ADD_FLOATING",
          name: "enviarCorreoVerificacion",
          message: `Te hemos enviado un correo a "${email.value}" para confirmar la cuenta y poder iniciar sesión`,
          timeoutTime: "default",
        });
      }

      // Force sign and route to log in.
      await firebase.doSignOut();
      // Redirect to log in.
      history.push(ROUTES.LOG_IN.path);
    } catch (error) {
      console.log(error);
      // If any error happens.
      // Stop loading.
      setState({ ...state, isLoading: false });
      // Note: This error code returns a 400 error to the console, exposing the app id or api key. This is not convinient but does not expose any data of the users. This happens because we manage the white domains that can access this data. Any other domain won't be able to acces users data even if they have de api key.
      // Email already in use error handler.
      if (error.code === "auth/email-already-in-use") emailAlreadyInUse();
    }
  };

  // When username, email, password or confirPassword  validation value is changed => Check the entire form validation.
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

  // On email change => Check email validation.
  useEffect(() => {
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

  // On password or confirm password change => Check both validations.
  useEffect(() => {
    if (!firstRender.current) {
      setState((oldState) => {
        return {
          ...oldState,
          password: setInput(
            oldState.password,
            inputValidation.errorPassword(password.value)
          ),
          confirmPassword: setInput(
            oldState.confirmPassword,
            inputValidation.errorPasswordConfirm(
              password.value,
              confirmPassword.value
            )
          ),
        };
      });
    }
  }, [password.value, confirmPassword.value]);

  /**
   * Email is already in use handler.
   *
   */
  const emailAlreadyInUse = () =>
    setState({
      ...state,
      email: setInput(
        email,
        "Este correo ya está en uso, inicia sesión o prueba con otro"
      ),
    });

  /**
   * Email is disposable handler.
   *
   */
  const emailIsDisposable = () =>
    setState({
      ...state,
      isLoading: false,
      email: setInput(email, "El dominio de email no es válido"),
    });

  /**
   * Hidden pass toggler.
   *
   * @param {boolean} hiddenPass
   */
  const setHidddenPass = (hiddenPass: boolean) =>
    setState({ ...state, hiddenPass });

  // Form content to pass to the form creator.
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
      <FormInput
        label="Contraseña"
        name="password"
        value={password.value}
        {...{ onChange, hiddenPass }}
        type="password"
        isValid={password.isValid}
        errorMessage={password.error}
        required
      />
      <FormInput
        label="Repite la contraseña"
        name="confirmPassword"
        value={confirmPassword.value}
        {...{ onChange, hiddenPass }}
        type="password"
        isValid={confirmPassword.isValid}
        errorMessage={confirmPassword.error}
        required
      />
      <ShowPassword {...{ hiddenPass, setHidddenPass }} />
      <FormButton
        disabled={!isValidForm}
        loading={isLoading}
        text="Crear Cuenta"
      />
      <FormLink
        text="¿Ya estás registrado?"
        linkText="Inicia sesión"
        to={ROUTES.LOG_IN.path}
      />
    </>
  );

  // Form bottom component.
  const bottomComponent = (
    <FormOptions
      firstOption={<SignWithGoogle text="Registro con Google" />}
      secondOption={<SignWithoutPassword text="Registro con link" />}
    />
  );

  // Form title.
  const title = "únete";

  return <FormCreator {...{ onSubmit, content, bottomComponent, title }} />;
};

export default SignUpForm;
