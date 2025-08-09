import { job_titles, roles } from '@/shared/constants'
import userStore from '@/store/userStore'
import ReusableForm from '@/widgets/reusable_form/ReusableForm'
import { FC } from 'react'

interface IControl{
      data: any
}

const ControlUser:FC<IControl> = ({data}) => {
      const {updateOne} = userStore()
      return (
            <div>
                  <ReusableForm
                        title="Update user"
                        defaultOpen={true}
                        fields={[
                              { name: "role", type: "selector", placeholder: "User role", selects: roles },
                              { name: "job_title", type: "selector", placeholder: "Choose job title", selects: job_titles},
                              { name: "more", type: "textarea", placeholder: "More info", isBlocking: true }
                        ]}
                        onSubmit={(d) => updateOne(d, data.username)}
                  />
            </div>
      )
}

export default ControlUser
