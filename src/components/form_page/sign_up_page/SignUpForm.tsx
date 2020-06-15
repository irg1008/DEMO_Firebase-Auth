import React, {
  PureComponent,
  FormEvent,
  ChangeEvent,
  ComponentState,
} from "react";
import { withRouter } from "react-router-dom";

// Routes
import * as ROUTES from "../../../constants/routes";

// Form elements, utils, validations and wrapper
// Forme elements
import {
  FormInput,
  FormButton,
  checkValidation,
  ShowPassword,
  FormWrapper,
  FormOptions,
} from "../form_components";

// Firebase
import Firebase from "../../Firebase";
import { withFirebase } from "../../Firebase";

/**
 * Interface of passes props.
 *
 * @interface IProps
 */
interface IProps {
  /**
   * Firebase class.
   *
   * @type {Firebase}
   * @memberof IProps
   */
  firebase: Firebase;

  /**
   * History of react-router-dom.
   *
   * @type {*}
   * @memberof IProps
   */
  history: any;
}

/**
 * Interface of state.
 *
 * @interface IState
 */
interface IState {
  /**
   * Username.
   *
   * @type {string}
   * @memberof IState
   */
  username: string;

  /**
   * Email.
   *
   * @type {string}
   * @memberof IState
   */
  email: string;

  /**
   * PasswordOne.
   *
   * @type {string}
   * @memberof IState
   */
  passwordOne: string;

  /**
   * PasswordTwo.
   *
   * @type {string}
   * @memberof IState
   */
  passwordTwo: string;

  /**
   * State of password visibility
   *
   * @type {boolean}
   * @memberof IState
   */
  hiddenPass: boolean;

  /**
   * Validations of inputs.
   *
   * @type {{
   *     usernameValid?: boolean;
   *     emailValid?: boolean;
   *     passwordOneValid?: boolean;
   *     passwordTwoValid?: boolean;
   *   }}
   * @memberof IState
   */
  validations?: {
    usernameValid?: boolean;
    emailValid?: boolean;
    passwordOneValid?: boolean;
    passwordTwoValid?: boolean;
  };

  /**
   * Error messages
   *
   * @type {{
   *     usernameErrorMsg: string;
   *     emailErrorMsg: string;
   *     passwordOneErrorMsg: string;
   *     passwordTwoErrorMsg: string;
   *   }}
   * @memberof IState
   */
  errorMsg?: {
    usernameErrorMsg?: string;
    emailErrorMsg?: string;
    passwordOneErrorMsg?: string;
    passwordTwoErrorMsg?: string;
  };

  /**
   * Form is valid.
   *
   * @type {boolean}
   * @memberof IState
   */
  isValid?: boolean;

  /**
   * Form is signing in and retrieving eny error ocurred.
   *
   * @type {boolean}
   * @memberof IState
   */
  loading?: boolean;
}

// Initial state. Valid states only on initial state.
const INITIAL_STATE: IState = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  hiddenPass: true,
};

/**
 * Base sign up form.
 *
 * @class SignUpFormBase class.
 * @extends {PureComponent<IProps, IState>}
 */
