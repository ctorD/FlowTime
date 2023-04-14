export interface Todo {
  id: number;
  title: string;
  startTime: number | undefined;
  endTime: number | undefined;
}

export interface Meta {
  totalCount: number;
}
