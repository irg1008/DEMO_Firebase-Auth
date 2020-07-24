import React from "react";

// Styled-Components.
import { colors } from "../../../style/main_style";

// react-spinners.
// Types: https://www.davidhu.io/react-spinners/
import Loader from "react-spinners/BarLoader";

/**
 * Loading element.
 *
 */
const LoadingSpinner: React.FC = () => (
  <Loader width={"100%"} color={colors.darkBrown} />
);

export default LoadingSpinner;
