import React from 'react' 
import styled from 'styled-components'
import PropTypes from 'prop-types'


const IconButton =({icon, size, bgColor, onClick}) => {
  const sizeClass = `${size}`
  const bgColorClass= `${bgColor}`
  return (
    <IconWrapper className={`${sizeClass} ${bgColorClass}`} onClick={onClick}>
      {icon}
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

const IconWrapper=styled.div`
  &.small{
    width: 4rem;
    height: 2rem;
  }
  &.middle{
    width: 6rem;
    height: 3rem;
  }
  &.large{
    width: 8rem;
    height: 4rem;
  }

`
export default IconButton
