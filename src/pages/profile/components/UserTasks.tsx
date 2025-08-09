import CreateComment from "@/pages/crm/components/CreateComment"
import userStore from "@/store/userStore"
import DataTable from "@/widgets/data_table/DataTable"
import React from "react"

const UserTasks = React.memo(() => {
      const {user} = userStore()
      return (
            <DataTable form={(item) => <CreateComment data={item}/>} title={`${user.username} active tasks`} data={user.tasks}/>
      )
})

export default UserTasks
