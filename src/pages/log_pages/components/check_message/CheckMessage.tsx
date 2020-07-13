import React from "react";

// Styled-Components
import styled from "styled-components";
import { ContainerStyled } from "../../../../style/main_style";

// Floatin message
import FloatingMessage from "../../../../components/floating_message";

// Check email props
type ICheckEmailProps = {
  /**
   * Message of check email.
   *
   * @type {string}
   */
  message: string;
};

const CheckMessage: React.FC<ICheckEmailProps> = ({
  message,
}: ICheckEmailProps) => (
  <CheckEmailContainer>
    <FloatingMessage message={message} />
  </CheckEmailContainer>
);

export default CheckMessage;

// Styled-Components
const CheckEmailContainer = styled(ContainerStyled)`
  width: 100%;
  height: auto;
  /* Margin, Padding, Border */
  padding-top: 10em;
`;
