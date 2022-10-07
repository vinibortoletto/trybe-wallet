import styled from 'styled-components/macro';
import media from '../../helpers/style/mixins/media';
import variables from '../../helpers/style/variables.styles';

const { color } = variables;

export const Header = styled.header`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2rem;

  ${media(768)} {
    svg {
      font-size: 1.5rem;
    }
  }

  ${media(1024)} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const Logo = styled.img`
  width: 14rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  svg {
    margin-right: 0.5rem;
  }

  ${media(768)} {
    width: 100%;
    max-width: 40rem;
    flex-direction: row;
    justify-content: space-between;

    svg {
      font-size: 1.5rem;
    }
  }
`;

export const TotalExpense = styled.p`
  display: flex;
  align-items: center;
`;

export const TotalExpenseText = styled.span`
  font-weight: bold;
  margin-right: 0.3rem;
`;

export const Email = styled.p`
  display: flex;
  align-items: center;
  color: ${color.light_green};
  font-weight: bold;
`;
