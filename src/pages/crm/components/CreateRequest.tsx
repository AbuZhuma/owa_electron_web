import { request_status_list } from '@/shared/constants'
import useCrmStore from '@/store/useCrmStore'
import userStore from '@/store/userStore'
import ReusableForm from '@/widgets/reusable_form/ReusableForm'
import { useMemo } from 'react'

const CreateRequest = () => {
      const { createRequest, clients } = useCrmStore()
      const {users} = userStore()
      const clientsName = useMemo(() => {
            return clients.map(el => el.username)
      }, [clients])
      const usersName = useMemo(() => {
            return users.map(el=>el.username)
      }, [users])

      return (
            <ReusableForm
                  title="Create request"
                  fields={[
                        { name: "client", type: "selector", placeholder: "Client name", selects: clientsName },
                        { name: "title", type: "text", placeholder: "Title" },
                        { name: "dedline", type: "date" },
                        { name: "status", type: "selector", placeholder: "Request status", selects: request_status_list },
                        { name: "executor", type: "selector", placeholder: "Executor name" , selects: usersName},
                        { name: "more", type: "textarea", placeholder: "More info", isBlocking: true }
                  ]}
                  onSubmit={createRequest}
            />
      )
}

export default CreateRequest
