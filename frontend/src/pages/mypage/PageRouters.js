import { Link } from 'react-router-dom'

const PageRouters = () => {
  return (
    <>
      <Link to={'./studyhistory'}>스터디 기록</Link> <br />
      <Link to={'./problemhistory'}>내가 푼 문제</Link> <br />
      <Link to={'./userinfo'}>회원 정보</Link> <br />
    </>
  )
}

export default PageRouters
