import styled from 'styled-components/macro';
import media from '../../helpers/style/mixins/media';

export const Container = styled.div`
  width: 100%;
  height: 68rem;

  position: absolute;
  top: 0;
  z-index: -1;

  ${media(1024)} {
    height: 50rem;
  }
`;

export const Image = styled.img`
  width: inherit;
  height: inherit;
  object-fit: cover;
`;
