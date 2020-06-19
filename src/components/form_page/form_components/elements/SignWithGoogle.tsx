import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";

// Styled-Components
import styled from "styled-components";
import { ContainerStyled, media } from "../../../../style/style";

// Title
import { Title5Styled } from "../../../others/Titles";

// Firebase
import Firebase, { withFirebase } from "../../../Firebase";

// Google logo
import { googleIcon } from "../../../../assets/";

// ROUTES
//import * as ROUTES from "../../../../constants/routes";

// Sign with google props
/**
 * Sign with google props
 *
 * @interface ISignGoogleProps
 */
interface ISignGoogleProps {
  /**
   * Firebase prop passed from form
   *
   * @type {Firebase}
   * @memberof ISignGoogleProps
   */
  firebase: Firebase;

  /**
   * History of router.
   *
   * @type {*}
   * @memberof ISignGoogleProps
   */
  history: any;
}

// Sign with google state
/**
 * Empty state. No needed in google sign.
 *
 * @interface ISignGoogleState
 */
interface ISignGoogleState {
  isNewUser: boolean;
}

// Initial state of sign with google.
const INITIAL_STATE: ISignGoogleState = {
  isNewUser: false,
};

class SignWithGoogleBase extends PureComponent<
  ISignGoogleProps,
  ISignGoogleState
> {
  /**
   * Creates an instance of SignWithGoogle.
   *
   * @param {ISignGoogleProps} props
   * @memberof SignWithGoogle
   */
  constructor(props: ISignGoogleProps) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  /**
   * On click => Sign in with google
   *
   * @memberof SignWithGoogle
   */
  onClick = () => {
    const { firebase } = this.props;

    // Sign with google and firebase
    firebase
      .doSignInWithGoogleWithPopup()
      .then((result: any) => {
        console.log(firebase.doGetCurrentUser());
        //this.props.history.push(ROUTES.LANDING.path);
        this.setState({ isNewUser: true });
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  render() {
    return (
      <GoogleContainerStyled onClick={this.onClick}>
        <GoogleLogoStyled src={googleIcon} alt="google_icon" />
        <GoogleTextStyled>Únete con Google</GoogleTextStyled>
      </GoogleContainerStyled>
    );
  }
}

// Google sign encapsullated with firebase and react for routing and using of firebase functions. Done this way for reusability.
const SignWithGoogle = withRouter(withFirebase(SignWithGoogleBase));

export default SignWithGoogle;

// Styled-Components
// Google container
const GoogleContainerStyled = styled(ContainerStyled)`
  width: 100%;
  height: 100%;
  /* Font */
  font-weight: bold;
  /* Flexbox */
  flex-direction: row;
`;

// Logo
const GoogleLogoStyled = styled.img`
  height: 2em;
  margin-right: 0.5em;
`;

// Google text
const GoogleTextStyled = styled(Title5Styled)`
  /* Media */
  @media (min-width: ${media.mediumSize}) {
    width: 6em;
  }
`;

// TODO: Gestionar todas las posibilidades, que ya esté creada la cuenta de antes y darle la opcion de iniciar sesión, etc
