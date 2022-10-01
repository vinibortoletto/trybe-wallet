import React from 'react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('App', () => {
  it('1. should mount on path "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});
