import React from 'react';
import backgroundImage from '../../assets/background.png';
import * as S from './Background.style';

export default class Background extends React.Component {
  render() {
    return (
      <S.Container>
        <S.Image
          src={backgroundImage}
          alt="fundo verde com várias moedas caindo e uma seta apontando para o alto"
        />
      </S.Container>
    );
  }
}
