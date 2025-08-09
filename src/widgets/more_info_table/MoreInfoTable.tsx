import React, { ReactNode } from "react"
import styles from "./styles.module.css"

interface OneClientProps<T> {
  item: T,
  title?: string,
  form?: ReactNode | null
}

const MoreInfo = <T extends Record<string, any>>({ item, title = "More Information", form = null }: OneClientProps<T>) => {
  const isArrayOfStringPairs = (val: any): val is [string, string][] =>
    Array.isArray(val) &&
    val.length > 0 &&
    val.every(
      (entry) =>
        Array.isArray(entry) &&
        entry.length === 2 &&
        typeof entry[0] === "string" &&
        typeof entry[1] === "string"
    )

  const extraKeys = Object.keys(item).filter((key) => isArrayOfStringPairs(item[key]))
    
  return (
    <div className={styles.oneClient}>
      <h3>{title}</h3>
      <table className={styles.infoTable}>
        <tbody>
          {Object.entries(item).map(([key, value]) => {
            if (extraKeys.includes(key)) return null
            if (typeof value === "object" && value !== null) return null
            return (
              <tr key={key}>
                <td><b>{key}</b></td>
                <td>{String(value)}</td>
              </tr>
            )
          })}
          {extraKeys.map((key) => (
            <React.Fragment key={key}>
              <tr>
                <td colSpan={2}><b>{key}:</b></td>
              </tr>
              {item[key].map(([k, v]: [string, string], i: number) => (
                <tr key={i}>
                  <td>{k}</td>
                  <td>{v}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      {form ? form : null}
    </div>
  )
}

export default MoreInfo
