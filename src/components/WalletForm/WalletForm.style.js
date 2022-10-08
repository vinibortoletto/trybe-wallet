import styled from 'styled-components/macro';
import media from '../../helpers/style/mixins/media';
import variables from '../../helpers/style/variables.styles';

const { color, border_radius } = variables;

export const Form = styled.form`
  width: 100%;
  border-radius: ${border_radius.container};

  ${({ isEditing }) =>
    isEditing &&
    `
    input, select {
      border: 1px solid ${color.light_green};
      animation: glow 500ms ease infinite alternate;
    }
  `}

  @keyframes glow {
    from {
      box-shadow: none;
    }
    to {
      box-shadow: 0 0 5px ${color.light_green};
    }
  }
`;

export const FieldsContainer = styled.div`
  ${media(1024)} {
    display: flex;
    justify-content: space-between;
    gap: 2rem;

    div {
      width: 100%;
    }
  }
`;
