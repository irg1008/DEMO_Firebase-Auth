import React from "react";

// Styled-Components
import styled from "styled-components";
import { ContainerStyled, colors, media } from "../../style/style";

/**
 * Interface of titles props.
 *
 * @interface ITitleProps
 */
interface ITitleProps {
  /**
   * Title needs a string.
   *
   * @type {string}
   * @memberof ITitleProps
   */
  title: string;
}

/**
 * Interface of separator props.
 *
 * @interface ISeparatorProps
 */
interface ISeparatorProps {
  /**
   * Separator needs a width.
   *
   * @type {string}
   * @memberof ISeparatorProps
   */
  width: string;
}

/**
 * Title 1 <h1>
 *
 * @param {string} title
 * @returns
 */
const Title1 = (props: ITitleProps) => {
  const { title } = props;
  return (
    <Title1Styled>
      {title}
      <Separator width="70%" />
    </Title1Styled>
  );
};

/**
 * Title 2 <h2>
 *
 * @param {string} title
 * @returns
 */
const Title2 = (props: ITitleProps) => {
  const { title } = props;
  return <Title2Styled>{title}</Title2Styled>;
};

/**
 * Title 3 <h3>
 *
 * @param {string} title
 * @returns
 */
const Title3 = (props: ITitleProps) => {
  const { title } = props;
  return <Title3Styled>{title}</Title3Styled>;
};

/**
 * Title 4 <h4>
 *
 * @param {string} title
 * @returns
 */
const Title4 = (props: ITitleProps) => {
  const { title } = props;
  return <Title4Styled>{title}</Title4Styled>;
};

/**
 * Title 5 <h5>
 *
 * @param {string} title
 * @returns
 */
const Title5 = (props: ITitleProps) => {
  const { title } = props;
  return <Title5Styled>{title}</Title5Styled>;
};

/**
 * Separator horizontal
 *
 * @returns
 */
const Separator = (props: ISeparatorProps) => {
  const { width } = props;
  return (
    <SeparatorContainerStyled>
      <SeparatorStyled width={width} />
    </SeparatorContainerStyled>
  );
};

export { Title1, Title2, Title3, Title4, Title5, Separator };

// Styled-Components
// Title 1
const Title1Styled = styled.h1`
  font-size: 4em;
  text-transform: uppercase;
  /* Media medium size */
  @media (max-width: ${media.mediumSize}) {
    font-size: 2.5em;
  }
`;

// Title 2
const Title2Styled = styled.h2`
  font-size: 1.5em;
  text-transform: uppercase;
`;

// Title 3
const Title3Styled = styled.h3`
  font-size: 1em;
  text-transform: uppercase;
`;

// Title 4
const Title4Styled = styled.h4`
  font-size: 1em;
  text-transform: uppercase;
  margin: 0 0.5em;
`;

// Title 5
const Title5Styled = styled.h5`
  font-size: 0.9em;
  text-transform: uppercase;
  margin: 0 0.5em;
`;

// Separator
const SeparatorContainerStyled = styled(ContainerStyled)`
  width: 100%;
  height: auto;
`;

const SeparatorStyled = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  height: 0.3em;
  border-bottom: 0.1em dotted ${colors.mainBlack};
`;
