import React, {
  ChangeEvent,
  Component,
  ComponentState,
  FormEvent,
} from "react";

// Firebase consumer
import { firebase } from "../../../../context/firebase";

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

/**
 * Complete sign props.
 *
 * @interface ICompleteSignProps
 */
type ICompleteSignProps = {};

/**
 * Interface for the state.
 *
 * @interface ICompleteSignState
 */
type ICompleteSignState = {
  /**
   * Username, info not filled in previous form.
   *
   * @type {IInputState}
   */
  username: IInputState;

  /**
   * Submit is loading.
   *
   * @type {boolean}
   */
  loading?: boolean;

  /**
   * Form is valid.
   *
   * @type {boolean}
   */
  isValid?: boolean;
};

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
    // Get the username of state to update current user.
    const { username } = this.state;

    // Prevent default behaviour.
    event.preventDefault();

    // Submit is loading.
    this.setState({ loading: true });

    // Update user name.
    firebase.doUpdateProfile(username.value).then(() => {
      // Submit stops loading.
      this.setState({ loading: false });
    });
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

export default CompleteSignUpForm;

// TODO: Check if we want to add password on this final reg. Only that because we now the email or phone of wich this page is accessed.
