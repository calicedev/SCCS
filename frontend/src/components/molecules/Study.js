import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Study({ studies }) {
  const [showOptions, setShowOptions] = useState(false)
  const navigate = useNavigate()

  const onMouseEnter = () => {
    setShowOptions(true)
  }

  const onMouseLeave = () => {
    setShowOptions(false)
  }

  const onClick = () => {}

  return (
    <Wrapper onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {studies.map((study) => (
        <div key={study.id}>
          {study.title}
          {study.problems?.map((problem) => (
            <Option key={problem.id} hidden={!showOptions}>
              {problem.title}
            </Option>
          ))}
        </div>
      ))}
    </Wrapper>
  )
}

Study.propTypes = {
  studies: PropTypes.array,
}

Study.defaultProps = {
  studies: [],
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`

const Title = styled.div``

/* @keyframes duration | easing-function | delay |
iteration-count | direction | fill-mode | play-state | name */
const Option = styled.div`
  animation: 0.5s ease-in-out forwards dropdown;

  @keyframes dropdown {
    0% {
      opacity: 0;
      transform: translate3d(0, -100%, 0);
    }
    100% {
      opacity: 1;
      transform: translateZ(0);
    }
  }
`
