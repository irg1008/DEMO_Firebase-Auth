import React from "react";

// Styled-Components
import {
  ContainerStyled,
  BorderedContainerStyled,
  media,
} from "../../../../style/style";
import styled from "styled-components";

// TODO: Poner bonito esto, documentar todo y repasar todo este bien.

/**
 * FormOption component. Gives you two personalized button to put wherever you pass as prop.
 *
 * @param {*} props
 * @returns
 */
const FormOptions = (props: any) => {
  return (
    <FormOtherOptionsContainerStyled>
      <FormOtherOptionStyled>Google</FormOtherOptionStyled>
      <FormOtherOptionStyled>{props.secondOptionText}</FormOtherOptionStyled>
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
  /* Media medium size */
  @media (min-width: ${media.mediumSize}) {
    width: 48%;
    min-height: 5em;
  }
`;
