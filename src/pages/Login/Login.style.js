import styled from 'styled-components/macro';
import variables from '../../helpers/style/variables.styles';
import media from '../../helpers/style/mixins/media';

const { color, border_radius } = variables;

export const Section = styled.section`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 35rem;
  padding: 5rem 2rem;
  background-color: ${color.white};
  border-radius: ${border_radius.container};
  box-shadow: 0px 0px 20px ${color.shadow};
`;

export const Logo = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;

  img {
    width: 14rem;

    ${media(768)} {
      width: 18rem;
    }
  }
`;

export const Form = styled.form``;

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
`;
