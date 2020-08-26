"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.PrimaryButton = exports.HoverableButton = exports.MainBGContainer = exports.BorderedContainer = exports.FlexContainer = exports.noSelect = exports.mainTransition = exports.media = exports.animations = exports.radius = exports.border = exports.shadows = exports.colors = void 0;
// Styled-Components.
var styled_components_1 = require("styled-components");
// Main BG image.
var assets_1 = require("../assets");
// WepP support check = not working on ios 13, ie and safari.
var react_device_detect_1 = require("react-device-detect");
var webPIsSupported = !react_device_detect_1.isIOS13 && !react_device_detect_1.isIE && !react_device_detect_1.isSafari;
// Color constants.
exports.colors = {
    mainBlack: "#1f1f1f",
    darkBrown: "#231F20",
    mainGrey: "#eeeeee",
    darkGrey: "#d1d5da",
    blue: "#4d90fe",
    darkerBlue: "#297aff",
    red: "#fe4d4d",
    mainWhite: "#f7f7f7",
    darkRed: "#d93025"
};
// Shadow constants.
exports.shadows = {
    perfectInset: "inset 0 1px 2px rgba(27,31,35,.075)",
    focusInset: "inset 0 1px 2px rgba(27,31,35,.075), 0 0 0 0.2em rgba(3,102,214,.3)",
    focusInsetError: "inset 0 1px 2px rgba(35, 27, 28,.075), 0 0 0 0.2em rgba(214, 3, 49,.3)",
    hardShadow: "0 0 5px rgba(0, 0, 0, 0.5);",
    bottomShadow: "0 10px 15px -10px rgba(0, 0, 0, 0.5);"
};
// Border constants.
exports.border = {
    mainBorder: "1px solid " + exports.colors.darkGrey,
    mainBorderError: "2px solid " + exports.colors.darkRed
};
// Radius constants.
exports.radius = {
    mainRadius: "0.2em",
    mediumRadius: "0.4em",
    fullRadius: "10em"
};
// Animations.
exports.animations = {
    fadeInAnimation: styled_components_1.keyframes(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    0%   {opacity: 0;}\n    100% {opacity: 1;}\n  "], ["\n    0%   {opacity: 0;}\n    100% {opacity: 1;}\n  "]))),
    fadeOutAnimation: styled_components_1.keyframes(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    0%   {opacity: 1;}\n    100% {opacity: 0;}\n  "], ["\n    0%   {opacity: 1;}\n    100% {opacity: 0;}\n  "]))),
    moveBottomFromTopAndFadeInAnimation: styled_components_1.keyframes(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    0% {\n      transform: translateY(-100%);\n      opacity: 0;\n    }\n    60% {\n      transform: translateY(15%);\n    }\n    100% {\n      transform: translateY(0);\n      opacity: 1;\n    }\n  "], ["\n    0% {\n      transform: translateY(-100%);\n      opacity: 0;\n    }\n    60% {\n      transform: translateY(15%);\n    }\n    100% {\n      transform: translateY(0);\n      opacity: 1;\n    }\n  "]))),
    bottomToTopAndFadeIn: styled_components_1.keyframes(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    0% {\n      transform: translateY(100%);\n      opacity: 0;\n    }\n    100% {\n      transform: translateY(0);\n      opacity: 1;\n    }\n  "], ["\n    0% {\n      transform: translateY(100%);\n      opacity: 0;\n    }\n    100% {\n      transform: translateY(0);\n      opacity: 1;\n    }\n  "]))),
    topToBottomAndFadeOut: styled_components_1.keyframes(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    0% {\n      transform: translateY(0);\n      opacity: 1;\n    }\n    100% {\n      transform: translateY(100%);\n      opacity: 0;\n    }\n  "], ["\n    0% {\n      transform: translateY(0);\n      opacity: 1;\n    }\n    100% {\n      transform: translateY(100%);\n      opacity: 0;\n    }\n  "]))),
    shakeAnimation: styled_components_1.keyframes(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n    30%, 50% {transform: rotate(0deg);}\n    35% {transform: rotate(1deg);}\n    45% {transform: rotate(-1deg);}\n  "], ["\n    30%, 50% {transform: rotate(0deg);}\n    35% {transform: rotate(1deg);}\n    45% {transform: rotate(-1deg);}\n  "])))
};
// Media break point.
exports.media = {
    smallSize: "380px",
    mediumSize: "768px",
    largeSize: "1200px"
};
// Main transition.
exports.mainTransition = "all 0.2s ease-in-out";
// No selection.
exports.noSelect = [
    "-webkit-touch-callout: none;" /* iOS Safari */,
    "-webkit-user-select: none;" /* Safari */,
    "-khtml-user-select: none;" /* Konqueror HTML */,
    "-moz-user-select: none;" /* Old versions of Firefox */,
    "-ms-user-select: none;" /* Internet Explorer/Edge */,
    "user-select: none;" /* Non-prefixed version,
                                       currently supported by Chrome, Edge, Opera and Firefox */,
];
// Main contanier style.
exports.FlexContainer = styled_components_1["default"].div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  /* Flexbox */\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n"], ["\n  /* Flexbox */\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n"])));
// Bordered Container.
exports.BorderedContainer = styled_components_1["default"](exports.FlexContainer)(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  width: auto;\n  height: auto;\n  min-height: 10em;\n  /* Margin, Padding, Border */\n  padding: 1.5em;\n  border: ", ";\n  border-color: ", ";\n  border-radius: ", ";\n  /* Flexbox */\n  justify-content: space-around;\n  /* BG */\n  background-color: ", ";\n  /* Shadow */\n  -moz-box-shadow: ", ";\n  -webkit-box-shadow: ", ";\n  box-shadow: ", ";\n"], ["\n  width: auto;\n  height: auto;\n  min-height: 10em;\n  /* Margin, Padding, Border */\n  padding: 1.5em;\n  border: ", ";\n  border-color: ", ";\n  border-radius: ", ";\n  /* Flexbox */\n  justify-content: space-around;\n  /* BG */\n  background-color: ", ";\n  /* Shadow */\n  -moz-box-shadow: ", ";\n  -webkit-box-shadow: ", ";\n  box-shadow: ", ";\n"])), exports.border.mainBorder, exports.colors.mainBlack, exports.radius.mediumRadius, exports.colors.mainWhite, exports.shadows.bottomShadow, exports.shadows.bottomShadow, exports.shadows.bottomShadow);
// Main container style with main background.
exports.MainBGContainer = styled_components_1["default"](exports.FlexContainer)(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  /* BG */\n  background-image: linear-gradient(\n      90deg,\n      rgba(255, 255, 255, 0.8),\n      rgba(255, 255, 255, 0.6) 50%,\n      rgba(255, 255, 255, 0.8) 100%\n    ),\n    url(", ");\n  background-position: center;\n"], ["\n  /* BG */\n  background-image: linear-gradient(\n      90deg,\n      rgba(255, 255, 255, 0.8),\n      rgba(255, 255, 255, 0.6) 50%,\n      rgba(255, 255, 255, 0.8) 100%\n    ),\n    url(", ");\n  background-position: center;\n"])), webPIsSupported ? assets_1.mainBG : assets_1.mainBGFallback);
// Button Styled.
exports.HoverableButton = styled_components_1["default"].button(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  width: auto;\n  height: 2.5em;\n  /* Margin, Padding, Border */\n  padding: 0 0.8em;\n  border-width: 0.2em;\n  border-color: ", ";\n  border-style: solid;\n  border-radius: ", ";\n  /* Outline */\n  outline: none;\n  /* Cursor */\n  cursor: pointer;\n  /* Font */\n  font-family: inherit;\n  font-weight: 700;\n  font-size: 11pt;\n  text-transform: capitalize;\n  color: ", ";\n  /* BG */\n  background: radial-gradient(\n    circle,\n    ", " 10%,\n    ", " 10%,\n    ", " 20%,\n    transparent 20%\n  );\n  background-size: 300% 100%;\n  background-position: right bottom;\n  background-repeat: no-repeat;\n  /* Transition */\n  transition: all 0.3s ease-in-out;\n  /* Hover */\n  &:hover {\n    /* Font */\n    color: ", ";\n    background-size: 1000% 1000%;\n    background-position: center center;\n    /* Shadow */\n    -moz-box-shadow: ", ";\n    -webkit-box-shadow: ", ";\n    box-shadow: ", ";\n    /* Transition */\n    transition: all 0.3s ease-in-out;\n  }\n"], ["\n  width: auto;\n  height: 2.5em;\n  /* Margin, Padding, Border */\n  padding: 0 0.8em;\n  border-width: 0.2em;\n  border-color: ", ";\n  border-style: solid;\n  border-radius: ", ";\n  /* Outline */\n  outline: none;\n  /* Cursor */\n  cursor: pointer;\n  /* Font */\n  font-family: inherit;\n  font-weight: 700;\n  font-size: 11pt;\n  text-transform: capitalize;\n  color: ", ";\n  /* BG */\n  background: radial-gradient(\n    circle,\n    ", " 10%,\n    ", " 10%,\n    ", " 20%,\n    transparent 20%\n  );\n  background-size: 300% 100%;\n  background-position: right bottom;\n  background-repeat: no-repeat;\n  /* Transition */\n  transition: all 0.3s ease-in-out;\n  /* Hover */\n  &:hover {\n    /* Font */\n    color: ", ";\n    background-size: 1000% 1000%;\n    background-position: center center;\n    /* Shadow */\n    -moz-box-shadow: ", ";\n    -webkit-box-shadow: ", ";\n    box-shadow: ", ";\n    /* Transition */\n    transition: all 0.3s ease-in-out;\n  }\n"])), exports.colors.mainBlack, exports.radius.fullRadius, exports.colors.mainBlack, exports.colors.mainBlack, exports.colors.mainGrey, exports.colors.mainGrey, exports.colors.mainWhite, exports.shadows.hardShadow, exports.shadows.hardShadow, exports.shadows.hardShadow);
// Normal button.
exports.PrimaryButton = styled_components_1["default"].button(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n  width: 100%;\n  height: 3em;\n  /* Margin, Padding, Border */\n  margin: 1em 0;\n  border: none;\n  border-radius: ", ";\n  /* Outline */\n  outline: none;\n  /* Font */\n  font-family: inherit;\n  font-size: 11pt;\n  text-transform: capitalize;\n  color: ", ";\n  /* Cursor */\n  cursor: pointer;\n  /* BG */\n  background-color: ", ";\n  /* Transition */\n  transition: ", ";\n  /* Hover */\n  &:hover {\n    /* BG */\n    background-color: ", ";\n    /* Transition */\n    transition: ", ";\n  }\n  /* Disabled */\n  &:disabled {\n    color: ", ";\n    /* BG */\n    background-color: ", ";\n    /* Cursor */\n    cursor: default;\n  }\n"], ["\n  width: 100%;\n  height: 3em;\n  /* Margin, Padding, Border */\n  margin: 1em 0;\n  border: none;\n  border-radius: ", ";\n  /* Outline */\n  outline: none;\n  /* Font */\n  font-family: inherit;\n  font-size: 11pt;\n  text-transform: capitalize;\n  color: ", ";\n  /* Cursor */\n  cursor: pointer;\n  /* BG */\n  background-color: ", ";\n  /* Transition */\n  transition: ", ";\n  /* Hover */\n  &:hover {\n    /* BG */\n    background-color: ", ";\n    /* Transition */\n    transition: ", ";\n  }\n  /* Disabled */\n  &:disabled {\n    color: ", ";\n    /* BG */\n    background-color: ", ";\n    /* Cursor */\n    cursor: default;\n  }\n"])), exports.radius.mainRadius, exports.colors.mainWhite, exports.colors.blue, exports.mainTransition, exports.colors.darkerBlue, exports.mainTransition, exports.colors.mainBlack, exports.colors.mainGrey);
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11;
