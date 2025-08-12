import Page from "@/shared/page/Page"
import UserInfo from "../../widgets/profile/UserInfo"
import userStore from "@/store/userStore"
import Login from "../../widgets/profile/Login"
import UserTasks from "../../widgets/profile/UserTasks"
import Button from "@/shared/button/Button"
import UpdateMe from "../../widgets/profile/UpdateMe"

const Profile = () => {
      const { isAuth, logout } = userStore()
      if (!isAuth) {
            return (
                  <Page>
                        <Login />
                  </Page>
            )

      }
      return (
            <Page>
                  <UserInfo />
                  <Button text="Logout" onClick={logout}/>
                  <UpdateMe/>
                  <UserTasks/>
            </Page>
      )
}

export default Profile
