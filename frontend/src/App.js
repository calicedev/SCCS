import './App.css'

import { Routes, Route } from 'react-router-dom'
import AuthPage from './pages/auth/AuthPage'
import LoginForm from './pages/auth/LoginForm'
import MyPage from './pages/mypage/MyPage'
import UserInfo from './pages/mypage/UserInfo'
import ProblemHistory from './pages/mypage/ProblemHistory'
import StudyHistory from './pages/mypage/StudyHistory'

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />}>
        <Route path="login" element={<LoginForm />} />
      </Route>
      <Route path="/mypage" element={<MyPage />}>
        <Route path="userinfo" element={<UserInfo />}></Route>
        <Route path="studyhistory" element={<StudyHistory />}></Route>
        <Route path="problemhistory" element={<ProblemHistory />}></Route>
      </Route>
    </Routes>
  )
}

export default App
