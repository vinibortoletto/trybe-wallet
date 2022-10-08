import React from 'react';
import * as S from './InputField.style';

export default class InputField extends React.Component {
  render() {
    const { type, name, value, label, handleInputChange } = this.props;
    const { pathname } = window.location;

    return (
      <div>
        <S.Label htmlFor={name} pathname={pathname}>
          {label}:
        </S.Label>

        <S.Input
          type={type}
          id={name}
          name={name}
          value={value}
          data-testid={`${name}-input`}
          onChange={handleInputChange}
          placeholder={label}
        />
      </div>
    );
  }
}
