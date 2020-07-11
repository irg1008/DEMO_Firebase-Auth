import React, { ChangeEvent, FormEvent, Component } from "react";
import { Redirect, withRouter } from "react-router-dom";

// Form elements
import {
  FormInput,
  FormButton,
  ShowPassword,
  FormOptions,
  FormLink,
} from "../../../../components/form/form_elements";

// Sign without password
import { SignWithoutPassword } from "../../email_sign/components";

// Form Wrapper. Optional, but helps us create a common structure between forms.
// Validation of form, useful when handling validation of inputs.
import FormCreator from "../../../../components/form";
import inputValidation from "../../../../components/form/utils";

// Routes
import ROUTES from "../../../../routes";

// Firebase
import Firebase, { withFirebase } from "../../../../components/firebase";

// Input state
import {
  IInputState,
  INITIAL_INPUT_STATE,
} from "../../../../components/form/form_elements/FormInput";

// Auth consumer
import { withAuth } from "../../../../components/auth";

// Types of of passes props.
type ILogInProps = {
  /**
   * Firebase class.
   *
   * @type {Firebase}
   */
  firebase: Firebase;

  /**
   * History of react-router-dom.
   *
   * @type {*}
   */
  history: any;

  /**
   * Loading consumer values.
   *
   * @type {*}
   */
  authContext: {
    /**
     * Set app user on log in.
     *
     * @type {*}
     */
    setUser: any;

    /**
     * App user.
     *
     * @type {*}
     */
    user: any;
  };
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
 *   history,
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
   * Only mount page if not signed. If signed redirect to main.
   *
   * @memberof LogInPage
   */
  componentDidMount = (): void => {
    const { firebase } = this.props;

    // On auth change listener.
    firebase.auth.onAuthStateChanged((user: any) => {
      // Set user of auth context.
      if (!user) document.title = "Silk&Rock - Inicia Sesión";
    });
  };

  /**
   * On submit form => Set to loading and log in.
   *
   * @memberof LogInPage
   */
  onSubmit = (event: FormEvent): void => {
    // Prevent default behaviour.
    event.preventDefault();

    // Firebase and react history.
    const { firebase, history, authContext } = this.props;

    // State decostrution.
    const { email, password } = this.state;

    // Loading submit
    this.setState({ loading: true });

    // On submit => log in with email and password.
    firebase
      .doSignInWithEmailAndPassword(email.value, password.value)
      .then((result: any) => {
        // On auth change listener.
        firebase.auth.onAuthStateChanged((user: any) => {
          // Set user of auth context.
          if (user) {
            authContext.setUser(user);
            // TODO: If user is not verified send to very before login in.
            user.emailVerified
              ? history.push(ROUTES.LANDING.path)
              : console.log(
                  "this email needs to be verified, change me to a page that calls the verify firebase function"
                );
          }
        });
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
          value: "",
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

    // Props desconstruction.
    const { authContext } = this.props;

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
          text={loading ? "Comprobando datos..." : "Inicia sesión"}
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
        secondOption={<SignWithoutPassword text="Inicio por link al email" />}
      />
    );

    // If user is logged push to landing.
    return authContext.user !== null ? (
      <Redirect to={ROUTES.LANDING.path} />
    ) : (
      <FormCreator
        onSubmit={this.onSubmit}
        content={formContent}
        bottomComponent={formBottomComponent}
        title="inicia sesión"
      />
    );
  }
}

export default withAuth(withRouter(withFirebase(LogInPage)));
