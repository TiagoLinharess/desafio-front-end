import styled from 'styled-components';

interface ErrorProps {
  error?: any;
}

export const Container = styled.div<ErrorProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    padding: 0; 
    color: var(--red);

    font-size: 0.8rem;
  }
  
  input {
    height: 2.4rem;
    min-width: 15rem;
  
    border-radius: 0.6rem;
    border: ${(props): string => props.error ? '2px solid var(--red)' : 'none' };
  
    padding: 0.3rem 0 0.3rem 0.8rem;
  }
    
`;