export interface User {
  group: string;
  id: number;
  name: string;
  role: string;
  shift: string;
  status: string;
}

export type UserList = User[];
