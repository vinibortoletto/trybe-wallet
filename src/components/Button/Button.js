import React from 'react';
import * as S from './Button.style';

export default class Button extends React.Component {
  render() {
    const { isButtonDisabled, children } = this.props;
    const { pathname } = window.location;

    return (
      <S.Container>
        <S.Button type="submit" disabled={isButtonDisabled} pathname={pathname}>
          {children}
        </S.Button>
      </S.Container>
    );
  }
}
