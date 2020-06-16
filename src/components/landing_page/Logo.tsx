import React from "react";

// Styled-Components
import styled from "styled-components";

// Logo
import logo from "../../assets/svg/logo.svg";


/**
 * Logo component with image 100% width of parent.
 *
 * @returns
 */
const Logo = () => {
  return <LogoImgStyled src={logo} alt="silkandrock_logo" />;
};

export default Logo;

/* Styled-Components */
// Logo img
const LogoImgStyled = styled.img`
  width: 100%;
`;
