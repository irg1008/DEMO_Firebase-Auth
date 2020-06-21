import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";

// Styled-Components
import styled from "styled-components";
import { ContainerStyled, media } from "../../../style/style";

// Title
import { Title5Styled } from "../../titles/Titles";

// Firebase
import Firebase, { withFirebase } from "../../../utils/firebase";

// Google logo
import { googleIcon } from "../../../assets";

// ROUTES
import ROUTES from "../../../routes";

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
 * Stores if users has been correctly signed with google.
 *
 * @interface ISignGoogleState
 */
interface ISignGoogleState {}

class SignWithGoogleBase extends PureComponent<
  ISignGoogleProps,
  ISignGoogleState
> {
  /**
   * Component did mount.
   *
   * @memberof SignWithGoogleBase
   */
  componentDidMount = () => {
    const { firebase } = this.props;

    // When google redirects from signing, get the outh data.
    firebase
      .doGetRedirectResult()
      .then((result: any) => {
        // Check if any data retrieved, checking if any property exists, i.e.: credential.
        if (result.credential) {
          // Store if user is singning up or in.
          let isNewUser: boolean = result.additionalUserInfo.isNewUser;

          // If userIsNew is true, redirect to home page, if user is not new redirect to complete sign page.
          if (isNewUser) {
            this.props.history.push(ROUTES.SIGN_UP.path);
          }
          // If userIsNew is false, redirect to main page logged in.
          else {
            this.props.history.push(ROUTES.LANDING.path);
          }

          console.log(result);
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  /**
   * On click => Sign in with google
   *
   * @memberof SignWithGoogle
   */
  onClick = () => {
    const { firebase } = this.props;

    // Sign with google and firebase. This verifies email. Does not retrieve any data or error.
    firebase.doSignInWithGoogleWithRedirect();
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
