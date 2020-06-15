import React from "react";

// Styled-Components
import styled from "styled-components";
import {
  ContainerStyled,
  BorderedContainerStyled,
  media,
} from "../../../../style/style";

const FormWrapper = (props: any) => {
  return (
    <FormStyled onSubmit={props.onSubmit}>
      <FormContainerStyled>
        <FormInputContainerStyled>{props.content}</FormInputContainerStyled>
        {props.bottomComponent}
      </FormContainerStyled>
    </FormStyled>
  );
};

export default FormWrapper;

// Styled-Components
// Form
export const FormStyled = styled.form`
  min-width: 100vw;
  height: auto;
  min-height: 10em;
`;

// Form container
export const FormContainerStyled = styled(ContainerStyled)`
  width: 100%;
  height: 100%;
`;

// Form Input Container
export const FormInputContainerStyled = styled(BorderedContainerStyled)`
  width: 30em;
  /* Margin, Padding, Border */
  margin-bottom: 1em;
  /* Media medium size */
  @media (max-width: ${media.mediumSize}) {
    width: 90%;
  }
`;
