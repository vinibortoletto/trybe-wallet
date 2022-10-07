import React from 'react';
import * as S from './InputField.style';

export default class InputField extends React.Component {
  render() {
    const { name, value, label, handleInputChange } = this.props;

    return (
      <div>
        <S.Label htmlFor={name}>{label}:</S.Label>
        <S.Input
          type={name}
          id={name}
          name={name}
          value={value}
          data-testid={`${name}-input`}
          onChange={handleInputChange}
          placeholder={name}
        />
      </div>
    );
  }
}
