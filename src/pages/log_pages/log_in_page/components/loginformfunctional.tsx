import React, {
  FormEvent,
  ChangeEvent,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useHistory } from "react-router-dom";

// Form elements
import {
  FormInput,
  FormButton,
  ShowPassword,
  FormOptions,
  FormLink,
  SignWithGoogle,
} from "../../../../components/form/form_elements";

import { SignWithoutPassword } from "../../components/email_sign";

// Form Wrapper. Optional, but helps us create a common structure between forms.
// Validation of form, useful when handling validation of inputs.
import FormCreator from "../../../../components/form";
import inputValidation from "../../../../components/form/utils";

// Routes
import { ROUTES } from "../../../../routes";

// Firebase
import { firebase } from "../../../../context/firebase";

// Input state
import {
  IInputState,
  INITIAL_INPUT_STATE,
} from "../../../../components/form/form_elements/FormInput";

// Floating Message
import { useFloatingMsg } from "../../../../context/floating_message";

// Types of state.
type ILoginState = {
  /**
   * Email.
   *
   * @type {IInputState}
   */
  email: IInputState;

  /**
   * PasswordOne.
   *
   * @type {IInputState}
   */
  password: IInputState;

  /**
   * State of password visibility
   *
   * @type {boolean}
   */
  hiddenPass: boolean;

  /**
   * Form is valid.
   *
   * @type {boolean}
   */
  isValid?: boolean;

  /**
   * Form is signing in and retrieving eny error ocurred.
   *
   * @type {boolean}
   */
  loading?: boolean;
};

// Initial state. Valid states only on initial state.
const INITIAL_STATE: ILoginState = {
  email: { ...INITIAL_INPUT_STATE },
  password: { ...INITIAL_INPUT_STATE },
  hiddenPass: true,
};

