import Page from "@/shared/page/Page"
import styles from "./styles.module.css"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { searchReqs } from "@/store/api"
import MoreInfo from "@/shared/more_info_table/MoreInfoTable"
import CreateComment from "@/widgets/crm/requests/CreateComment"
import { isArrayOfObjects } from "@/shared/helpers"

const OneReuest = () => {
      const { uuid } = useParams()
      const [req, setReq] = useState()
      const getReq = async () => {
            try {
                  const res = await searchReqs({ uuid })
                  console.log(res);
                  setReq(res.data)
            } catch (error) {
                  console.log(error);
            }
      }
      useEffect(() => {
            getReq()
      }, [])
      
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
                        <MoreInfo title={`Request - ${item.title}`} item={item} form={<CreateComment data={item} />} />
                  </div>
            )
      }
      return (
            <Page>
                  {req ?
                        renderExpandedDetails(req[0]) :
                        <p>Loading...</p>
                  }
            </Page>
      )
}

export default OneReuest
