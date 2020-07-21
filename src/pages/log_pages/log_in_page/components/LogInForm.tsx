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
  validateInput,
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
import { firebase } from "../../../../context/firebase";
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

  const togglePasswordVisibility = (): void =>
    setState({ ...state, hiddenPass: !hiddenPass });

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
          email: validateInput(
            oldState.email,
            inputValidation.checkEmail(email.value).error
          ),
          password:
            oldState.password.isValid === false
              ? validateInput(oldState.password, null)
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
              ? validateInput(
                  oldState.password,
                  inputValidation.checkPassword(password.value).error
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
      password: validateInput(password, "La contraseña no es correcta"),
    });

  const emailExistsWithGoogle = (): void =>
    setState({
      ...state,
      password: validateInput(
        email,
        "Este correo está conectado a una cuenta de Google. Si quieres crearte una contraseña, inicia abajo y crea una en tu perfil"
      ),
    });

  const emailExistsWithDirectLink = (): void =>
    setState({
      ...state,
      email: validateInput(
        email,
        "Esto correo no tiene contraseña, inicia mediante link y crea una en tu perfil"
      ),
    });

  const userNotFound = (): void =>
    setState({
      ...state,
      email: validateInput(
        email,
        "Este email no corresponde con ninguna cuenta"
      ),
    });

  const tooManyRequest = (): void =>
    setState({
      ...state,
      email: validateInput(
        email,
        "Demasiados intentos con este correo, espera un tiempo para volver a intentarlo"
      ),
    });

  const userNotVerified = (user: firebase.User): void => {
    const resendEmailVerification = (): void => {
      firebase.doSendEmailVerification(user);

      floatingMsg.dispatch({
        type: "SHOW_FLOATING",
        message: 'Te hemos reenviado un correo a "' + email.value + '"',
      });

      setState({ ...state, email: validateInput(email, null) });
    };

    const error = (
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

    setState({
      ...state,
      email: validateInput(email, error),
      isLoading: false,
      isValidForm: false,
    });
  };

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
      <ShowPassword
        hiddenPass={hiddenPass}
        onClick={togglePasswordVisibility}
      />
      <FormButton
        disabled={!isValidForm}
        loading={isLoading}
        text={isLoading ? "Comprobando datos..." : "Iniciar sesión"}
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
