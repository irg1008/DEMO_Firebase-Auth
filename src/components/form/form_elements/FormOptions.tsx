import React from "react";

// Styled-Components
import {
  ContainerStyled,
  BorderedContainerStyled,
  media,
  colors,
  radius,
} from "../../../style/main_style";
import styled from "styled-components";

// SignWithGoogle
import { SignWithGoogle } from "./";

// Options of component.
type IFormOptionsProps = {
  /**
   * First option of form. If no first option is given, assumes sign with google.
   *
   * @type {*}
   */
  firstOption?: any;

  /**
   * Second option of form. i.e Sign Up passwordless.
   *
   * @type {*}
   */
  secondOption: any;
};

// Separator text
const separatorText = "o";

/**
 * FormOption component. Gives you two personalized button to put wherever you pass as prop.
 *
 * @param {IFormOptionsProps} props
 * @returns
 */
const FormOptions: React.FC<IFormOptionsProps> = ({
  firstOption,
  secondOption,
}: IFormOptionsProps) => (
  <FormOptionsContainer>
    {/* Separator */}
    <OptionsSeparator>
      <SeparatorLine />
      <SeparatorText>{separatorText}</SeparatorText>
      <SeparatorLine />
    </OptionsSeparator>
    {/* Options */}
    <OptionsContainer>
      <Option>{firstOption || <SignWithGoogle />}</Option>
      <Option>{secondOption}</Option>
    </OptionsContainer>
  </FormOptionsContainer>
);

export default FormOptions;

// Styled-Components
// Form options container
const FormOptionsContainer = styled(ContainerStyled)`
  width: 90%;
  height: auto;
  /* Margin, Padding, Border */
  margin-bottom: 2em;
  /* Media medium size */
  @media (min-width: ${media.mediumSize}) {
    width: 30em;
  }
`;

// Separator container
const OptionsSeparator = styled(ContainerStyled)`
  width: 100%;
  height: auto;
  /* Margin, Padding, Border */
  margin: 1em 0;
  /* Flexbox */
  flex-direction: row;
`;

// Separator
const SeparatorLine = styled.div`
  height: 5px;
  /* Flexbox */
  flex: 1;
  /* Margin, Padding, Border */
  border-bottom: 1px solid ${colors.mainBlack};
`;

// Separator middle text
const SeparatorText = styled.p`
  width: auto;
  /* Font */
  text-align: center;
  font-weight: normal;
  font-style: italic;
  /* Margin, Padding, Border */
  padding: 0 0.8em;
`;

// Other options of form container
const OptionsContainer = styled(ContainerStyled)`
  width: 100%;
  height: 8em;
  /* Flexbox */
  justify-content: space-around;
  /* Media medium size */
  @media (min-width: ${media.mediumSize}) {
    height: auto;
    /* Flexbox */
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

// Other option
const Option = styled(BorderedContainerStyled)`
  width: 100%;
  height: 3.5em;
  min-height: 0;
  /* Font */
  text-align: center;
  /* Overflow */
  overflow: hidden;
  /* Margin, Padding, Border */
  padding: 0;
  border-radius: ${radius.fullRadius};
  /* Cursor */
  cursor: pointer;
  /* Media medium size */
  @media (min-width: ${media.mediumSize}) {
    height: 6em;
    width: 48%;
  }
`;
