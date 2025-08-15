import { IFilter, IOneClient, IOneRequest } from "@/types/crm";
import { create } from "zustand";
import {
      archivate, backToReview, commentRequest, createClient, createRequest,
      editClient, getArchives, getClients, getRequests, getReviews, putReview, updateRequest
} from "./api";

interface IClientStore {
      crmStoreError: string | null;
      clients: IOneClient[];
      requests: IOneRequest[];
      archive: IOneRequest[];
      reviews: IOneRequest[];
      curReqs: IOneRequest[];
      curArchive: IOneRequest[];
      curReviews: IOneRequest[];
      filters: IFilter;
      filterType: "requests" | "archive" | "reviews";
      isFiltering: { requests: boolean; archive: boolean; reviews: boolean };
      setFilter: (type: "requests" | "archive" | "reviews", key: string, filters: string[] | string) => void;
      resetFilters: () => void;
      createClient: (data: IOneClient) => void;
      editClient: (data: IOneClient, name: string) => void;
      createRequest: (data: IOneRequest) => void;
      reviewRequest: (uuid: string) => void;
      backReview: (uuid: string, comment: string) => void;
      updateRequest: (uuid: string, data: IOneRequest) => void;
      getClients: () => void;
      getRequests: () => void;
      getReviews: () => void;
      getArchive: () => void;
      comentRequest: (uuid: string, comment: string) => void;
      archivate: (id: string, type: string, commit: string) => void;
      init: () => void;
}

const defaultFilters = (): IFilter => ({
      client: [],
      status: [],
      executor: [],
      dedline: ""
});

