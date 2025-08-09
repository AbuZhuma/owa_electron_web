import { data } from 'react-router-dom';
import { IOneRequest } from "@/types/crm"
import { create } from "zustand"
import { getMyInfo, getUsers, loginUser, registerUser, setAuthToken, updateMe, updateOne } from "./api"
import { IUser, IUserReg } from "@/types/users"

interface IUserStore {
  userStoreError: string | null
  user: IUser
  users: IUser[]
  isAuth: boolean
  archive: IOneRequest[]
  getUser: () => Promise<void>
  getUsers: () => void
  login: (params: { username: string; password: string }) => Promise<void>
  register: (params: IUserReg) => void
  updateMe: (data: IUser) => void
  updateOne: (data: any, username: string) => void
  logout: () => void
}

const initialUser: IUser = {
  username: "",
  job_title: "",
  role: "",
  tasks: [],
  more: []
}

const userStore = create<IUserStore>((set, get) => ({
  userStoreError: null,
  user: initialUser,
  isAuth: false,
  archive: [],
  users: [],

  getUser: async () => {
    const token = localStorage.getItem("token")
    if (!token) return

    try {
      setAuthToken(token)
      const res = await getMyInfo()
      if (res?.data) {
        set({ user: res.data, isAuth: true, userStoreError: null })
      } else {
        throw new Error("No user data received")
      }
    } catch (error) {
      console.error("getUser error:", error)
      set({ userStoreError: "Ошибка при получении данных пользователя", isAuth: false, user: initialUser })
      localStorage.removeItem("token")
    }
  },
  getUsers: async () => {
    try {
      const res = await getUsers()
      set({ users: res.data })
    } catch (error) {
      console.error("getUser error:", error)
      set({ userStoreError: "Ошибка при получении пользователей", isAuth: false, user: initialUser })
    }
  },
  updateMe: async (data) => {
    try {
      const res = await updateMe(data)
      console.log(res);
      get().getUser()
    } catch (error) {
      console.error("getUser error:", error)
      set({ userStoreError: "Error" })
    }
  },
  updateOne: async (data, username) => {
    try {
      await updateOne(data, username)
    } catch (error) {
      console.error("getUser error:", error)
      set({ userStoreError: "Error" })
    }
  },
  login: async ({ username, password }) => {
    try {
      const res = await loginUser({ username, password })
      if (res?.data?.token) {
        localStorage.setItem("token", res.data.token)
        setAuthToken(res.data.token)
        set({ userStoreError: null, isAuth: true })
        await get().getUser()
      } else {
        throw new Error("No token in login response")
      }
    } catch (error) {
      console.error("login error:", error)
      set({ userStoreError: "Ошибка при входе в систему", isAuth: false })
    }
  },
  register: async (data) => {
    try {
      const res = await registerUser(data)
      console.log(res);
      get().getUsers()
    } catch (error) {
      console.error("login error:", error)
      set({ userStoreError: "Ошибка при входе в систему", isAuth: false })
    }
  },
  logout: () => {
    localStorage.removeItem("token")
    set({
      user: initialUser,
      isAuth: false,
      userStoreError: null,
      archive: []
    })
  }
}))

export default userStore
