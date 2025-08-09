import React, { useState, ReactNode } from "react"
import styles from "./styles.module.css"
import MoreInfo from "@/widgets/more_info_table/MoreInfoTable"

interface DataTableProps<T extends Record<string, any>> {
  data: T[]
  title?: string
  form?: ((item: T) => ReactNode) | null
}

const DataTable = <T extends Record<string, any>>({
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

  const isArrayOfObjects = (value: any): boolean => {
    return (
      Array.isArray(value) &&
      value.length > 0 &&
      typeof value[0] === "object" &&
      value[0] !== null &&
      !Array.isArray(value[0])
    )
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
        <MoreInfo item={item} form={form ? form(item) : null} />
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
              {filteredColumns.map((col) => (
                <th key={col}>{col}</th>
              ))}
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
                  {filteredColumns.map((col) => (
                    <td key={col}>{renderCellSummary(item[col])}</td>
                  ))}
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
}

export default DataTable
