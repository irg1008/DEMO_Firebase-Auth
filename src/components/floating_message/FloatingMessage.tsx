import React, { useState } from "react";

// Styled-Components
import styled from "styled-components";
import {
  ContainerStyled,
  colors,
  shadows,
  media,
  mainTransition,
  noSelect,
} from "../../style/main_style";

// Floating message context
import { withFloatingMsg } from "./context";

// CloseIcon
import CloseIcon from "@material-ui/icons/Close";

// Floating message props
type IFloatingMessageProps = {
  floatingMsgContext: {
    /**
     * Message of floating component.
     *
     * @type {any}
     */
    message: any;

    /**
     * Show message value.
     *
     * @type {boolean}
     */
    show: boolean;

    /**
     * Hide message.
     *
     * @type {*}
     */
    hideMessage: any;
  };
};

const FloatingMessage: React.FC<IFloatingMessageProps> = ({
  floatingMsgContext,
}: IFloatingMessageProps) => {
  // Show close button
  const [showClose, setShowClose] = useState(false);

  return (
    <MessageContainer
      onMouseEnter={() => setShowClose(true)}
      onMouseLeave={() => {
        setShowClose(false);
      }}
      show={floatingMsgContext.show}
    >
      <MessageClose
        show={showClose}
        onClick={() => floatingMsgContext.hideMessage()}
      >
        <CloseIcon color="inherit" fontSize="inherit" />
      </MessageClose>
      <MessageText>{floatingMsgContext.message}</MessageText>
    </MessageContainer>
  );
};

export default withFloatingMsg(FloatingMessage);

// Styled-Components
// Message container
const MessageContainer = styled(ContainerStyled)<{ show: boolean }>`
  min-width: 20em;
  max-width: 25em;
  height: auto;
  min-height: 6em;
  /* Z-index */
  z-index: 1;
  /* Opacity */
  opacity: ${(props) => (props.show ? 1 : 0)};
  /* Position */
  position: fixed;
  bottom: 2em;
  right: 2em;
  /* No select */
  ${(props) => !props.show && noSelect}
  /* Pointer-Events */
  pointer-events: ${(props) => (props.show ? "default" : "none")};
  /* BG */
  background-color: ${colors.blue};
  /* Margin, Padding, Border */
  padding: 2em;
  border: 2px solid ${colors.darkerBlue};
  border-radius: 0.8em;
  /* Shadow */
  -moz-box-shadow: ${shadows.hardShadow};
  -webkit-box-shadow: ${shadows.hardShadow};
  box-shadow: ${shadows.hardShadow};
  /* Transition */
  transition: ${mainTransition};
  /* Media medium size */
  @media (max-width: ${media.mediumSize}) {
    min-width: 100%;
    bottom: 0;
    right: 0;
  }
`;

// Close message container.
const MessageClose = styled(ContainerStyled)<{ show: boolean }>`
  /* Font */
  font-size: 1.6em;
  color: ${colors.mainWhite};
  /* Position */
  position: absolute;
  top: 0.4em;
  right: 0.4em;
  /* Cursor */
  cursor: pointer;
  /* Opacity */
  opacity: ${(props) => (props.show ? 1 : 0)};
  /* Transition */
  transition: ${mainTransition};
  /* Media medium size */
  @media (max-width: ${media.mediumSize}) {
    /* Opacity */
    opacity: 1;
  }
`;

// Message text
const MessageText = styled.p`
  /* Font */
  text-transform: uppercase;
  font-weight: bold;
  text-align: center;
  line-height: 2em;
  color: ${colors.mainGrey};
`;
