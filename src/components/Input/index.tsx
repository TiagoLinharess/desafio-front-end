import React from 'react';

import { Container } from './styles';

interface inputProps {
  type: string;
  name: string;
  handleChange: (e: any) => void;
  value: string | number;
  placeholder: string;
  errors: string | number | undefined;
}

export const Input = ({type, name, placeholder, handleChange, value, errors}: inputProps) => {
  return (
    <Container error={errors}>
      <input
        type={type}
        name={name}
        onChange={handleChange}
        value={value}
        placeholder={placeholder}
      />
      {errors && (
        <p className="inputError">{errors}</p>
      )}
    </Container>
  );
}