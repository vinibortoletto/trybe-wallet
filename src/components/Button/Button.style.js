import styled from 'styled-components/macro';
import variables from '../../helpers/style/variables.styles';

const { color, border_radius } = variables;

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const Button = styled.button`
  width: 100%;
  background-color: ${color.dark_blue};
  color: ${color.white};
  padding: 0.7rem;
  border-radius: ${border_radius.element};
  font-weight: bold;

  &:disabled {
    background-color: ${color.light_grey};
  }

  ${({ pathname }) =>
    pathname === '/carteira' &&
    `
    background-color: ${color.light_green};
    margin-top: 1rem;
    max-width: 20rem;
  `}
`;
