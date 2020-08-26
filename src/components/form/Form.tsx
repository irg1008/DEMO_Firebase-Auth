import React, { FormEvent } from "react";

// Styled-Components.
import styled from "styled-components";
import {
  BorderedContainer,
  MainBGContainer,
  media,
} from "../../style/main_style";

// Titles.
import { H1 } from "../../components/titles/Titles";

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
    <Form {...{ onSubmit }} noValidate>
      <InputsContainer>{content}</InputsContainer>
      {bottomComponent}
    </Form>
  </FormContainer>
);

export default FormCreator;

// Form title.
const FormTitle = styled(H1)`
  /* Font */
  text-align: center;
  /* Margin, Padding, Border */
  padding: 0 1em;
`;

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

// Form.
const Form = styled.form`
  width: 30em;
  min-height: 10em;
  height: auto;
  /* Media medium size */
  @media (max-width: ${media.mediumSize}) {
    width: 90%;
  }
`;

// Form Input Container.
const InputsContainer = styled(BorderedContainer)`
  /* Margin, Padding, Border */
  margin-bottom: 0.5em;
`;
