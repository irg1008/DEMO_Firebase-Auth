import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
} from "react";

// Firebase object from context.
import firebase from "../../../../context/firebase";

// History context from react router dom.
import { useHistory } from "react-router-dom";

// Floating message context, to display aditional info in form on little floating messages.
import { useFloatingMsg } from "../../../../context/floating_message";

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
import {
  FormOptions,
  SignWithGoogle,
  ShowPassword,
  FormButton,
  FormLink,
} from "../../../../components/form/form_elements";

// Form creator utility and generic form initial state.
import FormCreator, {
  IGenericFormState,
  INITIAL_GENERIC_FORM_STATE,
} from "../../../../components/form/Form";

// Swap to passwordless button.
import { SignWithoutPassword } from "../../components/email_sign";

// Login state = generic state + email + password + hiddenPassword boolean value.
type ILogInState = IGenericFormState & {
  /**
   * Email to log in with.
   *
   * @type {IInputState}
   */
  email: IInputState;

  /**
   * Password that matches the log in email, to be checked on hash database.
   *
   * @type {IInputState}
   */
  password: IInputState;

  /**
   * Password is hidden, user interface value to show or hide value on form input.
   *
   * @type {boolean}
   */
  hiddenPass: boolean;
};

// Initial og in state = initial generic state + initial input state and hiddenPass to true.
const INITIAL_LOG_IN_STATE: ILogInState = {
  ...INITIAL_GENERIC_FORM_STATE,
  email: INITIAL_INPUT_STATE,
  password: INITIAL_INPUT_STATE,
  hiddenPass: true,
};

/**
 * Log in form.
 *
 * @returns
 */
const LogInForm: React.FC = () => {
  // Log in form state.
  const [state, setState] = useState(INITIAL_LOG_IN_STATE);

  // State decostruction.
  const { email, password, hiddenPass, isLoading, isValidForm } = state;

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
   * On log in form submit.
   *
   * @param {FormEvent} e
   */
  const onSubmit = async (e: FormEvent) => {
    // Prevent default behaviour.
    e.preventDefault();

    // Set the form to loading, so it can display some user interface to let the user know.
    setState({ ...state, isLoading: true });

    // Try the log in with firebase and catch any error that could ocurr.
    try {
      // Await for the firebase sign in function. Pass email and password to check user existance and validate.
      const signInResult = await firebase.doSignInWithEmailAndPassword(
        email.value,
        password.value
      );

      // If the result is successful => Get the user retrieved as response.
      const { user } = signInResult;

      // If the user is not veerified.
      if (user && !user.emailVerified) {
        // Sign out the user.
        firebase.doSignOut();

        // User is not verfied handler.
        userNotVerified(user);
      }
      // If the user is indeed verified.
      else {
        // All is good => Redirect to the landing page.
        history.push(ROUTES.LANDING.path);
      }
    } catch (error) {
      // If any error happens on the try block.
      // Stop the loading of the form and set the form to invalid.
      setState({ ...state, isLoading: false, isValidForm: false });

      // Check the different error cases.
      switch (error.code) {
        // If the error is "user not found".
        case "auth/user-not-found": {
          // User not found handler.
          userNotFound();

          break;
        }

        // Else if the error is "password for given user is incorrect".
        case "auth/wrong-password": {
          // Check all sign in methods for the given user email.
          const signMethods = await firebase.doFetchSignInMethodsForEmail(
            email.value
          );

          // If the user is to signed with email and password => Wrong password handler.
          if (signMethods.includes("password")) wrongPassword();
          // If the user is to signed with google => Email exists with google handler.
          else if (signMethods.includes("google.com")) emailExistsWithGoogle();
          // If user is not signed with password and google, must be signed with direct link so we let him know has well.
          else emailExistsWithDirectLink();

          break;
        }

        // Else if the error is that too many requests were made.
        case "auth/too-many-requests": {
          // Too many request were made handler.
          tooManyRequest();

          break;
        }
      }
    }
  };

  // When email or password validation value is changed => Check the entire form validation.
  useEffect(() => {
    // Only check if not first render.
    if (!firstRender.current) {
      // Set the form validation to email and password both valid.
      setState((oldState) => {
        return { ...oldState, isValidForm: email.isValid && password.isValid };
      });
    }
  }, [email.isValid, password.isValid]);

  // On email change =>
  useEffect(() => {
    if (!firstRender.current) {
      setState((oldState) => {
        return {
          ...oldState,
          email: setInput(
            oldState.email,
            inputValidation.errorEmail(email.value)
          ),
          password:
            oldState.password.isValid === false
              ? setInput(oldState.password, null)
              : oldState.password,
        };
      });
    }
  }, [email.value]);

  useEffect(() => {
    if (!firstRender.current) {
      setState((oldState) => {
        return {
          ...oldState,
          password:
            password.value.length === 0
              ? setInput(
                  oldState.password,
                  inputValidation.errorPassword(password.value)
                )
              : {
                  ...oldState.password,
                  isValid: true,
                },
        };
      });
    }
  }, [password.value]);

  const wrongPassword = () =>
    setState({
      ...state,
      password: setInput(password, "La contraseña no es correcta"),
    });

  const emailExistsWithGoogle = () =>
    setState({
      ...state,
      email: setInput(
        email,
        "Este correo está conectado a una cuenta de Google. Si quieres crearte una contraseña, inicia abajo y crea una en tu perfil"
      ),
    });

  const emailExistsWithDirectLink = () =>
    setState({
      ...state,
      email: setInput(
        email,
        "Esto correo no tiene contraseña, inicia mediante link y crea una en tu perfil"
      ),
    });

  const userNotFound = () =>
    setState({
      ...state,
      email: setInput(email, "Este email no corresponde con ninguna cuenta"),
    });

  const tooManyRequest = () => {
    const message = (
      <>
        {"Demasiados intentos con este correo, espera un tiempo para "}
        <span
          style={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={onSubmit}
        >
          volver a intentarlo
        </span>
      </>
    );

    floatingMsg.dispatch({
      type: "ADD_FLOATING",
      name: "demasiadosIntentos",
      message,
      timeoutTime: "default",
    });

    setState({ ...state, isValidForm: true });
  };

  const userNotVerified = (user: firebase.User) => {
    const resendEmailVerification = async () => {
      try {
        await firebase.doSendEmailVerification(user);
        floatingMsg.dispatch({
          type: "ADD_FLOATING",
          name: "reenviarCorreo",
          message: 'Te hemos reenviado un correo a "' + email.value + '"',
          timeoutTime: "default",
        });
      } catch (error) {
        if (error.code === "auth/too-many-requests") {
          floatingMsg.dispatch({
            type: "ADD_FLOATING",
            name: "demasiadosIntentos",
            message:
              "Te acabamos de enviar un correo de verificación. Revisa tu bandeja",
            timeoutTime: "default",
          });
        }
      }

      setState((oldState) => {
        return { ...oldState, email: setInput(email, null) };
      });
    };

    const error = (
      <>
        {"Verifica la cuenta para poder entrar. "}
        <span
          style={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={() => resendEmailVerification()}
        >
          Reenviar correo
        </span>
      </>
    );

    setState({
      ...state,
      email: setInput(email, error),
      isLoading: false,
      isValidForm: false,
    });
  };

  const setHidddenPass = (hiddenPass: boolean) =>
    setState({ ...state, hiddenPass });

  const formContent = (
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
      <ShowPassword hiddenPass={hiddenPass} setHidddenPass={setHidddenPass} />
      <FormButton
        disabled={!isValidForm}
        loading={isLoading}
        text="Iniciar sesión"
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
