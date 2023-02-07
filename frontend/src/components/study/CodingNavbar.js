// import React from 'react'
// // import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import styled from 'styled-components'

// import Button from 'components/common/Button'
// import CodingBtn from 'components/study/CodingBtn'

// export default function CodingNavbar({
//   study,
//   problemId,
//   setProblemId,
// }) {
//   const navigate = useNavigate()
//   // console.log(study)
//   return (
//     <Container>
//       <div>
//         {study &&
//           study.studyroomWithProblems.map((problem, idx) => {
//             return (
//               <CodingBtn
//                 size="medium"
//                 value={idx + 1}
//                 problemId={problemId}
//                 setProblemId={setProblemId}
//                 key={idx}
//               />
//             )
//           })}
//       </div>
//       <h1>{study.studyroomTitle}</h1>
//       <Button
//         onClick={() => navigate(`/problem/${problemId}`)} // 이 주소로 가는게 맞는지는 정확히 모르겠음
//         value="문제풀기"
//       />
//     </Container>
//   )
// }

// const Container = styled.div`
//   display: flex;
//   justify-content: space-between;
// `
