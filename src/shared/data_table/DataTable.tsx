import React, { useState, ReactNode, useEffect } from "react"
import styles from "./styles.module.css"
import MoreInfo from "@/shared/more_info_table/MoreInfoTable"
import { isArrayOfObjects } from "../helpers"

interface DataTableProps<T extends Record<string, any>> {
  data: T[]
  title?: string
  form?: ((item: T) => ReactNode) | null
}

const DataTable = React.memo(<T extends Record<string, any>>({
  data,
  title,
  form = null,
}: DataTableProps<T>) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  if (!data || data.length === 0) {
    return <div className={styles.empty}>No data</div>
  }

  const firstItem = data[0]
  const columns = Object.keys(firstItem)

  const handleRowClick = (index: number) => {
    setSelectedIndex(selectedIndex === index ? null : index)
  }

  const renderCellSummary = (value: any) => {
    if (Array.isArray(value)) {
      return ""
    }
    if (value === null || value === undefined) {
      return ""
    }
    if (typeof value === "object") {
      return ""
    }
    return String(value)
  }

  const renderExpandedDetails = (item: any) => {
    const keys = Object.keys(item)

    return (
      <div className={styles.expandedWrapper}>
        {keys.map((key) => {
          const value = item[key]
          if (isArrayOfObjects(value)) {
            const nestedKeys = Object.keys(value[0])
            return (
              <div key={key} className={styles.nestedBlock}>
                <div className={styles.nestedTitle}>{key}</div>
                <table className={styles.nestedTable}>
                  <thead>
                    <tr>
                      {nestedKeys.map((k) => (
                        <th key={k}>{k}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {value.map((row: any, idx: number) => (
                      <tr key={idx}>
                        {nestedKeys.map((k) => (
                          <td key={k}>{String(row[k])}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          }

          return null
        })}
        <MoreInfo item={item} form={form ? form(item) : <></>} />
      </div>
    )
  }
  const filteredColumns = columns.filter(col => !Array.isArray(firstItem[col]))

  return (
    <div className={styles.wrapper}>
      {title && <div className={styles.title}>{title}</div>}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {filteredColumns.map((col) => {
                if(col === "uuid") return null
                return <th key={col}>{col}</th>
              })}
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <React.Fragment key={i}>
                <tr
                  className={styles.rowEven}
                  onClick={() => handleRowClick(i)}
                  style={{
                    cursor: "pointer",
                    backgroundColor: selectedIndex === i ? "#e2e8f0" : undefined,
                  }}
                >
                  {filteredColumns.map((col) => {
                    if (col === "uuid") return null
                    return <td key={col}>{renderCellSummary(item[col])}</td>
                  })}
                </tr>
                {selectedIndex === i && (
                  <tr>
                    <td colSpan={filteredColumns.length} className={styles.detailPanel}>
                      {renderExpandedDetails(item)}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
})
export default DataTable
