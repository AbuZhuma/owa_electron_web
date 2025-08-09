import styles from "./styles.module.css"
import Page from "@/shared/page/Page"
import ClientsList from "./components/ClientsList"
import CreateClient from "./components/CreateClient"
import CreateRequest from "./components/CreateRequest"
import RequestList from "./components/RequestList"
import { ReactNode, useEffect, useState } from "react"
import Archive from "./components/Archive"
import userStore from "@/store/userStore"
import { useNavigate } from "react-router-dom"

const Crm = () => {
      const [tab, setTab] = useState("requests")
      const { isAuth, user } = userStore()
      const navigate = useNavigate()

      const tabs: { [key: string]: ReactNode } = {
            requests: (
                  <div className={styles.one}>
                        {user.role === "admin" || user.role === "manager" ? <CreateRequest /> : null}
                        <RequestList />
                  </div>
            ),
            clients: (
                  <div className={styles.one}>
                        {user.role === "admin" || user.role === "manager" ? <CreateClient />:null}
                        <ClientsList />
                  </div>
            ),
            archive: (
                  <div className={styles.one}>
                        <Archive />
                  </div>
            )
      }
      useEffect(() => {
            if(!isAuth){
                  navigate("/profile")
                  alert("Please login")
            }
      },[])
      return (
            <Page>
                  <div className={styles.tabs}>
                        <button className={tab === "requests" ? styles.active : styles.anActive} onClick={() => setTab("requests")}>Requests</button>
                        <button className={tab === "clients" ? styles.active : styles.anActive} onClick={() => setTab("clients")}>Clients</button>
                        <button className={tab === "archive" ? styles.active : styles.anActive} onClick={() => setTab("archive")}>Archive</button>
                  </div>
                  {tabs[tab]}
            </Page>
      )
}

export default Crm
