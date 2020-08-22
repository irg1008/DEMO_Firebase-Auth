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

  // On email change => Check the email and reset the password.
  useEffect(() => {
    // Only check if not first render.
    if (!firstRender.current) {
      // Check errros with email value.
      // Reset password in the case password is correct and email is not.
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

  // On password change => Check password.
  useEffect(() => {
    // Only check if not first render.
    if (!firstRender.current) {
      // Check the validate of password only on password is empty.
      // We are not interested in this case in any error like length or must use characters.
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

  /**
   * Submit handler => Wrong password.
   *
   */
  const wrongPassword = () =>
    setState({
      ...state,
      password: setInput(password, "La contraseña no es correcta"),
    });

  /**
   * Submit handler => Email exists with Google.
   *
   */
  const emailExistsWithGoogle = () =>
    setState({
      ...state,
      email: setInput(
        email,
        "Este correo está conectado a una cuenta de Google. Si quieres crearte una contraseña, inicia abajo y crea una en tu perfil"
      ),
    });

  /**
   * Submit handler => Email exists with direct link.
   *
   */
  const emailExistsWithDirectLink = () =>
    setState({
      ...state,
      email: setInput(
        email,
        "Esto correo no tiene contraseña, inicia mediante link y crea una en tu perfil"
      ),
    });

  /**
   * Submit handler => User with given email is not found.
   *
   */
  const userNotFound = () =>
    setState({
      ...state,
      email: setInput(email, "Este email no corresponde con ninguna cuenta"),
    });

  /**
   * Submit handler => Too many request on log in.
   *
   */
  const tooManyRequest = () => {
    // Message to show on too many request error.
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

    // Add floating message to let know the user has tried too many times and needs to wait to try again.
    floatingMsg.dispatch({
      type: "ADD_FLOATING",
      name: "demasiadosIntentos",
      message,
      timeoutTime: "default",
    });

    // Set the state to valid form. This is mandatory because we set it to non valid on the submit function.
    setState({ ...state, isValidForm: true });
  };

  /**
   * Submit handler => User is not verified.
   *
   * @param {firebase.User} user
   */
  const userNotVerified = (user: firebase.User) => {
    /**
     * Resend user email verification.
     *
     */
    const resendEmailVerification = async () => {
      // Try to resend email verification.
      try {
        // Resend email verification message.
        await firebase.doSendEmailVerification(user);

        // Floating message to notify successful sent message to email.
        floatingMsg.dispatch({
          type: "ADD_FLOATING",
          name: "reenviarCorreo",
          message: 'Te hemos reenviado un correo a "' + email.value + '"',
          timeoutTime: "default",
        });
      } catch (error) {
        // If user tries too many times, we dispatch a floating message letting him know he must wait to resend a new email.
        if (error.code === "auth/too-many-requests") {
          // Floating message to let know the user too many attemps were made.
          floatingMsg.dispatch({
            type: "ADD_FLOATING",
            name: "demasiadosIntentos",
            message:
              "Te acabamos de enviar un correo de verificación. Revisa tu bandeja",
            timeoutTime: "default",
          });
        }
      }

      // Set email error to none.
      setState((oldState) => {
        return { ...oldState, email: setInput(email, null) };
      });
    };

    // Error to show on email input error.
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

    // Set the email with the user is not verified error, stop the loading and set the form to non valid.
    setState({
      ...state,
      email: setInput(email, error),
      isLoading: false,
      isValidForm: false,
    });
  };

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

  // Form bottom component.
  const bottomComponent = (
    <FormOptions
      firstOption={<SignWithGoogle text="Inicio con Google" />}
      secondOption={<SignWithoutPassword text="Inicio con link" />}
    />
  );

  // Form title.
  const title = "inicia sesión";

  return <FormCreator {...{ onSubmit, content, bottomComponent, title }} />;
};

export default LogInForm;
