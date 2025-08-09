import { useState } from "react"
import styles from "./styles.module.css"

interface Field {
  name: string
  type: "text" | "textarea" | "date" | "number" | "password" | "selector"
  placeholder?: string
  isBlocking?: boolean
  selects?: string[] // для selector
}

interface ReusableFormProps {
  fields: Field[]
  defaultOpen?: boolean
  onSubmit: (data: any) => void
  title?: string
}

const ReusableForm = ({ fields, onSubmit, title, defaultOpen = false }: ReusableFormProps) => {
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [blockFields, setBlockFields] = useState<Record<string, [string, string][]>>({})
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleBlockingChange = (
    fieldName: string,
    index: number,
    keyOrValue: "key" | "value",
    value: string
  ) => {
    setBlockFields((prev) => {
      const updated = [...(prev[fieldName] || [])]
      const existing = updated[index] || ["", ""]
      updated[index] = keyOrValue === "key" ? [value, existing[1]] : [existing[0], value]
      return { ...prev, [fieldName]: updated }
    })
  }

  const addBlockingPair = (fieldName: string) => {
    setBlockFields((prev) => ({
      ...prev,
      [fieldName]: [...(prev[fieldName] || []), ["", ""]]
    }))
  }

  const handleSubmit = () => {
    const result: Record<string, string | [string, string][]> = {}

    fields.forEach((field) => {
      if (field.isBlocking) {
        result[field.name] = blockFields[field.name] || []
      } else {
        result[field.name] = formData[field.name] || ""
      }
    })

    onSubmit(result)
    setFormData({})
    setBlockFields({})
    if (!defaultOpen) {
      setIsOpen(false)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        {title && <span>{title}</span>}
        {!defaultOpen &&
          <button onClick={() => setIsOpen(!isOpen)} className={styles.btnToggle}>
            {isOpen ? "Close" : "Open"}
          </button>
        }
      </div>

      {isOpen && (
        <div className={styles.create}>
          {fields.map(({ name, type, placeholder, isBlocking, selects }) => (
            <div key={name} className={styles.fieldBlock}>
              {isBlocking ? (
                <div className={styles.blockingGroup}>
                  {(blockFields[name] || []).map(([key, value], index) => (
                    <div key={index} className={styles.keyValuePair}>
                      <input
                        type="text"
                        placeholder="Key"
                        value={key}
                        onChange={(e) => handleBlockingChange(name, index, "key", e.target.value)}
                        className={styles.input}
                      />
                      <input
                        type="text"
                        placeholder="Value"
                        value={value}
                        onChange={(e) => handleBlockingChange(name, index, "value", e.target.value)}
                        className={styles.input}
                      />
                    </div>
                  ))}
                  <button
                    onClick={() => addBlockingPair(name)}
                    className={styles.btnAddPair}
                  >
                    Добавить
                  </button>
                </div>
              ) : type === "textarea" ? (
                <textarea
                  value={formData[name] || ""}
                  placeholder={placeholder}
                  onChange={(e) => handleChange(name, e.target.value)}
                  className={styles.textarea}
                />
              ) : type === "selector" ? (
                <select
                  value={formData[name] || ""}
                  onChange={(e) => handleChange(name, e.target.value)}
                  className={styles.input}
                >
                  <option value="">{placeholder || "Select..."}</option>
                  {selects?.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <input
                  value={formData[name] || ""}
                  type={type}
                  placeholder={placeholder}
                  onChange={(e) => handleChange(name, e.target.value)}
                  className={styles.input}
                />
              )}
            </div>
          ))}

          <button onClick={handleSubmit} className={styles.btnSubmit}>Submit</button>
        </div>
      )}
    </div>
  )
}

export default ReusableForm
