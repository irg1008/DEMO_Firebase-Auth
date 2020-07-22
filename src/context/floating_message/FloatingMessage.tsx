import React, { useState, useEffect, useCallback } from "react";

// Styled-Components
import styled from "styled-components";
import {
  ContainerStyled,
  colors,
  shadows,
  media,
  mainTransition,
  animations,
  noSelect,
} from "../../style/main_style";

// Floating message context
import { useFloatingMsg } from "./";

// CloseIcon
import CloseIcon from "@material-ui/icons/Close";

const FloatingMessage: React.FC = () => {
  // Floating context
  const { show, timeoutTime, message } = useFloatingMsg().state;
  const floatingMsgDispatch = useFloatingMsg().dispatch;

  // Show close button
  const [showClose, setShowClose] = useState(false);

  const [timer, setTimer] = useState(0);

  const [render, setRender] = useState(false);

  const onAnimationEnd = (): void => {
    if (!show) setRender(false);
  };

  // Hide message
  const hideMessage = useCallback(() => {
    floatingMsgDispatch({ type: "HIDE_FLOATING" });
  }, [floatingMsgDispatch]);

  const createTimeout = useCallback(
    (timeoutTime?: number) => {
      setTimer(
        setTimeout(() => {
          hideMessage();
        }, timeoutTime)
      );
    },
    [hideMessage]
  );

  const removeTimeout = useCallback(() => {
    clearTimeout(timer);
    setTimer(0);
  }, [timer]);

  // <= 0 = infinite.
  useEffect(() => {
    // If show is setted to true
    if (show) {
      setRender(true);
      if (timer === 0 && timeoutTime > 0) createTimeout(timeoutTime);
    } else if (!show) {
      if (timer !== 0) removeTimeout();
    }
  }, [show, timeoutTime, createTimeout, removeTimeout, timer]);

  return render ? (
    <MessageContainer
      onMouseEnter={() => setShowClose(true)}
      onMouseLeave={() => {
        setShowClose(false);
      }}
      show={show}
      onAnimationEnd={onAnimationEnd}
    >
      <MessageClose show={showClose} onClick={hideMessage}>
        <CloseIcon color="inherit" fontSize="inherit" />
      </MessageClose>
      <MessageText>{message}</MessageText>
    </MessageContainer>
  ) : null;
};

export default FloatingMessage;

// Styled-Components
// Message container
const MessageContainer = styled(ContainerStyled)<{ show: boolean }>`
  min-width: 20em;
  max-width: 25em;
  height: auto;
  min-height: 6em;
  /* Z-index */
  z-index: 1;
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
  /* Animation */
  animation: ${(props) =>
    props.show
      ? animations.bottomToTopAndFadeIn
      : animations.topToBottomAndFadeOut} 0.2s;
  /* Media medium size */
  @media (max-width: ${media.mediumSize}) {
    min-width: 100%;
    /* Position */
    bottom: 0;
    right: 0;
    /* Margin, Padding, Border */
    border-radius: 1em 1em 0 0;
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
  opacity: ${(props) => (props.show ? 0.6 : 0)};
  /* Transition */
  transition: ${mainTransition};
  /* Media medium size */
  @media (max-width: ${media.mediumSize}) {
    /* Opacity */
    opacity: 0.6;
  }
  /* Hover */
  &:hover {
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
  line-height: 1.5em;
  color: ${colors.mainGrey};
`;
