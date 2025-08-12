import useCrmStore from '@/store/useCrmStore'
import DataTable from '@/shared/data_table/DataTable'
import ReviewControll from './ReviewControll'

const ReviewList = () => {
      const { reviews } = useCrmStore()
      return (
            <DataTable form={(item) => <ReviewControll data={item}/>} title='Reviews' data={reviews} />
      )
}

export default ReviewList
