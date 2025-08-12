import { Outlet } from "react-router-dom"
import styles from "./styles.module.css"
import Control from "@/layout/components/control/Control"
import Footer from "./components/footer/Footer"

const Layout = () => {
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
