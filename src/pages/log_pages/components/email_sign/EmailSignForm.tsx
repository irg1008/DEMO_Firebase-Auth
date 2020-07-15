import React, { ChangeEvent, Component, FormEvent } from "react";

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

// Auth context
import { withAuth, IAuthContext } from "../../../../context/auth";

// Styled-components
import styled from "styled-components";
import { ContainerStyled } from "../../../../style/main_style";

// Arrow icon
import ArrowIcon from "@material-ui/icons/ArrowBackIos";

// Complete sign props.
type ICompleteSignProps = {
  /**
   * On submit, call passed prop.
   *
   * @type {*}
   */
  onSubmit: any;

  /**
   * Set title of sign with email form.
   *
   * @type {string}
   */
  title: string;

  /**
   * Set the other option text.
   *
   * @type {string}
   */
  otherOptionText: string;

  /**
   * AuthContext consumer for classes.
   *
   * @type {IAuthContext}
   */
  authContext: IAuthContext;
};

// Types for the state.
type ICompleteSignState = {
  /**
   * Email, to log or sign with email
   *
   * @type {IInputState}
   * @memberof ICompleteSignState
   */
  email: IInputState;

  /**
   * Form is valid.
   *
   * @type {boolean}
   * @memberof ICompleteSignState
   */
  isValid?: boolean;

  /**
   * Form is loading.
   *
   * @type {boolean}
   */
  loading?: boolean;
};

// Initial complete sign up state.
const INITIAL_STATE: ICompleteSignState = {
  email: { ...INITIAL_INPUT_STATE },
};

/**
 * Complete sign up class.
 *
 * @class EmailSignForm
 * @extends {PureComponent<ICompleteSignProps, ICompleteSignState>}
 */
class EmailSignForm extends Component<ICompleteSignProps, ICompleteSignState> {
  constructor(props: ICompleteSignProps) {
    super(props);
    // Initialices the state.
    this.state = { ...INITIAL_STATE };
  }

  /**
   * On component unmount.
   *
   * @memberof EmailSignForm
   */
  componentWillUnmount = (): void => this.removePasswordlessAuth();

  /**
   * On form submit call parent sbutmit.
   *
   * @memberof EmailSignForm
   */
  onSubmit = (event: FormEvent): void => {
    // Firebase
    // const { firebase } = this.props;

    // Prevent default behaviour.
    event.preventDefault();

    // Call the submit of father
    this.props.onSubmit();
  };

  /**
   * On input change.
   *
   * @memberof EmailSignForm
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
        ...this.state,
        [name]: { value },
      },
      () => {
        callbackValidation();
      }
    );
  };

  /**
   * REmove the passwordless auth of auth context.
   *
   * @memberof EmailSignForm
   */
  removePasswordlessAuth = (): void => {
    // Props desostruction.
    const { authContext } = this.props;

    // When finished with log in page set the auth to password. Change this if wanted to reset to normal sign type.
    authContext.dispatch({
      type: "SET_AUTH_PASSWORDLESS",
      authIsPasswordless: false,
    });
  };

  /**
   * Validate entire form.
   *
   * @memberof EmailSignForm
   */
  validateForm = () => {
    // State.
    const { email } = this.state;

    // Validation.
    this.setState({
      isValid: email.isValid,
    });
  };

  /**
   * Validate username.
   *
   * @memberof EmailSignForm
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
   * Render form creator, with content.
   *
   * @returns
   * @memberof EmailSignForm
   */
  render() {
    // State deconstruction.
    const { email, isValid, loading } = this.state;

    // Props
    const { title, otherOptionText } = this.props;

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
          isValid={isValid}
          errorMessage={email.errorMsg}
          required
        />
        <FormButton
          disabled={!isValid}
          loading={loading}
          text={loading ? "Enviando link..." : "Enviar link"}
        />
        <OtherOptions onClick={this.removePasswordlessAuth}>
          <ArrowIcon fontSize="inherit" />
          <OtheOptionsText>{otherOptionText}</OtheOptionsText>
        </OtherOptions>
      </>
    );

    return (
      <FormCreator
        onSubmit={this.onSubmit}
        content={formContent}
        title={title}
      />
    );
  }
}

export default withAuth(EmailSignForm);

// Styled-Components
// Other options container
const OtherOptions = styled(ContainerStyled)`
  /* Flexbox */
  flex-direction: row;
  /* Font */
  text-align: center;
  font-size: 0.8em;
  /* Cursor */
  cursor: pointer;
`;

// Other options text
const OtheOptionsText = styled.p`
  /* Margin, Padding, Border */
  padding: 0;
  margin: 0;
  /* Font */
  font-size: inherit;
  ::first-letter {
    /* Font */
    text-transform: uppercase;
  }
  /* Hover */
  :hover {
    /* Font */
    text-decoration: underline;
  }
`;
