import { FC, ReactNode, useEffect, useState } from "react"
import useCrmStore from "@/store/useCrmStore"
import useUserStore from "@/store/userStore"
import { useNavigate } from "react-router-dom"
import useClientsRequests from "@/store/useClientsRequests"

interface IAppInit {
      children: ReactNode
}

const AppInitializer: FC<IAppInit> = ({ children }) => {
      const { getUser, getUsers, loading, setLoad } = useUserStore()
      const { init } = useCrmStore()
      const {getSets} = useClientsRequests()

      useEffect(() => {
            let mounted = true
            const loadData = async () => {
                  try {
                        await Promise.all([getUser(), getUsers(), init(), getSets()])
                  } finally {
                        if (mounted) setLoad(false)
                  }
            }
            loadData()
            return () => { mounted = false }
      }, [])

      if (loading) return <p>Loading...</p>

      return children
}

export default AppInitializer