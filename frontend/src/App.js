import './App.css'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import PrivateRoute from 'components/common/PrivateRoute'

import AuthPageLayout from './pages/auth/AuthPageLayout'
import LoginPage from './pages/auth/LoginPage'
import SignupPage from './pages/auth/SignupPage'
import FindIdPage from './pages/auth/FindIdPage'
import ResetPasswordPage from './pages/auth/ResetPwdPage'

import MainPage from './pages/main/MainPage'

import MyPageLayout from './pages/mypage/MyPageLayout'
import ProfilePage from './pages/mypage/ProfilePage'
import EditProfilePage from './pages/mypage/EditProfilePage'
import EditPwdPage from './pages/mypage/EditPwdPage'
import SolvedPage from './pages/mypage/SolvedPage'
import CalendarPage from './pages/mypage/CalendarPage'
import StudyDetailPage from 'pages/mypage/StudyDetailPage'
import SolvePage from 'pages/mypage/SolvePage'

import GlobalStyle from './styles/GlobalStyle'
import { ThemeProvider } from 'styled-components'
import { light, dark } from './styles/theme'

import StudyRoom from './pages/study/StudyRoom'
import WaitingPage from './pages/study/WaitingPage'
import TestPage from './pages/study/TestPage'
import StudyPage from './pages/study/StudyPage'

// 2.14 민혁 추가 (프로젝트 상세 설명 페이지)
import AboutPage from 'pages/main/AboutPage'

function App() {
  const theme = useSelector((state) => state.theme)

  return (
    <ThemeProvider theme={theme === 'light' ? light : dark}>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/auth" element={<AuthPageLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="findid" element={<FindIdPage />} />
          <Route path="resetpassword" element={<ResetPasswordPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/mypage" element={<MyPageLayout />}>
            <Route path="profile" element={<ProfilePage />}></Route>
            <Route path="profile/edit" element={<EditProfilePage />}></Route>
            <Route
              path="profile/editpassword"
              element={<EditPwdPage />}
            ></Route>
            <Route path="study" element={<CalendarPage />}></Route>
            <Route path="study/:id" element={<StudyDetailPage />}></Route>
            <Route path="solved" element={<SolvedPage />}></Route>
          </Route>
          <Route path="/room/:studyroomId" element={<StudyRoom />}>
            <Route path="waiting" element={<WaitingPage />}></Route>
            <Route path="test" element={<TestPage />}></Route>
            <Route path="study" element={<StudyPage />}></Route>
          </Route>
          <Route path="/problem/:problemId" element={<SolvePage />}></Route>
        </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App