class SignUpFormBase extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    // Initialices the state.
    this.state = { ...INITIAL_STATE };
  }

  togglePasswordVisibility = () => {
    const { hiddenPass } = this.state;
    this.setState({
      hiddenPass: !hiddenPass,
    });
  };

  /**
   * On submit form.
   *
   * @param {FormEvent} event Form event.
   * @memberof SignUpFormBase
   */
  onSubmit = (event: FormEvent) => {
    // Prevent default behaviour.
    event.preventDefault();

    // State decostrution.
    const { username, email, passwordOne } = this.state;

    // Loading submit
    this.setState({ loading: true });

    // On submit => create user, reset state and push to landing page.
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser: any) => {
        // Push to landing page
        this.props.history.push(ROUTES.LANDING);
      })
      .catch((error: any) => {
        // If error happens stop loading form submit
        this.setState({ loading: false });
        // If email exists, validation of this given error
        // Note: This error code returns a 400 error to de console, exposing the app id or api key. This is not convinient but does not expose any data of the users. This happens because we manage the white domains that can access this data. Any other domain won't be able to acces users data even if they have de api key.
        if (error.code === "auth/email-already-in-use") {
          this.validateIndividual(this.emailAlreadyInUse);
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
        [name]: value,
      } as ComponentState,
      () => {
        return this.validateIndividual(callbackValidation);
      }
    );
  };

  /**
   * Validation of form.
   *
   * @memberof SignUpFormBase
   */
  validateForm = () => {
    const validations = { ...this.state.validations };

    // Validation.
    this.setState({
      isValid:
        validations.usernameValid &&
        validations.emailValid &&
        validations.passwordOneValid &&
        validations.passwordTwoValid,
    });
  };

  /**
   * Prepare and call for individual validations.
   *
   * @memberof SignUpFormBase
   */
  validateIndividual = (callbackValidation: any) => {
    // Temp variables of username valid and message to display if is not.
    let validations = { ...this.state.validations };
    let errorMsg = { ...this.state.errorMsg };

    // Callback individual validation
    callbackValidation(validations, errorMsg);

    // Update state with new validations and error messages.
    this.setState(
      {
        validations,
        errorMsg,
      },
      this.validateForm
    );
  };

  /**
   * Validate username and check entire form.
   *
   * @memberof SignUpFormBase
   */
  validateUsername = (validations: any, errorMsg: any) => {
    const { username } = this.state;
    const userCheck = checkValidation.checkUsername(username);
    validations.usernameValid = userCheck.isValid;
    errorMsg.usernameErrorMsg = userCheck.errorMsg;
  };

  /**
   * Validate email and check entire form.
   *
   * @memberof SignUpFormBase
   */
  validateEmail = (validations: any, errorMsg: any) => {
    const { email } = this.state;
    const emailCheck = checkValidation.checkEmail(email);
    validations.emailValid = emailCheck.isValid;
    errorMsg.emailErrorMsg = emailCheck.errorMsg;
  };

  /**
   * Email is already in use.
   *
   * @memberof SignUpFormBase
   */
  emailAlreadyInUse = (validations: any, errorMsg: any) => {
    validations.emailValid = false;
    errorMsg.emailErrorMsg = "Este correo ya está en uso, prueba con otro";
  };

  /**
   * Validate password one and check entire form.
   *
   * @memberof SignUpFormBase
   */
  validatePasswordOne = (validations: any, errorMsg: any) => {
    const { passwordOne } = this.state;
    const passwordOneCheck = checkValidation.checkFirstPassword(passwordOne);
    validations.passwordOneValid = passwordOneCheck.isValid;
    errorMsg.passwordOneErrorMsg = passwordOneCheck.errorMsg;
  };

  /**
   * Validate password two and check entire form.
   *
   * @memberof SignUpFormBase
   */
  validatePasswordTwo = (validations: any, errorMsg: any) => {
    const { passwordOne, passwordTwo } = this.state;
    const passwordTwoCheck = checkValidation.checkConfirmPassword(
      passwordOne,
      passwordTwo
    );
    validations.passwordTwoValid = passwordTwoCheck.isValid;
    errorMsg.passwordTwoErrorMsg = passwordTwoCheck.errorMsg;
  };

  /**
   * Sign up form and validation of inputs.
   *
   * @returns SignUpForm.
   * @memberof SignUpFormBase
   */
  render() {
    // State decostrution.
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      hiddenPass,
      isValid,
      loading,
    } = this.state;
    const validations = { ...this.state.validations };
    const errorMsg = { ...this.state.errorMsg };

    const formContent = (
      <>
        <FormInput
          label="Nombre"
          name="username"
          value={username}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            this.onChange(e, this.validateUsername)
          }
          type="text"
          isValid={validations.usernameValid}
          errorMessage={errorMsg.usernameErrorMsg}
        />
        <FormInput
          label="Email"
          name="email"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            this.onChange(e, this.validateEmail)
          }
          type="text"
          isValid={validations.emailValid}
          errorMessage={errorMsg.emailErrorMsg}
        />
        <FormInput
          label="Contraseña"
          name="passwordOne"
          value={passwordOne}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            this.onChange(e, this.validatePasswordOne)
          }
          type="password"
          isValid={validations.passwordOneValid}
          errorMessage={errorMsg.passwordOneErrorMsg}
          hiddenPass={hiddenPass}
        />
        <FormInput
          label="Repite la contraseña"
          name="passwordTwo"
          value={passwordTwo}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            this.onChange(e, this.validatePasswordTwo)
          }
          type="password"
          isValid={validations.passwordTwoValid}
          errorMessage={errorMsg.passwordTwoErrorMsg}
          hiddenPass={hiddenPass}
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

    return (
      <FormWrapper
        onSubmit={this.onSubmit}
        content={formContent}
        bottomComponent={<FormOptions secondOptionText="Registrarse por link mediante email" />}
      />
    );
  }
}

// SignUpFormBase with encapsulated react and firebase.
// Not using high order component library because of the fucking typescript thing.
const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpForm;
