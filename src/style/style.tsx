import styled from "styled-components";
import { keyframes } from "styled-components";
import mainBG from "../assets/img/mainBG_2.png";

/* GENERAL */
// Color constants
export const colors = {
  mainBlack: "#1f1f1f",
  mainGrey: "#eeeeee",
  darkGrey: "#d1d5da",
  blue: "#4d90fe",
  darkerBlue: "#297aff",
  red: "#fe4d4d",
  mainWhite: "#fff",
  darkRed: "#d93025",
};

// Shadow constants
export const inset = {
  perfectInset: "inset 0 1px 2px rgba(27,31,35,.075)",
  focusInset:
    "inset 0 1px 2px rgba(27,31,35,.075), 0 0 0 0.2em rgba(3,102,214,.3)",
  focusInsetError:
    "inset 0 1px 2px rgba(35, 27, 28,.075), 0 0 0 0.2em rgba(214, 3, 49,.3)",
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
};

// Animations
export const animations = {
  fadeInAnimation: keyframes`
  from {opacity: 0;}
  to   {opacity: 1;}
`,

  fadeOutAnimation: keyframes`
  from {opacity: 1;}
  to   {opacity: 0;}
`,

  moveInFromLeftAnimation: keyframes`
  from {transform: translateX(-100%);
        opacity: 0;}
  to   {transform: translateX(0);
        opacity: 1}
  `,

  shakeAnimation: keyframes`
  30%  {transform: rotate(0deg);}
  35%  {transform: rotate(1.5deg);}
  45%  {transform: rotate(-1.5deg);}
  50%  {transform: rotate(0deg);}
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
  border-radius: ${radius.mediumRadius};
  /* Flexbox */
  justify-content: space-around;
  /* BG */
  background-color: ${colors.mainWhite};
`;

// Main container style with main background.
export const MainBGContainerStyled = styled(ContainerStyled)`
  /* BG */
  background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0) 50%,
      rgba(255, 255, 255, 0.6) 100%
    ),
    url(${mainBG});
  background-position: center;
`;
/* END OF GENERAL */
