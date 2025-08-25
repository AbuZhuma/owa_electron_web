import styles from "./styles.module.css"
import Page from "@/shared/page/Page"
import ClientsList from "../../widgets/crm/clients/ClientsList"
import CreateClient from "../../widgets/crm/clients/CreateClient"
import CreateRequest from "../../widgets/crm/requests/CreateRequest"
import RequestList from "../../widgets/crm/requests/RequestList"
import { ReactNode, useEffect, useState } from "react"
import Archive from "../../widgets/crm/archive/Archive"
import userStore from "@/store/userStore"
import ReviewList from "../../widgets/crm/reviews/ReviewsList"
import Filter from "@/widgets/crm/filter/Filter"
import useCrmStore from "@/store/useCrmStore"
import ClientRequest from "@/widgets/crm/clientsReqs/ClientRequest"

const Crm = () => {
      const [tab, setTab] = useState("requests")
      const { resetFilters } = useCrmStore()
      const { user } = userStore()

      const tabs: { [key: string]: ReactNode } = {
            requests: (
                  <div className={styles.one}>
                        <Filter type="requests" />
                        {user.role === "admin" || user.role === "manager" ? <CreateRequest /> : null}
                        <RequestList />
                  </div>
            ),
            projects: (
                  <div className={styles.one}>
                        <ClientRequest />
                  </div>
            ),
            clients: (
                  <div className={styles.one}>
                        {user.role === "admin" || user.role === "manager" ? <CreateClient /> : null}
                        <ClientsList />
                  </div>
            ),
            review: (
                  <div className={styles.one}>
                        <Filter type="reviews" />
                        <ReviewList />
                  </div>
            ),
            archive: (
                  <div className={styles.one}>
                        <Filter type="archive" />
                        <Archive />
                  </div>
            )
      }

      const renderTabs = () => {
            return (
                  <>
                        {Object.keys(tabs).map((el) => {
                              if (el === "review" && !(user.role === "admin" || user.role === "manager")) {
                                    return null
                              }
                              return <button className={tab === el ? styles.active : styles.anActive} onClick={() => {
                                    setTab(el)
                                    resetFilters()
                              }}>{el}</button>
                        })}
                  </>
            )
      }

      return (
            <Page>
                  <div className={styles.tabs}>
                        {renderTabs()}
                  </div>
                  {tabs[tab]}
            </Page>
      )
}

export default Crm
