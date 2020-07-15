import React, { ChangeEvent, FormEvent, Component } from "react";

// Form elements
import {
  FormInput,
  FormButton,
  ShowPassword,
  FormOptions,
  FormLink,
} from "../../../../components/form/form_elements";

// Sign without password
import { SignWithoutPassword } from "../../components/email_sign";

// Form Wrapper. Optional, but helps us create a common structure between forms.
// Validation of form, useful when handling validation of inputs.
import FormCreator from "../../../../components/form";
import inputValidation from "../../../../components/form/utils";

// Routes
import { ROUTES } from "../../../../routes";

// Firebase
import {
  withFirebase,
  IFirebaseContext,
  firebase,
} from "../../../../context/firebase";

// Input state
import {
  IInputState,
  INITIAL_INPUT_STATE,
} from "../../../../components/form/form_elements/FormInput";

// Floating Message
import {
  withFloatingMsg,
  IFloatingMsgContext,
} from "../../../../context/floating_message";

// Types of of passes props.
type ILogInProps = {
  /**
   * Firebase class.
   *
   * @type {Firebase}
   */
  firebaseContext: IFirebaseContext;

  /**
   * Floating message context.
   *
   * @type {{
   *     setMessage: any;
   *     showMessage: any;
   *     hideMessage: any;
   *   }}
   */
  floatingMsgContext: IFloatingMsgContext;
};

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

/**
 * Log in form.
 *
 * @param {*} {
 *   firebase,
 *   authContext,
 * }
 * @returns
 */
class LogInPage extends Component<ILogInProps, ILoginState> {
  constructor(props: ILogInProps) {
    super(props);
    // Initialices the state.
    this.state = { ...INITIAL_STATE };
  }

  /**
   * On submit form => Set to loading and log in.
   *
   * @memberof LogInPage
   */
  onSubmit = (event: FormEvent): void => {
    // Prevent default behaviour.
    event.preventDefault();

    // State decostrution.
    const { email, password } = this.state;

    // Loading submit
    this.setState({ loading: true });

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
          this.userNotVerfied(user);
        }
      })
      .catch((error: any) => {
        // Error handling
        if (error.code === "auth/user-not-found") this.userNotFound();
        else if (error.code === "auth/wrong-password") this.wrongPassword();
      })
      .then(() => {
        // Stop loading form submit.
        this.setState({ loading: false });
      });
  };

  /**
   * On input change.
   *
   * @memberof LogInPage
   */
  onChange = (
    event: ChangeEvent<HTMLInputElement>,
    callbackValidation: any
  ): void => {
    // Prevent default behaviour.
    event.preventDefault();

    // Name and value
    const { name, value } = event.target;

    // Change the value in the state of given input name prop and then validate form.
    this.setState(
      {
        ...this.state,
        [name]: { value },
      },
      () => {
        callbackValidation();
      }
    );
  };

  /**
   * Validate entire form.
   *
   * @memberof LogInPage
   */
  validateForm = (): void => {
    // State.
    const { email, password } = this.state;

    // Set state.
    this.setState({
      isValid: email.isValid && password.isValid,
    });
  };

  /**
   * Validate email.
   *
   * @memberof LogInPage
   */
  validateEmail = (): void => {
    // Check email validity.
    const emailCheck = inputValidation.checkEmail(this.state.email.value);
    // Email
    const email = { ...this.state.email, ...emailCheck };
    // On email change set password valid.
    if (this.state.password.isValid === false) this.validatePassword();
    // Change email info.
    this.setState({ email }, () => this.validateForm());
  };

  /**
   * Validate password.
   *
   * @memberof LogInPage
   */
  validatePassword = (): void => {
    const password = { ...this.state.password };

    // Only validate empty password.
    if (password.value.length === 0) {
      const passwordCheck = inputValidation.checkFirstPassword(password.value);
      password.isValid = passwordCheck.isValid;
      password.errorMsg = passwordCheck.errorMsg;
    } else {
      password.isValid = true;
    }
    // Change password info.
    this.setState({ password }, () => this.validateForm());
  };

  /**
   * Wrong password on submit.
   *
   * @memberof LogInPage
   */
  wrongPassword = () =>
    this.setState(
      {
        password: {
          // We reset the value in case email is wrong, not password.
          ...this.state.password,
          isValid: false,
          errorMsg:
            "La contraseña es inválida o no existe. Si te has creado la cuenta con Google, incia abajo y crea una contraseña en tu perfil",
        },
      },
      () => this.validateForm()
    );

  /**
   * User not on submit.
   *
   * @memberof LogInPage
   */
  userNotFound = (): void =>
    this.setState(
      {
        email: {
          ...this.state.email,
          isValid: false,
          errorMsg: "Este email no corresponde con ninguna cuenta",
        },
      },
      () => this.validateForm()
    );

  /**
   * User is not verified.
   *
   * @memberof LogInPage
   */
  userNotVerfied = (user: any): void => {
    // Floating context
    const { floatingMsgContext } = this.props;

    // Email
    const { email } = this.state;

    // Error msg
    const errorMsg = (
      <>
        {"Verifica la cuenta para poder entrar. "}
        <span
          style={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={() => {
            // Send verification message.
            user.sendEmailVerification();

            // Set message
            floatingMsgContext.dispatch({
              type: "SHOW_FLOATING",
              message: 'Te hemos reenviado un correo a "' + email.value + '"',
            });

            // Change state.
            this.setState(
              {
                email: {
                  ...email,
                  isValid: true,
                },
              },
              () => this.validateForm()
            );
          }}
        >
          {"Reenviar correo"}
        </span>
      </>
    );

    // Change state.
    this.setState(
      {
        email: {
          ...email,
          isValid: false,
          errorMsg,
        },
      },
      () => this.validateForm()
    );
  };

  /**
   * Toggle password show/hide.
   *
   * @memberof LogInPage
   */
  togglePasswordVisibility = () =>
    this.setState({ hiddenPass: !this.state.hiddenPass });

  /**
   * Render log in form.
   *
   * @returns
   * @memberof LogInPage
   */
  render() {
    // State desconstruction.
    const { email, password, hiddenPass, isValid, loading } = this.state;

    // Form Content
    const formContent = (
      <>
        <FormInput
          label="Email"
          name="email"
          value={email.value}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            this.onChange(e, this.validateEmail)
          }
          type="email"
          isValid={email.isValid}
          errorMessage={email.errorMsg}
          required
        />
        <FormInput
          label="Contraseña"
          name="password"
          value={password.value}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            this.onChange(e, this.validatePassword)
          }
          type="password"
          isValid={password.isValid}
          errorMessage={password.errorMsg}
          hiddenPass={hiddenPass}
          required
        />
        <ShowPassword
          hiddenPass={hiddenPass}
          onClick={this.togglePasswordVisibility}
        />
        <FormButton
          disabled={!isValid}
          loading={loading}
          text={loading ? "Comprobando datos..." : "Iniciar sesión"}
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
        secondOption={<SignWithoutPassword text="Inicio por link" />}
      />
    );

    // If user is logged push to landing.
    return (
      <FormCreator
        onSubmit={this.onSubmit}
        content={formContent}
        bottomComponent={formBottomComponent}
        title="inicia sesión"
      />
    );
  }
}

export default withFloatingMsg(withFirebase(LogInPage));
