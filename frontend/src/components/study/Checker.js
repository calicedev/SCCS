import React from 'react'

export const Checker = ({ value, setPhoneIdentify, setIsOpen, isOpen }) => {
  const ValueClick = () => {
      setPhoneIdentify(value)
      setIsOpen(!isOpen)
  }
  return(
      <li onClick={ValueClick}>{value}</li>
  )
}