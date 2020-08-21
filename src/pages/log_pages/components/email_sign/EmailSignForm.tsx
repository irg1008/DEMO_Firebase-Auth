import React, {
  ChangeEvent,
  useEffect,
  useRef,
  useState,
  FormEvent,
} from "react";

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
  setInput,
} from "../../../../components/form/form_elements/FormInput";

// Auth context
import { useAuth } from "../../../../context/auth";

// Styled-components
import styled from "styled-components";
import { ContainerStyled } from "../../../../style/main_style";

// Arrow icon
import ArrowIcon from "@material-ui/icons/ArrowBackIos";
import {
  IGenericFormState,
  INITIAL_GENERIC_FORM_STATE,
} from "../../../../components/form/Form";

// Complete sign props.
type IEmailSignProps = {
  /**
   * On submit, call passed prop.
   *
   */
  onSubmit: (e: FormEvent) => void;

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
};

type IEmailSignState = IGenericFormState & {
  email: IInputState;
};

const INITIAL_EMAIL_SIGN_STATE: IEmailSignState = {
  ...INITIAL_GENERIC_FORM_STATE,
  email: INITIAL_INPUT_STATE,
};

/**
 * Complete sign up class.
 *
 * @class EmailSignForm
 * @extends {PureComponent<ICompleteSignProps, ICompleteSignState>}
 */
const EmailSignForm: React.FC<IEmailSignProps> = ({
  onSubmit,
  title,
  otherOptionText,
}) => {
  const authContext = useAuth();

  const [state, setState] = useState(INITIAL_EMAIL_SIGN_STATE);

  const { email, isLoading, isValidForm } = state;

  const firstRender = useRef(true);

  useEffect(() => {
    return () =>
      authContext.dispatch({
        type: "SET_AUTH_PASSWORDLESS",
        authIsPasswordless: false,
      });
  }, [authContext]);

  /**
   * On input change.
   *
   * @memberof EmailSignForm
   */
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const { name, value } = e.target;

    firstRender.current = false;

    setState({ ...state, [name]: { value } });
  };

  /**
   * REmove the passwordless auth of auth context.
   *
   * @memberof EmailSignForm
   */
  const removePasswordlessAuth = () =>
    authContext.dispatch({
      type: "SET_AUTH_PASSWORDLESS",
      authIsPasswordless: false,
    });

  useEffect(() => {
    if (!firstRender.current) {
      setState((oldState) => {
        return { ...oldState, isValidForm: email.isValid };
      });
    }
  }, [email.isValid]);

  useEffect(() => {
    if (!firstRender.current) {
      setState((oldState) => {
        return {
          ...oldState,
          email: setInput(
            oldState.email,
            inputValidation.errorEmail(email.value)
          ),
        };
      });
    }
  }, [email.value]);

  // Form Content
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
      <FormButton
        disabled={!isValidForm}
        loading={isLoading}
        text={isLoading ? "Enviando link..." : "Enviar link"}
      />
      <OtherOptions onClick={removePasswordlessAuth}>
        <ArrowIcon fontSize="inherit" />
        <OtheOptionsText>{otherOptionText}</OtheOptionsText>
      </OtherOptions>
    </>
  );

  return (
    <FormCreator onSubmit={onSubmit} content={formContent} title={title} />
  );
};

export default EmailSignForm;

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
