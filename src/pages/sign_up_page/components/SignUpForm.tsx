import React, {
  PureComponent,
  FormEvent,
  ChangeEvent,
  ComponentState,
} from "react";
import { withRouter } from "react-router-dom";

// Routes
import * as ROUTES from "../../../routes/routes";

// Form elements
import {
  FormInput,
  FormButton,
  ShowPassword,
  FormOptions,
  SignWithGoogle,
} from "../../../components/form/form_elements";

// Form Wrapper. Optional, but helps us create a common structure between forms.
// Validation of form, useful when handling validation of inputs.
import { FormCreator, inputValidation } from "../../../components/form";

// Firebase
import Firebase, { withFirebase } from "../../../utils/firebase";

/**
 * Interface of input.
 *
 * @interface IInputState
 */
interface IInputState {
  /**
   * Value of input.
   *
   * @type {string}
   * @memberof IInputState
   */
  value: string;

  /**
   * Validity of input.
   *
   * @type {boolean}
   * @memberof IInputState
   */
  isValid?: boolean;

  /**
   * Error mesg on input is no valid.
   *
   * @type {string}
   * @memberof IInputState
   */
  errorMsg?: string;
}

// Initial input state.
const INITIAL_INPUT_STATE = {
  value: "",
};

/**
 * Interface of passes props.
 *
 * @interface ISignUpProps
 */
interface ISignUpProps {
  /**
   * Firebase class.
   *
   * @type {Firebase}
   * @memberof ISignUpProps
   */
  firebase: Firebase;

  /**
   * History of react-router-dom.
   *
   * @type {*}
   * @memberof ISignUpProps
   */
  history: any;
}

/**
 * Interface of state.
 *
 * @interface ISignUpState
 */
interface ISignUpState {
  /**
   * Username input.
   *
   * @type {IInputState}
   * @memberof ISignUpState
   */
  username: IInputState;

  /**
   * Email.
   *
   * @type {IInputState}
   * @memberof ISignUpState
   */
  email: IInputState;

  /**
   * PasswordOne.
   *
   * @type {IInputState}
   * @memberof ISignUpState
   */
  passwordOne: IInputState;

  /**
   * PasswordTwo.
   *
   * @type {IInputState}
   * @memberof ISignUpState
   */
  passwordTwo: IInputState;

  /**
   * State of password visibility
   *
   * @type {boolean}
   * @memberof ISignUpState
   */
  hiddenPass: boolean;

  /**
   * Form is valid.
   *
   * @type {boolean}
   * @memberof ISignUpState
   */
  isValid?: boolean;

  /**
   * Form is signing in and retrieving eny error ocurred.
   *
   * @type {boolean}
   * @memberof ISignUpState
   */
  loading?: boolean;
}

// Initial state. Valid states only on initial state.
const INITIAL_STATE: ISignUpState = {
  username: { ...INITIAL_INPUT_STATE },
  email: { ...INITIAL_INPUT_STATE },
  passwordOne: { ...INITIAL_INPUT_STATE },
  passwordTwo: { ...INITIAL_INPUT_STATE },
  hiddenPass: true,
};

/**
 * Base sign up form.
 *
 * @class SignUpFormBase class.
 * @extends {PureComponent<ISignUpProps, ISignUpState>}
 */
class SignUpFormBase extends PureComponent<ISignUpProps, ISignUpState> {
  constructor(props: ISignUpProps) {
    super(props);
    // Initialices the state.
    this.state = { ...INITIAL_STATE };
  }

  /**
   * On submit form.
   *
   * @param {FormEvent} event Form event.
   * @memberof SignUpFormBase
   */
  onSubmit = (event: FormEvent) => {
    const { firebase } = this.props;
    // Prevent default behaviour.
    event.preventDefault();

    // State decostrution.
    const { username, email, passwordOne } = this.state;

    // Loading submit
    this.setState({ loading: true });

    // On submit => create user, reset state and push to landing page.
    firebase
      .doCreateUserWithEmailAndPassword(email.value, passwordOne.value)
      .then((authUser: any) => {
        // TODO: Verify the email with verify page and add user info
        // Push to landing page
        this.props.history.push(ROUTES.LANDING.path);
      })
      .catch((error: any) => {
        // If error happens stop loading form submit
        this.setState({ loading: false });
        // Note: This error code returns a 400 error to de console, exposing the app id or api key. This is not convinient but does not expose any data of the users. This happens because we manage the white domains that can access this data. Any other domain won't be able to acces users data even if they have de api key.
        if (error.code === "auth/email-already-in-use") {
          this.emailAlreadyInUse();
        }
      });
  };

