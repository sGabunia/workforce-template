export interface Meta {
  count: number;
  current: number;
  first: string;
  last: string;
  next: string;
  pages: number;
  prev: string;
}

export interface User {
  group: string;
  id: number;
  name: string;
  role: string;
  shift: string;
  status: string;
}

export type UserList = User[];
