import useCrmStore from '@/store/useCrmStore'
import DataTable from '@/shared/data_table/DataTable'
import CreateComment from './CreateComment'

const RequestList = () => {
      const { requests } = useCrmStore()
      return (
            <DataTable form={(item) => <CreateComment data={item}/>} title='Requests' data={requests} />
      )
}

export default RequestList
