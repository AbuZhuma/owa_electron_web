import userStore from '@/store/userStore'
import DataTable from '@/shared/data_table/DataTable'

const UsersList = () => {
      const {users} = userStore()
      
      return (
            <DataTable title='Сотрудники' data={users} />
      )
}

export default UsersList
