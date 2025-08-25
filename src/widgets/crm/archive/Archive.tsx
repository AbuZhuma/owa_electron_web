import useCrmStore from '@/store/useCrmStore'
import DataTable from '@/shared/data_table/DataTable'

const Archive = () => {
      const {archive} = useCrmStore()
      return (
            <DataTable title='Архивы' data={archive}/>
      )
}

export default Archive