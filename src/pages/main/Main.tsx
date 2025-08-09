import Page from "@/shared/page/Page"
import UsersList from "../crm/components/UserList"
import UserTasks from "../profile/components/UserTasks"
import userStore from "@/store/userStore"
import styles from "./styles.module.css"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Main = () => {
      const {user, isAuth} = userStore()
      const navigate = useNavigate()
      useEffect(() => {
            if(!isAuth){
                  navigate("/profile")
            }
      }, [])
      return (
            <Page>
                  <h1>Hi {user.username}!</h1>
                  <h3 className={styles.h3}>I'm glad you're here again! {user.tasks.length} tasks await you, let's go solve them :D</h3>
                  <UserTasks />
            </Page>
      )
}

export default Main
