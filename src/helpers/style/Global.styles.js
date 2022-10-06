import { createGlobalStyle } from 'styled-components/macro';
import { Reset } from './Reset.styles';
import variables from './variables.styles';
// import './fonts.css';

const { color, font_family } = variables;

const GlobalStyles = createGlobalStyle`
  ${Reset};

  body {
    background-color: ${color.light_green};
    color: ${color.dark_blue};
    font-family: ${font_family.default};
  }
`;

export default GlobalStyles;
