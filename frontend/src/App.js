import './App.css'

import { Routes, Route } from 'react-router-dom'
import AuthPage from './pages/auth/AuthPageLayout'
import MainPage from './pages/study/MainPage'
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
import SolveProblem from 'components/study/SolveProblem'

function App() {
  return (
    <Routes>
      <Route path="/main" element={<MainPage />} />
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
        <Route path="studydetail" element={<StudyDetailPage />}></Route>
        <Route path="solved" element={<SolvedPage />}></Route>
      </Route>
      <Route path="/solveproblem" element={<SolveProblem />}></Route>
    </Routes>
  )
}

export default App
