import { IOneClient, IOneRequest } from "@/types/crm"
import { IUser, IUserReg } from "@/types/users"
import axios, { AxiosInstance } from "axios"
export interface AuthCredentials {
      username: string
      password: string
}

const api: AxiosInstance = axios.create({
      baseURL: 'https://owa-server.onrender.com/api',
      headers: {
            'Content-Type': 'application/json',
      },
})

export const setAuthToken = (token: string | null) => {
      if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      } else {
            delete api.defaults.headers.common['Authorization']
      }
}

export const registerUser = (data: IUserReg) =>
      api.post<{ message: string }>('/auth/register', data)

export const loginUser = (data: AuthCredentials) =>
      api.post('/auth/login', data)

export const getUsers = () => 
      api.get("/auth/users")

export const getMyInfo = () =>
      api.get('/auth/myinfo')

export const updateMe = (data: IUser) => 
      api.put("/auth/me", data)

export const updateOne = (data: any, username: string) => 
      api.put(`/auth/one/${username}`, data)

export const createClient = (data: IOneClient) => 
      api.post("/crm/client", data)

export const getClients = () => 
      api.get("/crm/client")

export const createRequest = (data: IOneRequest) => 
      api.post("/crm/request", data)

export const getRequests = () => 
      api.get("/crm/request")

export const getArchives = () => 
      api.get("/crm/archive")

export const commentRequest = (title: string, data: string) => 
      api.put(`/crm/request/comment/${title}`, data)

export const archivate = (id: string, obj: {type: string, commit: string}) => 
      api.post(`/crm/archivate/${id}`, obj)

export const updateRequest = (title: string, data: IOneRequest) => 
      api.put(`/crm/request/${title}`, data)

