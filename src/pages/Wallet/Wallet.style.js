import styled from 'styled-components/macro';
import media from '../../helpers/style/mixins/media';
import variables from '../../helpers/style/variables.styles';

const { color, border_radius } = variables;

export const Wrapper = styled.div`
  background-color: ${color.white};
  margin: 0 5%;
  border-radius: 0 0 ${border_radius.container} ${border_radius.container};
  padding: 5rem 2rem;

  ${media(768)} {
    padding: 5rem 7rem;
  }
`;
