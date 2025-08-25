import Button from '@/shared/button/Button'
import { request_status_list } from '@/shared/constants'
import useCrmStore from '@/store/useCrmStore'
import userStore from '@/store/userStore'
import ReusableForm from '@/shared/reusable_form/ReusableForm'
import { FC, useMemo } from 'react'

interface IEditClient {
      data: any
}

const EditClient: FC<IEditClient> = ({ data }) => {
      const { editClient } = useCrmStore()
      const { user, users } = userStore()
      if (user.role !== "admin" && user.role !== "manager") {
            return null
      }
      const usersName = useMemo(() => {
            return users.map(el => el.username)
      }, [users])
      return (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {user.role === "admin" || user.username === data.manager ?
                        <ReusableForm
                              title="Изменить клиента"
                              defaultOpen={true}
                              fields={[
                                    { name: "username", type: "text", placeholder: "Имя", initVal: data.username },
                                    { name: "company", type: "text", placeholder: "Компания", initVal: data.company },
                                    { name: "manager", type: "selector", placeholder: "Менеджер", initVal: data.manager, selects: usersName },
                                    { name: "more", type: "textarea", placeholder: "Больше информаци", isBlocking: true }
                              ]}
                              onSubmit={(d) => editClient(d, data.username)}
                        />
                        : null}
            </div>
      )
}

export default EditClient
