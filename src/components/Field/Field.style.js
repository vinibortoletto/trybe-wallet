import styled from 'styled-components/macro';
import variables from '../../helpers/style/variables.styles';

const { color, border_radius } = variables;

export const Container = styled.div`
  input,
  select {
    width: 100%;
    border: 1px solid ${color.dark_blue};
    padding: 0.7rem;
    border-radius: ${border_radius.element};
    margin-bottom: 0.5rem;
    background-color: ${color.white};
    color: ${color.dark_blue};

    ::placeholder {
      color: ${color.dark_blue};
      opacity: 0.7;
    }
  }
`;

export const Label = styled.label`
  ${({ pathname }) =>
    pathname === '/' &&
    `
    position: absolute;
    top: -9999px;
  `}

  ${({ pathname }) =>
    pathname === '/carteira' &&
    `
    font-weight: bold;
  `}
`;
