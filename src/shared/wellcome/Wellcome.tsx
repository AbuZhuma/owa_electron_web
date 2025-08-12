import { useEffect, useState } from "react"
import styles from "./styles.module.css"

interface WelcomeProps {
  username: string
  tasks: { title: string; status: string }[]
}

const motivationalMessages: string[] = [
  "Let's go, hero! Tasks won't solve themselves!",
  "You can do anything! Even more than you think.",
  "Every completed task is +1 to your power 💪",
  "Today is your day! Let's crush it! 🚀"
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
        Hi, {username}! 👋
      </h1>
      <h3>
        {message}
      </h3>
    </div>
  )
}

export default Welcome
