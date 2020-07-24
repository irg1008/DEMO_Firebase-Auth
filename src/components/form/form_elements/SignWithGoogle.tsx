import React from "react";

// Styled-Components.
import styled from "styled-components";
import { ContainerStyled, media } from "../../../style/main_style";

// Title.
import { Title5 } from "../../titles/Titles";

// Firebase class object.
import firebase from "../../../context/firebase";

// Google logo.
import { googleIcon } from "../../../assets";

type ISignWithGoogleProps = {
  text: string;
};

/**
 * Sign with google. The user that signs up with google us verified and logged in directyl.
 *
 * @returns Sign with google.
 */
const SignWithGoogle: React.FC<ISignWithGoogleProps> = ({
  text,
}: ISignWithGoogleProps) => {
  /**
   * On click => Sign in with google. => Verfies email and overrides unverified accounts.
   *
   */
  const onClick = () => firebase.doSignInWithGoogleWithRedirect();

  return (
    <GoogleContainer {...{ onClick }}>
      <GoogleLogo src={googleIcon} alt="google_icon" />
      <TextContainer>
        <Title5 title={text} />
      </TextContainer>
    </GoogleContainer>
  );
};

// Google sign encapsullated with firebase and react for routing and using of firebase functions. Done this way for reusability.
export default SignWithGoogle;

// Google container.
const GoogleContainer = styled(ContainerStyled)`
  width: 100%;
  height: 100%;
  /* Font */
  text-align: center;
  /* Flexbox */
  flex-direction: row;
  /* Margin, Padding, Border */
  padding: 0 2em;
`;

// Logo.
const GoogleLogo = styled.img`
  height: 2em;
`;

// Google text.
const TextContainer = styled(ContainerStyled)`
  width: 8em;
  /* Margin, Padding, Border */
  margin-left: 0.5em;
  /* Media */
  @media (max-width: ${media.mediumSize}) {
    width: auto;
  }
`;
