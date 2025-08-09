interface IUser {
  username: string
  job_title: string
  role: string
  tasks: {title: string, status: string}[]
  more: string[][]
}
interface IUserReg {
  username: string
  job_title: string
  password: string
  role: string
  more: string[][]
}
export type {IUser, IUserReg}