import MoreInfo from "@/widgets/more_info_table/MoreInfoTable"
import userStore from "@/store/userStore"

const UserInfo = () => {
      const {user} = userStore()
      return (
            <MoreInfo title={`${user.username} info`} item={user}/>
      )
}

export default UserInfo
