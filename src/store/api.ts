import { IOneClient, IOneRequest } from "@/types/crm"
import { IUser, IUserReg } from "@/types/users"
import axios, { AxiosInstance } from "axios"
import { data } from "react-router-dom"
export interface AuthCredentials {
      username: string
      password: string
}

const gurl = 'https://owa-server.onrender.com'
const lurl = 'http://localhost:4001'
export const curUrl = lurl
const api: AxiosInstance = axios.create({
      baseURL: `${curUrl}/api`,
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

export const deletUser = (username: string) => 
      api.delete(`/auth/one/${username}`) 

export const updateOne = (data: any, username: string) => 
      api.put(`/auth/one/${username}`, data)

export const createClient = (data: IOneClient) => 
      api.post("/crm/client", data)

export const editClient = (data: IOneClient, name: string) => 
      api.put(`/crm/client/${name}`, data)

export const getClients = () => 
      api.get("/crm/client")

export const createRequest = (data: IOneRequest) => 
      api.post("/crm/request", data)

export const getRequests = () => 
      api.get("/crm/request")

export const getReviews = () => 
      api.get("/crm/review")

export const putReview = (uuid: string) => 
      api.delete(`/crm/review/${uuid}`) 

export const backToReview = (uuid: string, comment: string) => 
      api.post(`/crm/review/back/${uuid}`, {comment})      

export const getArchives = () => 
      api.get("/crm/archive")

export const commentRequest = (uuid: string, data: string) => 
      api.put(`/crm/request/comment/${uuid}`, data)

export const archivate = (id: string, obj: {type: string, commit: string}) => 
      api.post(`/crm/archivate/${id}`, obj)

export const updateRequest = (uuid: string, data: IOneRequest) => 
      api.put(`/crm/request/${uuid}`, data)

export const searchReqs = (searchs: any) => 
      api.post("/q/request", searchs)

export const getSorted = () => 
      api.get("/q/sorted")