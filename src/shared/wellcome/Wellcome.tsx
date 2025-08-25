import { useEffect, useState } from "react"
import styles from "./styles.module.css"

interface WelcomeProps {
  username: string
  tasks: { title: string; status: string }[]
}

const motivationalMessages: string[] = [
  "Вперёд, герой! Задачи сами себя не решат!",
  "Ты можешь всё! Даже больше, чем думаешь.",
  "Каждая выполненная задача — +1 к твоей силе 💪",
  "Сегодня твой день! Давай разнесём всё! 🚀"
]

const Welcome: React.FC<WelcomeProps> = ({ username, tasks }) => {
  const [message, setMessage] = useState<string>("")

  useEffect(() => {
    setMessage(
      motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]
    )
  }, [tasks])

  return (
    <div className={styles.wrapper}>
      <h1>
        Привеет {username}! 👋
      </h1>
      <h3>
        {message}
      </h3>
    </div>
  )
}

export default Welcome
