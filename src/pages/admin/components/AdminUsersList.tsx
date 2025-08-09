import userStore from '@/store/userStore'
import DataTable from '@/widgets/data_table/DataTable'
import ControlUser from './ControlUser'
import { FC } from 'react'

const AdminUsersList = () => {
      const {users} = userStore()
      
      return (
            <DataTable form={(data) => <ControlUser data={data} />} title='Employees' data={users} />
      )
}

export default AdminUsersList