  /**
   * On input change.
   *
   * @param {ChangeEvent} event Input event.
   * @memberof SignUpFormBase
   */
  onChange = (
    event: ChangeEvent<HTMLInputElement>,
    callbackValidation: any
  ) => {
    // Prevent default behaviour.
    event.preventDefault();

    // Name and value
    const { name, value } = event.target;

    // Change the value in the state of given input name prop and then validate form.
    this.setState(
      {
        [name]: { value },
      } as ComponentState,
      () => {
        callbackValidation();
      }
    );
  };

  /**
   * Validation of form.
   *
   * @memberof SignUpFormBase
   */
  validateForm = () => {
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
   * @memberof SignUpFormBase
   */
  validateUsername = () => {
    const username = { ...this.state.username };

    // Check username validity.
    const userCheck = inputValidation.checkUsername(username.value);
    username.isValid = userCheck.isValid;
    username.errorMsg = userCheck.errorMsg;

    // Change username info.
    this.setState({ username }, () => this.validateForm());
  };

  /**
   * Validate email and check entire form.
   *
   * @memberof SignUpFormBase
   */
  validateEmail = () => {
    const email = { ...this.state.email };

    // Check email validity.
    const emailCheck = inputValidation.checkEmail(email.value);
    email.isValid = emailCheck.isValid;
    email.errorMsg = emailCheck.errorMsg;

    // Change email info.
    this.setState({ email }, () => this.validateForm());
  };

  /**
   * Email is already in use.
   *
   * @memberof SignUpFormBase
   */
  emailAlreadyInUse = () => {
    const email = { ...this.state.email };

    // Change email info
    email.isValid = false;
    email.errorMsg =
      "Este correo ya está en uso, inicia sesión o prueba con otro";

    this.setState({ email }, () => this.validateForm());
  };

  /**
   * Validate passwords.
   *
   * @memberof SignUpFormBase
   */
  validatePasswords = () => {
    const passwordOne = { ...this.state.passwordOne };
    const passwordTwo = { ...this.state.passwordTwo };

    // Check password 1
    const passwordOneCheck = inputValidation.checkFirstPassword(
      passwordOne.value
    );
    passwordOne.isValid = passwordOneCheck.isValid;
    passwordOne.errorMsg = passwordOneCheck.errorMsg;

    // Check password 2
    const passwordTwoCheck = inputValidation.checkConfirmPassword(
      passwordOne.value,
      passwordTwo.value
    );
    passwordTwo.isValid = passwordTwoCheck.isValid;
    passwordTwo.errorMsg = passwordTwoCheck.errorMsg;

    // Change password info.
    this.setState({ passwordOne, passwordTwo }, () => this.validateForm());
  };

  /**
   * Toggles password visibility.
   *
   * @memberof SignUpFormBase
   */
  togglePasswordVisibility = () => {
    const { hiddenPass } = this.state;
    this.setState({
      hiddenPass: !hiddenPass,
    });
  };

  /**
   * Sign up form and validation of inputs.
   *
   * @returns SignUpForm.
   * @memberof SignUpFormBase
   */
  render() {
    // State deconstruction.
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      hiddenPass,
      isValid,
      loading,
    } = this.state;

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
          type="text"
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
      </>
    );

    const formBottomComponent = (
      <FormOptions
        firstOption={<SignWithGoogle />}
        secondOption="Registrarse por link mediante email"
      />
    );

    return (
      <FormCreator
        onSubmit={this.onSubmit}
        content={formContent}
        bottomComponent={formBottomComponent}
      />
    );
  }
}

// SignUpFormBase with encapsulated react and firebase.
const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpForm;
