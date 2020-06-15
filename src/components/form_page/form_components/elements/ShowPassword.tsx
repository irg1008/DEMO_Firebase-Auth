import React from "react";

// Styled-Components
import { ContainerStyled, colors, radius } from "../../../../style/style";
import styled from "styled-components";

// Password icon
import { Visibility, VisibilityOff } from "@material-ui/icons";

// Titles
import { Title5 } from "../../../others/Titles";

// Props of functional component
interface IProps {
  hiddenPass: boolean;
  onClick: any;
}

const passwordVisibilityMsg = {
  hidePassword: "Ocultar Contraseña",
  showPassword: "Mostrar Contraseña",
};

/**
 * Show password component.
 *
 * @returns
 */
const ShowPassword: React.SFC<IProps> = (props: any) => {
  const { hiddenPass, onClick } = props;
  return (
    <VisibilityWrapperStyled>
      <VisibilityContainerStyled onClick={onClick}>
        {hiddenPass ? (
          <>
            <Title5 title={passwordVisibilityMsg.showPassword} />
            <VisibilityOff fontSize="small" />
          </>
        ) : (
          <>
            <Title5 title={passwordVisibilityMsg.hidePassword} />
            <Visibility fontSize="small" />
          </>
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
  height: auto;
  align-items: flex-end;
`;

// Visibility Container
const VisibilityContainerStyled = styled(ContainerStyled)`
  height: 2em;
  width: auto;
  /* Margin, Padding, Border */
  padding: 0.5em;
  border-radius: ${radius.mainRadius};
  margin-bottom: 0.8em;
  /* BG */
  background-color: ${colors.mainBlack};
  /* Flexbox */
  flex-direction: row;
  /* Color */
  color: ${colors.mainWhite};
  /* Hover */
  &:hover {
    /* Cursor */
    cursor: pointer;
  }
`;
