import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Typography from 'components/atoms/Typography'

export default function StudyItem({ studies }) {
  const [showOptions, setShowOptions] = useState(false)
  const navigate = useNavigate()

  const onMouseEnter = () => {
    setShowOptions(true)
  }

  const onMouseLeave = () => {
    setShowOptions(false)
  }

  return (
    <Wrapper onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {studies.map((study) => (
        <Study key={study.id} onClick={navigate('mypage/study')}>
          <Typography type="p" value={study.title} />
          {study.problems?.map((problem) => (
            <Option key={problem.id} hidden={!showOptions}>
              <Typography type="c" value={problem.title} />
            </Option>
          ))}
        </Study>
      ))}
    </Wrapper>
  )
}

StudyItem.propTypes = {
  studies: PropTypes.array,
}

StudyItem.defaultProps = {
  studies: [],
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`

const Study = styled.div`
  margin-bottom: 0.5rem;
`

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
