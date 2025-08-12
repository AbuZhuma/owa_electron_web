import { HashRouter, BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Main from './pages/main/Main'
import Crm from './pages/crm/Crm'
import Layout from './layout/Layout'
import Profile from './pages/profile/Profile'
import Admin from './pages/admin/Admin'
import AppInitializer from './layout/components/initer/AppInitializer'
import OneReuest from './pages/oneRequest/OneReuest'

function App() {

  const Router =
    process.env.NODE_ENV === 'production' ? HashRouter : BrowserRouter

  return (
    <Router>
      <Routes>
        <Route element={<AppInitializer><Layout /></AppInitializer>} path="/">
          <Route element={<Main />} path="/" />
          <Route element={<Crm />} path="/crm" />
          <Route element={<Profile />} path="/profile" />
          <Route element={<Admin />} path="/admin" />
          <Route element={<OneReuest />} path='/request/:uuid' />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
