import React from "react";

// Styled-Components
import styled from "styled-components";
import { colors, media } from "../../../style/main_style";

// Social icons
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import FacebookIcon from "@material-ui/icons/Facebook";

// Used text in component
const textoConstruccion = {
  line1: "professional clothing for professional people",
  line2: "contact us | contáctanos",
  line3: "info@silkandrock.com",
};

// instagram link
const links = {
  instagram: "https://www.instagram.com/silknrock",
  facebook: "https://www.facebook.com/SilkRock-105507864521145",
  linkedin: "https://es.linkedin.com/organization-guest/company/silkandrock",
};


/**
 * Social component.
 *
 */
const Social = () => (
  <SocialContainer>
    <LogoText>
      <p>{textoConstruccion.line1}</p>
    </LogoText>
    <SocialLinks>
      <p>{textoConstruccion.line2} </p>
      <p>
        <b> {textoConstruccion.line3}</b>
      </p>
      <SocialIcon target="_blank" href={links.instagram}>
        <InstagramIcon fontSize="large" />
      </SocialIcon>
      <SocialIcon target="_blank" href={links.facebook}>
        <FacebookIcon fontSize="large" />
      </SocialIcon>
      <SocialIcon target="_blank" href={links.linkedin}>
        <LinkedInIcon fontSize="large" />
      </SocialIcon>
    </SocialLinks>
  </SocialContainer>
);

export default Social;

/* Styled-Components */
// Container en construccion
const SocialContainer = styled.div`
  width: 70%;
  /* Font */
  color: ${colors.mainBlack};
  text-transform: uppercase;
`;

// Work Message
const LogoText = styled.div`
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
const SocialLinks = styled.div`
  width: 100%;
  /* Margin, Padding, Border */
  margin-top: 20em;
  /* Font */
  text-align: center;
`;

// Social icon
const SocialIcon = styled.a`
  color: ${colors.mainBlack};
  /* Margin, Padding, Border */
  margin: 0 0.2em;
`;
