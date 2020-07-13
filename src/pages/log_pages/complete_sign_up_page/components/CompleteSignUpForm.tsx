import React, {
  ChangeEvent,
  Component,
  ComponentState,
  FormEvent,
} from "react";

// Firebase consumer
import Firebase, { withFirebase } from "../../../../components/firebase";

// Form creator and input validations
import FormCreator from "../../../../components/form";
import inputValidation from "../../../../components/form/utils";

// Form elements. In this case we are ansering for the user, so not password, let just import an input an a submit button.
import {
  FormInput,
  FormButton,
} from "../../../../components/form/form_elements";

// Input needed information.
import {
  IInputState,
  INITIAL_INPUT_STATE,
} from "../../../../components/form/form_elements/FormInput";
import { withRouter } from "react-router-dom";

// Auth consumer.
import { withAuth } from "../../../../components/auth";

/**
 * Complete sign props.
 *
 * @interface ICompleteSignProps
 */
interface ICompleteSignProps {
  /**
   * Firebase class used to change and complete user and other data.
   *
   * @type {Firebase}
   * @memberof ICompleteSignProps
   */
  firebase: Firebase;

  /**
   * History of react-router-dom.
   *
   * @type {*}
   * @memberof ISignUpProps
   */
  history: any;

  /**
   * Auth local consumer.
   *
   * @type {*}
   * @memberof ICompleteSignProps
   */
  authContext: {
    /**
     * Auth user.
     *
     * @type {*}
     */
    user: any;
  };
}

/**
 * Interface for the state.
 *
 * @interface ICompleteSignState
 */
interface ICompleteSignState {
  /**
   * Username, info not filled in previous form.
   *
   * @type {IInputState}
   * @memberof ICompleteSignState
   */
  username: IInputState;

  /**
   * Submit is loading.
   *
   * @type {boolean}
   * @memberof ICompleteSignState
   */
  loading?: boolean;

  /**
   * Form is valid.
   *
   * @type {boolean}
   * @memberof ICompleteSignState
   */
  isValid?: boolean;
}

// Initial complete sign up state.
const INITIAL_STATE: ICompleteSignState = {
  username: { ...INITIAL_INPUT_STATE },
};

/**
 * Complete sign up class.
 *
 * @class CompleteSignUpForm
 * @extends {Component<ICompleteSignProps, ICompleteSignState>}
 */
class CompleteSignUpForm extends Component<
  ICompleteSignProps,
  ICompleteSignState
> {
  constructor(props: ICompleteSignProps) {
    super(props);
    // Initialices the state.
    this.state = { ...INITIAL_STATE };
  }

  /**
   * On form submit.
   *
   * @memberof CompleteSignUpForm
   */
  onSubmit = (event: FormEvent) => {
    //const { firebase } = this.props;

    // Get the username of state to update current user.
    //const { username } = this.state;

    // Prevent default behaviour.
    event.preventDefault();

    // Submit is loading.
    this.setState({ loading: true });

    // TODO: Update user info with firebase prop. No need for recheck user existance because this page is only available if exists
    console.log("completar cuenta");

    // Submit stops loading.
    this.setState({ loading: false });
  };

  /**
   * On input change.
   *
   * @memberof CompleteSignUpForm
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
   * Validate entire form.
   *
   * @memberof CompleteSignUpForm
   */
  validateForm = () => {
    const { username } = this.state;

    // Validation.
    this.setState({
      isValid: username.isValid,
    });
  };

  /**
   * Validate username.
   *
   * @memberof CompleteSignUpForm
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
   * Render form creator, with content.
   *
   * @returns
   * @memberof CompleteSignUpForm
   */
  render() {
    // State deconstruction.
    const { username, isValid, loading } = this.state;

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
          isValid={isValid}
          errorMessage={username.errorMsg}
          required
        />
        <FormButton
          disabled={!isValid}
          loading={loading}
          text={
            loading ? "Finalizando registro..." : "Finalizar creación de cuenta"
          }
        />
      </>
    );

    return (
      <FormCreator
        onSubmit={this.onSubmit}
        content={formContent}
        title="completa el registro"
      />
    );
  }
}

export default withAuth(withRouter(withFirebase(CompleteSignUpForm)));

// TODO: Check if we want to add password on this final reg. Only that because we now the email or phone of wich this page is accessed.
