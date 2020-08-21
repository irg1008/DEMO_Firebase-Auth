import React, { useState, useEffect, useCallback } from "react";

// Styled-Components.
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

// Floating message context.
import { useFloatingMsg } from "./";

// Close icon.
import CloseIcon from "@material-ui/icons/Close";

// Floating Message type.
import { IFloatingMsg } from "./FloatingMessage.types";

/**
 * Floating message.
 *
 * @param {IFloatingMsg} {
 *   name,
 *   message,
 *   timeoutTime,
 * }
 * @returns
 */
const FloatingMessage: React.FC<IFloatingMsg> = ({
  name,
  message,
  timeoutTime,
}: IFloatingMsg) => {
  // Show or hide floating message.
  // On hide => triggers the removal of the list of messages.
  const [show, setShow] = useState(true);

  // Show/hide close button.
  const [showClose, setShowClose] = useState(false);

  // Timer for the floating message to dissapear.
  // Any numbe ris valid for the initial timer.
  const INITIAL_TIMER = 0;
  const [timer, setTimer] = useState(INITIAL_TIMER);

  // Floating context dispatch.
  const floatingMsgDispatch = useFloatingMsg().dispatch;

  /**
   * On floating message animation is over => Remove floating from array.
   *
   */
  const onAnimationEnd = () => {
    // If show is set to false => remove floating from floating array.
    if (!show) floatingMsgDispatch({ type: "REMOVE_FLOATING", name });
  };

  // Hide message.
  const hideMessage = useCallback(() => {
    // Set show to false.
    setShow(false);
  }, []);

  // Creates timeout timer for floating message with passed timeoutTime. => Then hides the message.
  const createTimeout = useCallback(
    (timeoutTime: number) => {
      setTimer(
        setTimeout(() => {
          hideMessage();
        }, timeoutTime)
      );
    },
    [hideMessage]
  );

  // On timer changes => Removes the timeout of the floating message and resets the initial state of timer.
  const removeTimeout = useCallback(() => {
    // Clear timeout.
    clearTimeout(timer);

    // Reset to initial value.
    setTimer(INITIAL_TIMER);
  }, [timer]);

  // On show and timer change.
  useEffect(() => {
    // If show.
    // If timer is not setted (equals initial value (0)) and the timeout is greater than 0 => Create timeout.
    // If timeout is less or equal to 0, not timeout will be created and message will show infinite time.
    if (show && timer === 0 && timeoutTime > 0) createTimeout(timeoutTime);
    // If floating messgae is hiden and timer is running. => Remove timeout.
    else if (!show && timer !== 0) removeTimeout();
  }, [show, timer, timeoutTime, createTimeout, removeTimeout]);

  // On mouse enter => Set the close button to show.
  const onMouseEnter = () => setShowClose(true);

  // On mouse leave => Set the close button to hide.
  const onMouseLeave = () => setShowClose(false);

  return (
    <MessageContainer {...{ onMouseLeave, onMouseEnter, show, onAnimationEnd }}>
      <MessageClose show={showClose} onClick={hideMessage}>
        <CloseIcon color="inherit" fontSize="inherit" />
      </MessageClose>
      <MessageText>{message}</MessageText>
    </MessageContainer>
  );
};

export default FloatingMessage;

// Message container.
const MessageContainer = styled(ContainerStyled)<{ show: boolean }>`
  width: 25em;
  height: auto;
  /* Position */
  position: relative;
  /* No select */
  ${(props) => !props.show && noSelect}
  /* Pointer-Events */
  pointer-events: ${(props) => (props.show ? "default" : "none")};
  /* BG */
  background-color: ${colors.blue};
  /* Margin, Padding, Border */
  padding: 2em;
  margin-top: 1em;
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
    width: 100%;
    /* Margin, Padding, Border */
    border-radius: 0;
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

// Message text.
const MessageText = styled.p`
  /* Font */
  text-transform: uppercase;
  font-weight: bold;
  text-align: center;
  line-height: 1.5em;
  color: ${colors.mainGrey};
`;
