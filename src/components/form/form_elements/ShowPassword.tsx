import React, { useState } from "react";

// Styled-Components
import {
  ContainerStyled,
  colors,
  radius,
  mainTransition,
  noSelect,
} from "../../../style/main_style";
import styled from "styled-components";

// Password icon
import { Visibility, VisibilityOff } from "@material-ui/icons";

// Titles. Import of style of title 5, not title5 decorations needed.
import titles from "../../titles";

// Interface of props of password toggle.
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
const ShowPassword: React.FC<IShowPasswordProps> = ({
  hiddenPass,
  onClick,
}: IShowPasswordProps) => {
  // Visibility msg
  const visibilityMsg = hiddenPass
    ? passwordVisibilityMsg.showPassword
    : passwordVisibilityMsg.hidePassword;

  // Hovering icon
  const [isHovering, setIsHovering] = useState(false);

  return (
    <VisibilityWrapperStyled>
      <VisibilityTitleContainerStyled isHovering={isHovering}>
        <titles.Title5 title={visibilityMsg} />
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

// Visibility Container
const VisibilityContainerStyled = styled(ContainerStyled)`
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
