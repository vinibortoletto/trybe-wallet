import React from 'react';
import * as S from './Field.style';

export default class Field extends React.Component {
  render() {
    const { type, label, name, value, handleInputChange, children } =
      this.props;
    const { pathname } = window.location;

    return (
      <S.Container>
        <S.Label htmlFor={name} pathname={pathname}>
          {label}:
        </S.Label>

        {type === 'select' ? (
          <select
            data-testid={`${name}-input`}
            name={name}
            id={name}
            value={value}
            onChange={handleInputChange}
          >
            {children}
          </select>
        ) : (
          <input
            type={type}
            id={name}
            name={name}
            value={value}
            data-testid={`${name}-input`}
            onChange={handleInputChange}
            placeholder={label}
          />
        )}
      </S.Container>
    );
  }
}
