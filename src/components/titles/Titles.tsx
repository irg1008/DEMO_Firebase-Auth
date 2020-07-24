import React from "react";

// Styled-Components.
import styled from "styled-components";
import { ContainerStyled, colors, media } from "../../style/main_style";

// Type of title.
type ITitle = {
  /**
   * Title text.
   *
   * @type {string}
   */
  title: string;
};

// Title 1. (<h1> with decorations).
export const Title1: React.FC<ITitle> = ({ title }: ITitle) => <H1>{title}</H1>;

// h1 styled.
export const H1 = styled.h1`
  /* Font */
  font-size: 3.5em;
  text-transform: uppercase;
  /* Media medium size */
  @media (max-width: ${media.mediumSize}) {
    font-size: 2.5em;
  }
`;

// Title 2. (<h2> with decorations).
export const Title2: React.FC<ITitle> = ({ title }: ITitle) => <H2>{title}</H2>;

// h2 styled.
export const H2 = styled.h2`
  /* Font */
  font-size: 1.5em;
  text-transform: uppercase;
`;

// Title 3. (<h3> with decorations).
export const Title3: React.FC<ITitle> = ({ title }: ITitle) => <H3>{title}</H3>;

// h3 styled.
export const H3 = styled.h3`
  /* Font */
  font-size: 1em;
  text-transform: uppercase;
`;

// Title 4. (<h4> with decorations).
export const Title4: React.FC<ITitle> = ({ title }: ITitle) => <H4>{title}</H4>;

// h4 styled.
export const H4 = styled.h4`
  /* Font */
  font-size: 1em;
  text-transform: uppercase;
  /* Margin, Padding, Border */
  margin: 0 0.5em;
`;

// Title 5. (<h5> with decorations).
export const Title5: React.FC<ITitle> = ({ title }: ITitle) => <H5>{title}</H5>;

// h5 styled.
export const H5 = styled.h5`
  /* Font */
  font-size: 0.9em;
  text-transform: uppercase;
  /* Margin, Padding, Border */
  margin: 0 0.5em;
`;

// Separator type.
type ISeparator = {
  /**
   * Separator width.
   *
   * @type {number}
   */
  width: number;
};

/**
 * Separator horizontal
 *
 * @returns
 */
export const Separator: React.FC<ISeparator> = ({ width }: ISeparator) => (
  <SeparatorContainerStyled>
    <SeparatorStyled {...{ width }} />
  </SeparatorContainerStyled>
);

// Separator.
const SeparatorContainerStyled = styled(ContainerStyled)`
  width: 100%;
  height: auto;
`;

// Separator bar.
const SeparatorStyled = styled.div<{ width: number }>`
  width: ${(props) => props.width};
  height: 0.3em;
  /* Margin, Padding, Border */
  border-bottom: 0.1em dotted ${colors.mainBlack};
`;
