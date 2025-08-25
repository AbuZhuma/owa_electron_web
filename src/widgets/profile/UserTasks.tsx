import CreateComment from "@/widgets/crm/requests/CreateComment"
import userStore from "@/store/userStore"
import DataTable from "@/shared/data_table/DataTable"

const UserTasks = () => {
      const {user} = userStore()
      return (
            <DataTable form={(item) => <CreateComment data={item}/>} title={`Активные задачи ${user.username}`} data={user.tasks}/>
      )
}

export default UserTasks
