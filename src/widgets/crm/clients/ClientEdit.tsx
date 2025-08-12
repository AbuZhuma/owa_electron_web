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
                  <ReusableForm
                        title="Edit client"
                        defaultOpen={true}
                        fields={[
                              { name: "username", type: "text", placeholder: "Username", initVal: data.username},
                              { name: "company", type: "text", placeholder: "Company", initVal: data.company},
                              { name: "manager", type: "selector", placeholder: "Client manager", initVal: data.manager, selects: usersName },
                              { name: "more", type: "textarea", placeholder: "More info", isBlocking: true }
                        ]}
                        onSubmit={(d) => editClient(d, data.username)}
                  />
            </div>
      )
}

export default EditClient
