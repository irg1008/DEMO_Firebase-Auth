import React from "react";

// Styled-Components
import styled from "styled-components";
import { media, ContainerStyled, colors } from "../../../../style/main_style";

// Email icon
import EmailIcon from "@material-ui/icons/EmailRounded";

// Titles
import titles from "../../../../components/titles";

// Auth context
import { withAuth } from "../../../../components/auth";

// Type of signing without email or google.
type ISignWithoutPasswordProps = {
  /**
   * Text to display with the logo of passwordless.
   *
   * @type {string}
   */
  text: string;

  /**
   * Auth context to change the password method.
   *
   * @type {{
   *     passwordlessAuth: boolean;
   *     setPasswordlessAuth: any;
   *   }}
   */
  authContext: {
    /**
     * Passwordless boolean.
     *
     * @type {boolean}
     */
    passwordlessAuth: boolean;

    /**
     * Passwordless setter.
     *
     * @type {*}
     */
    setPasswordlessAuth: any;
  };
};

/**
 * Sign without password via email link.
 *
 * @param {ISignWithoutPasswordProps} {*}
 * @returns
 */
const SignWithoutPassword: React.FC<ISignWithoutPasswordProps> = ({
  text,
  authContext,
}: ISignWithoutPasswordProps) => {
  return (
    <SignPasswordlessContainerStyled
      onClick={() => authContext.setPasswordlessAuth(true)}
    >
      <EmailIcon style={{ color: colors.mainBlack, fontSize: "2em" }} />
      <TextContainer>
        <titles.Title5 title={text} />
      </TextContainer>
    </SignPasswordlessContainerStyled>
  );
};

export default withAuth(SignWithoutPassword);

// Styled-Components
// Sign passwordless
const SignPasswordlessContainerStyled = styled(ContainerStyled)`
  width: 100%;
  height: 100%;
  /* Font */
  text-align: center;
  /* Flexbox */
  flex-direction: row;
  /* Margin, Padding, Border */
  padding: 0 2em;
`;

// Sign passwordless text
const TextContainer = styled(ContainerStyled)`
  width: 8em;
  /* Margin, Padding, Border */
  margin-left: 0.5em;
  /* Media */
  @media (max-width: ${media.mediumSize}) {
    width: auto;
  }
`;
