import { FC } from "react"
import styles from "./styles.module.css"

interface IButton{
      text: string, 
      onClick: ()=> void
}

const Button:FC<IButton> = ({text, onClick}) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {text}
    </button>
  )
}

export default Button
