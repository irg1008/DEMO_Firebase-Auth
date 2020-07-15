import React from "react";

// Styled-Components
import { colors } from "../../../style/main_style";

// react-spinners
// Types: https://www.davidhu.io/react-spinners/
import Loader from "react-spinners/PuffLoader";

/**
 * Loading element.
 *
 * @returns
 */
const LoadingSpinner: React.FC = () => <Loader color={colors.darkBrown} />;

export default LoadingSpinner;
