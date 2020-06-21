import React from "react";

// Styled-Components
import styled from "styled-components";
import { colors, media } from "../../../style/style";

// import InstagramIcon from "@material-ui/icons/Instagram";
// import LinkedInIcon from '@material-ui/icons/LinkedIn';
// import FacebookIcon from "@material-ui/icons/Facebook";

// Used text in component
const textoConstruccion = {
  line1: "professional clothing for professional people",
  line2: "contact us | contáctanos",
  line3: "info@silkandrock.com",
};

/**
 * Building app panel.
 *
 * @returns Temporal panel of building app.
 */
const EnConstruccion = () => {
  return (
    <EnConstruccionContainerStyled>
      <EnConstruccionWorkStyled>
        <p>{textoConstruccion.line1}</p>
      </EnConstruccionWorkStyled>
      <EnConstruccionContactStyled>
        <p>{textoConstruccion.line2} </p>
        <p>
          <b> {textoConstruccion.line3}</b>
        </p>
        {/*<InstagramIcon />
        <FacebookIcon />*/}
      </EnConstruccionContactStyled>
    </EnConstruccionContainerStyled>
  );
};

export default EnConstruccion;

/* Styled-Components */
// Container en construccion
const EnConstruccionContainerStyled = styled.div`
  width: 70%;
  /* Font */
  color: ${colors.mainBlack};
  text-transform: uppercase;
`;

// Work Message
const EnConstruccionWorkStyled = styled.div`
  width: 100%;
  /* Margin, Padding, Border */
  margin-top: 2em;
  /* Font */
  font-size: 1em;
  text-align: center;
  font-weight: 500;
  /* Media medium size */
  @media (max-width: ${media.mediumSize}) {
    /* Font */
    font-size: 0.8em;
  }
`;

// Contact
const EnConstruccionContactStyled = styled.div`
  width: 100%;
  /* Margin, Padding, Border */
  margin-top: 20em;
  /* Font */
  text-align: center;
`;
