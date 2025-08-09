import useCrmStore from '@/store/useCrmStore'
import ReusableForm from '@/widgets/reusable_form/ReusableForm'

const CreateClient = () => {
      const {createClient} = useCrmStore()
      return (
            <ReusableForm
                  title="Create client"
                  fields={[
                        { name: "username", type: "text", placeholder: "Client name" },
                        { name: "company", type: "text", placeholder: "Company" },
                        { name: "more", type: "textarea", placeholder: "More info", isBlocking: true },
                  ]}
                  onSubmit={createClient}
            />
      )
}

export default CreateClient
