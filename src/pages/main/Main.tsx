import Page from "@/shared/page/Page"
import UserTasks from "../../widgets/profile/UserTasks"
import userStore from "@/store/userStore"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Welcome from "@/shared/wellcome/Wellcome"
import RequestList from "../../widgets/crm/requests/RequestList"
import ClientsList from "../../widgets/crm/clients/ClientsList"
import UsersList from "../../widgets/crm/UserList"

const Main: React.FC = () => {
  const { user, isAuth } = userStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuth) {
      navigate("/profile")
    }
  }, [isAuth, navigate])

  return (
    <Page>
      <Welcome username={user.username} tasks={user.tasks} />
      <UsersList/>
      <UserTasks />
    </Page>
  )
}

export default Main
