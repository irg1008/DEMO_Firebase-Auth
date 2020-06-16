import React from "react";

// Styled-Components
import {
  ContainerStyled,
  BorderedContainerStyled,
  media,
  mainTransition,
} from "../../../../style/style";
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
      <FormOtherOptionStyled>{firstOption}</FormOtherOptionStyled>
      <FormOtherOptionStyled>{secondOption}</FormOtherOptionStyled>
    </FormOtherOptionsContainerStyled>
  );
};

export default FormOptions;

// Styled-Components
// Other options of form container
export const FormOtherOptionsContainerStyled = styled(ContainerStyled)`
  width: 90%;
  height: 8em;
  /* Margin, Padding, Border */
  margin-bottom: 2em;
  /* Flexbox */
  justify-content: space-around;
  /* Media medium size */
  @media (min-width: ${media.mediumSize}) {
    width: 30em;
    /* Flexbox */
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

// Other option
export const FormOtherOptionStyled = styled(BorderedContainerStyled)`
  width: 100%;
  min-height: auto;
  /* Font */
  text-align: center;
  /* Flexbox */
  flex-direction: row;
  /* Margin, Padding, Border */
  padding: 1em;
  /* Cursor */
  cursor: pointer;
  /* Transition */
  transition: ${mainTransition};
  /* Hover */
  &:hover {
    /* Transition */
    transition: ${mainTransition};
  }
  /* Media medium size */
  @media (min-width: ${media.mediumSize}) {
    width: 48%;
    min-height: 5em;
  }
`;
