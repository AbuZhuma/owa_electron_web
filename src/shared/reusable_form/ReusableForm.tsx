import { useEffect, useState } from "react"
import styles from "./styles.module.css"

interface Field {
  name: string
  type: "text" | "textarea" | "date" | "number" | "password" | "selector"
  placeholder?: string
  initVal?: string
  isBlocking?: boolean
  selects?: string[] 
}

interface ReusableFormProps {
  fields: Field[]
  defaultOpen?: boolean
  onSubmit: (data: any) => void
  title?: string,
  disabled?: boolean
}

const ReusableForm = ({ fields, onSubmit, title, defaultOpen = false, disabled = false }: ReusableFormProps) => {
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [blockFields, setBlockFields] = useState<Record<string, [string, string][]>>({})
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [error, setError] = useState("")

  const handleChange = (name: string, value: string) => {
    setError("")
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleBlockingChange = (
    fieldName: string,
    index: number,
    keyOrValue: "key" | "value",
    value: string
  ) => {
    setError("")
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
    let hasError = false;
    const result: Record<string, string | [string, string][]> = {};

    for (const field of fields) {
      if (field.isBlocking) {
        const pairs = blockFields[field.name] || [];
        if (pairs.length && (!pairs[0][0] || !pairs[0][1])) {
          setError(`Заполните ключ и значение для ${field.name}`);
          hasError = true;
          break;
        }
        result[field.name] = pairs;
      } else {
        const value = formData[field.name] || field.initVal || "";
        if (!value.trim()) {
          setError(`${field.name} field required!`);
          hasError = true;
          break;
        }
        result[field.name] = value;
      }
    }

    if (hasError) return;
    onSubmit(result);
    setFormData({});
    setBlockFields({});
    if (!defaultOpen) {
      setIsOpen(false);
    }
  };


  useEffect(() => {
    fields.forEach(({ name, isBlocking, initVal = "" }) => {
      if (!isBlocking) {
        setFormData((prev) => ({ ...prev, [name]: initVal }))
      }
    })
  }, [])

  return (
    <div className={disabled ? styles.hidden : styles.wrapper}>
      <div className={styles.header}>
        {title && <span>{title}</span>}
        {error.length ? <span>{error}</span> : null}
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
                    Add
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
