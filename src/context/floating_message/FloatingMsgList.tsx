import React from "react";

// Styled-Components.
import styled from "styled-components";
import { FlexContainer, media } from "../../style/main_style";

// Floating context.
import { useFloatingMsg } from "./";

// Floating message component.
import FloatingMessage from "./FloatingMessage";

// Floating Message type.
import { IFloatingMsg } from "./FloatingMessage.types";

/**
 * Floating list of messages.
 *
 * @returns
 */
const FloatingMsgList: React.FC = () => {
  // Floating context array.
  const { floatingMsgArray } = useFloatingMsg().state;

  // Max. number of messages to show.
  const numberOfMessages = 3;

  // If the array is not empty => Return map sliced to max values.
  // We this we not lose any messages, because we save them until we pop the others from the component itself or due to timeout.
  if (floatingMsgArray.length !== 0) {
    return (
      <MsgListContainer>
        {floatingMsgArray
          .slice(0, numberOfMessages)
          .map((floatingMsg: IFloatingMsg) => (
            <FloatingMessage
              key={floatingMsg.name}
              name={floatingMsg.name}
              message={floatingMsg.message}
              timeoutTime={floatingMsg.timeoutTime}
            />
          ))}
      </MsgListContainer>
    );
  }
  // If array is empty => Return null element => Doe snot render on DOM.
  else {
    return null;
  }
};

export default FloatingMsgList;

// List container.
const MsgListContainer = styled(FlexContainer)`
  height: auto;
  max-height: 100vh;
  /* Position */
  position: fixed;
  bottom: 0;
  right: 0;
  /* Flexbox */
  flex-direction: column-reverse;
  justify-content: flex-start;
  /* Overflow */
  overflow: scroll;
  /* Margin, Padding, Border */
  padding: 2em;
  /* Mask image 
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 30%);
  mask-image: linear-gradient(to bottom, transparent 0%, black 30%);*/
  /* Scrollbar */
  &::-webkit-scrollbar {
    display: none;
  }
  /* Media medium size */
  @media (max-width: ${media.mediumSize}) {
    width: 100%;
    padding: 0em;
  }
`;
