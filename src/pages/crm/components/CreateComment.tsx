import Button from '@/shared/button/Button'
import { request_status_list } from '@/shared/constants'
import useCrmStore from '@/store/useCrmStore'
import userStore from '@/store/userStore'
import ReusableForm from '@/widgets/reusable_form/ReusableForm'
import { FC } from 'react'

interface ICreateComment {
      data: any
}

const CreateComment: FC<ICreateComment> = ({ data }) => {
      const { comentRequest, archivate, updateRequest } = useCrmStore()
      const {user} = userStore()
      if(user.role !== "admin" && user.role !== "manager"){
            return null
      }
      return (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <ReusableForm
                        defaultOpen={true}
                        title='Comment'
                        fields={[
                              { name: "comment", type: "text", placeholder: "Commenting" },
                        ]}
                        onSubmit={(comment) => comentRequest(data.title, comment)}
                  />
                  <ReusableForm
                        defaultOpen={true}
                        title='Archive this request'
                        fields={[
                              { name: "commit", type: "text", placeholder: "Commit" },
                        ]}
                        onSubmit={(d) => archivate(data.title, "request", d.commit)}
                  />
                  <ReusableForm
                        title="Update request"
                        defaultOpen={true}
                        fields={[
                              { name: "status", type: "selector", placeholder: "Request status", selects: request_status_list },
                              { name: "more", type: "textarea", placeholder: "More info", isBlocking: true }
                        ]}
                        onSubmit={(d) => updateRequest(data.title, d)}
                  />
            </div>
      )
}

export default CreateComment
