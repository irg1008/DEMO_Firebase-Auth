"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.setInput = exports.INITIAL_INPUT_STATE = void 0;
var react_1 = require("react");
// Styled-Components.
var main_style_1 = require("../../../style/main_style");
var styled_components_1 = require("styled-components");
// Initial input state.
var INITIAL_INPUT_STATE = {
    value: "",
    error: null
};
exports.INITIAL_INPUT_STATE = INITIAL_INPUT_STATE;
//  Set input function.
// It maintains the value and set the error to error passed.
// Also isValid is changed depending on error.
var setInput = function (input, error) {
    return __assign(__assign({}, input), { error: error, isValid: error === null });
};
exports.setInput = setInput;
/**
 * Form input component.
 *
 * @param {IFormInputProps} {
 *   label,
 *   name,
 *   value,
 *   onChange,
 *   type,
 *   placeholder,
 *   isValid,
 *   errorMessage,
 *   hiddenPass,
 *   required,
 *   maxLength,
 * }
 */
var FormInput = function (_a) {
    var label = _a.label, name = _a.name, value = _a.value, onChange = _a.onChange, type = _a.type, placeholder = _a.placeholder, isValid = _a.isValid, errorMessage = _a.errorMessage, hiddenPass = _a.hiddenPass, required = _a.required, maxLength = _a.maxLength;
    return (react_1["default"].createElement(InputContainer, null,
        react_1["default"].createElement(FormLabel, { htmlFor: name },
            label,
            required && "*"),
        react_1["default"].createElement(InputBox, null,
            react_1["default"].createElement(Input, __assign({ id: name, type: type === "password" ? (hiddenPass ? type : "text") : type, hasError: isValid === false }, { name: name, value: value, maxLength: maxLength, onChange: onChange, placeholder: placeholder }, { autoComplete: "on" }))),
        !isValid && (react_1["default"].createElement(InputError, { hasError: isValid === false }, errorMessage))));
};
exports["default"] = FormInput;
// Form Input.
var InputContainer = styled_components_1["default"](main_style_1.FlexContainer)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 100%;\n  height: auto;\n  /* Margin, Padding, Border */\n  margin-bottom: 0.8em;\n"], ["\n  width: 100%;\n  height: auto;\n  /* Margin, Padding, Border */\n  margin-bottom: 0.8em;\n"])));
// Form label.
var FormLabel = styled_components_1["default"].label(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 100%;\n  /* Font */\n  font-size: 0.9em;\n  font-weight: bold;\n  color: ", ";\n  /* Margin, Padding, Border */\n  margin: 0 0 0.5em 0;\n"], ["\n  width: 100%;\n  /* Font */\n  font-size: 0.9em;\n  font-weight: bold;\n  color: ", ";\n  /* Margin, Padding, Border */\n  margin: 0 0 0.5em 0;\n"])), main_style_1.colors.mainBlack);
// Form box container.
var InputBox = styled_components_1["default"].div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  width: 100%;\n  height: auto;\n"], ["\n  width: 100%;\n  height: auto;\n"])));
// Form box.
var Input = styled_components_1["default"].input(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  width: inherit;\n  height: 3em;\n  /* Margin, Padding, Border */\n  padding: 0 0.6em;\n  border-radius: ", ";\n  border: ", ";\n  /* Outline */\n  outline-color: ", ";\n  /* Font */\n  font-family: inherit;\n  /* BG */\n  background-color: ", ";\n  /* Shadow */\n  -moz-box-shadow: ", ";\n  -webkit-box-shadow: ", ";\n  box-shadow: ", ";\n  /* Animation */\n  animation: ", ";\n  /* Transition */\n  transition: ", ";\n  /* Focus */\n  &:focus {\n    /* Shadow */\n    -moz-box-shadow: ", ";\n    -webkit-box-shadow: ", ";\n    box-shadow: ", ";\n    /* Transition */\n    transition: ", ";\n  }\n"], ["\n  width: inherit;\n  height: 3em;\n  /* Margin, Padding, Border */\n  padding: 0 0.6em;\n  border-radius: ", ";\n  border: ",
    ";\n  /* Outline */\n  outline-color: ", ";\n  /* Font */\n  font-family: inherit;\n  /* BG */\n  background-color: ", ";\n  /* Shadow */\n  -moz-box-shadow: ", ";\n  -webkit-box-shadow: ", ";\n  box-shadow: ", ";\n  /* Animation */\n  animation: ",
    ";\n  /* Transition */\n  transition: ", ";\n  /* Focus */\n  &:focus {\n    /* Shadow */\n    -moz-box-shadow: ",
    ";\n    -webkit-box-shadow: ",
    ";\n    box-shadow: ",
    ";\n    /* Transition */\n    transition: ", ";\n  }\n"])), main_style_1.radius.mainRadius, function (props) {
    return props.hasError ? main_style_1.border.mainBorderError : main_style_1.border.mainBorder;
}, function (props) { return (props.hasError ? main_style_1.colors.red : main_style_1.colors.blue); }, main_style_1.colors.mainWhite, main_style_1.shadows.perfectInset, main_style_1.shadows.perfectInset, main_style_1.shadows.perfectInset, function (props) {
    return props.hasError && styled_components_1.css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n      ", " 0.5s;\n    "], ["\n      ", " 0.5s;\n    "])), main_style_1.animations.shakeAnimation);
}, main_style_1.mainTransition, function (props) {
    return props.hasError ? main_style_1.shadows.focusInsetError : main_style_1.shadows.focusInset;
}, function (props) {
    return props.hasError ? main_style_1.shadows.focusInsetError : main_style_1.shadows.focusInset;
}, function (props) {
    return props.hasError ? main_style_1.shadows.focusInsetError : main_style_1.shadows.focusInset;
}, main_style_1.mainTransition);
// Error message.
var InputError = styled_components_1["default"].p(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  width: 100%;\n  /* Font */\n  color: ", ";\n  font-size: 0.9em;\n  text-align: left;\n  /* Margin, Padding, Border */\n  padding: 0;\n  margin: 0;\n  margin-top: 0.4em;\n  /* Animation */\n  animation: ", "\n    0.2s;\n"], ["\n  width: 100%;\n  /* Font */\n  color: ", ";\n  font-size: 0.9em;\n  text-align: left;\n  /* Margin, Padding, Border */\n  padding: 0;\n  margin: 0;\n  margin-top: 0.4em;\n  /* Animation */\n  animation: ",
    "\n    0.2s;\n"])), main_style_1.colors.red, function (props) {
    return props.hasError && main_style_1.animations.moveBottomFromTopAndFadeInAnimation;
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
