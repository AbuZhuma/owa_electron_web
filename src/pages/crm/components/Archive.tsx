import useCrmStore from '@/store/useCrmStore'
import DataTable from '@/widgets/data_table/DataTable'

const Archive = () => {
      const {archive} = useCrmStore()
      return (
            <DataTable title='Archive' data={archive}/>
      )
}

export default Archive