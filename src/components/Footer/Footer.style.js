import styled from 'styled-components/macro';
import variables from '../../helpers/style/variables.styles';

const { color, border_radius } = variables;

export const Footer = styled.footer`
  width: 30%;
  padding: 1rem;
  margin: 5rem auto 2rem auto;

  display: flex;
  flex-direction: column;
  align-items: center;

  color: white;
  border-radius: ${border_radius.container};
  filter: drop-shadow(0 0 3px ${color.shadow});

  p {
    margin-bottom: 1rem;
  }

  span {
    font-weight: bold;
  }
`;

export const SocialsList = styled.ul`
  display: flex;
  align-items: center;
  gap: 1rem;

  img {
    width: 1rem;
  }

  svg {
    font-size: 1.5rem;
  }

  a {
    display: flex;
    align-items: center;
  }
`;
