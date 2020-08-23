import React from "react";

// Styled-Components.
import styled from "styled-components";
import { MainBGContainerStyled } from "../../style/main_style";

// Title.
import titles from "../titles";

// Full message props.
type FullMessageProps = {
  /**
   * Message to show.
   *
   * @type {string}
   */
  message: string;

  /**
   * Subtitle message.
   *
   * @type {string}
   */
  subMessage?: string;
};

/**
 * Full page message.
 *
 * @returns
 */
const FullPageMessage: React.FC<FullMessageProps> = ({
  message,
  subMessage,
}: FullMessageProps) => (
  <MessageContainer>
    <titles.H1>{message}</titles.H1>
    <titles.H2>{subMessage}</titles.H2>
  </MessageContainer>
);

export default FullPageMessage;

// Full message container.
const MessageContainer = styled(MainBGContainerStyled)`
  width: 100vw;
  height: 100vh;
  /* Margin, Padding, Border */
  padding: 4em;
  /* Font */
  text-align: center;
`;
