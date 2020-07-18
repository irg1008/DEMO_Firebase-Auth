import React, { useState } from "react";

// Styled-Components.
import {
  ContainerStyled,
  colors,
  radius,
  mainTransition,
  noSelect,
} from "../../../style/main_style";
import styled from "styled-components";

// Password show/hide icons.
import { Visibility, VisibilityOff } from "@material-ui/icons";

// All ttles.
import { Title5 } from "../../titles/Titles";

// Show/hide password props.
type IShowPasswordProps = {
  /**
   * Password is hidden.
   *
   * @type {boolean}
   */
  hiddenPass: boolean;

  /**
   * On click event.
   *
   * @type {*}
   */
  onClick: any;
};

/**
 * Toggle password visibility.
 *
 * @param {IShowPasswordProps} {
 *   hiddenPass,
 *   onClick,
 * }
 * @returns
 */
const ShowPassword: React.FC<IShowPasswordProps> = ({
  hiddenPass,
  onClick,
}: IShowPasswordProps) => {
  // Visibility msg.
  const visibilityMsg = hiddenPass
    ? "Ocultar Contraseña"
    : "Mostrar Contraseña";

  // Hovering icon.
  const [isHovering, setIsHovering] = useState(false);

  return (
    <ShowContainer>
      <TextContainer isHovering={isHovering}>
        <Title5 title={visibilityMsg} />
      </TextContainer>
      <IconContainer
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
        }}
        onClick={onClick}
      >
        {hiddenPass ? (
          <VisibilityOff fontSize="small" />
        ) : (
          <Visibility fontSize="small" />
        )}
      </IconContainer>
    </ShowContainer>
  );
};

export default ShowPassword;

/* Styled-Components */
// Visibility wrapper.
const ShowContainer = styled(ContainerStyled)`
  width: 100%;
  height: 2em;
  /* Flexbox */
  justify-content: flex-end;
  flex-direction: row;
  /* Margin, Padding, Border */
  margin-bottom: 0.8em;
`;

// Visibility title container.
const TextContainer = styled(ContainerStyled)<{ isHovering: boolean }>`
  height: 100%;
  /* Flexbox */
  flex-direction: row;
  /* Margin, Padding, Border */
  margin-right: 0.5em;
  /* Font */
  color: ${colors.mainBlack};
  /* Transition */
  transition: ${mainTransition};
  /* Opacity */
  opacity: ${(props) => (props.isHovering ? 1 : 0)};
  /* Transform */
  transform: ${(props) => !props.isHovering && "translateX(20%)"};
  /* No select */
  ${(props) => !props.isHovering && noSelect}
  /* Cursor */
  cursor: ${(props) => !props.isHovering && "default"};
  `;

// Visibility Container.
const IconContainer = styled(ContainerStyled)`
  height: 100%;
  width: auto;
  /* Position (works like z-index here) */
  position: relative;
  /* Margin, Padding, Border */
  padding: 0.5em;
  border-radius: ${radius.mainRadius};
  /* BG */
  background-color: ${colors.mainBlack};
  /* Color */
  color: ${colors.mainWhite};
  /* Hover */
  &:hover {
    /* Cursor */
    cursor: pointer;
  }
`;
