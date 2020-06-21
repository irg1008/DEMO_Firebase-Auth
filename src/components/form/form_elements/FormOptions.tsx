import React from "react";

// Styled-Components
import {
  ContainerStyled,
  BorderedContainerStyled,
  media,
  colors,
} from "../../../style/style";
import styled from "styled-components";

/**
 * Options of component.
 *
 * @interface IFormOptionsProps
 */
interface IFormOptionsProps {
  /**
   * First option of form. i.e Google sign up/in.
   *
   * @type {*}
   * @memberof IFormOptionsProps
   */
  firstOption: any;

  /**
   * Second option of form. i.e Sign Up passwordless.
   *
   * @type {*}
   * @memberof IFormOptionsProps
   */
  secondOption: any;
}

// Separator text
const separatorText = "o";

/**
 * FormOption component. Gives you two personalized button to put wherever you pass as prop.
 *
 * @param {IFormOptionsProps} props
 * @returns
 */
const FormOptions = (props: IFormOptionsProps) => {
  const { firstOption, secondOption } = props;
  return (
    <FormOtherOptionsContainerStyled>
      {/* Separator */}
      <FormOtherOptionsOrSeparatorStyled>
        <FormSeparatorStyled />
        <FormSeparatorTextStyled>{separatorText}</FormSeparatorTextStyled>
        <FormSeparatorStyled />
      </FormOtherOptionsOrSeparatorStyled>
      {/* Options */}
      <FormOtherOptionsBottomContainerStyled>
        <FormOtherOptionStyled>{firstOption}</FormOtherOptionStyled>
        <FormOtherOptionStyled>{secondOption}</FormOtherOptionStyled>
      </FormOtherOptionsBottomContainerStyled>
    </FormOtherOptionsContainerStyled>
  );
};

export default FormOptions;

// Styled-Components
// Form options container
export const FormOtherOptionsContainerStyled = styled(ContainerStyled)`
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
export const FormOtherOptionsOrSeparatorStyled = styled(ContainerStyled)`
  width: 100%;
  /* Margin, Padding, Border */
  margin: 1em 0;
  /* Flexbox */
  flex-direction: row;
`;

// Separator
export const FormSeparatorStyled = styled.div`
  height: 5px;
  /* Flexbox */
  flex: 1;
  /* Margin, Padding, Border */
  border-bottom: 1px solid ${colors.mainBlack};
`;

// Separator middle text
export const FormSeparatorTextStyled = styled.p`
  width: auto;
  /* Font */
  text-align: center;
  font-weight: normal;
  font-style: italic;
  /* Margin, Padding, Border */
  padding: 0 0.8em;
`;

// Other options of form container
export const FormOtherOptionsBottomContainerStyled = styled(ContainerStyled)`
  width: 100%;
  height: 10em;
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
export const FormOtherOptionStyled = styled(BorderedContainerStyled)`
  width: 100%;
  height: auto;
  min-height: 4em;
  /* Font */
  text-align: center;
  /* Flexbox */
  flex-direction: row;
  /* Margin, Padding, Border */
  padding: 0.5em;
  /* Cursor */
  cursor: pointer;
  /* Media medium size */
  @media (min-width: ${media.mediumSize}) {
    width: 48%;
    min-height: 5em;
  }
  /* On click */
  &:active {
    /* Cursor => Loading */
    cursor: wait;
  }
`;
