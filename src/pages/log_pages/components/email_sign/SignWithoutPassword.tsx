import React from "react";

// Styled-Components.
import styled from "styled-components";
import { media, ContainerStyled, colors } from "../../../../style/main_style";

// Email icon.
import EmailIcon from "@material-ui/icons/EmailRounded";

// Titles.
import titles from "../../../../components/titles";

// Auth context.
import { useAuth } from "../../../../context/auth";

// Type of signing without email or google.
type ISignWithoutPasswordProps = {
  /**
   * Text to display with the logo of passwordless.
   *
   * @type {string}
   */
  text: string;
};

/**
 * Sign without password via email link.
 *
 * @param {ISignWithoutPasswordProps} {
 *   text,
 * }
 * @returns
 */
const SignWithoutPassword: React.FC<ISignWithoutPasswordProps> = ({
  text,
}: ISignWithoutPasswordProps) => {
  // Auth context.
  const authContext = useAuth();

  /**
   * On click on sign with email => Set log without password true.
   *
   */
  const setPasswordlessAuth = () =>
    authContext.dispatch({
      type: "SET_AUTH_PASSWORDLESS",
      authIsPasswordless: true,
    });

  return (
    <SignPasswordlessContainer onClick={setPasswordlessAuth}>
      <EmailIcon style={{ color: colors.mainBlack, fontSize: "2em" }} />
      <TextContainer>
        <titles.Title5 title={text} />
      </TextContainer>
    </SignPasswordlessContainer>
  );
};

export default SignWithoutPassword;

// Sign passwordless.
const SignPasswordlessContainer = styled(ContainerStyled)`
  width: 100%;
  height: 100%;
  /* Font */
  text-align: center;
  /* Flexbox */
  flex-direction: row;
  /* Margin, Padding, Border */
  padding: 0 2em;
`;

// Sign passwordless text.
const TextContainer = styled(ContainerStyled)`
  width: 8em;
  /* Margin, Padding, Border */
  margin-left: 0.5em;
  /* Media */
  @media (max-width: ${media.mediumSize}) {
    width: auto;
  }
`;
