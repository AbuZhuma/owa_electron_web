import Page from "@/shared/page/Page"
import UserInfo from "./components/UserInfo"
import userStore from "@/store/userStore"
import Login from "./components/Login"
import UserTasks from "./components/UserTasks"
import Button from "@/shared/button/Button"
import UpdateMe from "./components/UpdateMe"

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
