import { Link, useNavigate } from "react-router-dom"
import styles from "./styles.module.css"
import userStore from "@/store/userStore"

const Control = () => {
  const { isAuth, user } = userStore()
  const navigate = useNavigate()
  return (
    <div className={styles.control}>
      <p onClick={() => navigate("/")}>OWA studio</p>
      {isAuth ?
        <div>
          <Link to={"/"}>Home</Link>
          <Link to={"/crm"}>Crm</Link>
          {user.role === "admin" ? <Link to={"/admin"}>Admin</Link> : null}
          <Link to={"/profile"}>{isAuth ? "Profile" : "Login"}</Link>
        </div>
        : null}
    </div>
  )
}

export default Control
