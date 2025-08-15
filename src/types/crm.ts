type IOneRequest = {
      uuid: string,
      client: string;
      title: string;
      dedline: string;
      status: string,
      executor: string,
      more: string[][];
      comments?: string[][]
}
type IFilter = {
      client: string[],
      status: string[],
      dedline: string, 
      executor: string[]
}
type IOneClient = {
      username: string,
      company: string,
      manager: string,
      more: string[][],
}

export type { IOneClient, IOneRequest, IFilter }
