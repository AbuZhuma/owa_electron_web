import Button from '@/shared/button/Button'
import { request_status_list } from '@/shared/constants'
import useCrmStore from '@/store/useCrmStore'
import userStore from '@/store/userStore'
import ReusableForm from '@/shared/reusable_form/ReusableForm'
import { FC } from 'react'
import { Link } from 'react-router-dom'

interface ICreateComment {
      data: any
}

const CreateComment: FC<ICreateComment> = ({ data }) => {
      const { comentRequest, archivate, updateRequest, reviewRequest } = useCrmStore()
      const { user } = userStore()

      return (
            <div className='controller'>
                  <div className='row_center'>
                        {user.username === data.executor ?
                              <Button text='Push to review' onClick={() => reviewRequest(data.uuid)} />
                              : null}
                        <Link to={`/request/${data.uuid}`}>Request link</Link>
                  </div>

                  <ReusableForm
                        defaultOpen={true}
                        title='Comment'
                        fields={[
                              { name: "comment", type: "text", placeholder: "Commenting" },
                        ]}
                        onSubmit={(comment) => comentRequest(data.uuid, comment)}
                  />
                  <ReusableForm
                        defaultOpen={true}
                        title='Archive this request'
                        fields={[
                              { name: "commit", type: "text", placeholder: "Commit" },
                        ]}
                        onSubmit={(d) => archivate(data.uuid, "request", d.commit)}
                        disabled={!(user.role === "admin" || user.role === "manager")}
                  />
                  <ReusableForm
                        title="Update request"
                        defaultOpen={true}
                        fields={[
                              { name: "status", type: "selector", placeholder: "Request status", initVal: data.status, selects: request_status_list },
                              { name: "more", type: "textarea", placeholder: "More info", isBlocking: true }
                        ]}
                        disabled={!(user.role === "admin" || user.role === "manager")}
                        onSubmit={(d) => updateRequest(data.uuid, d)}
                  />
            </div>
      )
}

export default CreateComment
