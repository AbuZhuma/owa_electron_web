import Page from '@/shared/page/Page'
import ControlUser from './components/ControlUser'
import AdminUsersList from './components/AdminUsersList'
import userStore from '@/store/userStore'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CreateUser from './components/CreateUser'

const Admin = () => {
      const {user} = userStore()
      const navigate = useNavigate()
      useEffect(() => {
            if(user.role !== "admin"){
                  navigate("/")
            }
      }, [])
      return (
            <Page>
                  <CreateUser/>
                  <AdminUsersList />
            </Page>
      )
}

export default Admin
