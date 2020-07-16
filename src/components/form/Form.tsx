import React from "react";

// Styled-Components.
import styled from "styled-components";
import {
  ContainerStyled,
  BorderedContainerStyled,
  MainBGContainerStyled,
  media,
} from "../../style/main_style";

// Titles.
import { Title1Styled } from "../../components/titles/Titles";

// Form props type.
type IFormCreatorProps = {
  /**
   * Title of form.
   *
   * @type {string}
   */
  title: string;

  /**
   * Content of form.
   * i.e: Two inputs + showPassword component + one button.
   *
   * @type {*}
   */
  content: any;

  /**
   * Optional bottom component of form.
   * i.e: Aditional info or alternative forms.
   *
   * @type {*}
   */
  bottomComponent?: any;

  /**
   * On submit function.
   *
   * @type {*}
   */
  onSubmit: any;
};

/**
 * Form creator.
 * Given varios props, gives the user a styled and ready to use form.
 *
 * @param {IFormCreatorProps} {
 *   onSubmit,
 *   content,
 *   bottomComponent,
 *   title,
 * }
 */
const FormCreator: React.FC<IFormCreatorProps> = ({
  onSubmit,
  content,
  bottomComponent,
  title,
}: IFormCreatorProps) => (
  <FormContainer>
    <FormTitle>{title}</FormTitle>
    <Form onSubmit={onSubmit}>
      <FormWrapper>
        <InputsContainer>{content}</InputsContainer>
        {bottomComponent}
      </FormWrapper>
    </Form>
  </FormContainer>
);

export default FormCreator;

// Styled-Components.
// Form title.
const FormTitle = styled(Title1Styled)`
  width: 100%;
  /* Font */
  text-align: center;
`;

// Form Container.
const FormContainer = styled(MainBGContainerStyled)`
  min-width: 100vw;
  width: auto;
  min-height: 100vh;
  height: auto;
  /* Flexbox */
  justify-content: flex-start;
  /* Margin, Padding, Border */
  padding-top: 5em;
`;

// Form.
const Form = styled.form`
  min-width: 100vw;
  height: auto;
  min-height: 10em;
`;

// Form container.
const FormWrapper = styled(ContainerStyled)`
  width: 100%;
  height: 100%;
`;

// Form Input Container.
const InputsContainer = styled(BorderedContainerStyled)`
  width: 30em;
  /* Margin, Padding, Border */
  margin-bottom: 0.5em;
  /* Media medium size */
  @media (max-width: ${media.mediumSize}) {
    width: 90%;
  }
`;
