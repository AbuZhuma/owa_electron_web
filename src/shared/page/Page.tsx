import { FC, ReactNode } from "react"
import styles from "./styles.module.css"

interface IPage{
      children: ReactNode
}

const Page:FC<IPage> = ({children}) => {
  return (
    <div className={styles.page}>
      {children}
    </div>
  )
}

export default Page
