import styled from 'styled-components';

export const Container = styled.main`
  max-width: 1120px;
  margin: -10rem auto 0 auto;

  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

  background: var(--background);

  @media (max-width: 1120px) {
    margin: 0 auto;
    box-shadow: none;
  }

  @media (max-height: 924px) {
    margin: 0 auto;
    box-shadow: none;
    max-width: 100vw;
  }
`;

export const Header = styled.header`
  width: 100%;
  height: 59px;

  background: var(--purple);

  padding: 1rem;

  svg { 
    font-size: 2rem;
  }
`;

export const Content = styled.section`
  max-width: 1120px;
  height: 750px;
  margin: 0 auto;

  padding: 1rem 1.5rem 2rem 1.5rem;

  background: var(--background);

  display: flex;
  flex-direction: column;

  overflow-y: auto;

  form {
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 1120px) {
    height: auto;
  }

  @media (max-height: 924px) {
    height: auto;
    max-width: none;
  }
`;

export const TalkHeader = styled.div`
  width: 100%;
  height: 49px;

  display: flex;
  align-items: center;

  padding: 0.5rem 1rem;

  border-bottom: 1px solid var(--text-title);


  svg {
    font-size: 2rem;
  }

  p {
    margin-left: 1rem;
  }

  svg.MenuTalkHeader {
    margin-left: auto;
    font-size: 1rem;
  }
`;

export const BubbleIncome = styled.div`
  display: inline-block;
  position: relative;
	max-width: 400px;
	height: auto;

  border-radius: 0.6rem;

  background: var(--text-title);

  margin-bottom: 2rem;

  &:after{
    content: ' ';
    position: absolute;
    width: 0;
    height: 0;
    left: -20px;
    right: auto;
    top: 0px;
    bottom: auto;
    border: 22px solid;
    border-color: var(--text-title) transparent transparent transparent;
  }

  .talktext{
    padding: 1em;
    text-align: left;
    line-height: 1.5em;
  }
  .talktext p{
    -webkit-margin-before: 0em;
    -webkit-margin-after: 0em;
  }
`;

interface ErrorProps {
  error?: any;
}

export const BubbleOutcome = styled.div<ErrorProps>`
  display: inline-block;
  position: relative;
  width: auto;
	height: auto;

  border-radius: 0.6rem;

  background: var(--text-title);

  margin: 0 0 2rem auto;

  &:after{
    content: ' ';
    position: absolute;
    width: 0;
    height: 0;
    left: auto;
    right: -20px;
    top: 0px;
    bottom: auto;
    border: 22px solid;
    border-color: var(--text-title) transparent transparent transparent;
  }

  .talktext{
    padding: ${(props): string => props.error ? '1rem 1rem 0' : '1rem' };
    text-align: left;
    line-height: 1.5em;

    display: flex;
    align-items: center;
    justify-content: space-between;

    div.select {
      margin-bottom: auto;
      p {
        padding: 0 1rem 0 0; 
        color: var(--red);

        font-size: 0.8rem;
      }
      
      select {
        height: 2.4rem;
        max-width: 7.5rem;
      
        border-radius: 0.6rem;
        border: none;
      
        padding: 0.3rem;

        border: ${(props): string => props.error ? '2px solid var(--red)' : 'none' };

        margin-right: 0.4rem;
      }

      @media (max-width: 320px) {
        select.city {
          margin-right: -1.5rem;
        }
      }
    }
  }

  .talktextRating {
    padding: ${(props): string => props.error ? '1rem 1rem 0' : '1rem' };
    text-align: left;

    line-height: 1.5em;
    height: 7rem;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .talktext p{
    -webkit-margin-before: 0em;
    -webkit-margin-after: 0em;
  }

  @media (max-width: 320px) {
    margin-left: -1rem;
  }
`;