import { job_titles, roles } from "@/shared/constants"
import userStore from "@/store/userStore"
import ReusableForm from "@/shared/reusable_form/ReusableForm"

const CreateUser = () => {
      const { register } = userStore()
      return (
            <div>
                  <ReusableForm
                        title="Create user"
                        defaultOpen={true}
                        fields={[
                              { name: "username", type: "text", placeholder: "Имя" },
                              { name: "password", type: "text", placeholder: "Пароль" },
                              { name: "role", type: "selector", placeholder: "Роль", selects: roles },
                              { name: "job_title", type: "selector", placeholder: "Должность", selects: job_titles },
                              { name: "more", type: "textarea", placeholder: "Больше информации", isBlocking: true }
                        ]}
                        onSubmit={(d) => register(d)}
                  />
            </div>
      )
}

export default CreateUser
