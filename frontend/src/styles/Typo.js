import styled, { css } from 'styled-components'

const Typo = styled.p`
  color: ${({ theme }) => theme.mainColor};
  font-size: 1rem;
  font-weight: ${({ weight }) => (weight ? weight : '400')};

  &.h1 {
    font-size: 2rem;
    font-weight: ${({ weight }) => (weight ? weight : '700')};
    margin: 1rem 0rem;
  }
  &.h2 {
    font-size: 1.5rem;
    font-weight: ${({ weight }) => (weight ? weight : '600')};
    margin: 0.7rem 0rem;
  }
  &.h3 {
    font-size: 1.2rem;
    font-weight: ${({ weight }) => (weight ? weight : '500')};
    margin: 0.6rem 0rem;
  }
  &.p {
    font-size: 1rem;
    font-weight: ${({ weight }) => (weight ? weight : '400')};
  }
  &.c {
    font-size: 0.8rem;
    font-weight: ${({ weight }) => (weight ? weight : '300')};
  }
  &.pass {
    color: ${({ theme }) => theme.passColor};
  }
  &.error {
    color: ${({ theme }) => theme.errorColor};
  }
  &.gray {
    color: ${({ theme }) => theme.grayColor};
  }
  &.main {
    color: ${({ theme }) => theme.mainColor};
  }
`

const TypoCss = css`
  color: ${({ theme }) => theme.mainColor};
  font-size: 1rem;
  font-weight: ${({ weight }) => (weight ? weight : '400')};

  &.h1 {
    font-size: 2rem;
    font-weight: ${({ weight }) => (weight ? weight : '700')};
    margin: 1rem 0rem;
  }
  &.h2 {
    font-size: 1.5rem;
    font-weight: ${({ weight }) => (weight ? weight : '600')};
    margin: 0.7rem 0rem;
  }
  &.h3 {
    font-size: 1.2rem;
    font-weight: ${({ weight }) => (weight ? weight : '500')};
    margin: 0.6rem 0rem;
  }
  &.p {
    font-size: 1rem;
    font-weight: ${({ weight }) => (weight ? weight : '400')};
  }
  &.c {
    font-size: 0.8rem;
    font-weight: ${({ weight }) => (weight ? weight : '300')};
  }
  &.pass {
    color: ${({ theme }) => theme.passColor};
  }
  &.error {
    color: ${({ theme }) => theme.errorColor};
  }
  &.gray {
    color: ${({ theme }) => theme.grayColor};
  }
  &.main {
    color: ${({ theme }) => theme.mainColor};
  }
`

export default Typo
export { TypoCss }
