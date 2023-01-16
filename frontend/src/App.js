import './App.css'

import { Routes, Route } from 'react-router-dom'
import AuthPage from './pages/auth/AuthPage'
import LoginForm from './pages/auth/LoginForm'

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />}>
        <Route path="login" element={<LoginForm />} />
      </Route>
    </Routes>
  )
}

export default App
