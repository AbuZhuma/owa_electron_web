import { job_titles, roles } from "@/shared/constants"
import userStore from "@/store/userStore"
import ReusableForm from "@/widgets/reusable_form/ReusableForm"

const CreateUser = () => {
      const { register } = userStore()
      return (
            <div>
                  <ReusableForm
                        title="Create user"
                        defaultOpen={true}
                        fields={[
                              { name: "username", type: "text", placeholder: "Username" },
                              { name: "password", type: "text", placeholder: "Password" },
                              { name: "role", type: "selector", placeholder: "User role", selects: roles },
                              { name: "job_title", type: "selector", placeholder: "Choose job title", selects: job_titles },
                              { name: "more", type: "textarea", placeholder: "More info", isBlocking: true }
                        ]}
                        onSubmit={(d) => register(d)}
                  />
            </div>
      )
}

export default CreateUser
