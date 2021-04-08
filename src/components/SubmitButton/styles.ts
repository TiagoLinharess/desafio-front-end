import styled from 'styled-components';

export const Button = styled.button`
  max-width: 320px;
  height: 3rem;
  margin: 0 auto;
  padding: 0 6rem;

  border: 0;
  border-radius: 0.6rem;

  background-color: var(--purple);
  color: var(--background);

  font-size: 1rem;

  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.9);
  }
`;