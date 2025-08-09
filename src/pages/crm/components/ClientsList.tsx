import useCrmStore from '@/store/useCrmStore'
import DataTable from '@/widgets/data_table/DataTable'

const ClientsList = () => {
      const { clients } = useCrmStore()
      return (
            <DataTable title='Clients' data={clients} />
      )
}

export default ClientsList
