import inputValidation from "../../../../components/form/utils";
import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
} from "react";
import FormInput, {
  IInputState,
  INITIAL_INPUT_STATE,
  setInput,
} from "../../../../components/form/form_elements/FormInput";
import {
  FormOptions,
  SignWithGoogle,
  ShowPassword,
  FormButton,
  FormLink,
} from "../../../../components/form/form_elements";
import { SignWithoutPassword } from "../../components/email_sign";
import FormCreator, {
  IGenericFormState,
  INITIAL_GENERIC_FORM_STATE,
} from "../../../../components/form/Form";
import firebase from "../../../../context/firebase";
import { useHistory } from "react-router-dom";
import { useFloatingMsg } from "../../../../context/floating_message";
import { ROUTES } from "../../../../routes";

type ILogInState = IGenericFormState & {
  email: IInputState;
  password: IInputState;
  hiddenPass: boolean;
};

const INITIAL_LOG_IN_STATE: ILogInState = {
  ...INITIAL_GENERIC_FORM_STATE,
  email: INITIAL_INPUT_STATE,
  password: INITIAL_INPUT_STATE,
  hiddenPass: true,
};

const LogInForm: React.FC = () => {
  const [state, setState] = useState(INITIAL_LOG_IN_STATE);

  const { email, password, hiddenPass, isLoading, isValidForm } = state;

  const history = useHistory();

  const floatingMsg = useFloatingMsg();

  const firstRender = useRef(true);

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();

    const { name, value } = e.target;

    firstRender.current = false;

    setState({ ...state, [name]: { value } });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setState({ ...state, isLoading: true });

    try {
      const signInResult = await firebase.doSignInWithEmailAndPassword(
        email.value,
        password.value
      );
      const { user } = signInResult;

      if (user && !user.emailVerified) {
        firebase.doSignOut();

        userNotVerified(user);
      } else {
        history.push(ROUTES.LANDING.path);
      }
    } catch (error) {
      setState({ ...state, isLoading: false, isValidForm: false });
      if (error.code === "auth/user-not-found") {
        userNotFound();
      } else if (error.code === "auth/wrong-password") {
        const signMethods = await firebase.doFetchSignInMethodsForEmail(
          email.value
        );
        if (signMethods.includes("password")) wrongPassword();
        else if (signMethods.includes("google.com")) emailExistsWithGoogle();
        else emailExistsWithDirectLink();
      } else if (error.code === "auth/too-many-requests") {
        tooManyRequest();
      }
    }
  };

  useEffect(() => {
    if (!firstRender.current) {
      setState((oldState) => {
        return { ...oldState, isValidForm: email.isValid && password.isValid };
      });
    }
  }, [email.isValid, password.isValid]);

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

  const wrongPassword = (): void =>
    setState({
      ...state,
      password: setInput(password, "La contraseña no es correcta"),
    });

  const emailExistsWithGoogle = (): void =>
    setState({
      ...state,
      email: setInput(
        email,
        "Este correo está conectado a una cuenta de Google. Si quieres crearte una contraseña, inicia abajo y crea una en tu perfil"
      ),
    });

  const emailExistsWithDirectLink = (): void =>
    setState({
      ...state,
      email: setInput(
        email,
        "Esto correo no tiene contraseña, inicia mediante link y crea una en tu perfil"
      ),
    });

  const userNotFound = (): void =>
    setState({
      ...state,
      email: setInput(email, "Este email no corresponde con ninguna cuenta"),
    });

  const tooManyRequest = (): void => {
    const tryAgain = (): void =>
      setState((oldState) => {
        return { ...oldState, email: setInput(email, null) };
      });

    const error = (
      <>
        {"Demasiados intentos con este correo, espera un tiempo para "}
        <span
          style={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={tryAgain}
        >
          volver a intentarlo
        </span>
      </>
    );

    setState({
      ...state,
      email: setInput(email, error),
    });
  };

  const userNotVerified = (user: firebase.User) => {
    const resendEmailVerification = async (user: firebase.User) => {
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
          onClick={() => resendEmailVerification(user)}
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
