import { request_status_list } from '@/shared/constants'
import useCrmStore from '@/store/useCrmStore'
import userStore from '@/store/userStore'
import ReusableForm from '@/shared/reusable_form/ReusableForm'
import { useMemo } from 'react'

const CreateRequest = () => {
      const { createRequest, clients } = useCrmStore()
      const { users } = userStore()

      const { usersName, managersName } = useMemo(() => {
            const usersArr: string[] = []
            const managersArr: string[] = []

            users.forEach(el => {
                  if (!el.username) return
                  if (el.role === "manager") {
                        managersArr.push(el.username)
                  } else {
                        usersArr.push(el.username)
                  }
            })

            return { usersName: usersArr, managersName: managersArr }
      }, [users])
      
      const clientsName = useMemo(() => {
            return clients.map(el => el.username)
      }, [clients])

      return (
            <ReusableForm
                  title="Создать заявку"
                  fields={[
                        { name: "client", type: "selector", placeholder: "Имя", selects: clientsName },
                        { name: "title", type: "text", placeholder: "Название" },
                        { name: "dedline", type: "date" },
                        { name: "status", type: "selector", placeholder: "Статус", selects: request_status_list },
                        { name: "executor", type: "selector", placeholder: "Сотрудники", selects: usersName },
                        { name: "manager", type: "selector", placeholder: "Менеджер", selects: managersName },
                        { name: "more", type: "textarea", placeholder: "Больше информации", isBlocking: true }
                  ]}
                  onSubmit={createRequest}
            />
      )
}

export default CreateRequest
