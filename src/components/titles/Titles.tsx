import React from "react";

// Styled-Components
import styled from "styled-components";
import { ContainerStyled, colors, media } from "../../style/main_style";

// Interface of titles props.
type ITitleProps = {
  /**
   * Title needs a string.
   *
   * @type {string}
   */
  title: string;
};

/**
 * Title 1 <h1>
 *
 * @param {string} title
 * @returns
 */
export const Title1: React.FC<ITitleProps> = ({ title }: ITitleProps) => (
  <H1>{title}</H1>
);

// Title 1
export const H1 = styled.h1`
  /* Font */
  font-size: 3.5em;
  text-transform: uppercase;
  /* Media medium size */
  @media (max-width: ${media.mediumSize}) {
    font-size: 2.5em;
  }
`;

/**
 * Title 2 <h2>
 *
 * @param {string} title
 * @returns
 */
export const Title2: React.FC<ITitleProps> = ({ title }: ITitleProps) => (
  <H2>{title}</H2>
);

// Title 2
export const H2 = styled.h2`
  /* Font */
  font-size: 1.5em;
  text-transform: uppercase;
`;

/**
 * Title 3 <h3>
 *
 * @param {string} title
 * @returns
 */
export const Title3: React.FC<ITitleProps> = ({ title }: ITitleProps) => (
  <H3>{title}</H3>
);

// Title 3
export const H3 = styled.h3`
  /* Font */
  font-size: 1em;
  text-transform: uppercase;
`;

/**
 * Title 4 <h4>
 *
 * @param {string} title
 * @returns
 */
export const Title4: React.FC<ITitleProps> = ({ title }: ITitleProps) => (
  <H4>{title}</H4>
);

// Title 4
export const H4 = styled.h4`
  /* Font */
  font-size: 1em;
  text-transform: uppercase;
  /* Margin, Padding, Border */
  margin: 0 0.5em;
`;

/**
 * Title 5 <h5>
 *
 * @param {string} title
 * @returns
 */
export const Title5: React.FC<ITitleProps> = ({ title }: ITitleProps) => (
  <H5>{title}</H5>
);

// Title 5
export const H5 = styled.h5`
  /* Font */
  font-size: 0.9em;
  text-transform: uppercase;
  /* Margin, Padding, Border */
  margin: 0 0.5em;
`;

// Interface of separator props.
type ISeparatorProps = {
  /**
   * Separator needs a width.
   *
   * @type {string}
   */
  width: string;
};

/**
 * Separator horizontal
 *
 * @returns
 */
export const Separator: React.FC<ISeparatorProps> = ({
  width,
}: ISeparatorProps) => (
  <SeparatorContainerStyled>
    <SeparatorStyled width={width} />
  </SeparatorContainerStyled>
);

// Separator
const SeparatorContainerStyled = styled(ContainerStyled)`
  width: 100%;
  height: auto;
`;

const SeparatorStyled = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  height: 0.3em;
  /* Margin, Padding, Border */
  border-bottom: 0.1em dotted ${colors.mainBlack};
`;
