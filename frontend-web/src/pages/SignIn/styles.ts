import styled from 'styled-components';
import { shade } from 'polished';

import signInBackgroungImg from '../../assets/sign-in-background.png';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  place-content: center;

  width: 100%;
  max-width: 600px;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    display: flex;
    flex-direction: column;

    h1 {
      margin-bottom: 24px;
    }

    a {
      text-decoration: none;
      display: block;
      color: #f4ede8;
      margin-top: 24px;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  > a {
    text-decoration: none;
    display: block;
    margin-top: 24px;
    color: #ff9000;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 18px;
    }

    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackgroungImg}) no-repeat center;
  background-size: cover;
`;
