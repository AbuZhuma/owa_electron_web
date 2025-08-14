import Button from '@/shared/button/Button'
import { request_status_list } from '@/shared/constants'
import useCrmStore from '@/store/useCrmStore'
import userStore from '@/store/userStore'
import ReusableForm from '@/shared/reusable_form/ReusableForm'
import { FC } from 'react'

interface ICreateComment {
      data: any
}

const ReviewControll: FC<ICreateComment> = ({ data }) => {
      const { archivate, backReview, reviewRequest } = useCrmStore()
      const { user } = userStore()

      return (
            <div className='controller'>
                  <ReusableForm
                        defaultOpen={true}
                        title='Back review'
                        fields={[
                              { name: "comment", type: "text", placeholder: "Commenting" },
                        ]}
                        onSubmit={(comment) => backReview(data.uuid, comment.comment)}
                  />
                  <ReusableForm
                        defaultOpen={true}
                        title='Archive this request'
                        fields={[
                              { name: "commit", type: "text", placeholder: "Commit" },
                        ]}
                        onSubmit={(d) => archivate(data.uuid, "review", d.commit)}
                        disabled={!(user.role === "admin" || user.role === "manager")}
                  />
            </div>
      )
}

export default ReviewControll
