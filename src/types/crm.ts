type IOneRequest = {
      _id?: string,
      client: string;
      title: string;
      dedline: string;
      status: string,
      executor: string,
      more: string[][];
      comments?: string[][]
}
type IOneClient = {
      username: string,
      company: string,
      more: string[][],
}

export type { IOneClient, IOneRequest }
