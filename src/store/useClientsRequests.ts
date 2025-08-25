import { IOneRequest } from "@/types/crm";
import { create } from "zustand";
import { getSorted } from "./api";

interface ISet{
      client: string, 
      requests: IOneRequest[]
}

interface IUseClientsRequests{
      sets: ISet[],
      getSets: () => void
}

const useClientsRequests = create<IUseClientsRequests>((set, get) => ({
      sets: [],
      getSets: async() => {
            try {
                  const res = await getSorted()
                  set({sets: res.data})
            } catch (error) {
                  console.log(error);
            }
      }
}))

export default useClientsRequests