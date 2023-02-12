// import React, { useEffect, useState, useRef } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'

// import axios from 'libs/axios'
// import api from 'constants/api'

// import styled from 'styled-components'

// import Drawing from 'components/study/Drawing'
// import { algorithmPk, languagePk } from 'constants/pk'

// export default function Study({
//   roomInfo,
//   studyroomId,
//   personnel,
//   dataForStudy,
//   readyForStudyArray,
//   presenter,
//   setPresenter,
//   id,
//   changePresenter,
// }) {
//   // 발표자 선정
//   const [presenter, setPresenter] = useState('방장') // roomInfo.hostNickname
//   const [showParticipants, setShowParticipants] = useState(false)

//   // 발표자 변경 (study 페이지)
//   const changePresenter = (presenterNickname) => {
//     setPresenter(presenterNickname)
//     stomp.send(
//       '/pub/studyroom',
//       {},
//       JSON.stringify({
//         studyroomId: studyroomId,
//         nickname: nickname,
//         status: 'present',
//         presenter: presenterNickname,
//       }),
//     )
//   }

//   stompClient.subscribe('/sub/studyroom/' + studyroomId, function (chatDto) {
//     const content = JSON.parse(chatDto.body)
//     // 발표자 선정
//     if (content.status === 'present') {
//       setPresenter(presenter)
//   })

//   useEffect(() => {
//     const data = {
//       id: studyroomId,
//       problemIds: dataForStudy,
//     }
//     const [url, method] = api('study')
//     const config = { url, method, data }
//     console.log('스터디 페이지 입장할 때 back으로 보내는 정보!', data)
//     axios(config)
//       .then((res) => {
//         console.log('스터디페이지 데이터', res.data)
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//   }, [])

//   return (
//     <>
//       <TopNavBar>
//         <Btn>
//           {studyroomId}번방 {roomInfo.title}
//         </Btn>
//         {roomInfo.languageIds.map((languageId, idx) => {
//           return <Btn key={idx}>{languagePk[languageId]}</Btn>
//         })}
//         {roomInfo.algoIds.map((algoId, idx) => {
//           return <Btn key={idx}>#{algorithmPk[algoId]}</Btn>
//         })}
//         {['1번', '2번'].map((problem, idx) => {
//           return <Btn key={idx}>{problem}</Btn>
//         })}
//         <span> 현재 {personnel}명</span>
//         <Btn onClick={() => setShowParticipants(!showParticipants)}>
//           발표자 : {presenter}
//         </Btn>
//         {id === roomInfo.hostId ? (
//           showParticipants ? (
//             <span>
//               참여자 :
//               {readyForStudyArray.map((presenterNickname) => {
//                 return (
//                   <div
//                     onClick={() => changePresenter(presenterNickname)}
//                     key={presenterNickname}
//                   >
//                     {presenterNickname}
//                   </div>
//                 )
//               })}
//             </span>
//           ) : null
//         ) : null}
//       </TopNavBar>
//       <Drawing></Drawing>
//     </>
//   )
// }

// const TopNavBar = styled.div`
//   background: grey;
// `
// const Btn = styled.button`
//   font-size: 2.5rem;
//   color: white;
//   background-color: skyblue;
//   round: 1;
//   border: solid 2px grey;
//   border-radius: 12px;
//   padding: 5px;
// `
