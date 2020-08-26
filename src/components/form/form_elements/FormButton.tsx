import React from "react";

// Styled-Components.
import {
  PrimaryButton,
  colors,
  FlexContainer,
} from "../../../style/main_style";
import styled from "styled-components";

// react-spinners
// Types: https://www.davidhu.io/react-spinners/
import Loader from "react-spinners/BarLoader";

// Props of form button.
import { ButtonProps } from "../Form.types";

/**
 * Form button.
 * Only submits when enabled and not loading.
 *
 * @param {ButtonProps} {
 *   disabled,
 *   loading,
 *   text,
 * }
 * @returns
 */
const FormButton: React.FC<ButtonProps> = ({
  disabled,
  loading,
  text,
}: ButtonProps) => {
  // Loading component to replace text.
  const LoadingBar = (
    <FlexContainer>
      <Loader width={200} height={5} color={colors.darkGrey} />
    </FlexContainer>
  );

  return (
    <Button
      type={loading ? "button" : "submit"}
      {...{ disabled }}
      styledLoading={loading}
    >
      {loading ? LoadingBar : text}
    </Button>
  );
};

export default FormButton;

// Form button.
const Button = styled(PrimaryButton)<{ styledLoading: boolean }>`
  /* Cursor */
  cursor: ${({ styledLoading }) => styledLoading && "default"};
  /* Opacity */
  opacity: ${({ styledLoading }) => styledLoading && "0.5"};
`;
