// Styled-Components.
import styled, { keyframes } from "styled-components";

// Main BG image
import { mainBG } from "../assets";

// Color constants
export const colors = {
  mainBlack: "#1f1f1f",
  darkBrown: "#231F20",
  mainGrey: "#eeeeee",
  darkGrey: "#d1d5da",
  blue: "#4d90fe",
  darkerBlue: "#297aff",
  red: "#fe4d4d",
  mainWhite: "#f7f7f7",
  darkRed: "#d93025",
};

// Shadow constants
export const shadows = {
  perfectInset: "inset 0 1px 2px rgba(27,31,35,.075)",
  focusInset:
    "inset 0 1px 2px rgba(27,31,35,.075), 0 0 0 0.2em rgba(3,102,214,.3)",
  focusInsetError:
    "inset 0 1px 2px rgba(35, 27, 28,.075), 0 0 0 0.2em rgba(214, 3, 49,.3)",
  hardShadow: "0 0 5px rgba(0, 0, 0, 0.5);",
  bottomShadow: "0 10px 15px -10px rgba(0, 0, 0, 0.5);",
};

// Border constants
export const border = {
  mainBorder: `1px solid ${colors.darkGrey}`,
  mainBorderError: `2px solid ${colors.darkRed}`,
};

// Radius constants
export const radius = {
  mainRadius: "0.2em",
  mediumRadius: "0.4em",
  fullRadius: "10em",
};

// Animations
export const animations = {
  fadeInAnimation: keyframes`
    0%   {opacity: 0;}
    100% {opacity: 1;}
  `,

  fadeOutAnimation: keyframes`
    0%   {opacity: 1;}
    100% {opacity: 0;}
  `,

  moveBottomFromTopAndFadeInAnimation: keyframes`
    0% {
      transform: translateY(-100%);
      opacity: 0;
    }
    60% {
      transform: translateY(15%);
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  `,

  shakeAnimation: keyframes`
    30% {transform: rotate(0deg);}
    35% {transform: rotate(1.5deg);}
    45% {transform: rotate(-1.5deg);}
    50% {transform: rotate(0deg);}
  `,
};

// Media break point
export const media = {
  smallSize: "380px",
  mediumSize: "768px",
  largeSize: "1200px",
};

// Main transition
export const mainTransition = "all 0.2s ease-in-out";

// No selection
export const noSelect = [
  "-webkit-touch-callout: none;" /* iOS Safari */,
  "-webkit-user-select: none;" /* Safari */,
  "-khtml-user-select: none;" /* Konqueror HTML */,
  "-moz-user-select: none;" /* Old versions of Firefox */,
  "-ms-user-select: none;" /* Internet Explorer/Edge */,
  "user-select: none;" /* Non-prefixed version,
                                     currently supported by Chrome, Edge, Opera and Firefox */,
];

// Main contanier style.
export const ContainerStyled = styled.div`
  /* Flexbox */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

// Bordered Container
export const BorderedContainerStyled = styled(ContainerStyled)`
  width: auto;
  height: auto;
  min-height: 10em;
  /* Margin, Padding, Border */
  padding: 1.5em;
  border: ${border.mainBorder};
  border-color: ${colors.mainBlack};
  border-radius: ${radius.mediumRadius};
  /* Flexbox */
  justify-content: space-around;
  /* BG */
  background-color: ${colors.mainWhite};
  /* Shadow */
  -moz-box-shadow: ${shadows.bottomShadow};
  -webkit-box-shadow: ${shadows.bottomShadow};
  box-shadow: ${shadows.bottomShadow};
`;

// Main container style with main background.
export const MainBGContainerStyled = styled(ContainerStyled)`
  /* BG */
  background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.6) 50%,
      rgba(255, 255, 255, 0.8) 100%
    ),
    url(${mainBG});
  background-position: center;
`;

// Button Styled
export const HoverableButton = styled.button`
  width: auto;
  height: 2.5em;
  /* Margin, Padding, Border */
  padding: 0 0.8em;
  border-width: 0.2em;
  border-color: ${colors.mainBlack};
  border-style: solid;
  border-radius: ${radius.fullRadius};
  /* Outline */
  outline: none;
  /* Cursor */
  cursor: pointer;
  /* Font */
  font-family: inherit;
  font-weight: 700;
  font-size: 11pt;
  text-transform: capitalize;
  color: ${colors.mainBlack};
  /* BG */
  background: radial-gradient(
    circle,
    ${colors.mainBlack} 10%,
    ${colors.mainGrey} 10%,
    ${colors.mainGrey} 20%,
    transparent 20%
  );
  background-size: 300% 100%;
  background-position: right bottom;
  background-repeat: no-repeat;
  /* Transition */
  transition: all 0.3s ease-in-out;
  /* Hover */
  &:hover {
    /* Font */
    color: ${colors.mainWhite};
    background-size: 1000% 1000%;
    background-position: center center;
    /* Shadow */
    -moz-box-shadow: ${shadows.hardShadow};
    -webkit-box-shadow: ${shadows.hardShadow};
    box-shadow: ${shadows.hardShadow};
    /* Transition */
    transition: all 0.3s ease-in-out;
  }
`;

// Normal button.
export const PrimaryButton = styled.button`
  width: 100%;
  height: 3em;
  /* Margin, Padding, Border */
  margin: 1em 0;
  border: none;
  border-radius: ${radius.mainRadius};
  /* Outline */
  outline: none;
  /* Font */
  font-family: inherit;
  font-size: 11pt;
  /* BG */
  background-color: ${colors.blue};
  /* Transition */
  transition: ${mainTransition};
  /* Hover */
  &:hover {
    /* BG */
    background-color: ${colors.darkerBlue};
    /* Transition */
    transition: ${mainTransition};
  }
`;
