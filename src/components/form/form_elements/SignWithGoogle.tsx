import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

// Styled-Components
import styled from "styled-components";
import { ContainerStyled, media } from "../../../style/main_style";

// Title
import titles from "../../titles";

// Firebase class and consumer.
import { firebase } from "../../../context/firebase";

// Google logo
import { googleIcon } from "../../../assets";

// ROUTES
import { ROUTES } from "../../../routes";

// Google Cookie interface and typed.
type IGoogleCookie = {
  /**
   * Google cookie id.
   *
   * @type {string}
   */
  id: string;

  /**
   * Google cookie value.
   *
   * @type {string}
   */
  value: string;
};

// Sign with google props
interface ISignGoogleProps extends RouteComponentProps {
  /**
   * History of router.
   *
   * @type {*}
   */
  history: any;
}

/**
 * Sign with google. The user that signs up with google us verified and logged in directyl.
 *
 * @class SignWithGoogle
 * @extends {Component<ISignGoogleProps>}
 */
class SignWithGoogle extends Component<ISignGoogleProps> {
  // Google cookie.
  private googleCookie: IGoogleCookie = {
    id: "google-user-auth",
    value: "true",
  };

  /**
   * Component did mount.
   *
   * @memberof SignWithGoogle
   */
  componentDidMount = (): void => {
    const { history } = this.props;
    const { googleCookie } = this;

    // If cookie is setted, check for google info.
    if (localStorage.getItem(googleCookie.id)) {
      // When google redirects from signing, get the outh data.
      firebase
        .doGetRedirectResult()
        .then((result: any) => {
          // TODO: Check if user has alreadya an account with that email and display message.
          // Check if any data retrieved, checking if any property exists, i.e.: credential.
          if (result.credential) {
            // It doesnt matter if user is new, we logged him and redirect.
            history.push(ROUTES.LANDING.path);
          }
        })
        .catch((error: any) => {
          console.log(error);
        })
        .then(() => {
          // Remove the used cookie.
          localStorage.removeItem(googleCookie.id);
        });
    }
  };

  /**
   * On click => Sign in with google
   *
   * @memberof SignWithGoogle
   */
  onClick = (): void => {
    const { googleCookie } = this;

    // Sign with google and firebase. This verifies email. Does not retrieve any data or error.
    firebase.doSignInWithGoogleWithRedirect();

    // Set a cookie that we are fetching data, to use in redirect
    localStorage.setItem(googleCookie.id, googleCookie.value);
  };

  /**
   * Return google sign in.
   *
   * @returns
   * @memberof SignWithGoogle
   */
  render() {
    return (
      <GoogleContainerStyled onClick={this.onClick}>
        <GoogleLogoStyled src={googleIcon} alt="google_icon" />
        <TextContainer>
          <titles.Title5 title="Únete con Google" />
        </TextContainer>
      </GoogleContainerStyled>
    );
  }
}

// Google sign encapsullated with firebase and react for routing and using of firebase functions. Done this way for reusability.
export default withRouter(SignWithGoogle);

// Styled-Components
// Google container
const GoogleContainerStyled = styled(ContainerStyled)`
  width: 100%;
  height: 100%;
  /* Font */
  text-align: center;
  /* Flexbox */
  flex-direction: row;
  /* Margin, Padding, Border */
  padding: 0 2em;
`;

// Logo
const GoogleLogoStyled = styled.img`
  height: 2em;
`;

// Google text
const TextContainer = styled(ContainerStyled)`
  width: 8em;
  /* Margin, Padding, Border */
  margin-left: 0.5em;
  /* Media */
  @media (max-width: ${media.mediumSize}) {
    width: auto;
  }
`;
