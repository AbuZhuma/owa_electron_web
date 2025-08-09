import { Outlet } from "react-router-dom"
import styles from "./styles.module.css"
import Control from "@/layout/components/control/Control"
import { useEffect, useState, useCallback } from "react"
import useCrmStore from "@/store/useCrmStore"
import userStore from "@/store/userStore"
import Footer from "./components/footer/Footer"

const Layout = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { init } = useCrmStore()
  const { getUser, getUsers } = userStore()

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    try {
      await getUser()
      await getUsers()
      await init()
    } finally {
      setIsLoading(false)
    }
  }, [init])

  useEffect(() => {
    fetchData()
  }, [fetchData])


  if (isLoading) {
    return (
      <div className={styles.status}>
        <p>Загрузка...</p>
      </div>
    )
  }

  return (
    <div className={styles.layout}>
      <Control />
      <div className={styles.cont}>
        <Outlet />
      </div>
      <Footer/>
    </div>
  )
}

export default Layout
