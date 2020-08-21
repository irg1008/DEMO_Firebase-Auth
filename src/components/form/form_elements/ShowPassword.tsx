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
  setHidddenPass: (hiddenPass: boolean) => void;
};

/**
 * Toggle password visibility.
 *
 * @param {IShowPasswordProps} {
 *   hiddenPass,
 *   setHidddenPass,
 * }
 * @returns
 */
const ShowPassword: React.FC<IShowPasswordProps> = ({
  hiddenPass,
  setHidddenPass,
}: IShowPasswordProps) => {
  // Visibility msg.
  const visibilityMsg = hiddenPass
    ? "Mostrar Contraseña"
    : "Ocultar Contraseña";

  // User tip.
  const tip = hiddenPass
    ? "Pincha en el icono para mostrar la contraseña"
    : "Pincha en el icono para esconder la contraseña";

  // Hovering icon.
  const [isHovering, setIsHovering] = useState(false);

  /**
   * On mouse enter => Hover is true.
   *
   */
  const onMouseEnter = () => setIsHovering(true);

  /**
   * On mouse leave => Hover is false.
   *
   */
  const onMouseLeave = () => setIsHovering(false);

  /**
   * Function that toggles hiddenPass to update it in parent.
   *
   */
  const togglePassword = () => setHidddenPass(!hiddenPass);

  /**
   * Visibility icon chooser.
   *
   * @returns {JSX.Element}
   */
  const visibilityIcon = () => {
    const fontSize = "small";

    return hiddenPass ? (
      <VisibilityOff {...{ fontSize }} />
    ) : (
      <Visibility {...{ fontSize }} />
    );
  };

  return (
    <ShowContainer {...{ onMouseEnter, onMouseLeave }}>
      <TextContainer title={tip} {...{ isHovering }}>
        <TextToAnimate {...{ isHovering }}>
          <Title5 title={visibilityMsg} />
        </TextToAnimate>
      </TextContainer>
      <IconContainer onClick={togglePassword}>{visibilityIcon()}</IconContainer>
    </ShowContainer>
  );
};

export default ShowPassword;

// Visibility wrapper.
const ShowContainer = styled(ContainerStyled)`
  width: auto;
  height: 2em;
  /* Flexbox */
  justify-content: flex-end;
  flex-direction: row;
  /* Margin, Padding, Border */
  margin-left: auto;
  margin-bottom: 0.8em;
`;

// Visibility title container.
const TextContainer = styled(ContainerStyled)<{ isHovering: boolean }>`
  height: 100%;
  /* Overflow */
  overflow: hidden;
  /* Flexbox */
  flex-direction: row;
  /* No select */
  ${(props) => !props.isHovering && noSelect}
`;

// Title styled.
const TextToAnimate = styled.div<{ isHovering: boolean }>`
  /* Font */
  color: ${colors.mainBlack};
  /* Transition */
  transition: ${mainTransition};
  /* Margin, Padding, Border */
  margin-right: 0.5em;
  /* Opacity */
  opacity: ${(props) => (props.isHovering ? 1 : 0)};
  /* Transform */
  transform: ${(props) => !props.isHovering && "translateX(20%)"};
`;

// Visibility Container.
const IconContainer = styled(ContainerStyled)`
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
