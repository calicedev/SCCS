// import React, { useState } from 'react'
// import styled from 'styled-components'
// import { useNavigate, Link } from 'react-router-dom'
// import { useCookies } from 'react-cookie'
// import { useSelector } from 'react-redux'
// import AuthInput from 'components/atoms/AuthInput'

// import Check from 'components/atoms/Checkbox'




// export default function LoginForm() {
//   const navigate = useNavigate()
//   const [cookie, setCookie] = useCookies(['id'])

//   const [id, setId] = useState('')
//   const [password, setPassword] = useState('')
//   const [message, setMessage] = useState({
//     text: '',
//     isValid: '',
//   })
//   const [isChecked, setIsChecked] = useState(false)

//   const userSlice = useSelector((state) => state )
//   const dispatch = useDispatch()

//   const login = () => {
//     if (!id || !password) {
//       const newMsg = { ...message }
//       newMsg.text = '아이디와 패스워드를 모두 입력해주세요'
//       newMsg.isValid = false
//       setMessage(newMsg)
//       return
//     }
//     const data = {
//       id,
//       password,
//     }
//     const [url, method] = api('login')
//     const config = { method, data }
//     axios(url, config)
//       .then((res) => {
//         console.log(res)
//         setCookie('refresh_token', res.data['refresh_token'])
//         setCookie('access_token', res.data['access_token'])
        
//       })
//       // .then(() => {
//       //   userSlice()
//       //   dispatch(setUserinfo())
//       // })


//       .catch((err) => {
//         const checkmsg = { ...message }
//         checkmsg.text = '아이디 혹은 패스워드를 잘못 입력했습니다'
//         checkmsg.isValid = false
//         setMessage(checkmsg)
//       })
//   }

//   return (
//     <Login>
//       <Typography type='h1' value='Login'></Typography>


//       <Description>
//         If you don't have an account register
//         <br /> You can{' '}
//         <span
//           onClick={() => {
//             navigate('/auth/signup')
//           }}
//         >
//           Register here!
//         </span>
//       </Description>

//       <AuthInput
//         type="id"
//         value={id}
//         onChange={(e) => setId(e.target.value)}
//       ></AuthInput>
//       <AuthInput
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       ></AuthInput>

//       <Container>
//         <Check label='Remember Me' value={isChecked} onChange={(e) => setIsChecked(e.target.value)}></Check>
//         <div>
//           <ForgotSpan
//             onClick={() => {
//               navigate(`/auth/findid`)
//             }}
//           >
//             Forgot ID?
//           </ForgotSpan>
//           <ForgotSpan
//             onClick={() => {
//               navigate(`/auth/resetpassword`)
//             }}
//           >
//             Forgot Password?
//           </ForgotSpan>
//         </div>
//       </Container>

//       <Button onClick={login} value="Login" size="medium"></Button>
//     </Container>
//   )
// }

// const Container = styled.div`
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   padding: 0rem 8rem;
// `

// const Flexbox = styled.div`
//   display: flex;
//   justify-content: space-between;
//   margin: 1.5rem 0rem;
// `

// const Form = styled.div`
//   margin: 3rem 0rem;
// `

// const TypoLink = styled(Link)`
//   ${TypoCss}
// `
