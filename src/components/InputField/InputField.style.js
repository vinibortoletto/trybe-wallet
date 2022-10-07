import styled from 'styled-components/macro';
import variables from '../../helpers/style/variables.styles';

const { color, border_radius } = variables;

export const Label = styled.label`
  position: absolute;
  top: -9999px;
`;

export const Input = styled.input`
  width: 100%;
  border: 1px solid ${color.dark_blue};
  padding: 0.7rem;
  border-radius: ${border_radius.element};
  margin-bottom: 0.5rem;

  ::placeholder {
    color: ${color.dark_blue};
    opacity: 0.7;
  }
`;
