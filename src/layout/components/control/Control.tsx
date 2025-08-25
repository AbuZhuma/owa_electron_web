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
          <Link to={"/"}>Главная</Link>
          <Link to={"/crm"}>Crm</Link>
          {user.role === "admin" ? <Link to={"/admin"}>Админ</Link> : null}
          <Link to={"/profile"}>{isAuth ? "Профиль" : "Вход"}</Link>
          <div className={styles.btn}>
            <Button onClick={init} text="Обновить" />
          </div>
        </div>
        : null}

    </div>
  )
}

export default Control
