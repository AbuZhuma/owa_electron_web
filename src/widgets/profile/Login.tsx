import useCrmStore from '@/store/useCrmStore'
import userStore from '@/store/userStore'
import ReusableForm from '@/shared/reusable_form/ReusableForm'

const Login = () => {
      const { login, getUsers, setLoad } = userStore()
      const { init } = useCrmStore()
      return (
            <div style={{ width: "500px", margin: "0 auto" }}>
                  <ReusableForm
                        title={"Login"}
                        fields={[
                              { name: "username", type: "text", placeholder: "Username" },
                              { name: "password", type: "password", placeholder: "Password" },
                        ]}
                        defaultOpen={true}
                        onSubmit={async (data) => {
                              setLoad(true)
                              try {
                                    await login({ username: data.username as string, password: data.password as string })
                                    await Promise.all([getUsers(), init()])
                              } finally {
                                    setLoad(false)
                              }
                        }}
                  />
            </div>
      )
}

export default Login
