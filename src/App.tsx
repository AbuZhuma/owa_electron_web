import { HashRouter, BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Main from './pages/main/Main'
import Crm from './pages/crm/Crm'
import Layout from './layout/Layout'
import Profile from './pages/profile/Profile'
import userStore from './store/userStore'
import Admin from './pages/admin/Admin'

function App() {
  const { isAuth } = userStore()

  const Router =
    process.env.NODE_ENV === 'production' ? HashRouter : BrowserRouter

  return (
    <Router>
      <Routes>
        <Route element={<Layout />} path="/">
          <Route element={<Main />} path="/" />
          <Route element={<Crm />} path="/crm" />
          <Route element={<Profile />} path="/profile" />
          <Route element={<Admin />} path="/admin" />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
