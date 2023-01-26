import './App.css'

import { Routes, Route } from 'react-router-dom'
import AuthPage from './pages/auth/AuthPage'
import MainPage from './pages/study/MainPage'
import LoginForm from './pages/auth/LoginForm'
import SignupForm from './pages/auth/SignupForm'
import FindIdForm from './pages/auth/FindIdForm'
import ResetPasswordForm from './pages/auth/ResetPasswordForm'

import MyPage from './pages/mypage/MyPage'
import Profile from './pages/mypage/Profile'
import ProfileEdit from './pages/mypage/ProfileEdit'
import PasswordEdit from './pages/mypage/PasswordEdit'
import ProblemList from './pages/mypage/ProblemList'
import StudyCalendar from './pages/mypage/StudyCalendar'

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />}>
        <Route path="login" element={<LoginForm />} />
        <Route path="signup" element={<SignupForm />} />
        <Route path="findid" element={<FindIdForm />} />
        <Route path="resetpassword" element={<ResetPasswordForm />} />
      </Route>
      <Route path="/main" element={<MainPage />} />
      <Route path="/mypage" element={<MyPage />}>
        <Route path="profile" element={<Profile />}></Route>
        <Route path="profileedit" element={<ProfileEdit />}></Route>
        <Route path="passwordedit" element={<PasswordEdit />}></Route>
        <Route path="calendar" element={<StudyCalendar />}></Route>
        <Route path="solved" element={<ProblemList />}></Route>
      </Route>
    </Routes>
  )
}

export default App
