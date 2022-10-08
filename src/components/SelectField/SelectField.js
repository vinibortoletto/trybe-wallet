import React from 'react';
import * as S from './SelectField.style';

export default class SelectField extends React.Component {
  render() {
    const { label, name, value, handleInputChange, children } = this.props;

    return (
      <div>
        <label htmlFor={name}>
          {label}:
          <S.Select
            data-testid={`${name}-input`}
            name={name}
            id={name}
            value={value}
            onChange={handleInputChange}
          >
            {children}
          </S.Select>
        </label>
      </div>
    );
  }
}