const LogInForm: React.FC = () => {
  const [state, setState] = useState(INITIAL_STATE);

  const history = useHistory();
  const floatingMsgContext = useFloatingMsg();

  const onSubmit = (event: FormEvent): void => {
    // Prevent default behaviour.
    event.preventDefault();

    // State decostrution.
    const { email, password } = state;

    // Loading submit
    setState({ ...state, loading: true });

    // On submit => log in with email and password.
    firebase
      .doSignInWithEmailAndPassword(email.value, password.value)
      .then((result: any) => {
        // User
        const { user } = result;

        // If user exists but is not verified
        if (!user.emailVerified) {
          // Force sign out.
          firebase.doSignOut();

          // Set error message on email.
          userNotVerfied(user);

          // Stop loading form submit.
          setState({ ...state, loading: false });
        } else {
          history.push(ROUTES.LANDING.path);
        }
      })
      .catch((error: any) => {
        // Stop loading form submit.
        setState({ ...state, loading: false });
        // Error handling
        if (error.code === "auth/user-not-found") userNotFound();
        else if (error.code === "auth/wrong-password") {
          // If password is incorrect => Check if reason is email is with other provider.
          firebase
            .doFetchSignInMethodsForEmail(email.value)
            .then((methods: any) => {
              if (methods.includes("password")) {
                wrongPassword();
              } else if (methods.includes("google.com")) {
                emailExistsWithGoogle();
              } else {
                emailExistsWithDirectLink();
              }
            });
        }
      });
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();

    const { name, value } = e.target;

    setState({
      ...state,
      [name]: { value },
    });
  };

  const validateForm = useCallback((): void => {
    console.log(state.email.isValid && state.password.isValid);
    setState((oldState) => {
      return {
        ...oldState,
        isValid: state.email.isValid && state.password.isValid,
      };
    });
  }, [state.password, state.email]);

  useEffect(() => {
    validateForm();
  }, [validateForm]);

  const validatePassword = useCallback((): void => {
    // Only validate empty password.
    if (state.password.value.length === 0) {
      const passwordCheck = inputValidation.checkFirstPassword(
        state.password.value
      );
      // Change password info.
      setState((oldState) => {
        return {
          ...oldState,
          password: { ...oldState.password, ...passwordCheck },
        };
      });
    }
  }, [state.password.value]);

  useEffect(() => {
    validatePassword();
  }, [validatePassword]);

  const validateEmail = useCallback((): void => {
    // Check email validity.
    const emailCheck = inputValidation.checkEmail(state.email.value);
    // On email change set password valid.
    if (state.password.isValid === false) validatePassword();
    // Change email info.
    setState((oldState) => {
      return {
        ...oldState,
        email: {
          ...oldState.email,
          ...emailCheck,
        },
      };
    });
  }, [state.email.value, validatePassword, state.password.isValid]);

  useEffect(() => {
    validateEmail();
  }, [validateEmail]);

  /**
   * Wrong password on submit.
   *
   * @memberof LogInPage
   */
  const wrongPassword = () =>
    setState({
      ...state,
      password: {
        // We reset the value in case email is wrong, not password.
        ...state.password,
        isValid: false,
        errorMsg: "La contraseña no es correcta.",
      },
    });

  const emailExistsWithGoogle = () =>
    setState({
      ...state,
      email: {
        ...state.email,
        isValid: false,
        errorMsg:
          "Este correo está conectado a una cuenta de Google. Si quieres create con contraseña, incia abajo y crea una en tu perfil",
      },
    });

  const emailExistsWithDirectLink = (): void =>
    setState({
      ...state,
      email: {
        ...state.email,
        isValid: false,
        errorMsg:
          "Esto correo no tiene contraseña, inicia mediante link y crea una en tu perfil",
      },
    });

  /**
   * User not on submit.
   *
   * @memberof LogInPage
   */
  const userNotFound = (): void =>
    setState({
      ...state,
      email: {
        ...state.email,
        isValid: false,
        errorMsg: "Este email no corresponde con ninguna cuenta",
      },
    });

  /**
   * User is not verified.
   *
   * @memberof LogInPage
   */
  const userNotVerfied = (user: any): void => {
    // Email
    const { email } = state;

    // Resend email verification.
    const resendEmailVerification = (): void => {
      // Send verification message.
      user.sendEmailVerification();

      // Set message
      floatingMsgContext.dispatch({
        type: "SHOW_FLOATING",
        message: 'Te hemos reenviado un correo a "' + email.value + '"',
      });

      // Change state.
      setState({
        ...state,
        email: {
          ...email,
          isValid: true,
        },
      });
    };

    // Error msg
    const errorMsg = (
      <>
        {"Verifica la cuenta para poder entrar. "}
        <span
          style={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={resendEmailVerification}
        >
          Reenviar correo
        </span>
      </>
    );

    // Change state.
    setState({
      ...state,
      email: {
        ...email,
        isValid: false,
        errorMsg,
      },
    });
  };

  const togglePasswordVisibility = () =>
    setState({ ...state, hiddenPass: !state.hiddenPass });

  // Form Content
  const formContent = (
    <>
      <FormInput
        label="Email"
        name="email"
        value={state.email.value}
        onChange={onChange}
        type="email"
        isValid={state.email.isValid}
        errorMessage={state.email.errorMsg}
        required
      />
      <FormInput
        label="Contraseña"
        name="password"
        value={state.password.value}
        onChange={onChange}
        type="password"
        isValid={state.password.isValid}
        errorMessage={state.password.errorMsg}
        hiddenPass={state.hiddenPass}
        required
      />
      <ShowPassword
        hiddenPass={state.hiddenPass}
        onClick={togglePasswordVisibility}
      />
      <FormButton
        disabled={!state.isValid}
        loading={state.loading}
        text={state.loading ? "Comprobando datos..." : "Iniciar sesión"}
      />
      <FormLink
        text="¿No estás registrado?"
        linkText="Regístrate aquí"
        to={ROUTES.SIGN_UP.path}
      />
    </>
  );

  // Form bottom component
  const formBottomComponent = (
    <FormOptions
      firstOption={<SignWithGoogle text="Inicio con Google" />}
      secondOption={<SignWithoutPassword text="Inicio con link" />}
    />
  );

  // If user is logged push to landing.
  return (
    <FormCreator
      onSubmit={onSubmit}
      content={formContent}
      bottomComponent={formBottomComponent}
      title="inicia sesión"
    />
  );
};

export default LogInForm;
