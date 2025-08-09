import { IOneClient, IOneRequest } from "@/types/crm";
import { create } from "zustand";
import { archivate, commentRequest, createClient, createRequest, getArchives, getClients, getRequests, updateRequest } from "./api";

interface IClientStore {
      crmStoreError: string | null,
      requests: IOneRequest[],
      clients: IOneClient[],
      archive: IOneRequest[],
      createClient: (data: IOneClient) => void,
      createRequest: (data: IOneRequest) => void,
      updateRequest: (title: string, data: IOneRequest) => void,
      getClients: () => void,
      getRequests: () => void,
      getArchive: () => void,
      comentRequest: (title: string, comment: string) => void,
      archivate: (id: string, type: string, commit: string) => void,
      init: () => void
}

const useCrmStore = create<IClientStore>((set, get) => ({
      crmStoreError: null,
      clients: [],
      archive: [],
      requests: [],
      createClient: async (data) => {
            try {
                  const res = await createClient(data)
                  console.log(res);
                  set({ clients: [...get().clients, data] })
            } catch (error) {
                  console.log(error);
                  set({ crmStoreError: "Error when create client" })
            }
      },
      archivate: async (id, type, commit) => {
            try {
                  const res = await archivate(id, { type, commit })
                  console.log(res);
                  if (type === "client") {
                        get().getClients()
                  } else if (type === "request") {
                        get().getRequests()
                  }
                  set({ archive: [...get().archive, res.data] })
            } catch (error) {
                  console.log(error);
                  set({ crmStoreError: "Error when archivate" })
            }
      },
      createRequest: async (data) => {
            try {
                  const res = await createRequest(data)
                  console.log(res);
                  set({ requests: [...get().requests, data] })
            } catch (error:any) {
                  console.log(error);
                  alert(error.message)
                  set({ crmStoreError: "Error when create request" })
            }
      },
      comentRequest: async (title, data) => {
            try {
                  const res = await commentRequest(title, data)
                  console.log(res)

                  const updated = get().requests.map(req => {
                        if (req.title === title) {
                              req.comments = res.data
                        }
                        return req
                  })
                  
                  set({ requests: updated })
            } catch (error) {
                  console.log(error)
                  set({ crmStoreError: "Error when comment request" })
            }
      },
      updateRequest: async (title, data) => {
            try {
                  const res = await updateRequest(title, data)
                  console.log(res)

                  const updated = get().requests.map(req => {
                        if(req.title === title){
                              return res.data
                        }
                        return req
                  })

                  set({ requests: updated })
            } catch (error) {
                  console.log(error)
                  set({ crmStoreError: "Error when comment request" })
            }
      },
      getClients: async () => {
            try {
                  const res = await getClients()
                  set({ clients: res.data })
            } catch (error) {
                  console.log(error);
                  set({ crmStoreError: "Error when geting clients" })
            }
      },
      getRequests: async () => {
            try {
                  const res = await getRequests()
                  set({ requests: res.data })
            } catch (error) {
                  console.log(error);
                  set({ crmStoreError: "Error when geting requests" })
            }
      },
      getArchive: async () => {
            try {
                  const res = await getArchives()
                  set({ archive: res.data })
            } catch (error) {
                  console.log(error);
                  set({ crmStoreError: "Error when geting archive" })
            }
      },
      init: async () => {
            try {
                  await get().getClients()
                  await get().getRequests()
                  await get().getArchive()
            } catch (error) {
                  set({ crmStoreError: "Error when init crm" })
            }
      }
}))

export default useCrmStore