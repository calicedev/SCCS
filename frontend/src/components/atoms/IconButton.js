import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const IconButton = ({ icon, size, text, bgColor, onClick }) => {
  const sizeClass = `${size}`
  const bgColorClass = `${bgColor}`
  return (
    <IconWrapper className={`${sizeClass} ${bgColorClass}`} onClick={onClick}>
      {icon} {text}
    </IconWrapper>
  )
}

IconButton.propTypes = {
  icon: PropTypes.element,
  size: PropTypes.oneOf(['small', 'middle', 'large']),
  bgColor: PropTypes.string,
  onClick: PropTypes.func,
}
IconButton.defaultProps = {
  icon: {},
  size: 'small',
  bgColor: '#ffffff00',
  onChange: undefined,
}

const IconWrapper = styled.div`
  cursor: pointer;

  &.small {
    font-size: 1rem;
  }
  &.middle {
    font-size: 2rem;
  }
  &.large {
    font-size: 3rem;
  }
`
export default IconButton
