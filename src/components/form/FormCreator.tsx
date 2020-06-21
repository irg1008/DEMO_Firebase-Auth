import React from "react";

// Styled-Components
import styled from "styled-components";
import {
  ContainerStyled,
  BorderedContainerStyled,
  media,
} from "../../style/style";

/**
 * Interface for props on form wrapper.
 *
 * @interface IFormCreatorProps
 */
interface IFormCreatorProps {
  /**
   * On submit event.
   *
   * @type {*}
   * @memberof IFormCreatorProps
   */
  onSubmit: any;

  /**
   * Content of form. i.e. Two inputs + two buttons.
   *
   * @type {*}
   * @memberof IFormCreatorProps
   */
  content: any;

  /**
   * Optional bottom component of form. i.e Aditional info or alternative forms.
   *
   * @type {*}
   * @memberof IFormCreatorProps
   */
  bottomComponent?: any;
}

/**
 * Form wrapper, can strore multiple components, given a submit button is provided. Content inside wrapper cannot be empty.
 *
 * @param {IFormCreatorProps} props
 * @returns
 */
const FormCreator = (props: IFormCreatorProps) => {
  const { onSubmit, content, bottomComponent } = props;
  return (
    <FormStyled onSubmit={onSubmit}>
      <FormContainerStyled>
        <FormInputContainerStyled>{content}</FormInputContainerStyled>
        {bottomComponent}
      </FormContainerStyled>
    </FormStyled>
  );
};

export default FormCreator;

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
  margin-bottom: 0.5em;
  /* Media medium size */
  @media (max-width: ${media.mediumSize}) {
    width: 90%;
  }
`;
