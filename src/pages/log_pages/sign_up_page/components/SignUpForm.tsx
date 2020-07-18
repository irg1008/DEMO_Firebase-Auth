import React, { Component, FormEvent, ChangeEvent } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

// Routes
import { ROUTES } from "../../../../routes";

// Form elements
import {
  FormInput,
  FormButton,
  ShowPassword,
  FormOptions,
  FormLink,
  SignWithGoogle,
} from "../../../../components/form/form_elements";

// Sign without password
import { SignWithoutPassword } from "../../components/email_sign";

// Floating Message
import {
  withFloatingMsg,
  IFloatingMsgContext,
} from "../../../../context/floating_message";

// Input state
import {
  IInputState,
  INITIAL_INPUT_STATE,
} from "../../../../components/form/form_elements/FormInput";

// Form Wrapper. Optional, but helps us create a common structure between forms.
// Validation of form, useful when handling validation of inputs.
import FormCreator from "../../../../components/form";
import inputValidation from "../../../../components/form/utils";

// Firebase
import { firebase } from "../../../../context/firebase";

// Types of passes props.
type ISignUpProps = RouteComponentProps & {
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

type ISignUpState = {
  /**
   * Username input.
   *
   * @type {IInputState}
   */
  username: IInputState;

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
  passwordOne: IInputState;

  /**
   * PasswordTwo.
   *
   * @type {IInputState}
   */
  passwordTwo: IInputState;

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
const INITIAL_STATE: ISignUpState = {
  username: { ...INITIAL_INPUT_STATE },
  email: { ...INITIAL_INPUT_STATE },
  passwordOne: { ...INITIAL_INPUT_STATE },
  passwordTwo: { ...INITIAL_INPUT_STATE },
  isValid: false,
  hiddenPass: true,
};

/**
 * Base sign up form.
 *
 * @class SignUpForm class.
 * @extends {Component<ISignUpProps, ISignUpState>}
 */
class SignUpForm extends Component<ISignUpProps, ISignUpState> {
  constructor(props: ISignUpProps) {
    super(props);
    // Initialices the state.
    this.state = { ...INITIAL_STATE };
  }

  /**
   * On submit form.
   *
   * @param {FormEvent} event Form event.
   * @memberof SignUpForm
   */
  onSubmit = async (event: FormEvent): Promise<void> => {
    // Prevent default behaviour.
    event.preventDefault();

    // State decostrution.
    const { email } = this.state;

    // Loading submit
    this.setState({ loading: true });

    // Email is disposable.
    const disposableResponse = await inputValidation.fetchEmailIsDisposable(
      email.value
    );
    if (disposableResponse.disposable) {
      this.emailIsDisposable();
      this.setState({ loading: false });
    } else {
      this.signUpWithFirebase();
    }
  };

  /**
   *
   *
   * @memberof SignUpForm
   */
  signUpWithFirebase = () => {
    // Firebase and react history.
    const { history, floatingMsgContext } = this.props;

    const { username, email, passwordOne } = this.state;

    firebase
      .doCreateUserWithEmailAndPassword(email.value, passwordOne.value)
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
        this.setState({ loading: false });
        // Note: This error code returns a 400 error to the console, exposing the app id or api key. This is not convinient but does not expose any data of the users. This happens because we manage the white domains that can access this data. Any other domain won't be able to acces users data even if they have de api key.
        if (error.code === "auth/email-already-in-use")
          this.emailAlreadyInUse();
      });
  };

  /**
   * On input change.
   *
   * @param {ChangeEvent} event Input event.
   * @memberof SignUpForm
   */
  onChange = (
    event: ChangeEvent<HTMLInputElement>,
    callbackValidation?: any
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
   * Validation of form.
   *
   * @memberof SignUpForm
   */
  validateForm = (): void => {
    const { username, email, passwordOne, passwordTwo } = this.state;

    // Validation.
    this.setState({
      isValid:
        username.isValid &&
        email.isValid &&
        passwordOne.isValid &&
        passwordTwo.isValid,
    });
  };

  /**
   * Validate username and check entire form.
   *
   * @memberof SignUpForm
   */
  validateUsername = (): void => {
    // Check username validity.
    const userCheck = inputValidation.checkUsername(this.state.username.value);
    // Username
    const username = { ...this.state.username, ...userCheck };
    // Change username info.
    this.setState({ username }, () => this.validateForm());
  };

  /**
   * Validate email and check entire form.
   *
   * @memberof SignUpForm
   */
  validateEmail = (): void => {
    // Check email validity.
    const emailCheck = inputValidation.checkEmail(this.state.email.value);
    // Email
    const email = { ...this.state.email, ...emailCheck };
    // Change email info.
    this.setState({ email }, () => this.validateForm());
  };

  /**
   * Email is already in use.
   *
   * @memberof SignUpForm
   */
  emailAlreadyInUse = (): void =>
    // Change email info
    this.setState(
      {
        email: {
          ...this.state.email,
          isValid: false,
          errorMsg:
            "Este correo ya está en uso, inicia sesión o prueba con otro",
        },
      },
      () => this.validateForm()
    );

  /**
   * Validate passwords.
   *
   * @memberof SignUpForm
   */
  validatePasswords = (): void => {
    // Check password 1
    const passwordOneCheck = inputValidation.checkFirstPassword(
      this.state.passwordOne.value
    );
    const passwordOne = { ...this.state.passwordOne, ...passwordOneCheck };

    // Check password 2
    const passwordTwoCheck = inputValidation.checkConfirmPassword(
      this.state.passwordOne.value,
      this.state.passwordTwo.value
    );
    const passwordTwo = { ...this.state.passwordTwo, ...passwordTwoCheck };

    // Change password info.
    this.setState({ passwordOne, passwordTwo }, () => this.validateForm());
  };

  /**
   * Email is disposable.
   *
   * @memberof LogInPage
   */
  emailIsDisposable = (): void => {
    this.setState(
      {
        email: {
          ...this.state.email,
          isValid: false,
          errorMsg: "El dominio de email no es válido",
        },
      },
      () => this.validateForm()
    );
  };

  /**
   * Toggles password visibility.
   *
   * @memberof SignUpForm
   */
  togglePasswordVisibility = () =>
    this.setState({ hiddenPass: !this.state.hiddenPass });

  /**
   * Sign up form and validation of inputs.
   *
   * @returns SignUpForm.
   * @memberof SignUpForm
   */
  render() {
    // State decostruction.
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      hiddenPass,
      isValid,
      loading,
    } = this.state;

    // Form Content
    const formContent = (
      <>
        <FormInput
          label="Nombre"
          name="username"
          value={username.value}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            this.onChange(e, this.validateUsername)
          }
          type="text"
          isValid={username.isValid}
          errorMessage={username.errorMsg}
          required
        />
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
          name="passwordOne"
          value={passwordOne.value}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            this.onChange(e, this.validatePasswords)
          }
          type="password"
          isValid={passwordOne.isValid}
          errorMessage={passwordOne.errorMsg}
          hiddenPass={hiddenPass}
          required
        />
        <FormInput
          label="Repite la contraseña"
          name="passwordTwo"
          value={passwordTwo.value}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            this.onChange(e, this.validatePasswords)
          }
          type="password"
          isValid={passwordTwo.isValid}
          errorMessage={passwordTwo.errorMsg}
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
          text={
            loading ? "Comprobando que todo esté correcto..." : "Crear Cuenta"
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
        onSubmit={this.onSubmit}
        content={formContent}
        bottomComponent={formBottomComponent}
        title="únete"
      />
    );
  }
}

export default withRouter(withFloatingMsg(SignUpForm));
