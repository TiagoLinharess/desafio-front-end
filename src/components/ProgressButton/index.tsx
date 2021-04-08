import React from 'react';

import { IoChevronForwardOutline } from 'react-icons/io5';

import { Button } from './styles';

interface ButtonProps {
  disabled: boolean;
  onClick: () => void;
}

export const ProgressButton = ({disabled, onClick}: ButtonProps) => {
  return (
    <Button
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      <IoChevronForwardOutline />
    </Button>
  );
};