import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export default function ToggleButton({
  leftIcon,
  rightIcon,
  isLeft,
  onClick,
  width,
  height,
}) {
  return (
    <Container onClick={onClick} width={width} height={height}>
      <FlexBox className={isLeft ? 'left' : 'right'}>
        <StyledBall className={isLeft ? 'left' : 'right'}></StyledBall>
      </FlexBox>
      <LeftIcon className={isLeft ? 'left' : 'right'}>{leftIcon}</LeftIcon>
      <RightIcon className={isLeft ? 'left' : 'right'}>{rightIcon}</RightIcon>
    </Container>
  )
}

ToggleButton.propTypes = {
  leftIcon: PropTypes.element.isRequired,
  rightIcon: PropTypes.element.isRequired,
  isLeft: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  width: PropTypes.string,
  height: PropTypes.string,
}

ToggleButton.defaultProps = {
  onClick: undefined,
  width: '100%',
  height: '100%',
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: ${({ width }) => width};
  height: ${({ height }) => height};

  padding: 0.2rem 0.4rem;

  position: relative;

  border: 2px solid ${({ theme }) => theme.secondaryColor};
  border-radius: 1rem;
`

const FlexBox = styled.div`
  display: flex;
  align-items: center;

  position: absolute;
  z-index: 2;

  height: 100%;
  width: 100%;
`

const StyledBall = styled.div`
  height: 1.2rem;
  width: 1.2rem;

  border-radius: 50%;
  background-color: ${({ theme }) => theme.lightSecondaryColor};

  transition: all 0.3s ease-in-out;
  &.left {
    transform: translateX(0%);
  }

  &.right {
    transform: translateX(1.85rem);
  }
`
const LeftIcon = styled.div`
  z-index: 1;

  font-size: 1.2rem;

  color: ${({ theme }) => theme.deepSecondaryColor};
  transition: all 0.3s ease-in-out;
  &.left {
    scale: 0;
    transform: rotate(0turn);
  }

  &.right {
    scale: 1;
    transform: rotate(1turn);
  }
`

const RightIcon = styled.div`
  z-index: 1;

  font-size: 1.2rem;

  color: ${({ theme }) => theme.deepSecondaryColor};
  transition: all 0.3s ease-in-out;
  &.left {
    scale: 1;
    transform: rotate(1turn);
  }

  &.right {
    scale: 0;
    transform: rotate(0turn);
  }
`
