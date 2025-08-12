import useCrmStore from '@/store/useCrmStore'
import DataTable from '@/shared/data_table/DataTable'
import EditClient from './ClientEdit'

const ClientsList = () => {
      const { clients } = useCrmStore()
      return (
            <DataTable title='Clients' data={clients} form={(d) => <EditClient data={d}/>} />
      )
}

export default ClientsList
