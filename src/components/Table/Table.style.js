import styled from 'styled-components/macro';
import media from '../../helpers/style/mixins/media';
import variables from '../../helpers/style/variables.styles';

const { color, border_radius } = variables;

export const Container = styled.div`
  width: 90%;
  padding: 33rem 2rem 5rem 2rem;
  overflow-x: auto;
  margin: auto;
  margin-top: 16rem;

  border-radius: ${border_radius.container};
  background-color: ${color.dark_blue};

  ${media(768)} {
    padding-top: 31rem;
  }

  ${media(1024)} {
    margin-top: 10rem;
    padding-top: 20rem;
  }
`;

export const Table = styled.table`
  width: 100%;
  padding: 0 1rem;

  table-layout: fixed;
  border-collapse: collapse;
  border-spacing: 0;

  color: ${color.light_blue};
  font-size: 0.8rem;
  font-weight: bold;

  thead th {
    width: 10rem;
    height: 3rem;
    padding: 0 0.5rem;

    vertical-align: middle;
    border-right: 1px solid ${color.light_green};
    &:last-of-type {
      border: none;
    }
  }

  tbody td {
    height: 3rem;
    vertical-align: middle;
    border-top: 1px solid ${color.light_green};
    text-align: center;
    color: ${color.white};
  }
`;

export const ButtonsContainer = styled.td`
  display: flex;
  justify-content: center;
  gap: 1rem;

  button {
    font-weight: bold;
    font-size: 1rem;
  }
`;
