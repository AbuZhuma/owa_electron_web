import { IOneClient, IOneRequest } from "@/types/crm";
import { create } from "zustand";
import { archivate, backToReview, commentRequest, createClient, createRequest, editClient, getArchives, getClients, getRequests, getReviews, putReview, updateRequest } from "./api";
import { data } from "react-router-dom";

interface IClientStore {
      crmStoreError: string | null,
      requests: IOneRequest[],
      clients: IOneClient[],
      archive: IOneRequest[],
      reviews: IOneRequest[],
      createClient: (data: IOneClient) => void,
      editClient: (data: IOneClient, name: string) => void,
      createRequest: (data: IOneRequest) => void,
      reviewRequest: (uuid: string) => void,
      backReview: (uuid: string, comment: string) => void,
      updateRequest: (uuid: string, data: IOneRequest) => void,
      getClients: () => void,
      getRequests: () => void,
      getReviews: () => void,
      getArchive: () => void,
      comentRequest: (uuid: string, comment: string) => void,
      archivate: (id: string, type: string, commit: string) => void,
      init: () => void
}

const useCrmStore = create<IClientStore>((set, get) => ({
      crmStoreError: null,
      clients: [],
      archive: [],
      requests: [],
      reviews: [],
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
      editClient: async (data, name) => {
            try {
                  const res = await editClient(data, name)
                  const clients = get().clients.map((el) => {
                        if (el.username === name) {
                              return res.data
                        }
                        return el
                  })
                  if (data.username) {
                        const reqs = get().requests.map((el) => {
                              if (el.client === name) {
                                    el.client = data.username
                              }
                              return el
                        })
                        set({ requests: reqs })
                  }

                  set({ clients: clients })
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
            } catch (error: any) {
                  console.log(error);
                  alert(error.message)
                  set({ crmStoreError: "Error when create request" })
            }
      },
      comentRequest: async (uuid, data) => {
            try {
                  const res = await commentRequest(uuid, data)
                  console.log(res)

                  const updated = get().requests.map(req => {
                        if (req.uuid === uuid) {
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
      reviewRequest: async (uuid) => {
            try {
                  const res = await putReview(uuid)
                  set(state => ({
                        requests: state.requests.filter(el => el.uuid !== uuid),
                        reviews: [...state.reviews, res.data]
                  }))
            } catch (error) {
                  console.log(error)
                  set({ crmStoreError: "Error when review request" })
            }
      },
      backReview: async (uuid, comment) => {
            try {
                  const res = await backToReview(uuid, comment)
                  set(state => ({
                        reviews: state.reviews.filter(el => el.uuid !== uuid),
                        requests: [...state.requests, res.data]
                  }))
            } catch (error) {
                  console.log(error)
                  set({ crmStoreError: "Error when review request" })
            }
      },
      getReviews: async () => {
            try {
                  const reviews = await getReviews()
                  set({ reviews: reviews.data })
            } catch (error) {
                  console.log(error)
                  set({ crmStoreError: "Error when get reviews" })
            }
      },
      updateRequest: async (uuid, data) => {
            try {
                  const res = await updateRequest(uuid, data)
                  const updated = get().requests.map(req => {
                        if (req.uuid === uuid) {
                              return res.data
                        }
                        return req
                  })
                  console.log(res);

                  set({ requests: updated })
            } catch (error) {
                  console.log(error)
                  set({ crmStoreError: "Error when comment request" })
            }
      },
      getClients: async () => {
            try {
                  console.log("geting clients");

                  const res = await getClients()
                  set({ clients: res.data })
            } catch (error) {
                  console.log(error);
                  set({ crmStoreError: "Error when geting clients" })
            }
      },
      getRequests: async () => {
            try {
                  console.log("geting reqs");

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
                  await Promise.all([get().getClients(), get().getRequests(), get().getArchive(), get().getReviews()])
            } catch (error) {
                  set({ crmStoreError: "Error when init crm" })
            }
      }
}))

export default useCrmStore