const useCrmStore = create<IClientStore>((set, get) => ({
      crmStoreError: null,
      clients: [],
      requests: [],
      archive: [],
      reviews: [],
      curReqs: [],
      curArchive: [],
      curReviews: [],
      filters: defaultFilters(),
      filterType: "requests",
      isFiltering: { requests: false, archive: false, reviews: false },

      setFilter: (type, key, filters) => {
            const state = get();

            if (state.filterType !== type) {
                  get().resetFilters();
                  set({ filterType: type });
            }

            let base: IOneRequest[] = [];
            let curKey: "curReqs" | "curArchive" | "curReviews";
            let dataKey: "requests" | "archive" | "reviews";

            switch (type) {
                  case "archive":
                        base = state.isFiltering.archive ? state.curArchive : state.archive;
                        curKey = "curArchive";
                        dataKey = "archive";
                        break;
                  case "reviews":
                        base = state.isFiltering.reviews ? state.curReviews : state.reviews;
                        curKey = "curReviews";
                        dataKey = "reviews";
                        break;
                  default:
                        base = state.isFiltering.requests ? state.curReqs : state.requests;
                        curKey = "curReqs";
                        dataKey = "requests";
                        break;
            }

            if (!state.isFiltering[type]) {
                  set({ [curKey]: state[dataKey], isFiltering: { ...state.isFiltering, [type]: true } } as Pick<IClientStore, typeof curKey | "isFiltering">);
                  base = state[dataKey];
            }

            const newFilters = { ...state.filters };
            if (key === "dedline") newFilters.dedline = filters as string;
            else newFilters[key as "client" | "status" | "executor"] = filters as string[];
            set({ filters: newFilters });

            const filtersFns: ((r: IOneRequest) => boolean)[] = [];
            if (newFilters.client.length) filtersFns.push(r => newFilters.client.includes(r.client));
            if (newFilters.status.length) filtersFns.push(r => newFilters.status.includes(r.status));
            if (newFilters.executor.length) filtersFns.push(r => newFilters.executor.includes(r.executor));
            if (newFilters.dedline) filtersFns.push(r => r.dedline <= newFilters.dedline);

            const filtered = base.filter(r => filtersFns.every(f => f(r)));
            set({ [dataKey]: filtered } as Pick<IClientStore, typeof dataKey>);
      },

      resetFilters: () => {
            const state = get();
            for (let el in state.isFiltering) {
                  if (el && el === "requests") {
                        if (state.curReqs.length) {
                              set({ requests: state.curReqs })
                        } else {
                              state.getRequests()
                        }
                  }
                  if (el && el === "archive") {
                        if (state.curArchive.length) {
                              set({ archive: state.curArchive })
                        } else {
                              state.getArchive()
                        }
                  }
                  if (el && el === "reviews") {
                        if (state.curReviews.length) {
                              set({ reviews: state.curReviews })
                        } else {
                              state.getReviews()
                        }
                  }
                  set({ isFiltering: { requests: false, archive: false, reviews: false }, filters: defaultFilters() })
            }
      },

      createClient: async (data) => {
            try {
                  await createClient(data);
                  set({ clients: [...get().clients, data] });
            } catch (error) {
                  console.log(error);
                  set({ crmStoreError: "Error when create client" });
            }
      },
      editClient: async (data, name) => {
            try {
                  const res = await editClient(data, name);
                  const clients = get().clients.map(el => (el.username === name ? res.data : el));
                  if (data.username) {
                        const reqs = get().requests.map(el => {
                              if (el.client === name) el.client = data.username;
                              return el;
                        });
                        set({ requests: reqs });
                  }
                  set({ clients });
            } catch (error) {
                  console.log(error);
                  set({ crmStoreError: "Error when edit client" });
            }
      },
      archivate: async (id, type, commit) => {
            try {
                  const res = await archivate(id, { type, commit });
                  if (type === "client") get().getClients();
                  else if (type === "request") get().getRequests();
                  else if (type === "review") get().getReviews();
                  set({ archive: [...get().archive, res.data] });
            } catch (error) {
                  console.log(error);
                  set({ crmStoreError: "Error when archivate" });
            }
      },
      createRequest: async (data) => {
            try {
                  await createRequest(data);
                  set({ requests: [...get().requests, data] });
            } catch (error: any) {
                  console.log(error);
                  set({ crmStoreError: "Error when create request" });
            }
      },
      comentRequest: async (uuid, data) => {
            try {
                  const res = await commentRequest(uuid, data);
                  const updated = get().requests.map(req => (req.uuid === uuid ? { ...req, comments: res.data } : req));
                  set({ requests: updated });
            } catch (error) {
                  console.log(error);
                  set({ crmStoreError: "Error when comment request" });
            }
      },
      reviewRequest: async (uuid) => {
            try {
                  const res = await putReview(uuid);
                  set(state => ({
                        requests: state.requests.filter(el => el.uuid !== uuid),
                        reviews: [...state.reviews, res.data]
                  }));
            } catch (error) {
                  console.log(error);
                  set({ crmStoreError: "Error when review request" });
            }
      },
      backReview: async (uuid, comment) => {
            try {
                  const res = await backToReview(uuid, comment);
                  set(state => ({
                        reviews: state.reviews.filter(el => el.uuid !== uuid),
                        requests: [...state.requests, res.data]
                  }));
            } catch (error) {
                  console.log(error);
                  set({ crmStoreError: "Error when back review" });
            }
      },
      getReviews: async () => {
            try {
                  const reviews = await getReviews();
                  set({ reviews: reviews.data });
            } catch (error) {
                  console.log(error);
                  set({ crmStoreError: "Error when get reviews" });
            }
      },
      updateRequest: async (uuid, data) => {
            try {
                  const res = await updateRequest(uuid, data);
                  const updated = get().requests.map(req => (req.uuid === uuid ? res.data : req));
                  set({ requests: updated });
            } catch (error) {
                  console.log(error);
                  set({ crmStoreError: "Error when update request" });
            }
      },
      getClients: async () => {
            try {
                  const res = await getClients();
                  set({ clients: res.data });
            } catch (error) {
                  console.log(error);
                  set({ crmStoreError: "Error when get clients" });
            }
      },
      getRequests: async () => {
            try {
                  const res = await getRequests();
                  set({ requests: res.data });
            } catch (error) {
                  console.log(error);
                  set({ crmStoreError: "Error when get requests" });
            }
      },
      getArchive: async () => {
            try {
                  const res = await getArchives();
                  set({ archive: res.data });
            } catch (error) {
                  console.log(error);
                  set({ crmStoreError: "Error when get archive" });
            }
      },
      init: async () => {
            try {
                  await Promise.all([get().getClients(), get().getRequests(), get().getArchive(), get().getReviews()]);
            } catch (error) {
                  set({ crmStoreError: "Error when init crm" });
            }
      }
}));

export default useCrmStore;
