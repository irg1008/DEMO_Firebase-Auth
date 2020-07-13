import React from "react";

// Styled-Components
import styled from "styled-components";
import { ContainerStyled, colors, shadows } from "../../style/main_style";

// Floating message props
type IFloatingMessageProps = {
  /**
   * Message to show.
   *
   * @type {string}
   */
  message: string;
};

const FloatingMessage: React.FC<IFloatingMessageProps> = ({
  message,
}: IFloatingMessageProps) => (
  <MessageContainer>
    <MessageText>{message}</MessageText>
  </MessageContainer>
);

export default FloatingMessage;

// Styled-Components
// Message container
const MessageContainer = styled(ContainerStyled)`
  width: 20em;
  height: auto;
  min-height: 10em;
  /* BG */
  background-color: ${colors.blue};
  /* Margin, Padding, Border */
  padding: 2em;
  border-radius: 2em;
  border-left: 2px solid ${colors.darkerBlue};
  border-bottom: 2px solid ${colors.darkerBlue};
  border-right: 2px solid ${colors.darkerBlue};
  /* Shadow */
  -moz-box-shadow: ${shadows.hardShadow};
  -webkit-box-shadow: ${shadows.hardShadow};
  box-shadow: ${shadows.hardShadow};
`;

// Message text
const MessageText = styled.p`
  /* Font */
  text-transform: uppercase;
  font-weight: bold;
  color: ${colors.mainGrey};
`;
