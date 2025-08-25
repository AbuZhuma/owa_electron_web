import useCrmStore from '@/store/useCrmStore'
import ReusableForm from '@/shared/reusable_form/ReusableForm'

const CreateClient = () => {
      const {createClient} = useCrmStore()
      return (
            <ReusableForm
                  title="Create client"
                  fields={[
                        { name: "username", type: "text", placeholder: "Имя" },
                        { name: "company", type: "text", placeholder: "Компания" },
                        { name: "more", type: "textarea", placeholder: "Больше информации", isBlocking: true },
                  ]}
                  onSubmit={createClient}
            />
      )
}

export default CreateClient
