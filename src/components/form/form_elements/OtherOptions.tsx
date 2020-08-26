import React from "react";

// Styled-components.
import styled from "styled-components";
import { FlexContainer } from "../../../style/main_style";

// Arrow icon.
import ArrowIcon from "@material-ui/icons/ArrowBackIos";

// Type of other options.
type OtherOptionsProps = {
  /**
   * On clcik function.
   *
   */
  onClick: () => void;

  // Other option text.
  otherOptionText: string;
};

/**
 * Other options to change auth.
 *
 * @returns
 */
const OtherOptions: React.FC<OtherOptionsProps> = ({
  onClick,
  otherOptionText,
}: OtherOptionsProps) => (
  <OtherOptionsContainer {...{ onClick }}>
    <ArrowIcon fontSize="inherit" />
    <OtheOptionsText>{otherOptionText}</OtheOptionsText>
  </OtherOptionsContainer>
);

export default OtherOptions;

// Other options container.
const OtherOptionsContainer = styled(FlexContainer)`
  /* Flexbox */
  flex-direction: row;
  /* Font */
  text-align: center;
  font-size: 0.8em;
  /* Cursor */
  cursor: pointer;
`;

// Other options text.
const OtheOptionsText = styled.p`
  /* Margin, Padding, Border */
  padding: 0;
  margin: 0;
  /* Font */
  font-size: inherit;
  ::first-letter {
    /* Font */
    text-transform: uppercase;
  }
  /* Hover */
  :hover {
    /* Font */
    text-decoration: underline;
  }
`;
