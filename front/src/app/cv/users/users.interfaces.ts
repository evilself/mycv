export interface User {
  id?: number;
  dateOfBirth: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface UserRow extends User {
  opType?: string;
  active?: boolean;
}

export interface GetUsersResponse {
  content: User[];
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  sort: {
    ascending: boolean;
    direction: string
    ignoreCase: boolean;
    nullHandling: string;
    property: string;
  };
  totalElements: number;
  totalPages: number;
}
