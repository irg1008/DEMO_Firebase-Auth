import React from "react";

// Styled-Components
import styled from "styled-components";

// Logo
import logo from "../../assets/svg/logo.svg";

// Props of functional component
/**
 * Interface of logo props.
 *
 * @interface ILogoProps
 */
interface ILogoProps {
  /**
   * Width of logo.
   *
   * @type {string}
   * @memberof ILogoProps
   */
  width: string;
}

/**
 * Logo component with image.
 *
 * @param {*} props Recieved props, with.
 * @returns Logo component.
 */
const Logo = (props: ILogoProps) => {
  const { width } = props;
  return <LogoImgStyled imgWidth={width} src={logo} alt="silkandrock_logo" />;
};

export default Logo;

/* Styled-Components */
// Logo img
const LogoImgStyled = styled.img<{ imgWidth: string }>`
  width: ${(props) => props.imgWidth};
`;
