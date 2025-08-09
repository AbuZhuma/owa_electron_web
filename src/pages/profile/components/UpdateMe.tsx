import userStore from '@/store/userStore'
import ReusableForm from '@/widgets/reusable_form/ReusableForm'

const UpdateMe = () => {
      const {updateMe} = userStore()
      return (
            <div>
                  <ReusableForm
                        title="Add more info"
                        defaultOpen={true}
                        fields={[
                              { name: "more", type: "textarea", placeholder: "More info", isBlocking: true }
                        ]}
                        onSubmit={(d) => updateMe(d)}
                  />
            </div>
      )
}

export default UpdateMe
