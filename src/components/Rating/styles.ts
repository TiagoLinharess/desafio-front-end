import styled from 'styled-components';

export const Container = styled.div`
  svg {
    font-size: 2rem;
    color: var(--text-body);
    cursor: pointer;
    margin-right: 0.3rem;

    transition: font-size 0.2s;

    &:hover {
      font-size: 2.3rem;
    }

    &.filled {
      color: var(--yellow);
    }
  }

  p {
    padding: 0; 
    color: var(--red);

    font-size: 0.8rem;
  }
`;