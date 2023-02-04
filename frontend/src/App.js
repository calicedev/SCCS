import './App.css'

import { Route, Routes } from 'react-router-dom'
import AuthPage from './pages/auth/AuthPageLayout'
import MainPage from './pages/main/MainPage'
import LoginForm from './pages/auth/LoginPage'
import SignupForm from './pages/auth/SignupPage'
import FindIdForm from './pages/auth/FindIdPage'
import ResetPasswordForm from './pages/auth/ResetPwdPage'

import MyPage from './pages/mypage/MyPageLayout'
import ProfilePage from './pages/mypage/ProfilePage'
import EditProfilePage from './pages/mypage/EditProfilePage'
import EditPwdPage from './pages/mypage/EditPwdPage'
import SolvedPage from './pages/mypage/SolvedPage'
import CalendarPage from './pages/mypage/CalendarPage'
import StudyDetailPage from 'pages/mypage/StudyDetailPage'

import SolveProblem from 'pages/study/SolveProblem'
import Study from 'pages/study/Study'

import GlobalStyle from './styles/GlobalStyle'
import { ThemeProvider } from 'styled-components'
import { light, dark } from './styles/theme'
import { useSelector } from 'react-redux'

// import VideoRoomComponent from './components/VideoRoomComponent'
import WaitingPage from './pages/study/WaitingPage'
import WaitingRoom from './pages/study/WaitingRoom'
import WebSocket from 'websocket/WebSocket'
import WebSocket3 from 'websocket/WebSocket3'
import WebSocket2 from 'websocket2/WebSocket2'

function App() {
  const theme = useSelector((state) => state.theme)

  return (
    <ThemeProvider theme={theme === 'light' ? light : dark}>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/auth" element={<AuthPage />}>
          <Route path="login" element={<LoginForm />} />
          <Route path="signup" element={<SignupForm />} />
          <Route path="findid" element={<FindIdForm />} />
          <Route path="resetpassword" element={<ResetPasswordForm />} />
        </Route>
        <Route path="/mypage" element={<MyPage />}>
          <Route path="profile" element={<ProfilePage />}></Route>
          <Route path="profile/edit" element={<EditProfilePage />}></Route>
          <Route path="profile/editpassword" element={<EditPwdPage />}></Route>
          <Route path="calendar" element={<CalendarPage />}></Route>
          <Route path="studydetail/:id" element={<StudyDetailPage />}></Route>
          <Route path="solved" element={<SolvedPage />}></Route>
        </Route>
        <Route path="/solveproblem" element={<SolveProblem />}></Route>
        <Route path="/openvidu" element={<WaitingPage />}></Route>
        <Route path="/study" element={<Study />}></Route>
        {/* 대기방 2.4 민혁 생성 */}
        <Route
          path="/room/:studyroomId/waiting"
          element={<WaitingRoom />}
        ></Route>
        <Route path="/websocket" element={<WebSocket />}></Route>
        <Route path="/websocket2" element={<WebSocket2 />}></Route>
        <Route path="/websocket3" element={<WebSocket3 />}></Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App
