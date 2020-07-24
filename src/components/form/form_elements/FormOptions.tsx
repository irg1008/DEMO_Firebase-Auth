import React from "react";

// Styled-Components.
import {
  ContainerStyled,
  BorderedContainerStyled,
  media,
  colors,
  radius,
} from "../../../style/main_style";
import styled from "styled-components";

// Props passed to set on the two options.
type IFormOptionsProps = {
  /**
   * First option of form.
   * If empty, use sign with Google.
   *
   * @type {*}
   */
  firstOption: any;

  /**
   * Second option of form.
   * i.e.: Sign up passwordless or sign with Facebook.
   *
   * @type {*}
   */
  secondOption: any;
};

// Separator text.
const separatorText = "o";

/**
 * Aditional options for your form.
 *
 * @param {IFormOptionsProps} {
 *   firstOption,
 *   secondOption,
 * }
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
      <Option>{firstOption}</Option>
      <Option>{secondOption}</Option>
    </OptionsContainer>
  </FormOptionsContainer>
);

export default FormOptions;

// Form options container.
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

// Separator container.
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

// Separator middle text.
const SeparatorText = styled.p`
  width: auto;
  max-width: 20em;
  /* Font */
  text-align: center;
  font-weight: normal;
  font-style: italic;
  word-wrap: break-word;
  /* Margin, Padding, Border */
  padding: 0 0.8em;
`;

// Other options of form container.
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

// Other option.
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
