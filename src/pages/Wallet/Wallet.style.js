import styled from 'styled-components/macro';
import media from '../../helpers/style/mixins/media';
import variables from '../../helpers/style/variables.styles';

const { color, border_radius } = variables;

export const Wrapper = styled.div`
  width: 80%;
  max-width: 1500px;
  background-color: ${color.white};
  border-radius: 0 0 ${border_radius.container} ${border_radius.container};
  padding: 5rem 2rem;
  box-shadow: 0 0 2rem ${color.shadow};

  position: absolute;
  top: 0;
  left: 50%;
  translate: -50% 0;

  ${media(768)} {
    padding: 5rem 7rem;
  }
`;
