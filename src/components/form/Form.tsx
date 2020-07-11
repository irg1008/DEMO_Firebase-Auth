import React from "react";

// Styled-Components
import styled from "styled-components";
import {
  ContainerStyled,
  BorderedContainerStyled,
  MainBGContainerStyled,
  media,
} from "../../style/main_style";

// Titles
import { Title1Styled } from "../../components/titles/Titles";

// Interface for props on form wrapper.
type IFormCreatorProps = {
  /**
   * On submit event.
   *
   * @type {*}
   */
  onSubmit: any;

  /**
   * Content of form. i.e. Two inputs + two buttons.
   *
   * @type {*}
   */
  content: any;

  /**
   * Optional bottom component of form. i.e Aditional info or alternative forms.
   *
   * @type {*}
   */
  bottomComponent?: any;

  /**
   * Title of form.
   *
   * @type {string}
   */
  title: string;
};

/**
 * Form wrapper, can strore multiple components, given a submit button is provided. Content inside wrapper cannot be empty.
 *
 * @param {IFormCreatorProps} props
 * @returns
 */
const FormCreator: React.FC<IFormCreatorProps> = ({
  onSubmit,
  content,
  bottomComponent,
  title,
}: IFormCreatorProps) => (
  <FormContainer>
    <FormTitle>{title}</FormTitle>
    <FormStyled onSubmit={onSubmit}>
      <FormContainerStyled>
        <FormInputContainerStyled>{content}</FormInputContainerStyled>
        {bottomComponent}
      </FormContainerStyled>
    </FormStyled>
  </FormContainer>
);

export default FormCreator;

// Styled-Components
// Form title
const FormTitle = styled(Title1Styled)`
  width: 100%;
  /* Font */
  text-align: center;
`;

// Form Container
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

// Form
const FormStyled = styled.form`
  min-width: 100vw;
  height: auto;
  min-height: 10em;
`;

// Form container
const FormContainerStyled = styled(ContainerStyled)`
  width: 100%;
  height: 100%;
`;

// Form Input Container
const FormInputContainerStyled = styled(BorderedContainerStyled)`
  width: 30em;
  /* Margin, Padding, Border */
  margin-bottom: 0.5em;
  /* Media medium size */
  @media (max-width: ${media.mediumSize}) {
    width: 90%;
  }
`;
