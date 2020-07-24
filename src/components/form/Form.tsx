import React, { FormEvent } from "react";

// Styled-Components.
import styled from "styled-components";
import {
  ContainerStyled,
  BorderedContainerStyled,
  MainBGContainerStyled,
  media,
} from "../../style/main_style";

// Titles.
import { H1 } from "../../components/titles/Titles";

// All forms shared state.
// Form is loading and is valid.
export type IGenericFormState = {
  isLoading: boolean;
  isValidForm?: boolean;
};

// Initial state for shared state across all forms.
export const INITIAL_GENERIC_FORM_STATE: IGenericFormState = {
  isLoading: false,
  isValidForm: false,
};

// Form props type.
type IFormCreatorProps = {
  /**
   * Title of form.
   *
   * @type {JSX.Element}
   */
  title: string;

  /**
   * Content of form.
   * i.e.: Two inputs + showPassword component + one button.
   *
   * @type {*}
   */
  content: JSX.Element;

  /**
   * Optional bottom component of form.
   * i.e.: Aditional info or alternative forms.
   *
   * @type {JSX.Element}
   */
  bottomComponent?: JSX.Element;

  /**
   * On submit function.
   *
   */
  onSubmit: (e: FormEvent) => void;
};

//////////////////////

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

//////////////////////
/* Styled-Components */

// Form title.
const FormTitle = styled(H1)`
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
