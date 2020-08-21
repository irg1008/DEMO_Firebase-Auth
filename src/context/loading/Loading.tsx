import React, { useEffect, useState } from "react";

// Styled-Components.
import styled from "styled-components";
import { ContainerStyled, animations, colors } from "../../style/main_style";

// Loading component.
import { LoadingSpinner } from "../../context/loading/loading_elements";

// Loading consumer.
import { useLoading } from ".";

/**
 * Loading component.
 *
 * @returns
 */
const Loading: React.FC = () => {
  // Loading context.
  const { loading } = useLoading().state;

  // Render component.
  // Set to not render at the en dof hide animation.
  const [render, setRender] = useState(false);

  /**
   * On animation end => Not render component.
   *
   */
  const onAnimationEnd = () => {
    // If not loading => Not render.
    if (!loading) setRender(false);
  };

  // On loading change.
  useEffect(() => {
    // If loading => Render.
    if (loading) {
      setRender(true);
    }
  }, [loading]);

  return render ? (
    <FullContainer onAnimationEnd={onAnimationEnd} show={loading}>
      <LoadingContainer>
        <LoadingSpinner />
      </LoadingContainer>
    </FullContainer>
  ) : null;
};

export default Loading;

// Full display container.
const FullContainer = styled(ContainerStyled)<{ show: boolean }>`
  width: 100vw;
  height: 100vh;
  /* Flexbox */
  justify-content: flex-start;
  /* z-index. Value of 999, to ensure is first layer */
  z-index: 999;
  /* Position */
  position: absolute;
  top: 0;
  left: 0;
  /* BG */
  background-color: ${colors.mainWhite};
  /* Opacity */
  opacity: ${(props) => (props.show ? 1 : 0)};
  /* Pointer-Events */
  pointer-events: ${(props) => (props.show ? "default" : "none")};
  /* Animation */
  animation: ${(props) =>
      props.show ? animations.fadeInAnimation : animations.fadeOutAnimation}
    0.5s;
`;

// Loading container.
const LoadingContainer = styled(ContainerStyled)`
  width: 100%;
  height: 50%;
  /* Flexbox */
  justify-content: space-between;
`;
