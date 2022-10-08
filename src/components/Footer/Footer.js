import React from 'react';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import viniLogo from '../../assets/vini-logo.png';
import * as S from './Footer.style';

export default class Footer extends React.Component {
  render() {
    const GITHUB_URL = 'https://github.com/vinibortoletto/';
    const LINKEDIN_URL = 'https://www.linkedin.com/in/vinicius-bortoletto/';
    const PORTFOLIO_URL = 'https://vinibortoletto.netlify.app/';

    return (
      <S.Footer>
        <p>
          Desenvolvido por <span>vini.bortoletto</span>
        </p>
        <S.SocialsList>
          <li>
            <a href={GITHUB_URL}>
              <AiFillGithub />
            </a>
          </li>
          <li>
            <a href={PORTFOLIO_URL}>
              <img src={viniLogo} alt="logo de vinicius bortoletto" />
            </a>
          </li>
          <li>
            <a href={LINKEDIN_URL}>
              <AiFillLinkedin />
            </a>
          </li>
        </S.SocialsList>
      </S.Footer>
    );
  }
}
