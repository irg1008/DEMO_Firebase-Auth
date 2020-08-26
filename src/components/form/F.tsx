import React from "react";

// Form types.
import { FormProps } from "./Form.types";

// Styled-Components.
import styled from "styled-components";
import {
  BorderedContainer,
  MainBGContainer,
  media,
} from "../../style/main_style";

// Title <h1></h1>.
import { H1 } from "components/titles/Titles";

/**
 * Form.
 *
 * @param {FormProps} {
 *   title,
 *   inputs,
 *   elements,
 *   bottomElement,
 *   onSubmit,
 * }
 */
const Form: React.FC<FormProps> = ({
  title,
  inputs,
  elements,
  bottomElement,
  onSubmit,
}: FormProps) => (
  <FormContainer>
    <FormTitle>{title}</FormTitle>
    <FormBox {...{ onSubmit }} noValidate>
      <InputsContainer>
        {inputs}
        {elements}
      </InputsContainer>
      {bottomElement}
    </FormBox>
  </FormContainer>
);

export default Form;

// Form Container.
const FormContainer = styled(MainBGContainer)`
  width: 100vw;
  min-height: 100vh;
  height: auto;
  /* Flexbox */
  justify-content: flex-start;
  /* Margin, Padding, Border */
  padding-top: 5em;
`;

// Form title.
const FormTitle = styled(H1)`
  /* Font */
  text-align: center;
  /* Margin, Padding, Border */
  padding: 0 1em;
`;

// Form.
const FormBox = styled.form`
  min-width: ${media.smallSize};
  width: 30em;
  min-height: 10em;
  height: auto;
  /* Media medium size */
  @media (max-width: ${media.mediumSize}) {
    width: 90%;
  }
`;

// Form input container.
const InputsContainer = styled(BorderedContainer)`
  /* Margin, Padding, Border */
  margin-bottom: 0.5em;
`;
