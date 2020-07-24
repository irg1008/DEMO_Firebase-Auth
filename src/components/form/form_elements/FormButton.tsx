import React from "react";

// Styled-Components.
import {
  PrimaryButton,
  colors,
  ContainerStyled,
} from "../../../style/main_style";
import styled from "styled-components";

// react-spinners
// Types: https://www.davidhu.io/react-spinners/
import Loader from "react-spinners/BarLoader";

// Props of form button.
type IButtonProps = {
  /**
   * Text inside the button.
   *
   * @type {string}
   */
  text: string;

  /**
   * Button is disabled.
   *
   * @type {boolean}
   */
  disabled?: boolean;

  /**
   * Button is loading form.
   *
   * @type {boolean}
   */
  loading?: boolean;
};

/**
 * Form button.
 * Only submits when enabled or is not loading.
 *
 * @param {IButtonProps} {
 *   disabled,
 *   loading,
 *   text,
 * }
 */
const FormButton: React.FC<IButtonProps> = ({
  disabled,
  loading,
  text,
}: IButtonProps) => {
  // Loading component to replace text.
  const Loading = (
    <LoadingContainer>
      <Loader width={200} height={5} color={colors.darkGrey} />
    </LoadingContainer>
  );

  return (
    <Button
      type={!disabled && !loading ? "submit" : "button"}
      formProps={{ disabled, loading }}
    >
      {loading ? Loading : text}
    </Button>
  );
};

export default FormButton;

// Form button.
// NOTE: Passing an object to the styled component because otherwise complains of boolean | undefined object.
const Button = styled(PrimaryButton)<{
  formProps: { disabled?: boolean; loading?: boolean };
}>`
  /* Cursor */
  cursor: ${({ formProps }) =>
    formProps.disabled || formProps.loading ? "default" : "pointer"};
  /* Font */
  color: ${({ formProps }) => !formProps.disabled && colors.mainWhite};
  text-transform: ${({ formProps }) => !formProps.loading && "capitalize"};
  /* BG */
  background-color: ${({ formProps }) => formProps.disabled && colors.mainGrey};
  /* Opacity */
  opacity: ${({ formProps }) => formProps.loading && "0.5"};
  /* Hover */
  &:hover {
    /* BG */
    background-color: ${({ formProps }) =>
      formProps.disabled && !formProps.loading && colors.mainGrey};
  }
`;

// Loading container.
const LoadingContainer = styled(ContainerStyled)``;
