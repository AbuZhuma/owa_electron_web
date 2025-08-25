import { useState } from "react"
import useClientsRequests from "@/store/useClientsRequests"
import styles from "./styles.module.css"
import DataTable from "@/shared/data_table/DataTable"
import CreateComment from "../requests/CreateComment"

const ClientRequest = () => {
  const { sets } = useClientsRequests()
  const [activeClientIndex, setActiveClientIndex] = useState(0)

  if (!sets || sets.length === 0) return <p>No requests available</p>

  return (
    <div className={styles.main}>
      {/* Вкладки клиентов */}
      <div className={styles.tabs}>
        {sets.map((clientObj, index) => (
          <button
            key={clientObj.client}
            className={`${styles.tabButton} ${activeClientIndex === index ? styles.active : ""}`}
            onClick={() => setActiveClientIndex(index)}
          >
            {clientObj.client}
          </button>
        ))}
      </div>

      {/* DataTable выбранного клиента */}
      <div className={styles.tableContainer}>
        <DataTable
          title="Requests"
          data={sets[activeClientIndex].requests}
          form={(item) => <CreateComment data={item} />}
        />
      </div>
    </div>
  )
}

export default ClientRequest
