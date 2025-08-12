import { Link, useNavigate } from "react-router-dom"
import styles from "./styles.module.css"
import userStore from "@/store/userStore"
import Button from "@/shared/button/Button"
import useCrmStore from "@/store/useCrmStore"

const Control = () => {
  const { isAuth, user } = userStore()
  const { init } = useCrmStore()
  const navigate = useNavigate()
  return (
    <div className={styles.control}>
      <p onClick={() => navigate("/")}>OWA studio</p>
      {isAuth ?
        <div className={styles.links}>
          <Link to={"/"}>Home</Link>
          <Link to={"/crm"}>Crm</Link>
          {user.role === "admin" ? <Link to={"/admin"}>Admin</Link> : null}
          <Link to={"/profile"}>{isAuth ? "Profile" : "Login"}</Link>
          <div className={styles.btn}>
            <Button onClick={init} text="Reload" />
          </div>
        </div>
        : null}

    </div>
  )
}

export default Control
