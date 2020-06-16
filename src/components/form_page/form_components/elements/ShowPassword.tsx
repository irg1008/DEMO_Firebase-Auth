import React, { useState } from "react";

// Styled-Components
import {
  ContainerStyled,
  colors,
  radius,
  mainTransition,
  animations,
  noSelect,
} from "../../../../style/style";
import styled from "styled-components";

// Password icon
import { Visibility, VisibilityOff } from "@material-ui/icons";

// Titles. Import of style of title 5, not title5 decorations needed.
import { Title5Styled } from "../../../others/Titles";

/**
 * Interface of props of password toggle.
 *
 * @interface IShowPasswordProps
 */
interface IShowPasswordProps {
  /**
   * Password is hidden.
   *
   * @type {boolean}
   * @memberof IShowPasswordProps
   */
  hiddenPass: boolean;

  /**
   * On click event.
   *
   * @type {*}
   * @memberof IShowPasswordProps
   */
  onClick: any;
}

// Password message on toggle
const passwordVisibilityMsg = {
  hidePassword: "Ocultar Contraseña",
  showPassword: "Mostrar Contraseña",
};

/**
 * Toggle for passwords inside form.
 *
 * @param {IShowPasswordProps} props
 * @returns
 */
const ShowPassword = (props: IShowPasswordProps) => {
  const { hiddenPass, onClick } = props;

  // Visibility msg
  const visibilityMsg = hiddenPass
    ? passwordVisibilityMsg.showPassword
    : passwordVisibilityMsg.hidePassword;

  // Hovering icon
  const [isHovering, setIsHovering] = useState(false);

  return (
    <VisibilityWrapperStyled>
      <VisibilityTitleContainerStyled isHovering={isHovering}>
        <Title5Styled>{visibilityMsg}</Title5Styled>
      </VisibilityTitleContainerStyled>
      <VisibilityContainerStyled
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
      </VisibilityContainerStyled>
    </VisibilityWrapperStyled>
  );
};

export default ShowPassword;

// Styled-Components
// Visibility wrapper
const VisibilityWrapperStyled = styled(ContainerStyled)`
  width: 100%;
  height: 2em;
  /* Flexbox */
  justify-content: flex-end;
  flex-direction: row;
  /* Margin, Padding, Border */
  margin-bottom: 0.8em;
`;

// Visibility title container
const VisibilityTitleContainerStyled = styled(ContainerStyled)<{
  isHovering: boolean;
}>`
  height: 100%;
  position: relative;
  /* Flexbox */
  flex-direction: row;
  /* Margin, Padding, Border */
  margin-right: 0.5em;
  /* Font */
  color: ${colors.mainBlack};
  /* Transition */
  transition: ${mainTransition};
  /* Animation */
  animation: ${(props) =>
    props.isHovering ? animations.fadeInAnimation : animations.fadeOutAnimation}
    0.2s linear forwards;
  /* No select */
  ${(props) => !props.isHovering && noSelect}
  /* Cursor */
  cursor: ${(props) => !props.isHovering && "default"};
`;

// Visibility Container
const VisibilityContainerStyled = styled(ContainerStyled)`
  height: 100%;
  width: auto;
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
