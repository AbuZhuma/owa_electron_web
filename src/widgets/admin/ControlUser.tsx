import Button from '@/shared/button/Button'
import { job_titles, roles } from '@/shared/constants'
import userStore from '@/store/userStore'
import ReusableForm from '@/shared/reusable_form/ReusableForm'
import { FC } from 'react'

interface IControl{
      data: any
}

const ControlUser:FC<IControl> = ({data}) => {
      const {updateOne, deleteUser} = userStore()

      return (
            <div style={{display: "flex", flexDirection: "column", gap:"10px"}}>
                  <ReusableForm
                        title="Update user"
                        defaultOpen={true}
                        fields={[
                              { name: "role", type: "selector",initVal: data.role, placeholder: "Роль", selects: roles },
                              { name: "job_title", type: "selector", initVal: data.job_title, placeholder: "Должность", selects: job_titles},
                              { name: "more", type: "textarea", placeholder: "Больше информации", isBlocking: true }
                        ]}
                        onSubmit={(d) => updateOne(d, data.username)}
                  />
                  <Button text='Delete this user' onClick={() => deleteUser(data.username)}/>
            </div>
      )
}

export default ControlUser
