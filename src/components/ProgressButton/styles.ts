import styled from 'styled-components';

export const Button = styled.button`
  width: 2.2rem;
  height: 2.2rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  border-radius: 0.6rem;

  margin: 0.1rem 0 auto 1.8rem;

  background: var(--purple);
  color: var(--shape);

  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.9);
  }

  svg {
    font-size: 1.3rem;
  }
`;