export interface Meta {
  current_page: number;
  per_page: number;
  remaining_count: number;
  total_items: number;
  total_pages: number;
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
