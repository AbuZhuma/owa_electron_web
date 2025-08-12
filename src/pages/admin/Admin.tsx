import Page from '@/shared/page/Page'
import ControlUser from '../../widgets/admin/ControlUser'
import AdminUsersList from '../../widgets/admin/AdminUsersList'
import userStore from '@/store/userStore'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CreateUser from '../../widgets/admin/CreateUser'

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
