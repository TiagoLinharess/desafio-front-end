import { ReactNode } from 'react';

import { Button } from './styles';

interface ButtonProps {
  isSubmitting: boolean;
  children: ReactNode;
}

export const SubmitButton = ({children, isSubmitting}: ButtonProps) => {
  return (
    <Button type="submit" disabled={isSubmitting}>
      {children}
    </Button>
  );
}